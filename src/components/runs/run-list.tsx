"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusDot } from "@/components/ui/status-dot";
import type { Run } from "@/lib/supabase/types";
import { formatDistanceToNow } from "date-fns";

const statusBadge: Record<string, "success" | "warning" | "danger" | "info" | "default"> = {
  running: "info",
  completed: "success",
  failed: "danger",
  timeout: "warning",
};

export function RunList() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/runs?limit=50");
      if (res.ok) setRuns(await res.json());
      setLoading(false);
    }
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-neutral-100 font-display">Runs</h2>
        <p className="text-xs text-neutral-600 mt-0.5">
          Execution history · auto-refreshes every 30s
        </p>
      </div>

      <div className="space-y-2">
        {runs.map((run) => (
          <Card key={run.id} hover className="!p-4">
            <div className="flex items-center gap-4">
              <StatusDot status={run.status} className="shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-200 truncate">
                    {run.agent?.name || "Unknown Agent"}
                  </span>
                  <span className="text-xs text-neutral-600">→</span>
                  <span className="text-xs text-neutral-500 truncate">
                    {run.task?.title || run.goal?.title || "Manual run"}
                  </span>
                </div>
                {run.output_summary && (
                  <p className="text-xs text-neutral-600 mt-0.5 line-clamp-1">
                    {run.output_summary}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Badge variant={statusBadge[run.status]}>{run.status}</Badge>
                {run.tokens_used > 0 && (
                  <span className="text-[10px] text-neutral-700 font-mono">
                    {run.tokens_used.toLocaleString()} tok
                  </span>
                )}
                {run.duration_seconds && (
                  <span className="text-[10px] text-neutral-700 font-mono">
                    {run.duration_seconds}s
                  </span>
                )}
                <span className="text-[10px] text-neutral-700">
                  {formatDistanceToNow(new Date(run.started_at), { addSuffix: true })}
                </span>
                {run.session_url && (
                  <a
                    href={run.session_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-accent hover:underline"
                  >
                    Session ↗
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
        {runs.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-800 py-16 text-center">
            <p className="text-sm text-neutral-600">No runs yet.</p>
            <p className="text-xs text-neutral-700 mt-1">
              Trigger an agent from the Goals page to see runs here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
