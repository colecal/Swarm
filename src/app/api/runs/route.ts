import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createServerClient();
  const { searchParams } = new URL(req.url);
  const agentId = searchParams.get("agent_id");
  const status = searchParams.get("status");
  const limit = parseInt(searchParams.get("limit") || "50");

  let query = supabase
    .from("runs")
    .select("*, agent:agents(id, name, type), task:tasks(id, title), goal:goals(id, title)")
    .order("started_at", { ascending: false })
    .limit(limit);

  if (agentId) query = query.eq("agent_id", agentId);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
