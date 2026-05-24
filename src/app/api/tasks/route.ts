import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createServerClient();
  const { searchParams } = new URL(req.url);
  const goalId = searchParams.get("goal_id");
  const status = searchParams.get("status");
  const agentType = searchParams.get("agent_type");

  let query = supabase
    .from("tasks")
    .select("*, goal:goals(id, title), agent:agents(id, name, type)")
    .order("priority", { ascending: false })
    .order("created_at", { ascending: true });

  if (goalId) query = query.eq("goal_id", goalId);
  if (status) query = query.eq("status", status);
  if (agentType) query = query.eq("agent_type", agentType);

  const { data, error } = await query.limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  const body = await req.json();
  const tasks = Array.isArray(body) ? body : [body];

  const { data, error } = await supabase.from("tasks").insert(tasks).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const supabase = createServerClient();
  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
