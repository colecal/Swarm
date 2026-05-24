"use client";

import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Agent } from "@/lib/supabase/types";

export default function SettingsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/agents");
      if (res.ok) setAgents(await res.json());
    }
    load();
  }, []);

  async function updateAgent(id: string, updates: Partial<Agent>) {
    const res = await fetch("/api/agents", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    if (res.ok) {
      const updated = await res.json();
      setAgents((prev) => prev.map((a) => (a.id === id ? updated : a)));
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-neutral-100 font-display">Settings</h2>
        <p className="text-xs text-neutral-600 mt-0.5">
          Agent configuration and routine endpoints
        </p>
      </div>

      <Card>
        <CardTitle>Routine Endpoints</CardTitle>
        <p className="text-xs text-neutral-500 mb-4">
          After creating Claude Code Routines at{" "}
          <code className="text-accent">claude.ai/code/routines</code>, paste each routine&apos;s
          trigger URL and bearer token into your Vercel environment variables. The 6 keys
          required are listed below.
        </p>
        <div className="space-y-2">
          {[
            "ROUTINE_GOAL_PROCESSOR",
            "ROUTINE_RESEARCH_AGENT",
            "ROUTINE_CODE_AGENT",
            "ROUTINE_WRITER_AGENT",
            "ROUTINE_MONITOR_AGENT",
            "ROUTINE_MARKET_AGENT",
          ].map((key) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-500 w-52">{key}</span>
              <Badge variant="warning" dot>
                Set in env
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Agent Roster</CardTitle>
        <div className="space-y-3 mt-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center justify-between rounded-lg bg-surface-3 p-3"
            >
              <div>
                <div className="text-sm font-medium text-neutral-200">{agent.name}</div>
                <div className="text-xs text-neutral-600">{agent.type}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={agent.status === "disabled" ? "danger" : "success"} dot>
                  {agent.status}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    updateAgent(agent.id, {
                      status: agent.status === "disabled" ? "idle" : "disabled",
                    })
                  }
                >
                  {agent.status === "disabled" ? "Enable" : "Disable"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
