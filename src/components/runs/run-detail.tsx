"use client";

import { Card } from "@/components/ui/card";
import type { Run } from "@/lib/supabase/types";

export function RunDetail({ run }: { run: Run }) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-neutral-100 mb-3">Run Details</h3>
      <pre className="text-xs text-neutral-400 font-mono bg-surface-3 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
        {JSON.stringify(run.output || run, null, 2)}
      </pre>
    </Card>
  );
}
