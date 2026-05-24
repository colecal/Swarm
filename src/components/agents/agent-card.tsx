"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Agent } from "@/lib/supabase/types";
import { AGENT_DEFINITIONS } from "@/lib/agents/definitions";
import { formatDistanceToNow } from "date-fns";

const statusBadge: Record<string, "success" | "warning" | "danger" | "info" | "default"> = {
  idle: "default",
  running: "info",
  error: "danger",
  disabled: "default",
};

export function AgentCard({ agent }: { agent: Agent }) {
  const def = AGENT_DEFINITIONS[agent.type];

  return (
    <Card hover className="animate-slide-up">
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl bg-surface-4"
        >
          <span className={def?.color || "text-neutral-400"}>{agent.name[0]}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-neutral-100">{agent.name}</h3>
            <Badge variant={statusBadge[agent.status]} dot>
              {agent.status}
            </Badge>
          </div>
          <p className="text-xs text-neutral-500 mb-3">{agent.description}</p>

          <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-600">
            <span>{agent.total_runs} runs</span>
            <span>{agent.total_tokens_used.toLocaleString()} tokens</span>
            <span>{Math.round(agent.success_rate)}% success</span>
            {agent.last_run_at && (
              <span>
                Last: {formatDistanceToNow(new Date(agent.last_run_at), { addSuffix: true })}
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {agent.capabilities.slice(0, 4).map((cap) => (
              <span
                key={cap}
                className="rounded-md bg-surface-4 px-2 py-0.5 text-[10px] text-neutral-500"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        <div className="shrink-0">
          <span className="text-xs text-neutral-700 font-mono">{agent.type}</span>
        </div>
      </div>
    </Card>
  );
}
