"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusDot } from "@/components/ui/status-dot";
import { Button } from "@/components/ui/button";
import type { GoalWithStats } from "@/lib/supabase/types";
import { formatDistanceToNow } from "date-fns";

const statusBadge: Record<string, "success" | "warning" | "danger" | "info" | "default"> = {
  active: "info",
  paused: "warning",
  completed: "success",
  failed: "danger",
  archived: "default",
};

export function GoalCard({
  goal,
  onTrigger,
  onEdit,
}: {
  goal: GoalWithStats;
  onTrigger: (id: string) => void;
  onEdit: (goal: GoalWithStats) => void;
}) {
  return (
    <Card hover className="animate-slide-up">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <StatusDot status={goal.status} />
            <h3 className="text-sm font-semibold text-neutral-100 truncate">{goal.title}</h3>
          </div>
          {goal.description && (
            <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{goal.description}</p>
          )}

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-neutral-600 font-mono">Progress</span>
              <span className="text-[10px] text-neutral-500 font-mono">
                {Math.round(goal.progress)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-surface-4 overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-600">
            <span>{goal.total_tasks} tasks</span>
            {goal.completed_tasks > 0 && (
              <span className="text-success">{goal.completed_tasks} done</span>
            )}
            {goal.running_tasks > 0 && (
              <span className="text-info">{goal.running_tasks} running</span>
            )}
            {goal.failed_tasks > 0 && (
              <span className="text-danger">{goal.failed_tasks} failed</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <Badge variant={statusBadge[goal.status] || "default"}>{goal.status}</Badge>
          <span className="text-[10px] text-neutral-700 font-mono">P{goal.priority}</span>
          {goal.deadline && (
            <span className="text-[10px] text-neutral-600">
              Due {formatDistanceToNow(new Date(goal.deadline), { addSuffix: true })}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-neutral-800/40 pt-3">
        <Button size="sm" variant="secondary" onClick={() => onEdit(goal)}>
          Edit
        </Button>
        {goal.status === "active" && goal.total_tasks === 0 && (
          <Button size="sm" onClick={() => onTrigger(goal.id)}>
            Decompose
          </Button>
        )}
        {goal.status === "active" && goal.pending_tasks > 0 && (
          <Button size="sm" onClick={() => onTrigger(goal.id)}>
            Run Next Task
          </Button>
        )}
      </div>
    </Card>
  );
}
