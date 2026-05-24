export type GoalStatus = "active" | "paused" | "completed" | "failed" | "archived";
export type TaskStatus = "pending" | "queued" | "running" | "completed" | "failed" | "cancelled";
export type AgentStatus = "idle" | "running" | "error" | "disabled";
export type AgentType = "researcher" | "coder" | "writer" | "analyst" | "monitor" | "market";
export type RunStatus = "running" | "completed" | "failed" | "timeout";
export type TriggerType = "scheduled" | "api" | "webhook" | "manual";
export type ContentType = "text" | "markdown" | "json" | "code" | "report" | "url";
export type MemoryType = "observation" | "learning" | "fact" | "preference" | "error";

export interface Goal {
  id: string;
  title: string;
  description: string | null;
  success_criteria: { criterion: string; met: boolean }[];
  priority: number;
  status: GoalStatus;
  deadline: string | null;
  tags: string[];
  progress: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface GoalWithStats extends Goal {
  total_tasks: number;
  pending_tasks: number;
  running_tasks: number;
  completed_tasks: number;
  failed_tasks: number;
}

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  description: string | null;
  system_prompt: string;
  capabilities: string[];
  routine_url: string | null;
  routine_token: string | null;
  status: AgentStatus;
  last_run_at: string | null;
  total_runs: number;
  total_tokens_used: number;
  success_rate: number;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  goal_id: string;
  agent_id: string | null;
  title: string;
  description: string | null;
  prompt: string | null;
  agent_type: AgentType;
  status: TaskStatus;
  priority: number;
  dependencies: string[];
  result: Record<string, unknown> | null;
  result_summary: string | null;
  tokens_used: number;
  retry_count: number;
  max_retries: number;
  error_message: string | null;
  scheduled_for: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

export interface Run {
  id: string;
  agent_id: string;
  task_id: string | null;
  goal_id: string | null;
  trigger_type: TriggerType;
  status: RunStatus;
  input_context: Record<string, unknown> | null;
  output: Record<string, unknown> | null;
  output_summary: string | null;
  tokens_used: number;
  duration_seconds: number | null;
  session_url: string | null;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
  agent?: Agent;
  task?: Task;
  goal?: Goal;
}

export interface Result {
  id: string;
  run_id: string;
  goal_id: string | null;
  task_id: string | null;
  agent_id: string | null;
  title: string;
  content_type: ContentType;
  content: string;
  metadata: Record<string, unknown>;
  pinned: boolean;
  created_at: string;
  agent?: Agent;
  goal?: Goal;
}

export interface DailySummary {
  id: string;
  summary_date: string;
  tasks_completed: number;
  tasks_failed: number;
  goals_progressed: number;
  goals_completed: number;
  total_runs: number;
  total_tokens: number;
  highlights: { text: string }[];
  concerns: { text: string }[];
  narrative: string | null;
  created_at: string;
}

export interface DashboardStats {
  active_goals: number;
  completed_goals: number;
  pending_tasks: number;
  running_tasks: number;
  completed_tasks_today: number;
  runs_today: number;
  tokens_today: number;
  agents_active: number;
  agents_total: number;
}
