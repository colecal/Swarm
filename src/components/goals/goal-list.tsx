"use client";

import { useEffect, useState, useCallback } from "react";
import { GoalCard } from "./goal-card";
import { GoalForm } from "./goal-form";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { GoalWithStats, Goal } from "@/lib/supabase/types";

export function GoalList() {
  const [goals, setGoals] = useState<GoalWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<GoalWithStats | null>(null);

  const fetchGoals = useCallback(async () => {
    const res = await fetch("/api/goals");
    if (res.ok) {
      const data = await res.json();
      setGoals(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  async function handleCreate(data: Partial<Goal>) {
    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setFormOpen(false);
      fetchGoals();
    }
  }

  async function handleEdit(data: Partial<Goal>) {
    const res = await fetch("/api/goals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setEditing(null);
      fetchGoals();
    }
  }

  async function handleTrigger() {
    await fetch("/api/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "process_goals" }),
    });
    setTimeout(fetchGoals, 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-100 font-display">Goals</h2>
          <p className="text-xs text-neutral-600 mt-0.5">
            {goals.filter((g) => g.status === "active").length} active ·{" "}
            {goals.filter((g) => g.status === "completed").length} completed
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleTrigger}>
            Process All Goals
          </Button>
          <Button onClick={() => setFormOpen(true)}>New Goal</Button>
        </div>
      </div>

      <div className="grid gap-4">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onTrigger={handleTrigger}
            onEdit={setEditing}
          />
        ))}
        {goals.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-800 py-16 text-center">
            <p className="text-sm text-neutral-600">No goals yet.</p>
            <Button className="mt-4" onClick={() => setFormOpen(true)}>
              Create your first goal
            </Button>
          </div>
        )}
      </div>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} title="Create Goal">
        <GoalForm onSubmit={handleCreate} onCancel={() => setFormOpen(false)} />
      </Dialog>

      <Dialog open={!!editing} onClose={() => setEditing(null)} title="Edit Goal">
        {editing && (
          <GoalForm
            initialData={editing}
            onSubmit={handleEdit}
            onCancel={() => setEditing(null)}
          />
        )}
      </Dialog>
    </div>
  );
}
