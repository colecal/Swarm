import type { AgentType } from "@/lib/supabase/types";

export interface AgentDefinition {
  type: AgentType;
  name: string;
  icon: string;
  color: string;
  description: string;
  capabilities: string[];
  defaultPriority: number;
}

export const AGENT_DEFINITIONS: Record<AgentType, AgentDefinition> = {
  researcher: {
    type: "researcher",
    name: "Atlas",
    icon: "Search",
    color: "text-blue-400",
    description: "Deep research, web search, synthesis, structured reports",
    capabilities: ["web_search", "report_generation", "data_synthesis", "citation_tracking"],
    defaultPriority: 7,
  },
  coder: {
    type: "coder",
    name: "Forge",
    icon: "Code",
    color: "text-emerald-400",
    description: "Code generation, testing, Git operations, debugging",
    capabilities: ["code_generation", "testing", "git_operations", "code_review", "debugging"],
    defaultPriority: 8,
  },
  writer: {
    type: "writer",
    name: "Quill",
    icon: "PenTool",
    color: "text-amber-400",
    description: "Content creation, documentation, summaries, copywriting",
    capabilities: ["content_creation", "editing", "summarization", "documentation", "copywriting"],
    defaultPriority: 6,
  },
  analyst: {
    type: "analyst",
    name: "Lens",
    icon: "BarChart3",
    color: "text-purple-400",
    description: "Data analysis, trends, financial research, comparisons",
    capabilities: ["data_analysis", "trend_detection", "financial_research", "benchmarking", "forecasting"],
    defaultPriority: 7,
  },
  monitor: {
    type: "monitor",
    name: "Sentinel",
    icon: "Shield",
    color: "text-cyan-400",
    description: "Daily summaries, goal tracking, health checks, alerting",
    capabilities: ["monitoring", "reporting", "health_checks", "alerting", "goal_tracking"],
    defaultPriority: 9,
  },
  market: {
    type: "market",
    name: "Ticker",
    icon: "TrendingUp",
    color: "text-rose-400",
    description: "Pokémon TCG prices, eBay research, deal detection, market trends",
    capabilities: ["price_tracking", "market_analysis", "deal_detection", "trend_analysis", "ebay_research"],
    defaultPriority: 5,
  },
};

export const AGENT_TYPE_OPTIONS = Object.values(AGENT_DEFINITIONS).map((d) => ({
  value: d.type,
  label: `${d.name} (${d.type})`,
}));
