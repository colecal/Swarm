"use client";

import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { DashboardStats, DailySummary } from "@/lib/supabase/types";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [summary, setSummary] = useState<DailySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [triggerLoading, setTriggerLoading] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const { data: statsData } = await supabase.rpc("get_dashboard_stats");
      if (statsData) setStats(statsData as DashboardStats);

      const { data: summaryData } = await supabase
        .from("daily_summaries")
        .select("*")
        .order("summary_date", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (summaryData) setSummary(summaryData as DailySummary);

      setLoading(false);
    }
    load();
  }, []);

  async function triggerAction(action: string) {
    setTriggerLoading(action);
    try {
      await fetch("/api/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
    } finally {
      setTriggerLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  const statCards = stats
    ? [
        { label: "Active Goals", value: stats.active_goals, color: "text-accent" },
        { label: "Pending Tasks", value: stats.pending_tasks, color: "text-warning" },
        { label: "Completed Today", value: stats.completed_tasks_today, color: "text-success" },
        { label: "Runs Today", value: stats.runs_today, color: "text-info" },
        { label: "Tokens Today", value: stats.tokens_today.toLocaleString(), color: "text-neutral-300" },
        { label: "Agents Active", value: `${stats.agents_active}/${stats.agents_total}`, color: "text-cyan-400" },
      ]
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-100 font-display">Dashboard</h2>
          <p className="text-xs text-neutral-600 mt-0.5">
            System overview · {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            loading={triggerLoading === "process_goals"}
            onClick={() => triggerAction("process_goals")}
          >
            Process Goals
          </Button>
          <Button
            variant="secondary"
            size="sm"
            loading={triggerLoading === "run_monitor"}
            onClick={() => triggerAction("run_monitor")}
          >
            Run Monitor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map((stat) => (
          <Card key={stat.label} className="!p-4 text-center">
            <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-neutral-600 mt-1 font-medium uppercase tracking-wider">
              {stat.label}
            </div>
          </Card>
        ))}
      </div>

      {summary && (
        <Card>
          <CardTitle>Daily Briefing — {summary.summary_date}</CardTitle>
          {summary.narrative && (
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">{summary.narrative}</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            {summary.highlights.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-success mb-2">Highlights</h4>
                <ul className="space-y-1">
                  {summary.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-neutral-500">
                      • {h.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {summary.concerns.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-warning mb-2">Concerns</h4>
                <ul className="space-y-1">
                  {summary.concerns.map((c, i) => (
                    <li key={i} className="text-xs text-neutral-500">
                      • {c.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
