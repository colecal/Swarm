# Agent Command Center — Complete Implementation Spec

> **For the implementing agent**: This document contains every file needed to build and deploy the Agent Command Center. You do NOT need web access. All dependencies, schemas, components, and configurations are included inline. Create each file at the path specified in its header. The project uses Next.js 15 (App Router), Supabase, Tailwind CSS, and deploys to Vercel.

-----

## Table of Contents

1. [Project Structure](#1-project-structure)
1. [Configuration Files](#2-configuration-files)
1. [Supabase Schema & Migrations](#3-supabase-schema--migrations)
1. [Supabase Types & Client](#4-supabase-types--client)
1. [Agent Definitions & Prompts](#5-agent-definitions--prompts)
1. [Routine Trigger Library](#6-routine-trigger-library)
1. [API Routes](#7-api-routes)
1. [UI Components](#8-ui-components)
1. [Page Components](#9-page-components)
1. [Global Styles & Layout](#10-global-styles--layout)
1. [Seed Scripts](#11-seed-scripts)
1. [Claude Code Routine Definitions](#12-claude-code-routine-definitions)
1. [Deployment Instructions](#13-deployment-instructions)

-----

## 1. Project Structure

```
agent-command-center/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── .env.local.example
├── .gitignore
├── supabase/
│   └── migrations/
│       ├── 20260524000001_initial_schema.sql
│       ├── 20260524000002_pgvector.sql
│       ├── 20260524000003_functions.sql
│       └── 20260524000004_seed_agents.sql
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── goals/
│   │   │   └── page.tsx
│   │   ├── agents/
│   │   │   └── page.tsx
│   │   ├── runs/
│   │   │   └── page.tsx
│   │   ├── results/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── api/
│   │       ├── goals/
│   │       │   └── route.ts
│   │       ├── tasks/
│   │       │   └── route.ts
│   │       ├── agents/
│   │       │   └── route.ts
│   │       ├── runs/
│   │       │   └── route.ts
│   │       ├── trigger/
│   │       │   └── route.ts
│   │       └── webhook/
│   │           └── route.ts
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── types.ts
│   │   ├── routines/
│   │   │   └── trigger.ts
│   │   └── agents/
│   │       ├── definitions.ts
│   │       └── prompts.ts
│   └── components/
│       ├── layout/
│       │   ├── sidebar.tsx
│       │   ├── header.tsx
│       │   └── shell.tsx
│       ├── goals/
│       │   ├── goal-card.tsx
│       │   ├── goal-form.tsx
│       │   └── goal-list.tsx
│       ├── agents/
│       │   ├── agent-card.tsx
│       │   └── agent-grid.tsx
│       ├── runs/
│       │   ├── run-list.tsx
│       │   └── run-detail.tsx
│       └── ui/
│           ├── badge.tsx
│           ├── button.tsx
│           ├── card.tsx
│           ├── dialog.tsx
│           ├── input.tsx
│           ├── textarea.tsx
│           └── status-dot.tsx
└── routines/
    ├── daily-goal-processor.md
    ├── research-agent.md
    ├── code-agent.md
    ├── writer-agent.md
    ├── monitor-agent.md
    └── market-agent.md
```

-----

## 2. Configuration Files

### `package.json`

```json
{
  "name": "agent-command-center",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:migrate": "supabase db push",
    "db:seed": "npx tsx scripts/seed-agents.ts",
    "db:reset": "supabase db reset"
  },
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "@supabase/supabase-js": "^2.49.0",
    "@supabase/ssr": "^0.6.0",
    "lucide-react": "^0.475.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.0.0",
    "date-fns": "^4.1.0",
    "zustand": "^5.0.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "tailwindcss": "^4.1.0",
    "@tailwindcss/postcss": "^4.1.0",
    "postcss": "^8.5.0",
    "tsx": "^4.19.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.3.0"
  }
}
```

### `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          0: "#0a0a0c",
          1: "#111114",
          2: "#18181c",
          3: "#222228",
          4: "#2c2c34",
        },
        accent: {
          DEFAULT: "#6f5af6",
          hover: "#8370ff",
          muted: "#6f5af620",
          glow: "#6f5af640",
        },
        success: { DEFAULT: "#22c55e", muted: "#22c55e20" },
        warning: { DEFAULT: "#f59e0b", muted: "#f59e0b20" },
        danger: { DEFAULT: "#ef4444", muted: "#ef444420" },
        info: { DEFAULT: "#3b82f6", muted: "#3b82f620" },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-subtle": "pulseSubtle 2s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px var(--color-accent-glow)" },
          "100%": { boxShadow: "0 0 20px var(--color-accent-glow)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### `postcss.config.mjs`

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### `.env.local.example`

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Claude Code Routine Endpoints (set after creating routines)
# Each routine gets a unique trigger URL and bearer token from Anthropic
ROUTINE_GOAL_PROCESSOR_URL=https://api.anthropic.com/v1/claude_code/routines/trig_XXXXX/fire
ROUTINE_GOAL_PROCESSOR_TOKEN=sk-ant-oat01-XXXXX

ROUTINE_RESEARCH_AGENT_URL=https://api.anthropic.com/v1/claude_code/routines/trig_XXXXX/fire
ROUTINE_RESEARCH_AGENT_TOKEN=sk-ant-oat01-XXXXX

ROUTINE_CODE_AGENT_URL=https://api.anthropic.com/v1/claude_code/routines/trig_XXXXX/fire
ROUTINE_CODE_AGENT_TOKEN=sk-ant-oat01-XXXXX

ROUTINE_WRITER_AGENT_URL=https://api.anthropic.com/v1/claude_code/routines/trig_XXXXX/fire
ROUTINE_WRITER_AGENT_TOKEN=sk-ant-oat01-XXXXX

ROUTINE_MONITOR_AGENT_URL=https://api.anthropic.com/v1/claude_code/routines/trig_XXXXX/fire
ROUTINE_MONITOR_AGENT_TOKEN=sk-ant-oat01-XXXXX

ROUTINE_MARKET_AGENT_URL=https://api.anthropic.com/v1/claude_code/routines/trig_XXXXX/fire
ROUTINE_MARKET_AGENT_TOKEN=sk-ant-oat01-XXXXX

# Webhook secret for Supabase → Vercel callbacks
WEBHOOK_SECRET=generate-a-random-secret-here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### `.gitignore`

```
node_modules/
.next/
.env.local
.env*.local
*.tsbuildinfo
next-env.d.ts
```

-----

## 3. Supabase Schema & Migrations

### `supabase/migrations/20260524000001_initial_schema.sql`

```sql
-- ============================================================
-- Agent Command Center — Core Schema
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- ============================================================
-- GOALS: Top-level objectives the user defines
-- ============================================================
CREATE TABLE public.goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  success_criteria JSONB DEFAULT '[]'::jsonb,
  -- Array of { criterion: string, met: boolean }
  priority INTEGER NOT NULL DEFAULT 5 CHECK (priority BETWEEN 1 AND 10),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'paused', 'completed', 'failed', 'archived')),
  deadline TIMESTAMPTZ,
  tags TEXT[] DEFAULT '{}',
  progress REAL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_goals_status ON public.goals (status);
CREATE INDEX idx_goals_priority ON public.goals (priority DESC);

-- ============================================================
-- AGENTS: Definitions for each specialized agent
-- ============================================================
CREATE TABLE public.agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  -- researcher, coder, writer, analyst, monitor, market
  description TEXT,
  system_prompt TEXT NOT NULL,
  capabilities JSONB DEFAULT '[]'::jsonb,
  -- Array of capability strings
  routine_url TEXT,
  -- The HTTP trigger URL for this agent's Claude Code Routine
  routine_token TEXT,
  -- Bearer token for triggering the routine
  status TEXT NOT NULL DEFAULT 'idle'
    CHECK (status IN ('idle', 'running', 'error', 'disabled')),
  last_run_at TIMESTAMPTZ,
  total_runs INTEGER NOT NULL DEFAULT 0,
  total_tokens_used INTEGER NOT NULL DEFAULT 0,
  success_rate REAL DEFAULT 100.0,
  config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_agents_type ON public.agents (type);
CREATE INDEX idx_agents_status ON public.agents (status);

-- ============================================================
-- TASKS: Decomposed work units derived from goals
-- ============================================================
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  prompt TEXT,
  -- The actual prompt sent to the Claude routine
  agent_type TEXT NOT NULL,
  -- Which type of agent should handle this
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'queued', 'running', 'completed', 'failed', 'cancelled')),
  priority INTEGER NOT NULL DEFAULT 5 CHECK (priority BETWEEN 1 AND 10),
  dependencies UUID[] DEFAULT '{}',
  -- Task IDs that must complete first
  result JSONB,
  -- Structured result from agent execution
  result_summary TEXT,
  -- Human-readable summary
  tokens_used INTEGER DEFAULT 0,
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  error_message TEXT,
  scheduled_for TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_tasks_goal ON public.tasks (goal_id);
CREATE INDEX idx_tasks_status ON public.tasks (status);
CREATE INDEX idx_tasks_priority ON public.tasks (priority DESC);
CREATE INDEX idx_tasks_agent_type ON public.tasks (agent_type);
CREATE INDEX idx_tasks_scheduled ON public.tasks (scheduled_for)
  WHERE status = 'pending';

-- ============================================================
-- RUNS: Execution log for each routine invocation
-- ============================================================
CREATE TABLE public.runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  goal_id UUID REFERENCES public.goals(id) ON DELETE SET NULL,
  trigger_type TEXT NOT NULL DEFAULT 'manual'
    CHECK (trigger_type IN ('scheduled', 'api', 'webhook', 'manual')),
  status TEXT NOT NULL DEFAULT 'running'
    CHECK (status IN ('running', 'completed', 'failed', 'timeout')),
  input_context JSONB,
  -- What was sent to the routine
  output JSONB,
  -- What came back
  output_summary TEXT,
  tokens_used INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  session_url TEXT,
  -- Claude Code session URL for audit trail
  error_message TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_runs_agent ON public.runs (agent_id);
CREATE INDEX idx_runs_task ON public.runs (task_id);
CREATE INDEX idx_runs_status ON public.runs (status);
CREATE INDEX idx_runs_started ON public.runs (started_at DESC);

-- ============================================================
-- RESULTS: Persistent output artifacts from agent runs
-- ============================================================
CREATE TABLE public.results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_id UUID NOT NULL REFERENCES public.runs(id) ON DELETE CASCADE,
  goal_id UUID REFERENCES public.goals(id) ON DELETE SET NULL,
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text'
    CHECK (content_type IN ('text', 'markdown', 'json', 'code', 'report', 'url')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_results_goal ON public.results (goal_id);
CREATE INDEX idx_results_run ON public.results (run_id);
CREATE INDEX idx_results_pinned ON public.results (pinned) WHERE pinned = true;
CREATE INDEX idx_results_created ON public.results (created_at DESC);

-- ============================================================
-- DAILY_SUMMARIES: Nightly monitor agent output
-- ============================================================
CREATE TABLE public.daily_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  summary_date DATE NOT NULL UNIQUE,
  tasks_completed INTEGER DEFAULT 0,
  tasks_failed INTEGER DEFAULT 0,
  goals_progressed INTEGER DEFAULT 0,
  goals_completed INTEGER DEFAULT 0,
  total_runs INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  highlights JSONB DEFAULT '[]'::jsonb,
  concerns JSONB DEFAULT '[]'::jsonb,
  narrative TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- CONFIG: Key-value store for app settings
-- ============================================================
CREATE TABLE public.app_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- AUTO-UPDATE timestamps trigger
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER goals_updated_at
  BEFORE UPDATE ON public.goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER agents_updated_at
  BEFORE UPDATE ON public.agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- AUTO-COMPUTE goal progress from tasks
-- ============================================================
CREATE OR REPLACE FUNCTION compute_goal_progress()
RETURNS TRIGGER AS $$
DECLARE
  total_tasks INTEGER;
  done_tasks INTEGER;
BEGIN
  SELECT COUNT(*), COUNT(*) FILTER (WHERE status = 'completed')
  INTO total_tasks, done_tasks
  FROM public.tasks
  WHERE goal_id = COALESCE(NEW.goal_id, OLD.goal_id);

  IF total_tasks > 0 THEN
    UPDATE public.goals
    SET progress = (done_tasks::REAL / total_tasks::REAL) * 100
    WHERE id = COALESCE(NEW.goal_id, OLD.goal_id);
  END IF;

  -- Auto-complete goal if all tasks done
  IF total_tasks > 0 AND done_tasks = total_tasks THEN
    UPDATE public.goals
    SET status = 'completed'
    WHERE id = COALESCE(NEW.goal_id, OLD.goal_id)
      AND status = 'active';
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tasks_progress_update
  AFTER INSERT OR UPDATE OF status OR DELETE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION compute_goal_progress();

-- ============================================================
-- AUTO-UPDATE agent stats after runs
-- ============================================================
CREATE OR REPLACE FUNCTION update_agent_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IN ('completed', 'failed') AND
     (OLD IS NULL OR OLD.status = 'running') THEN
    UPDATE public.agents SET
      total_runs = total_runs + 1,
      total_tokens_used = total_tokens_used + COALESCE(NEW.tokens_used, 0),
      last_run_at = NEW.completed_at,
      status = 'idle',
      success_rate = (
        SELECT (COUNT(*) FILTER (WHERE status = 'completed')::REAL /
                GREATEST(COUNT(*)::REAL, 1)) * 100
        FROM public.runs
        WHERE agent_id = NEW.agent_id
          AND status IN ('completed', 'failed')
      )
    WHERE id = NEW.agent_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER runs_agent_stats
  AFTER UPDATE ON public.runs
  FOR EACH ROW EXECUTE FUNCTION update_agent_stats();

-- ============================================================
-- RLS Policies (simple — single-user app, service role bypass)
-- ============================================================
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- Allow anon read for dashboard (you can tighten later with auth)
CREATE POLICY "Allow all for anon" ON public.goals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.agents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.runs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.daily_summaries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.app_config FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- REALTIME: Enable for live dashboard updates
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.goals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agents;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.runs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.results;
```

### `supabase/migrations/20260524000002_pgvector.sql`

```sql
-- ============================================================
-- Agent Memory with pgvector for semantic search
-- ============================================================

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE public.agent_memory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  goal_id UUID REFERENCES public.goals(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  memory_type TEXT NOT NULL DEFAULT 'observation'
    CHECK (memory_type IN ('observation', 'learning', 'fact', 'preference', 'error')),
  importance REAL DEFAULT 0.5 CHECK (importance BETWEEN 0 AND 1),
  metadata JSONB DEFAULT '{}'::jsonb,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_memory_agent ON public.agent_memory (agent_id);
CREATE INDEX idx_memory_type ON public.agent_memory (memory_type);
CREATE INDEX idx_memory_importance ON public.agent_memory (importance DESC);

-- HNSW index for fast similarity search
CREATE INDEX idx_memory_embedding ON public.agent_memory
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- Similarity search function
CREATE OR REPLACE FUNCTION search_agent_memory(
  p_agent_id UUID,
  p_query_embedding VECTOR(1536),
  p_limit INTEGER DEFAULT 10,
  p_min_similarity REAL DEFAULT 0.7
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  memory_type TEXT,
  importance REAL,
  similarity REAL,
  metadata JSONB,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    am.id,
    am.content,
    am.memory_type,
    am.importance,
    1 - (am.embedding <=> p_query_embedding) AS similarity,
    am.metadata,
    am.created_at
  FROM public.agent_memory am
  WHERE am.agent_id = p_agent_id
    AND am.embedding IS NOT NULL
    AND (am.expires_at IS NULL OR am.expires_at > now())
    AND 1 - (am.embedding <=> p_query_embedding) >= p_min_similarity
  ORDER BY am.embedding <=> p_query_embedding
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE public.agent_memory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for anon" ON public.agent_memory
  FOR ALL USING (true) WITH CHECK (true);
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_memory;
```

### `supabase/migrations/20260524000003_functions.sql`

```sql
-- ============================================================
-- Helper functions for the routine agents
-- ============================================================

-- Get next pending tasks for a given agent type
CREATE OR REPLACE FUNCTION get_pending_tasks(
  p_agent_type TEXT,
  p_limit INTEGER DEFAULT 5
)
RETURNS SETOF public.tasks AS $$
BEGIN
  RETURN QUERY
  SELECT t.*
  FROM public.tasks t
  WHERE t.agent_type = p_agent_type
    AND t.status = 'pending'
    AND (t.scheduled_for IS NULL OR t.scheduled_for <= now())
    AND NOT EXISTS (
      -- Check all dependencies are completed
      SELECT 1
      FROM unnest(t.dependencies) AS dep_id
      JOIN public.tasks dep ON dep.id = dep_id
      WHERE dep.status != 'completed'
    )
  ORDER BY t.priority DESC, t.created_at ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Get active goals with their task breakdown stats
CREATE OR REPLACE FUNCTION get_goals_with_stats()
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  status TEXT,
  priority INTEGER,
  progress REAL,
  deadline TIMESTAMPTZ,
  tags TEXT[],
  total_tasks BIGINT,
  pending_tasks BIGINT,
  running_tasks BIGINT,
  completed_tasks BIGINT,
  failed_tasks BIGINT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    g.id,
    g.title,
    g.description,
    g.status,
    g.priority,
    g.progress,
    g.deadline,
    g.tags,
    COUNT(t.id) AS total_tasks,
    COUNT(t.id) FILTER (WHERE t.status = 'pending') AS pending_tasks,
    COUNT(t.id) FILTER (WHERE t.status = 'running') AS running_tasks,
    COUNT(t.id) FILTER (WHERE t.status = 'completed') AS completed_tasks,
    COUNT(t.id) FILTER (WHERE t.status = 'failed') AS failed_tasks,
    g.created_at,
    g.updated_at
  FROM public.goals g
  LEFT JOIN public.tasks t ON t.goal_id = g.id
  GROUP BY g.id
  ORDER BY
    CASE g.status WHEN 'active' THEN 0 WHEN 'paused' THEN 1 ELSE 2 END,
    g.priority DESC,
    g.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Dashboard stats
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'active_goals', (SELECT COUNT(*) FROM public.goals WHERE status = 'active'),
    'completed_goals', (SELECT COUNT(*) FROM public.goals WHERE status = 'completed'),
    'pending_tasks', (SELECT COUNT(*) FROM public.tasks WHERE status = 'pending'),
    'running_tasks', (SELECT COUNT(*) FROM public.tasks WHERE status = 'running'),
    'completed_tasks_today', (
      SELECT COUNT(*) FROM public.tasks
      WHERE status = 'completed'
        AND completed_at >= CURRENT_DATE
    ),
    'runs_today', (
      SELECT COUNT(*) FROM public.runs
      WHERE started_at >= CURRENT_DATE
    ),
    'tokens_today', (
      SELECT COALESCE(SUM(tokens_used), 0) FROM public.runs
      WHERE started_at >= CURRENT_DATE
    ),
    'agents_active', (SELECT COUNT(*) FROM public.agents WHERE status = 'running'),
    'agents_total', (SELECT COUNT(*) FROM public.agents WHERE status != 'disabled')
  ) INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql;
```

### `supabase/migrations/20260524000004_seed_agents.sql`

```sql
-- ============================================================
-- Seed default agent roster
-- ============================================================

INSERT INTO public.agents (name, type, description, system_prompt, capabilities) VALUES

('Atlas', 'researcher', 'Deep research agent — web search, synthesis, structured reports',
$$You are Atlas, a research agent in the Agent Command Center.

Your job:
1. Read your assigned task from the context provided.
2. Search the web thoroughly for relevant, authoritative sources.
3. Synthesize findings into a structured report with citations.
4. Store your report back to Supabase.

When connecting to Supabase, use the service role key from your environment.
Always cite your sources. Prefer primary sources over aggregators.
Structure reports with: Executive Summary, Key Findings, Details, Sources.

Supabase connection details will be in your environment variables:
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY$$,
'["web_search", "report_generation", "data_synthesis", "citation_tracking"]'::jsonb),

('Forge', 'coder', 'Code generation agent — writes, tests, and commits code',
$$You are Forge, a coding agent in the Agent Command Center.

Your job:
1. Read your assigned task from the context provided.
2. Write clean, well-tested code that solves the task.
3. If a GitHub repo is connected, commit and push changes.
4. Store code artifacts and test results back to Supabase.

Follow best practices: clear naming, error handling, tests, documentation.
If the task involves an existing codebase, read and understand it first.
Write tests for any non-trivial logic.

Supabase connection details will be in your environment variables.$$,
'["code_generation", "testing", "git_operations", "code_review", "debugging"]'::jsonb),

('Quill', 'writer', 'Content creation agent — articles, docs, summaries, communications',
$$You are Quill, a writing agent in the Agent Command Center.

Your job:
1. Read your assigned task from the context provided.
2. Create high-quality written content matching the requested format.
3. Adapt tone and style to the content type (technical docs, blog posts, emails, reports).
4. Store your output back to Supabase.

Write clearly and concisely. No filler. Every sentence should earn its place.
Match the voice to the audience. Technical docs are precise. Blog posts are engaging.
Reports are structured. Emails are direct.

Supabase connection details will be in your environment variables.$$,
'["content_creation", "editing", "summarization", "documentation", "copywriting"]'::jsonb),

('Lens', 'analyst', 'Data analysis agent — trends, patterns, financial research, comparisons',
$$You are Lens, an analysis agent in the Agent Command Center.

Your job:
1. Read your assigned task from the context provided.
2. Gather and analyze relevant data (financial, market, performance, etc.).
3. Identify patterns, trends, anomalies, and actionable insights.
4. Present findings in a structured format with visualizations where helpful.

Be quantitative when possible. Support claims with data.
Distinguish between correlation and causation.
Flag uncertainties and confidence levels.

Supabase connection details will be in your environment variables.$$,
'["data_analysis", "trend_detection", "financial_research", "benchmarking", "forecasting"]'::jsonb),

('Sentinel', 'monitor', 'Monitoring agent — daily summaries, goal tracking, health checks',
$$You are Sentinel, the monitoring agent in the Agent Command Center.

Your job:
1. Connect to Supabase and review all activity from today.
2. Count: tasks completed, tasks failed, goals progressed, runs executed, tokens consumed.
3. Identify highlights (big wins) and concerns (failures, stalls, blocked tasks).
4. Generate a narrative daily summary.
5. Write the summary to the daily_summaries table.
6. If any goals have all tasks completed, mark them as completed.
7. If any tasks have failed 3+ times, flag them in concerns.

Be concise but complete. This summary is the owner's daily briefing.

Supabase connection details will be in your environment variables.$$,
'["monitoring", "reporting", "health_checks", "alerting", "goal_tracking"]'::jsonb),

('Ticker', 'market', 'Market intelligence agent — Pokémon TCG prices, deals, trends',
$$You are Ticker, a market intelligence agent in the Agent Command Center.

Your job:
1. Read your assigned task from the context provided.
2. Research current market data: Pokémon TCG card prices, eBay completed sales,
   PSA population reports, sealed product trends, upcoming releases.
3. Track price movements, identify deals, and flag arbitrage opportunities.
4. Store structured market data back to Supabase.

Use PriceCharting, eBay completed/sold listings, TCGPlayer, and PSA cert verification
as primary data sources. Always note the date of price data.
Flag cards where PSA 10 population is low relative to demand.

Supabase connection details will be in your environment variables.$$,
'["price_tracking", "market_analysis", "deal_detection", "trend_analysis", "ebay_research"]'::jsonb);

-- Seed initial config
INSERT INTO public.app_config (key, value) VALUES
('routine_budget', '{"daily_max_runs": 15, "runs_used_today": 0}'::jsonb),
('notification_settings', '{"email": null, "slack_webhook": null, "enabled": false}'::jsonb),
('agent_defaults', '{"max_retries": 3, "timeout_seconds": 300}'::jsonb);
```

-----

## 4. Supabase Types & Client

### `src/lib/supabase/types.ts`

```typescript
// ============================================================
// Database types — matches the SQL schema exactly
// ============================================================

export type GoalStatus = "active" | "paused" | "completed" | "failed" | "archived";
export type TaskStatus = "pending" | "queued" | "running" | "completed" | "failed" | "cancelled";
export type AgentStatus = "idle" | "running" | "error" | "disabled";
export type AgentType = "researcher" | "coder" | "writer" | "analyst" | "monitor" | "market";
export type RunStatus = "running" | "completed" | "failed" | "timeout";
export type TriggerType = "scheduled" | "api" | "webhook" | "manual";
export type ContentType = "text" | "markdown" | "json" | "code" | "report" | "url";
export type MemoryType = "observation" | "learning" | "fact" | "preference" | "error";

export interface Goal {
  id: string;
  title: string;
  description: string | null;
  success_criteria: { criterion: string; met: boolean }[];
  priority: number;
  status: GoalStatus;
  deadline: string | null;
  tags: string[];
  progress: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface GoalWithStats extends Goal {
  total_tasks: number;
  pending_tasks: number;
  running_tasks: number;
  completed_tasks: number;
  failed_tasks: number;
}

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  description: string | null;
  system_prompt: string;
  capabilities: string[];
  routine_url: string | null;
  routine_token: string | null;
  status: AgentStatus;
  last_run_at: string | null;
  total_runs: number;
  total_tokens_used: number;
  success_rate: number;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  goal_id: string;
  agent_id: string | null;
  title: string;
  description: string | null;
  prompt: string | null;
  agent_type: AgentType;
  status: TaskStatus;
  priority: number;
  dependencies: string[];
  result: Record<string, unknown> | null;
  result_summary: string | null;
  tokens_used: number;
  retry_count: number;
  max_retries: number;
  error_message: string | null;
  scheduled_for: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

export interface Run {
  id: string;
  agent_id: string;
  task_id: string | null;
  goal_id: string | null;
  trigger_type: TriggerType;
  status: RunStatus;
  input_context: Record<string, unknown> | null;
  output: Record<string, unknown> | null;
  output_summary: string | null;
  tokens_used: number;
  duration_seconds: number | null;
  session_url: string | null;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
  // Joined fields
  agent?: Agent;
  task?: Task;
  goal?: Goal;
}

export interface Result {
  id: string;
  run_id: string;
  goal_id: string | null;
  task_id: string | null;
  agent_id: string | null;
  title: string;
  content_type: ContentType;
  content: string;
  metadata: Record<string, unknown>;
  pinned: boolean;
  created_at: string;
  // Joined
  agent?: Agent;
  goal?: Goal;
}

export interface DailySummary {
  id: string;
  summary_date: string;
  tasks_completed: number;
  tasks_failed: number;
  goals_progressed: number;
  goals_completed: number;
  total_runs: number;
  total_tokens: number;
  highlights: { text: string }[];
  concerns: { text: string }[];
  narrative: string | null;
  created_at: string;
}

export interface DashboardStats {
  active_goals: number;
  completed_goals: number;
  pending_tasks: number;
  running_tasks: number;
  completed_tasks_today: number;
  runs_today: number;
  tokens_today: number;
  agents_active: number;
  agents_total: number;
}
```

### `src/lib/supabase/client.ts`

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### `src/lib/supabase/server.ts`

```typescript
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Server-side client with service role for API routes
export function createServerClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false },
    }
  );
}
```

-----

## 5. Agent Definitions & Prompts

### `src/lib/agents/definitions.ts`

```typescript
import type { AgentType } from "@/lib/supabase/types";

export interface AgentDefinition {
  type: AgentType;
  name: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
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
    capabilities: [
      "web_search",
      "report_generation",
      "data_synthesis",
      "citation_tracking",
    ],
    defaultPriority: 7,
  },
  coder: {
    type: "coder",
    name: "Forge",
    icon: "Code",
    color: "text-emerald-400",
    description: "Code generation, testing, Git operations, debugging",
    capabilities: [
      "code_generation",
      "testing",
      "git_operations",
      "code_review",
      "debugging",
    ],
    defaultPriority: 8,
  },
  writer: {
    type: "writer",
    name: "Quill",
    icon: "PenTool",
    color: "text-amber-400",
    description: "Content creation, documentation, summaries, copywriting",
    capabilities: [
      "content_creation",
      "editing",
      "summarization",
      "documentation",
      "copywriting",
    ],
    defaultPriority: 6,
  },
  analyst: {
    type: "analyst",
    name: "Lens",
    icon: "BarChart3",
    color: "text-purple-400",
    description: "Data analysis, trends, financial research, comparisons",
    capabilities: [
      "data_analysis",
      "trend_detection",
      "financial_research",
      "benchmarking",
      "forecasting",
    ],
    defaultPriority: 7,
  },
  monitor: {
    type: "monitor",
    name: "Sentinel",
    icon: "Shield",
    color: "text-cyan-400",
    description: "Daily summaries, goal tracking, health checks, alerting",
    capabilities: [
      "monitoring",
      "reporting",
      "health_checks",
      "alerting",
      "goal_tracking",
    ],
    defaultPriority: 9,
  },
  market: {
    type: "market",
    name: "Ticker",
    icon: "TrendingUp",
    color: "text-rose-400",
    description: "Pokémon TCG prices, eBay research, deal detection, market trends",
    capabilities: [
      "price_tracking",
      "market_analysis",
      "deal_detection",
      "trend_analysis",
      "ebay_research",
    ],
    defaultPriority: 5,
  },
};

export const AGENT_TYPE_OPTIONS = Object.values(AGENT_DEFINITIONS).map((d) => ({
  value: d.type,
  label: `${d.name} (${d.type})`,
}));
```

### `src/lib/agents/prompts.ts`

```typescript
// ============================================================
// Prompt templates for triggering Claude Code Routines
// These are appended as context when POSTing to routine endpoints
// ============================================================

export function buildTaskContext(params: {
  taskId: string;
  taskTitle: string;
  taskDescription: string | null;
  taskPrompt: string | null;
  goalTitle: string;
  goalDescription: string | null;
  supabaseUrl: string;
  supabaseKey: string;
}): string {
  return `
== TASK ASSIGNMENT ==
Task ID: ${params.taskId}
Task: ${params.taskTitle}
${params.taskDescription ? `Description: ${params.taskDescription}` : ""}
${params.taskPrompt ? `\nSpecific Instructions:\n${params.taskPrompt}` : ""}

Parent Goal: ${params.goalTitle}
${params.goalDescription ? `Goal Context: ${params.goalDescription}` : ""}

== SUPABASE CONNECTION ==
URL: ${params.supabaseUrl}
Service Role Key: ${params.supabaseKey}

== INSTRUCTIONS ==
1. Connect to Supabase using the credentials above.
2. Update the task status to 'running':
   UPDATE tasks SET status = 'running', started_at = now() WHERE id = '${params.taskId}';
3. Execute the task according to your specialization.
4. When complete, update the task:
   UPDATE tasks SET
     status = 'completed',
     completed_at = now(),
     result = '<your structured result as JSON>',
     result_summary = '<one-paragraph summary>'
   WHERE id = '${params.taskId}';
5. Insert a result record:
   INSERT INTO results (run_id, goal_id, task_id, agent_id, title, content_type, content)
   VALUES (...);
6. If you fail, update status to 'failed' with error_message.
`.trim();
}

export function buildGoalDecompositionContext(params: {
  goals: { id: string; title: string; description: string | null }[];
  supabaseUrl: string;
  supabaseKey: string;
}): string {
  const goalList = params.goals
    .map(
      (g) =>
        `- [${g.id}] ${g.title}${g.description ? `: ${g.description}` : ""}`
    )
    .join("\n");

  return `
== DAILY GOAL PROCESSING ==

The following active goals need task decomposition and execution:

${goalList}

== SUPABASE CONNECTION ==
URL: ${params.supabaseUrl}
Service Role Key: ${params.supabaseKey}

== INSTRUCTIONS ==
For each goal above:
1. Check if it already has tasks: SELECT * FROM tasks WHERE goal_id = '<goal_id>';
2. If no tasks exist, decompose the goal into 3-7 concrete tasks.
   Each task needs:
   - title: Clear, actionable task name
   - description: What specifically needs to be done
   - prompt: Detailed instructions for the assigned agent
   - agent_type: One of 'researcher', 'coder', 'writer', 'analyst', 'monitor', 'market'
   - priority: 1-10 (higher = more important)
   - dependencies: Array of task IDs that must complete first (use '{}' for none)
3. INSERT the tasks into Supabase.
4. If tasks already exist, check for any 'pending' tasks with met dependencies.
   Pick the highest-priority one and execute it according to the agent_type.
5. After executing, update the task status and write results.

Think step-by-step. Quality of decomposition matters more than speed.
`.trim();
}

export function buildMonitorContext(params: {
  supabaseUrl: string;
  supabaseKey: string;
  date: string;
}): string {
  return `
== NIGHTLY MONITORING REPORT ==
Date: ${params.date}

== SUPABASE CONNECTION ==
URL: ${params.supabaseUrl}
Service Role Key: ${params.supabaseKey}

== INSTRUCTIONS ==
1. Connect to Supabase.
2. Query today's activity:
   - Tasks completed today: SELECT COUNT(*) FROM tasks WHERE completed_at >= '${params.date}' AND status = 'completed';
   - Tasks failed today: SELECT COUNT(*) FROM tasks WHERE completed_at >= '${params.date}' AND status = 'failed';
   - Runs today: SELECT COUNT(*) FROM runs WHERE started_at >= '${params.date}';
   - Tokens today: SELECT SUM(tokens_used) FROM runs WHERE started_at >= '${params.date}';
   - Goals with progress changes: Check goals table for updated_at >= '${params.date}'
   - Goals newly completed: SELECT * FROM goals WHERE status = 'completed' AND updated_at >= '${params.date}';
3. Identify highlights (completions, breakthroughs, high-value results).
4. Identify concerns (repeated failures, stalled goals, blocked tasks).
5. Write a narrative summary (2-3 paragraphs).
6. INSERT into daily_summaries:
   INSERT INTO daily_summaries (
     summary_date, tasks_completed, tasks_failed, goals_progressed,
     goals_completed, total_runs, total_tokens, highlights, concerns, narrative
   ) VALUES (...);
7. Check for tasks with retry_count >= max_retries and flag them.
8. Check for goals past their deadline and flag them.
`.trim();
}
```

-----

## 6. Routine Trigger Library

### `src/lib/routines/trigger.ts`

```typescript
// ============================================================
// Claude Code Routine HTTP trigger client
// ============================================================

export interface RoutineConfig {
  url: string;
  token: string;
}

export interface TriggerResult {
  success: boolean;
  sessionUrl?: string;
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

export function getRoutineConfig(agentType: string): RoutineConfig | null {
  const mapping: Record<string, string> = {
    researcher: "research_agent",
    coder: "code_agent",
    writer: "writer_agent",
    analyst: "research_agent", // Analyst shares the research routine
    monitor: "monitor_agent",
    market: "market_agent",
  };
  const key = mapping[agentType] || agentType;
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
      error: `Routine '${routineKey}' not configured. Set ROUTINE_${routineKey.toUpperCase()}_URL and _TOKEN in .env.local`,
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
  const mapping: Record<string, string> = {
    researcher: "research_agent",
    coder: "code_agent",
    writer: "writer_agent",
    analyst: "research_agent",
    monitor: "monitor_agent",
    market: "market_agent",
  };
  const routineKey = mapping[agentType];
  if (!routineKey) {
    return { success: false, error: `Unknown agent type: ${agentType}` };
  }
  return triggerRoutine(routineKey, contextText);
}
```

-----

## 7. API Routes

### `src/app/api/goals/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase.rpc("get_goals_with_stats");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from("goals")
    .insert({
      title: body.title,
      description: body.description || null,
      priority: body.priority || 5,
      deadline: body.deadline || null,
      tags: body.tags || [],
      success_criteria: body.success_criteria || [],
    })
    .select()
    .single();

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
    .from("goals")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const supabase = createServerClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const { error } = await supabase.from("goals").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
```

### `src/app/api/tasks/route.ts`

```typescript
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

  // Support both single task and array of tasks
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
```

### `src/app/api/agents/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .order("name");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const supabase = createServerClient();
  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("agents")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
```

### `src/app/api/runs/route.ts`

```typescript
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
    .select(
      "*, agent:agents(id, name, type), task:tasks(id, title), goal:goals(id, title)"
    )
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
```

### `src/app/api/trigger/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { triggerAgentForTask, triggerRoutine } from "@/lib/routines/trigger";
import { buildTaskContext, buildGoalDecompositionContext, buildMonitorContext } from "@/lib/agents/prompts";

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  const body = await req.json();

  // Two trigger modes:
  // 1. { action: "run_task", task_id: "..." } — Execute a specific task
  // 2. { action: "process_goals" } — Trigger the daily goal processor
  // 3. { action: "run_monitor" } — Trigger the nightly monitor
  // 4. { action: "run_agent", agent_type: "...", context: "..." } — Free-form agent trigger

  const action = body.action;

  if (action === "run_task") {
    const taskId = body.task_id;
    if (!taskId) {
      return NextResponse.json({ error: "task_id required" }, { status: 400 });
    }

    // Fetch task and parent goal
    const { data: task, error: taskErr } = await supabase
      .from("tasks")
      .select("*, goal:goals(*)")
      .eq("id", taskId)
      .single();

    if (taskErr || !task) {
      return NextResponse.json(
        { error: taskErr?.message || "Task not found" },
        { status: 404 }
      );
    }

    // Find the agent for this task type
    const { data: agent } = await supabase
      .from("agents")
      .select("*")
      .eq("type", task.agent_type)
      .single();

    if (!agent) {
      return NextResponse.json(
        { error: `No agent found for type: ${task.agent_type}` },
        { status: 404 }
      );
    }

    // Create a run record
    const { data: run } = await supabase
      .from("runs")
      .insert({
        agent_id: agent.id,
        task_id: task.id,
        goal_id: task.goal_id,
        trigger_type: "api",
        status: "running",
        input_context: { task_id: taskId, action: "run_task" },
      })
      .select()
      .single();

    // Mark agent as running
    await supabase
      .from("agents")
      .update({ status: "running" })
      .eq("id", agent.id);

    // Build context and trigger the routine
    const context = buildTaskContext({
      taskId: task.id,
      taskTitle: task.title,
      taskDescription: task.description,
      taskPrompt: task.prompt,
      goalTitle: (task as any).goal?.title || "Unknown Goal",
      goalDescription: (task as any).goal?.description || null,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    });

    const result = await triggerAgentForTask(task.agent_type, context);

    // Update run with session URL
    if (run) {
      await supabase
        .from("runs")
        .update({
          session_url: result.sessionUrl || null,
          ...(result.success
            ? {}
            : {
                status: "failed",
                error_message: result.error,
                completed_at: new Date().toISOString(),
              }),
        })
        .eq("id", run.id);
    }

    return NextResponse.json({
      success: result.success,
      run_id: run?.id,
      session_url: result.sessionUrl,
      error: result.error,
    });
  }

  if (action === "process_goals") {
    // Fetch all active goals
    const { data: goals } = await supabase
      .from("goals")
      .select("id, title, description")
      .eq("status", "active");

    if (!goals?.length) {
      return NextResponse.json({ message: "No active goals" });
    }

    const context = buildGoalDecompositionContext({
      goals,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    });

    const result = await triggerRoutine("goal_processor", context);

    return NextResponse.json({
      success: result.success,
      goals_count: goals.length,
      session_url: result.sessionUrl,
      error: result.error,
    });
  }

  if (action === "run_monitor") {
    const today = new Date().toISOString().split("T")[0];
    const context = buildMonitorContext({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      date: today,
    });

    const result = await triggerRoutine("monitor_agent", context);

    return NextResponse.json({
      success: result.success,
      session_url: result.sessionUrl,
      error: result.error,
    });
  }

  if (action === "run_agent") {
    const { agent_type, context: userContext } = body;
    if (!agent_type || !userContext) {
      return NextResponse.json(
        { error: "agent_type and context required" },
        { status: 400 }
      );
    }

    const result = await triggerAgentForTask(agent_type, userContext);
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
```

### `src/app/api/webhook/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

// Webhook endpoint for Claude Code Routines to report results back
// Routines POST here when they finish executing a task
export async function POST(req: NextRequest) {
  const supabase = createServerClient();

  // Verify webhook secret
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Expected payload from routine:
  // {
  //   run_id: string,
  //   task_id: string,
  //   status: "completed" | "failed",
  //   result: { ... },
  //   result_summary: string,
  //   tokens_used: number,
  //   error_message?: string,
  //   artifacts?: [{ title, content_type, content }]
  // }

  const {
    run_id,
    task_id,
    status,
    result,
    result_summary,
    tokens_used,
    error_message,
    artifacts,
  } = body;

  // Update the task
  if (task_id) {
    await supabase
      .from("tasks")
      .update({
        status: status || "completed",
        result: result || null,
        result_summary: result_summary || null,
        tokens_used: tokens_used || 0,
        error_message: error_message || null,
        completed_at: new Date().toISOString(),
      })
      .eq("id", task_id);
  }

  // Update the run
  if (run_id) {
    await supabase
      .from("runs")
      .update({
        status: status || "completed",
        output: result || null,
        output_summary: result_summary || null,
        tokens_used: tokens_used || 0,
        error_message: error_message || null,
        completed_at: new Date().toISOString(),
        duration_seconds: body.duration_seconds || null,
      })
      .eq("id", run_id);
  }

  // Store any artifacts as results
  if (artifacts?.length && run_id) {
    const { data: run } = await supabase
      .from("runs")
      .select("goal_id, task_id, agent_id")
      .eq("id", run_id)
      .single();

    if (run) {
      await supabase.from("results").insert(
        artifacts.map((a: any) => ({
          run_id,
          goal_id: run.goal_id,
          task_id: run.task_id,
          agent_id: run.agent_id,
          title: a.title,
          content_type: a.content_type || "text",
          content: a.content,
          metadata: a.metadata || {},
        }))
      );
    }
  }

  return NextResponse.json({ success: true });
}
```

-----

## 8. UI Components

### `src/components/ui/button.tsx`

```tsx
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-md shadow-accent/20",
  secondary:
    "bg-surface-3 text-neutral-200 hover:bg-surface-4 border border-neutral-700/50",
  ghost: "text-neutral-400 hover:text-neutral-200 hover:bg-surface-3",
  danger: "bg-danger/10 text-danger hover:bg-danger/20 border border-danger/20",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
```

### `src/components/ui/card.tsx`

```tsx
import { type HTMLAttributes } from "react";
import { clsx } from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

export function Card({ hover, glow, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-neutral-800/60 bg-surface-2 p-5",
        hover && "transition-all duration-200 hover:border-neutral-700 hover:bg-surface-3",
        glow && "shadow-lg shadow-accent/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={clsx("text-lg font-semibold text-neutral-100", className)}
      {...props}
    />
  );
}
```

### `src/components/ui/badge.tsx`

```tsx
import { clsx } from "clsx";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "accent";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-4 text-neutral-300",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-danger/10 text-danger border-danger/20",
  info: "bg-info/10 text-info border-info/20",
  accent: "bg-accent/10 text-accent border-accent/20",
};

export function Badge({ variant = "default", children, className, dot }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={clsx("h-1.5 w-1.5 rounded-full", {
            "bg-success": variant === "success",
            "bg-warning": variant === "warning",
            "bg-danger": variant === "danger",
            "bg-info": variant === "info",
            "bg-accent": variant === "accent",
            "bg-neutral-400": variant === "default",
          })}
        />
      )}
      {children}
    </span>
  );
}
```

### `src/components/ui/status-dot.tsx`

```tsx
import { clsx } from "clsx";

const statusColors: Record<string, string> = {
  active: "bg-success",
  running: "bg-info animate-pulse-subtle",
  idle: "bg-neutral-500",
  pending: "bg-warning",
  completed: "bg-success",
  failed: "bg-danger",
  error: "bg-danger",
  disabled: "bg-neutral-700",
  paused: "bg-warning",
  queued: "bg-info",
  timeout: "bg-danger",
  cancelled: "bg-neutral-600",
  archived: "bg-neutral-700",
};

export function StatusDot({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-block h-2 w-2 rounded-full",
        statusColors[status] || "bg-neutral-500",
        className
      )}
      title={status}
    />
  );
}
```

### `src/components/ui/input.tsx`

```tsx
import { forwardRef, type InputHTMLAttributes } from "react";
import { clsx } from "clsx";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label?: string }
>(({ label, className, id, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-neutral-400">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={clsx(
          "w-full rounded-lg border border-neutral-700/60 bg-surface-3 px-3 py-2 text-sm text-neutral-100",
          "placeholder:text-neutral-600",
          "focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30",
          "transition-colors duration-150",
          className
        )}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";
```

### `src/components/ui/textarea.tsx`

```tsx
import { forwardRef, type TextareaHTMLAttributes } from "react";
import { clsx } from "clsx";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }
>(({ label, className, id, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-neutral-400">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={clsx(
          "w-full rounded-lg border border-neutral-700/60 bg-surface-3 px-3 py-2 text-sm text-neutral-100",
          "placeholder:text-neutral-600 resize-y min-h-[80px]",
          "focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30",
          "transition-colors duration-150",
          className
        )}
        {...props}
      />
    </div>
  );
});
Textarea.displayName = "Textarea";
```

### `src/components/ui/dialog.tsx`

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { clsx } from "clsx";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, title, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={clsx(
        "max-w-lg w-full rounded-2xl border border-neutral-700/60 bg-surface-1 p-0 shadow-2xl shadow-black/40",
        "backdrop:bg-black/60 backdrop:backdrop-blur-sm",
        "animate-fade-in",
        className
      )}
    >
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-100">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-500 hover:bg-surface-3 hover:text-neutral-300 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
```

### `src/components/ui/select.tsx`

```tsx
import { forwardRef, type SelectHTMLAttributes } from "react";
import { clsx } from "clsx";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-medium text-neutral-400">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            "w-full rounded-lg border border-neutral-700/60 bg-surface-3 px-3 py-2 text-sm text-neutral-100",
            "focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30",
            "transition-colors duration-150",
            className
          )}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
Select.displayName = "Select";
```

-----

### `src/components/layout/sidebar.tsx`

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const navItems = [
  { href: "/", label: "Dashboard", icon: "⬡" },
  { href: "/goals", label: "Goals", icon: "◎" },
  { href: "/agents", label: "Agents", icon: "◈" },
  { href: "/runs", label: "Runs", icon: "▸" },
  { href: "/results", label: "Results", icon: "◆" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col border-r border-neutral-800/60 bg-surface-0">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-neutral-800/60 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent font-mono text-sm font-bold">
          A
        </div>
        <div>
          <div className="text-sm font-semibold text-neutral-100 font-display tracking-tight">
            Command Center
          </div>
          <div className="text-[10px] text-neutral-600 font-mono">v0.1.0</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-neutral-500 hover:bg-surface-3 hover:text-neutral-300"
              )}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-neutral-800/60 p-4">
        <div className="text-[10px] text-neutral-700 font-mono">
          Claude Max • 15 runs/day
        </div>
      </div>
    </aside>
  );
}
```

### `src/components/layout/header.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { DashboardStats } from "@/lib/supabase/types";

export function Header() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    // We'll fetch stats inline from supabase via the RPC
    async function load() {
      try {
        const res = await fetch("/api/goals"); // Lightweight check
        if (res.ok) {
          // For now just show the header, stats will come from the dashboard page
        }
      } catch {
        // Silent fail
      }
    }
    load();
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-800/60 bg-surface-0/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-medium text-neutral-400 font-display">
          Agent Command Center
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="accent" dot>
          System Online
        </Badge>
      </div>
    </header>
  );
}
```

### `src/components/layout/shell.tsx`

```tsx
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-0">
      <Sidebar />
      <div className="flex-1 pl-56">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
```

-----

### `src/components/goals/goal-card.tsx`

```tsx
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusDot } from "@/components/ui/status-dot";
import { Button } from "@/components/ui/button";
import type { GoalWithStats } from "@/lib/supabase/types";
import { formatDistanceToNow } from "date-fns";

const statusBadge: Record<string, "success" | "warning" | "danger" | "info" | "default"> = {
  active: "info",
  paused: "warning",
  completed: "success",
  failed: "danger",
  archived: "default",
};

export function GoalCard({
  goal,
  onTrigger,
  onEdit,
}: {
  goal: GoalWithStats;
  onTrigger: (id: string) => void;
  onEdit: (goal: GoalWithStats) => void;
}) {
  return (
    <Card hover className="animate-slide-up">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <StatusDot status={goal.status} />
            <h3 className="text-sm font-semibold text-neutral-100 truncate">
              {goal.title}
            </h3>
          </div>
          {goal.description && (
            <p className="text-xs text-neutral-500 line-clamp-2 mb-3">
              {goal.description}
            </p>
          )}

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-neutral-600 font-mono">
                Progress
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">
                {Math.round(goal.progress)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-surface-4 overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>

          {/* Task stats */}
          <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-600">
            <span>{goal.total_tasks} tasks</span>
            {goal.completed_tasks > 0 && (
              <span className="text-success">{goal.completed_tasks} done</span>
            )}
            {goal.running_tasks > 0 && (
              <span className="text-info">{goal.running_tasks} running</span>
            )}
            {goal.failed_tasks > 0 && (
              <span className="text-danger">{goal.failed_tasks} failed</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <Badge variant={statusBadge[goal.status] || "default"}>
            {goal.status}
          </Badge>
          <span className="text-[10px] text-neutral-700 font-mono">
            P{goal.priority}
          </span>
          {goal.deadline && (
            <span className="text-[10px] text-neutral-600">
              Due {formatDistanceToNow(new Date(goal.deadline), { addSuffix: true })}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-neutral-800/40 pt-3">
        <Button size="sm" variant="secondary" onClick={() => onEdit(goal)}>
          Edit
        </Button>
        {goal.status === "active" && goal.total_tasks === 0 && (
          <Button size="sm" onClick={() => onTrigger(goal.id)}>
            Decompose
          </Button>
        )}
        {goal.status === "active" && goal.pending_tasks > 0 && (
          <Button size="sm" onClick={() => onTrigger(goal.id)}>
            Run Next Task
          </Button>
        )}
      </div>
    </Card>
  );
}
```

### `src/components/goals/goal-form.tsx`

```tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import type { Goal } from "@/lib/supabase/types";

interface GoalFormProps {
  initialData?: Partial<Goal>;
  onSubmit: (data: Partial<Goal>) => Promise<void>;
  onCancel: () => void;
}

export function GoalForm({ initialData, onSubmit, onCancel }: GoalFormProps) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [priority, setPriority] = useState(String(initialData?.priority || 5));
  const [deadline, setDeadline] = useState(
    initialData?.deadline ? initialData.deadline.split("T")[0] : ""
  );
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        ...(initialData?.id ? { id: initialData.id } : {}),
        title,
        description: description || null,
        priority: parseInt(priority),
        deadline: deadline ? new Date(deadline).toISOString() : null,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Goal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g., Build passive income pipeline"
        required
      />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe what success looks like..."
      />
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          options={Array.from({ length: 10 }, (_, i) => ({
            value: String(i + 1),
            label: `${i + 1}${i === 9 ? " (highest)" : i === 0 ? " (lowest)" : ""}`,
          }))}
        />
        <Input
          label="Deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <Input
        label="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="e.g., income, automation, pokémon"
      />
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialData?.id ? "Update Goal" : "Create Goal"}
        </Button>
      </div>
    </form>
  );
}
```

### `src/components/goals/goal-list.tsx`

```tsx
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
  const [triggering, setTriggering] = useState<string | null>(null);

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

  async function handleTrigger(goalId: string) {
    setTriggering(goalId);
    try {
      await fetch("/api/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "process_goals" }),
      });
      // Refresh after a moment to show updates
      setTimeout(fetchGoals, 2000);
    } finally {
      setTriggering(null);
    }
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
          <Button variant="secondary" onClick={() => handleTrigger("")}>
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

      <Dialog
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Edit Goal"
      >
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
```

-----

### `src/components/agents/agent-card.tsx`

```tsx
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusDot } from "@/components/ui/status-dot";
import { Button } from "@/components/ui/button";
import type { Agent } from "@/lib/supabase/types";
import { AGENT_DEFINITIONS } from "@/lib/agents/definitions";
import { formatDistanceToNow } from "date-fns";

const statusBadge: Record<string, "success" | "warning" | "danger" | "info" | "default"> = {
  idle: "default",
  running: "info",
  error: "danger",
  disabled: "default",
};

export function AgentCard({ agent }: { agent: Agent }) {
  const def = AGENT_DEFINITIONS[agent.type];

  return (
    <Card hover className="animate-slide-up">
      <div className="flex items-start gap-4">
        {/* Agent avatar */}
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl"
          style={{
            background: `linear-gradient(135deg, ${def?.color ? "var(--color-accent-muted)" : "var(--color-surface-4)"}, transparent)`,
          }}
        >
          <span className={def?.color || "text-neutral-400"}>
            {agent.name[0]}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-neutral-100">
              {agent.name}
            </h3>
            <Badge variant={statusBadge[agent.status]} dot>
              {agent.status}
            </Badge>
          </div>
          <p className="text-xs text-neutral-500 mb-3">{agent.description}</p>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-600">
            <span>{agent.total_runs} runs</span>
            <span>{agent.total_tokens_used.toLocaleString()} tokens</span>
            <span>{Math.round(agent.success_rate)}% success</span>
            {agent.last_run_at && (
              <span>
                Last: {formatDistanceToNow(new Date(agent.last_run_at), { addSuffix: true })}
              </span>
            )}
          </div>

          {/* Capabilities */}
          <div className="mt-3 flex flex-wrap gap-1">
            {(agent.capabilities as string[]).slice(0, 4).map((cap) => (
              <span
                key={cap}
                className="rounded-md bg-surface-4 px-2 py-0.5 text-[10px] text-neutral-500"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        <div className="shrink-0">
          <span className="text-xs text-neutral-700 font-mono">{agent.type}</span>
        </div>
      </div>
    </Card>
  );
}
```

### `src/components/agents/agent-grid.tsx`

```tsx
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
```

-----

### `src/components/runs/run-list.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusDot } from "@/components/ui/status-dot";
import type { Run } from "@/lib/supabase/types";
import { formatDistanceToNow } from "date-fns";

const statusBadge: Record<string, "success" | "warning" | "danger" | "info" | "default"> = {
  running: "info",
  completed: "success",
  failed: "danger",
  timeout: "warning",
};

export function RunList() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/runs?limit=50");
      if (res.ok) setRuns(await res.json());
      setLoading(false);
    }
    load();
    // Auto-refresh every 30 seconds
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
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
        <h2 className="text-xl font-bold text-neutral-100 font-display">Runs</h2>
        <p className="text-xs text-neutral-600 mt-0.5">
          Execution history · auto-refreshes every 30s
        </p>
      </div>

      <div className="space-y-2">
        {runs.map((run) => (
          <Card key={run.id} hover className="!p-4">
            <div className="flex items-center gap-4">
              <StatusDot status={run.status} className="shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-200 truncate">
                    {(run as any).agent?.name || "Unknown Agent"}
                  </span>
                  <span className="text-xs text-neutral-600">→</span>
                  <span className="text-xs text-neutral-500 truncate">
                    {(run as any).task?.title || (run as any).goal?.title || "Manual run"}
                  </span>
                </div>
                {run.output_summary && (
                  <p className="text-xs text-neutral-600 mt-0.5 line-clamp-1">
                    {run.output_summary}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Badge variant={statusBadge[run.status]}>{run.status}</Badge>
                {run.tokens_used > 0 && (
                  <span className="text-[10px] text-neutral-700 font-mono">
                    {run.tokens_used.toLocaleString()} tok
                  </span>
                )}
                {run.duration_seconds && (
                  <span className="text-[10px] text-neutral-700 font-mono">
                    {run.duration_seconds}s
                  </span>
                )}
                <span className="text-[10px] text-neutral-700">
                  {formatDistanceToNow(new Date(run.started_at), {
                    addSuffix: true,
                  })}
                </span>
                {run.session_url && (
                  <a
                    href={run.session_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-accent hover:underline"
                  >
                    Session ↗
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
        {runs.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-800 py-16 text-center">
            <p className="text-sm text-neutral-600">No runs yet.</p>
            <p className="text-xs text-neutral-700 mt-1">
              Trigger an agent from the Goals page to see runs here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

### `src/components/runs/run-detail.tsx`

```tsx
"use client";

import { Card } from "@/components/ui/card";
import type { Run } from "@/lib/supabase/types";

export function RunDetail({ run }: { run: Run }) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-neutral-100 mb-3">
        Run Details
      </h3>
      <pre className="text-xs text-neutral-400 font-mono bg-surface-3 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
        {JSON.stringify(run.output || run, null, 2)}
      </pre>
    </Card>
  );
}
```

-----

## 9. Page Components

### `src/app/globals.css`

```css
@import "tailwindcss";
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap");

html {
  color-scheme: dark;
}

body {
  font-family: "DM Sans", system-ui, sans-serif;
  background: #0a0a0c;
  color: #e5e5e5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Dialog backdrop */
dialog::backdrop {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
}
```

### `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Shell } from "@/components/layout/shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Command Center",
  description: "Multi-agent orchestration dashboard powered by Claude Max",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
```

### `src/app/page.tsx` (Dashboard)

```tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

      // Fetch dashboard stats
      const { data: statsData } = await supabase.rpc("get_dashboard_stats");
      if (statsData) setStats(statsData);

      // Fetch latest daily summary
      const { data: summaryData } = await supabase
        .from("daily_summaries")
        .select("*")
        .order("summary_date", { ascending: false })
        .limit(1)
        .single();
      if (summaryData) setSummary(summaryData);

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

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map((stat) => (
          <Card key={stat.label} className="!p-4 text-center">
            <div className={`text-2xl font-bold font-mono ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-[10px] text-neutral-600 mt-1 font-medium uppercase tracking-wider">
              {stat.label}
            </div>
          </Card>
        ))}
      </div>

      {/* Latest daily summary */}
      {summary && (
        <Card>
          <CardTitle>
            Daily Briefing — {summary.summary_date}
          </CardTitle>
          {summary.narrative && (
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              {summary.narrative}
            </p>
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
```

### `src/app/goals/page.tsx`

```tsx
import { GoalList } from "@/components/goals/goal-list";

export default function GoalsPage() {
  return <GoalList />;
}
```

### `src/app/agents/page.tsx`

```tsx
import { AgentGrid } from "@/components/agents/agent-grid";

export default function AgentsPage() {
  return <AgentGrid />;
}
```

### `src/app/runs/page.tsx`

```tsx
import { RunList } from "@/components/runs/run-list";

export default function RunsPage() {
  return <RunList />;
}
```

### `src/app/results/page.tsx`

```tsx
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
      if (data) setResults(data as any);
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
          <Card key={result.id} hover className="cursor-pointer" onClick={() => setExpanded(expanded === result.id ? null : result.id)}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium text-neutral-200">{result.title}</h3>
                  <Badge variant="default">{result.content_type}</Badge>
                  {result.pinned && <Badge variant="accent">pinned</Badge>}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-neutral-600">
                  <span>{(result as any).agent?.name || "—"}</span>
                  {(result as any).goal && (
                    <>
                      <span>·</span>
                      <span>{(result as any).goal.title}</span>
                    </>
                  )}
                  <span>·</span>
                  <span>{formatDistanceToNow(new Date(result.created_at), { addSuffix: true })}</span>
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
```

### `src/app/settings/page.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import type { Agent } from "@/lib/supabase/types";

export default function SettingsPage() {
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

  async function updateAgent(id: string, updates: Partial<Agent>) {
    await fetch("/api/agents", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
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
          After creating Claude Code Routines, paste each routine&apos;s trigger URL and bearer
          token here. These are set in your <code className="text-accent">.env.local</code> file
          and are not editable from the UI for security. See the routines/ directory for setup
          instructions.
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
              <Badge variant={process.env[`${key}_URL`] ? "success" : "warning"} dot>
                {/* We can't read env vars client-side, so this is a placeholder */}
                Check .env.local
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
                <Badge
                  variant={agent.status === "disabled" ? "danger" : "success"}
                  dot
                >
                  {agent.status}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    updateAgent(agent.id, {
                      status: agent.status === "disabled" ? "idle" : "disabled",
                    } as any)
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
```

-----

## 10. Claude Code Routine Definitions

These are the prompts you create as Claude Code Routines at `claude.ai/code/routines`. Each one becomes a saved routine with its own trigger URL.

### `routines/daily-goal-processor.md`

```markdown
# Routine: Daily Goal Processor

## Setup
- Name: daily-goal-processor
- Trigger: Scheduled — Daily at 7:00 AM CT
- Also: API trigger enabled (for manual invocation from dashboard)

## Connectors
- Web access: enabled (for research tasks)

## Prompt

You are the Goal Processor for the Agent Command Center.

Your environment has these variables:
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

Install the supabase client: npm install @supabase/supabase-js

Connect to Supabase and execute the following workflow:

1. FETCH ACTIVE GOALS:
   SELECT * FROM goals WHERE status = 'active' ORDER BY priority DESC;

2. FOR EACH GOAL, CHECK TASK DECOMPOSITION:
   SELECT * FROM tasks WHERE goal_id = '<goal_id>';
   
   If no tasks exist, decompose the goal:
   - Read the goal title and description carefully
   - Break it into 3-7 concrete, actionable tasks
   - Assign each task an agent_type based on the work required:
     * 'researcher' — for information gathering, market research, web search
     * 'coder' — for writing code, building tools, automation
     * 'writer' — for content creation, documentation, communications
     * 'analyst' — for data analysis, trends, financial research
     * 'market' — for Pokémon TCG market data, eBay research, price tracking
   - Set dependencies: which tasks need others to complete first?
   - Write a detailed prompt for each task explaining exactly what to do
   - INSERT all tasks into the tasks table

3. EXECUTE NEXT TASK:
   After decomposition, find the highest-priority pending task with met dependencies:
   
   SELECT t.* FROM tasks t
   WHERE t.status = 'pending'
   AND NOT EXISTS (
     SELECT 1 FROM unnest(t.dependencies) AS dep_id
     JOIN tasks dep ON dep.id = dep_id
     WHERE dep.status != 'completed'
   )
   ORDER BY t.priority DESC
   LIMIT 1;
   
   If found:
   - UPDATE tasks SET status = 'running', started_at = now() WHERE id = '<task_id>';
   - Execute the task according to its prompt and agent_type
   - UPDATE tasks SET status = 'completed', completed_at = now(),
     result = '<JSON result>', result_summary = '<summary>'
     WHERE id = '<task_id>';
   - INSERT INTO results (run_id, goal_id, task_id, title, content_type, content)
     VALUES (...) with the output

4. If the API trigger includes additional context in the text field, 
   use it to focus on a specific goal or task.

Always write back to Supabase. The dashboard depends on these updates.
```

### `routines/research-agent.md`

```markdown
# Routine: Research Agent (Atlas)

## Setup
- Name: research-agent-atlas
- Trigger: API only (triggered from dashboard)

## Connectors
- Web access: enabled

## Prompt

You are Atlas, a research agent in the Agent Command Center.

Your environment has SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.

The API trigger will pass task context in the text field. Parse it to get:
- Task ID, title, description, and specific prompt
- Parent goal context
- Supabase connection details

Workflow:
1. Connect to Supabase
2. Mark the task as running
3. Execute the research:
   - Search the web for authoritative sources
   - Cross-reference multiple sources
   - Synthesize into a structured report
4. Write results back:
   - Update the task with result JSON and summary
   - Create a result record with the full report
5. If you fail, set status to 'failed' with error_message
```

### `routines/monitor-agent.md`

```markdown
# Routine: Monitor Agent (Sentinel)

## Setup
- Name: monitor-sentinel
- Trigger: Scheduled — Daily at 11:00 PM CT
- Also: API trigger enabled

## Prompt

You are Sentinel, the monitoring agent for the Agent Command Center.

Your environment has SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.

Generate tonight's daily summary:

1. Connect to Supabase
2. Query today's metrics:
   - Tasks completed: count where completed_at >= today AND status = 'completed'
   - Tasks failed: count where completed_at >= today AND status = 'failed'
   - Runs executed: count where started_at >= today
   - Tokens consumed: SUM(tokens_used) from runs where started_at >= today
   - Goals progressed: goals with updated_at >= today
   - Goals completed: goals where status changed to 'completed' today

3. Identify highlights (max 5):
   - Tasks completed on high-priority goals
   - Agents with high success rates
   - Any breakthroughs or notable outputs

4. Identify concerns (max 5):
   - Tasks that failed multiple times
   - Goals past deadline still active
   - Agents with errors
   - Stalled tasks (pending for > 3 days)

5. Write a 2-3 paragraph narrative summary

6. INSERT INTO daily_summaries with all fields

7. Cleanup: Cancel any tasks stuck in 'running' for > 2 hours
   (set back to 'pending' with retry_count incremented)
```

*Create similar routines for code-agent, writer-agent, and market-agent following the same pattern. Each is API-triggered only, connects to Supabase, reads task context from the trigger payload, executes the work, and writes results back.*

-----

## 11. Deployment Instructions

### Step 1: Create the Supabase Project

Using your Supabase MCP connector in Claude:

1. Create a new Supabase project named “agent-command-center”
1. Run each migration file in order via `apply_migration`
1. Copy the project URL and keys to `.env.local`

### Step 2: Deploy to Vercel

Using your Vercel MCP connector in Claude:

1. Create a new Vercel project linked to your GitHub repo
1. Set all environment variables from `.env.local`
1. Deploy

### Step 3: Create Claude Code Routines

At `claude.ai/code/routines` (or via `claude /schedule`):

1. **Daily Goal Processor**: Create with the prompt from `routines/daily-goal-processor.md`. Set schedule to daily at 7 AM. Enable API trigger. Copy the trigger URL and token into `.env.local`.
1. **Research Agent**: Create with the prompt from `routines/research-agent.md`. API trigger only. Copy URL and token.
1. **Monitor Agent**: Create with the prompt from `routines/monitor-agent.md`. Schedule nightly at 11 PM. Enable API trigger. Copy URL and token.
1. Repeat for code-agent, writer-agent, market-agent.
1. Redeploy Vercel with the updated environment variables.

### Step 4: Create Your First Goal

1. Open your deployed site
1. Go to Goals → New Goal
1. Enter a goal like “Research the top 5 PSA 10 vintage Pokémon cards trending upward in price this quarter”
1. Click “Process All Goals” to trigger decomposition
1. Watch the agents work on the Runs page

### Step 5: Claim Agent SDK Credit

Before June 15, 2026:

1. Watch for the claim email from Anthropic
1. Claim your monthly Agent SDK credit through your Claude account
1. This gives you a separate token pool for programmatic Agent SDK calls beyond the 15 routine runs/day