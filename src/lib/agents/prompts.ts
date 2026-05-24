export function buildTaskContext(params: {
  taskId: string;
  taskTitle: string;
  taskDescription: string | null;
  taskPrompt: string | null;
  goalTitle: string;
  goalDescription: string | null;
  supabaseUrl: string;
  supabaseKey: string;
}): string {
  return `
== TASK ASSIGNMENT ==
Task ID: ${params.taskId}
Task: ${params.taskTitle}
${params.taskDescription ? `Description: ${params.taskDescription}` : ""}
${params.taskPrompt ? `\nSpecific Instructions:\n${params.taskPrompt}` : ""}

Parent Goal: ${params.goalTitle}
${params.goalDescription ? `Goal Context: ${params.goalDescription}` : ""}

== SUPABASE CONNECTION ==
URL: ${params.supabaseUrl}
Service Role Key: ${params.supabaseKey}

== INSTRUCTIONS ==
1. Connect to Supabase using the credentials above.
2. Update the task status to 'running':
   UPDATE tasks SET status = 'running', started_at = now() WHERE id = '${params.taskId}';
3. Execute the task according to your specialization.
4. When complete, update the task:
   UPDATE tasks SET
     status = 'completed',
     completed_at = now(),
     result = '<your structured result as JSON>',
     result_summary = '<one-paragraph summary>'
   WHERE id = '${params.taskId}';
5. Insert a result record:
   INSERT INTO results (run_id, goal_id, task_id, agent_id, title, content_type, content)
   VALUES (...);
6. If you fail, update status to 'failed' with error_message.
`.trim();
}

export function buildGoalDecompositionContext(params: {
  goals: { id: string; title: string; description: string | null }[];
  supabaseUrl: string;
  supabaseKey: string;
}): string {
  const goalList = params.goals
    .map((g) => `- [${g.id}] ${g.title}${g.description ? `: ${g.description}` : ""}`)
    .join("\n");

  return `
== DAILY GOAL PROCESSING ==

The following active goals need task decomposition and execution:

${goalList}

== SUPABASE CONNECTION ==
URL: ${params.supabaseUrl}
Service Role Key: ${params.supabaseKey}

== INSTRUCTIONS ==
For each goal above:
1. Check if it already has tasks: SELECT * FROM tasks WHERE goal_id = '<goal_id>';
2. If no tasks exist, decompose the goal into 3-7 concrete tasks.
   Each task needs:
   - title: Clear, actionable task name
   - description: What specifically needs to be done
   - prompt: Detailed instructions for the assigned agent
   - agent_type: One of 'researcher', 'coder', 'writer', 'analyst', 'monitor', 'market'
   - priority: 1-10 (higher = more important)
   - dependencies: Array of task IDs that must complete first (use '{}' for none)
3. INSERT the tasks into Supabase.
4. If tasks already exist, check for any 'pending' tasks with met dependencies.
   Pick the highest-priority one and execute it according to the agent_type.
5. After executing, update the task status and write results.

Think step-by-step. Quality of decomposition matters more than speed.
`.trim();
}

export function buildMonitorContext(params: {
  supabaseUrl: string;
  supabaseKey: string;
  date: string;
}): string {
  return `
== NIGHTLY MONITORING REPORT ==
Date: ${params.date}

== SUPABASE CONNECTION ==
URL: ${params.supabaseUrl}
Service Role Key: ${params.supabaseKey}

== INSTRUCTIONS ==
1. Connect to Supabase.
2. Query today's activity:
   - Tasks completed today: SELECT COUNT(*) FROM tasks WHERE completed_at >= '${params.date}' AND status = 'completed';
   - Tasks failed today: SELECT COUNT(*) FROM tasks WHERE completed_at >= '${params.date}' AND status = 'failed';
   - Runs today: SELECT COUNT(*) FROM runs WHERE started_at >= '${params.date}';
   - Tokens today: SELECT SUM(tokens_used) FROM runs WHERE started_at >= '${params.date}';
   - Goals with progress changes: Check goals table for updated_at >= '${params.date}'
   - Goals newly completed: SELECT * FROM goals WHERE status = 'completed' AND updated_at >= '${params.date}';
3. Identify highlights (completions, breakthroughs, high-value results).
4. Identify concerns (repeated failures, stalled goals, blocked tasks).
5. Write a narrative summary (2-3 paragraphs).
6. INSERT into daily_summaries:
   INSERT INTO daily_summaries (
     summary_date, tasks_completed, tasks_failed, goals_progressed,
     goals_completed, total_runs, total_tokens, highlights, concerns, narrative
   ) VALUES (...);
7. Check for tasks with retry_count >= max_retries and flag them.
8. Check for goals past their deadline and flag them.
`.trim();
}
