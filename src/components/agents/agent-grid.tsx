"use client";

import { useEffect, useState } from "react";
import { AgentCard } from "./agent-card";
import type { Agent } from "@/lib/supabase/types";

export function AgentGrid() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/agents");
      if (res.ok) setAgents(await res.json());
      setLoading(false);
    }
    load();
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
        <h2 className="text-xl font-bold text-neutral-100 font-display">Agents</h2>
        <p className="text-xs text-neutral-600 mt-0.5">
          {agents.filter((a) => a.status !== "disabled").length} active agents ·{" "}
          {agents.filter((a) => a.status === "running").length} currently running
        </p>
      </div>
      <div className="grid gap-4">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
