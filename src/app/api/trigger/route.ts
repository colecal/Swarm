import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { triggerAgentForTask, triggerRoutine } from "@/lib/routines/trigger";
import {
  buildTaskContext,
  buildGoalDecompositionContext,
  buildMonitorContext,
} from "@/lib/agents/prompts";

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  const body = await req.json();
  const action = body.action;

  if (action === "run_task") {
    const taskId = body.task_id;
    if (!taskId) {
      return NextResponse.json({ error: "task_id required" }, { status: 400 });
    }

    const { data: task, error: taskErr } = await supabase
      .from("tasks")
      .select("*, goal:goals(*)")
      .eq("id", taskId)
      .single();

    if (taskErr || !task) {
      return NextResponse.json(
        { error: taskErr?.message || "Task not found" },
        { status: 404 }
      );
    }

    const { data: agent } = await supabase
      .from("agents")
      .select("*")
      .eq("type", task.agent_type)
      .single();

    if (!agent) {
      return NextResponse.json(
        { error: `No agent found for type: ${task.agent_type}` },
        { status: 404 }
      );
    }

    const { data: run } = await supabase
      .from("runs")
      .insert({
        agent_id: agent.id,
        task_id: task.id,
        goal_id: task.goal_id,
        trigger_type: "api",
        status: "running",
        input_context: { task_id: taskId, action: "run_task" },
      })
      .select()
      .single();

    await supabase.from("agents").update({ status: "running" }).eq("id", agent.id);

    const goal = (task as { goal?: { title?: string; description?: string | null } }).goal;
    const context = buildTaskContext({
      taskId: task.id,
      taskTitle: task.title,
      taskDescription: task.description,
      taskPrompt: task.prompt,
      goalTitle: goal?.title || "Unknown Goal",
      goalDescription: goal?.description || null,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    });

    const result = await triggerAgentForTask(task.agent_type, context);

    if (run) {
      await supabase
        .from("runs")
        .update({
          session_url: result.sessionUrl || null,
          ...(result.success
            ? {}
            : {
                status: "failed",
                error_message: result.error,
                completed_at: new Date().toISOString(),
              }),
        })
        .eq("id", run.id);
    }

    return NextResponse.json({
      success: result.success,
      run_id: run?.id,
      session_url: result.sessionUrl,
      error: result.error,
    });
  }

  if (action === "process_goals") {
    const { data: goals } = await supabase
      .from("goals")
      .select("id, title, description")
      .eq("status", "active");

    if (!goals?.length) {
      return NextResponse.json({ message: "No active goals" });
    }

    const context = buildGoalDecompositionContext({
      goals,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    });

    const result = await triggerRoutine("goal_processor", context);

    return NextResponse.json({
      success: result.success,
      goals_count: goals.length,
      session_url: result.sessionUrl,
      error: result.error,
    });
  }

  if (action === "run_monitor") {
    const today = new Date().toISOString().split("T")[0];
    const context = buildMonitorContext({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      date: today,
    });

    const result = await triggerRoutine("monitor_agent", context);

    return NextResponse.json({
      success: result.success,
      session_url: result.sessionUrl,
      error: result.error,
    });
  }

  if (action === "run_agent") {
    const { agent_type, context: userContext } = body;
    if (!agent_type || !userContext) {
      return NextResponse.json(
        { error: "agent_type and context required" },
        { status: 400 }
      );
    }

    const result = await triggerAgentForTask(agent_type, userContext);
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
