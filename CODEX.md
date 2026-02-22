# Codex Operating Manual for Surim Studio

You are working on the Surim Studio website repo.

## Project Overview
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Data/Auth: Supabase
- Payments: PortOne (domestic), PayPal (overseas)
- Deployment: Vercel

This repo contains production code. Make minimal, surgical changes and keep diffs small.

## Goals for all tasks
1) First, locate the relevant files by searching the repo (do NOT guess paths).
2) Follow existing patterns (components, naming, UI structure).
3) Prefer composition over rewriting. Avoid large refactors.
4) Always return a patch/diff and list all touched files.

## Local Dev & Build
- Install: npm install
- Dev: npm run dev
- Build: npm run build
- Lint: npm run lint (if present)
If a command differs, search package.json and use the scripts defined there.

## Repo Conventions (must follow)
- Next.js App Router pages live under: src/app/**
- Shared components live under: src/components/**
- Utility functions live under: src/lib/**
- Route handlers live under: src/app/api/**/route.ts
- Use existing UI patterns (container widths, spacing, typography).
- Do not introduce new dependencies unless explicitly asked.

## Environment Variables
- Uses .env.local for local development.
- There are keys for Supabase, PortOne, PayPal.
- Never print secret keys in responses.
- If changes require env vars, mention the required names but do not invent values.

## Navigation / Menus
- Header/Nav may be config-driven (data array) or component-based.
- Desktop and mobile menus may be separate components.
- When changing navigation, update both desktop and mobile behavior.

## Editing Rules
- Do not rename routes unless explicitly asked.
- When moving pages, add redirects or keep old routes working.
- Never break payment flows.

## Task Workflow
When given a task:
1) Identify entry points (pages/components) by searching for labels and routes.
2) Map the minimal set of files to touch.
3) Implement changes.
4) Provide a diff + quick manual test checklist.

## Site-specific Notes
- There is a Funding flow (crowdfunding-like) that must remain accessible even after completion.
- Completed funding should be archived under Projects, but old funding URLs should not break.
- Editions is the top-level category that will contain Surim Editions (hub), Surimji, Surimseoga, Goods.
- In-app browser detection exists for mobile payment guidance; do not regress it.