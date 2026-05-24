export interface RoutineConfig {
  url: string;
  token: string;
}

export interface TriggerResult {
  success: boolean;
  sessionUrl?: string | null;
  error?: string;
}

const ROUTINE_CONFIGS: Record<string, RoutineConfig> = {
  goal_processor: {
    url: process.env.ROUTINE_GOAL_PROCESSOR_URL || "",
    token: process.env.ROUTINE_GOAL_PROCESSOR_TOKEN || "",
  },
  research_agent: {
    url: process.env.ROUTINE_RESEARCH_AGENT_URL || "",
    token: process.env.ROUTINE_RESEARCH_AGENT_TOKEN || "",
  },
  code_agent: {
    url: process.env.ROUTINE_CODE_AGENT_URL || "",
    token: process.env.ROUTINE_CODE_AGENT_TOKEN || "",
  },
  writer_agent: {
    url: process.env.ROUTINE_WRITER_AGENT_URL || "",
    token: process.env.ROUTINE_WRITER_AGENT_TOKEN || "",
  },
  monitor_agent: {
    url: process.env.ROUTINE_MONITOR_AGENT_URL || "",
    token: process.env.ROUTINE_MONITOR_AGENT_TOKEN || "",
  },
  market_agent: {
    url: process.env.ROUTINE_MARKET_AGENT_URL || "",
    token: process.env.ROUTINE_MARKET_AGENT_TOKEN || "",
  },
};

const AGENT_TO_ROUTINE: Record<string, string> = {
  researcher: "research_agent",
  coder: "code_agent",
  writer: "writer_agent",
  analyst: "research_agent",
  monitor: "monitor_agent",
  market: "market_agent",
};

export function getRoutineConfig(agentType: string): RoutineConfig | null {
  const key = AGENT_TO_ROUTINE[agentType] || agentType;
  const config = ROUTINE_CONFIGS[key];
  if (!config?.url || !config?.token) return null;
  return config;
}

export async function triggerRoutine(
  routineKey: string,
  contextText: string
): Promise<TriggerResult> {
  const config = ROUTINE_CONFIGS[routineKey];
  if (!config?.url || !config?.token) {
    return {
      success: false,
      error: `Routine '${routineKey}' not configured. Set ROUTINE_${routineKey.toUpperCase()}_URL and _TOKEN in your environment.`,
    };
  }

  try {
    const response = await fetch(config.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
        "anthropic-beta": "experimental-cc-routine-2026-04-01",
      },
      body: JSON.stringify({ text: contextText }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Routine trigger failed (${response.status}): ${errorText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      sessionUrl: data.session_url || data.url || null,
    };
  } catch (err) {
    return {
      success: false,
      error: `Network error triggering routine: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

export async function triggerAgentForTask(
  agentType: string,
  contextText: string
): Promise<TriggerResult> {
  const routineKey = AGENT_TO_ROUTINE[agentType];
  if (!routineKey) {
    return { success: false, error: `Unknown agent type: ${agentType}` };
  }
  return triggerRoutine(routineKey, contextText);
}
