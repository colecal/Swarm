import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

interface Artifact {
  title: string;
  content_type?: string;
  content: string;
  metadata?: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  const supabase = createServerClient();

  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    run_id,
    task_id,
    status,
    result,
    result_summary,
    tokens_used,
    error_message,
    artifacts,
    duration_seconds,
  } = body as {
    run_id?: string;
    task_id?: string;
    status?: string;
    result?: Record<string, unknown>;
    result_summary?: string;
    tokens_used?: number;
    error_message?: string;
    artifacts?: Artifact[];
    duration_seconds?: number;
  };

  if (task_id) {
    await supabase
      .from("tasks")
      .update({
        status: status || "completed",
        result: result || null,
        result_summary: result_summary || null,
        tokens_used: tokens_used || 0,
        error_message: error_message || null,
        completed_at: new Date().toISOString(),
      })
      .eq("id", task_id);
  }

  if (run_id) {
    await supabase
      .from("runs")
      .update({
        status: status || "completed",
        output: result || null,
        output_summary: result_summary || null,
        tokens_used: tokens_used || 0,
        error_message: error_message || null,
        completed_at: new Date().toISOString(),
        duration_seconds: duration_seconds || null,
      })
      .eq("id", run_id);
  }

  if (artifacts?.length && run_id) {
    const { data: run } = await supabase
      .from("runs")
      .select("goal_id, task_id, agent_id")
      .eq("id", run_id)
      .single();

    if (run) {
      await supabase.from("results").insert(
        artifacts.map((a) => ({
          run_id,
          goal_id: run.goal_id,
          task_id: run.task_id,
          agent_id: run.agent_id,
          title: a.title,
          content_type: a.content_type || "text",
          content: a.content,
          metadata: a.metadata || {},
        }))
      );
    }
  }

  return NextResponse.json({ success: true });
}
