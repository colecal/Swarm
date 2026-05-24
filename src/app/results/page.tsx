"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import type { Result } from "@/lib/supabase/types";
import { formatDistanceToNow } from "date-fns";

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("results")
        .select("*, agent:agents(id, name, type), goal:goals(id, title)")
        .order("created_at", { ascending: false })
        .limit(50);
      if (data) setResults(data as Result[]);
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
        <h2 className="text-xl font-bold text-neutral-100 font-display">Results</h2>
        <p className="text-xs text-neutral-600 mt-0.5">
          {results.length} artifacts from agent runs
        </p>
      </div>

      <div className="space-y-3">
        {results.map((result) => (
          <Card
            key={result.id}
            hover
            className="cursor-pointer"
            onClick={() => setExpanded(expanded === result.id ? null : result.id)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium text-neutral-200">{result.title}</h3>
                  <Badge variant="default">{result.content_type}</Badge>
                  {result.pinned && <Badge variant="accent">pinned</Badge>}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-neutral-600">
                  <span>{result.agent?.name || "—"}</span>
                  {result.goal && (
                    <>
                      <span>·</span>
                      <span>{result.goal.title}</span>
                    </>
                  )}
                  <span>·</span>
                  <span>
                    {formatDistanceToNow(new Date(result.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
            {expanded === result.id && (
              <div className="mt-4 border-t border-neutral-800/40 pt-4">
                <pre className="text-xs text-neutral-400 font-mono bg-surface-3 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap">
                  {result.content}
                </pre>
              </div>
            )}
          </Card>
        ))}
        {results.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-800 py-16 text-center">
            <p className="text-sm text-neutral-600">No results yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
