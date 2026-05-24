# Agent Command Center

Multi-agent orchestration dashboard. Next.js 15 (App Router) + Supabase + Tailwind v4, deployed on Vercel. Agents run as Claude Code Routines that read tasks from Supabase, execute them, and write results back.

## Stack

- **Frontend / API**: Next.js 15 (App Router), React 19, Tailwind v4 (CSS-first `@theme`)
- **Database**: Supabase (Postgres 17 + pgvector + Realtime)
- **Workers**: 6 Claude Code Routines (Atlas, Forge, Quill, Lens, Sentinel, Ticker)
- **Deploy**: Vercel

## Setup

1. Copy `.env.local.example` → `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - 6 routine URL + token pairs (after creating routines at `claude.ai/code/routines`)
   - `WEBHOOK_SECRET`
2. `npm install`
3. `npm run dev`

## Routines

Each routine prompt is in `routines/`. Create them at `claude.ai/code/routines`, enable the API trigger, and paste the generated URL + bearer token into the matching env var.

## Full spec

See `docs/agent-command-center-implementation.md`.
