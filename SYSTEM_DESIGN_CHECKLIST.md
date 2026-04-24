# AlgoViz System Design Checklist
## Frontend + Backend + Database Execution Playbook
### Version 2.1 | Date: April 25, 2026

This document is a build checklist, not just architecture notes.  
Mark each task only after its Definition of Done (DoD) is satisfied.

---

## 0) Build Rules (Read First)

- [ ] Use one source of truth for contracts: `packages/contracts` (types + zod schemas).
- [ ] Ship in vertical slices (UI + API + DB for each feature), not isolated layers.
- [ ] No feature is "done" without: tests, telemetry, error handling, and docs.
- [ ] Block merge if CI, migration checks, or contract checks fail.
- [ ] Keep all environment config in `.env.example` + secret manager; no secrets in repo.

Definition of Done:
- [ ] Team agrees these rules are mandatory for all pull requests.

---

## 1) Target Architecture

- [ ] Finalize architecture with these components:
- [ ] `Web App` (React + TypeScript + Vite).
- [ ] `API` (Node.js + TypeScript, REST + WebSocket).
- [ ] `PostgreSQL` (primary relational store).
- [ ] `Redis` (cache + ephemeral realtime state + rate limit counters).
- [ ] `Object Storage` (large replay blobs, exports).
- [ ] `Queue/Worker` (background jobs: achievement awarding, replay export, analytics batch).
- [ ] `Observability` (logs, metrics, traces, alerts).

- [ ] Finalize deployment:
- [ ] Frontend on Vercel (or CloudFront + static hosting).
- [ ] API on container platform (Fly.io/Render/ECS/K8s) or serverless functions.
- [ ] Managed Postgres with PITR.
- [ ] Managed Redis with persistence enabled.

Definition of Done:
- [ ] Architecture diagram committed to `/docs/architecture/system-overview.md`.
- [ ] Chosen vendors/services documented with cost estimate.

---

## 2) Monorepo and Environment Setup

### 2.1 Repository Layout

- [ ] Create monorepo layout:
- [ ] `apps/web` (frontend).
- [ ] `apps/api` (backend).
- [ ] `packages/contracts` (shared request/response + domain types).
- [ ] `packages/algorithms` (algorithm modules + deterministic step generation).
- [ ] `packages/ui` (shared design system components).
- [ ] `infra` (IaC, deployment manifests, env templates).
- [ ] `docs` (architecture, ADRs, runbooks).

### 2.2 Toolchain

- [ ] Configure `pnpm` workspaces (or npm workspaces/turbo).
- [ ] Set strict TS config (`strict: true`, `noUncheckedIndexedAccess: true`).
- [ ] Setup ESLint + Prettier + import sorting.
- [ ] Setup commit hooks: `lint-staged` + `husky`.
- [ ] Add script standards:
- [ ] `lint`, `typecheck`, `test`, `build`, `test:e2e`, `db:migrate`, `db:seed`.

### 2.3 Environment Strategy

- [ ] Define environments: `dev`, `staging`, `prod`.
- [ ] Create `.env.example` for both `web` and `api`.
- [ ] Add runtime config validation at API startup.
- [ ] Configure CORS per environment.

Definition of Done:
- [ ] `pnpm -r lint typecheck test build` passes on clean clone.

---

## 3) Frontend System Checklist

## 3.1 Frontend App Shell

- [ ] Setup route groups:
- [ ] `/` Home + discovery.
- [ ] `/visualize/:algorithmId`.
- [ ] `/battle`.
- [ ] `/challenge`.
- [ ] `/replay/:shareId`.
- [ ] `/profile`.
- [ ] `/classroom/:sessionId`.

- [ ] Implement global app providers:
- [ ] Theme provider.
- [ ] Query client provider.
- [ ] Auth/session provider.
- [ ] Keyboard shortcut provider.

- [ ] Add command palette (`Ctrl/Cmd + K`) for quick navigation.

## 3.2 Design System

- [ ] Define token files:
- [ ] color tokens for algorithm states (`compare`, `swap`, `pivot`, `visited`, `queued`, `finalized`).
- [ ] motion tokens (`fast`, `normal`, `teach_mode`).
- [ ] spacing and typography scales.

- [ ] Build reusable components:
- [ ] `Button`, `Toggle`, `Slider`, `Tabs`, `Panel`, `Drawer`, `Tooltip`, `Toast`, `Modal`.
- [ ] data legend component for state color mapping.

- [ ] Accessibility baseline:
- [ ] Focus-visible states for all interactive controls.
- [ ] Keyboard support for timeline and step controls.
- [ ] `prefers-reduced-motion` fallback behavior.

## 3.3 Visualizer Engine (Core)

- [ ] Define canonical `StepEvent` contract in `packages/contracts`.
- [ ] Implement playback state machine:
- [ ] `IDLE -> READY -> PLAYING -> PAUSED -> COMPLETED`.
- [ ] Implement deterministic forward step.
- [ ] Implement deterministic backward step.
- [ ] Implement direct jump (`jumpTo(stepIndex)`).
- [ ] Implement speed control (`0.1x` to `8x`).
- [ ] Implement breakpoints:
- [ ] by event type.
- [ ] by predicate on event payload.

- [ ] Add "watch panel" with selected variables and derived metrics.
- [ ] Add state snapshots/caching strategy for fast scrub:
- [ ] Snapshot every N events.
- [ ] Replay deltas between nearest snapshot and target step.

Definition of Done:
- [ ] Re-running same algorithm + input produces byte-identical event stream.
- [ ] Stepping backward and forward restores exact same state.

## 3.4 Rendering and Hyper-Visual Layer

- [ ] Implement renderer abstraction:
- [ ] `SvgRenderer` for normal density.
- [ ] `CanvasRenderer` for high element counts.
- [ ] selection strategy based on input size and graph density.

- [ ] Implement state-diff overlay:
- [ ] highlight added/changed/removed state.
- [ ] ghost layer for outgoing elements.

- [ ] Implement timeline minimap:
- [ ] marker types: compare, swap, visit, enqueue, dequeue, recurse, merge.
- [ ] clickable marker navigation.

- [ ] Implement cinematic teach mode:
- [ ] guided focus transitions.
- [ ] slower motion profile.
- [ ] optional explanatory subtitle strip.

## 3.5 Input and Scenario Lab

- [ ] Build array input module:
- [ ] random, manual, preset, seed-based reproducible.
- [ ] nearly sorted, reverse sorted, duplicates heavy, adversarial.

- [ ] Build graph editor:
- [ ] add/remove nodes.
- [ ] add/remove weighted edges.
- [ ] directed toggle.
- [ ] drag nodes.

- [ ] Build tree builder:
- [ ] insert sequence.
- [ ] delete sequence.
- [ ] auto-balance toggle (where relevant).

## 3.6 Code Intelligence Panel

- [ ] Show pseudocode and source tabs.
- [ ] Map each `StepEvent` to source line(s).
- [ ] Active line highlight + execution trail.
- [ ] Add "Why this step?" context message bound to step id.

## 3.7 Complexity Dashboard

- [ ] Show Big-O table (best/avg/worst/time + space).
- [ ] Live counters:
- [ ] comparisons.
- [ ] writes/swaps.
- [ ] reads.
- [ ] stack/queue operations.
- [ ] Display operations-over-time chart.
- [ ] Add bottleneck phase indicator.

## 3.8 Battle Arena

- [ ] Support 2-lane compare first, then 3-lane.
- [ ] Shared input and synchronized timeline.
- [ ] Per-lane metrics + winner summary.

## 3.9 Challenge Mode

- [ ] Implement challenge types:
- [ ] predict next state.
- [ ] predict pointer/value.
- [ ] repair incorrect step.

- [ ] Add scoring model and hint model.
- [ ] Persist attempts via API.

## 3.10 Replay Studio

- [ ] Save replay state + annotations.
- [ ] Generate deep link with `shareId`.
- [ ] Load replay from link and restore exact state.
- [ ] Teacher mode link (hide answers and hints).

## 3.11 Frontend Testing

- [ ] Unit tests:
- [ ] state machine.
- [ ] step reducer.
- [ ] timeline jump math.

- [ ] Component tests:
- [ ] controls.
- [ ] watch panel.
- [ ] code panel synchronization.

- [ ] E2E tests:
- [ ] create run -> scrub -> share replay -> open replay link.
- [ ] battle compare sync.
- [ ] challenge submit + score.

Definition of Done:
- [ ] Frontend critical path test suite green in CI.

---

## 4) Backend System Checklist

## 4.1 API Service Modules

- [ ] Split backend into clear modules:
- [ ] `auth`.
- [ ] `users`.
- [ ] `runs`.
- [ ] `replays`.
- [ ] `challenges`.
- [ ] `progress`.
- [ ] `achievements`.
- [ ] `classroom` (WebSocket + session control).
- [ ] `analytics`.

## 4.2 API Standards

- [ ] Prefix all endpoints with `/api/v1`.
- [ ] Standard response shape:
- [ ] success: `{ data, meta, requestId }`.
- [ ] error: `{ error: { code, message, details }, requestId }`.

- [ ] Add request validation using zod schemas from `packages/contracts`.
- [ ] Add API idempotency for replay save and challenge submission.
- [ ] Add pagination standard (`page`, `pageSize`, `total`, `hasNext`).

## 4.3 Auth and Identity

- [ ] Implement OAuth providers: Google + GitHub.
- [ ] Implement email magic-link login.
- [ ] Use short-lived access token + refresh token rotation.
- [ ] Persist session tokens hashed at rest.
- [ ] Add RBAC roles: `user`, `educator`, `admin`.

## 4.4 Runs and Replays Domain Logic

- [ ] `POST /runs` creates run metadata + normalized input hash.
- [ ] `GET /runs/:id` returns run metadata + summary metrics.
- [ ] `POST /runs/:id/bookmarks` creates labeled bookmark.
- [ ] `POST /runs/:id/annotations` creates annotation.
- [ ] `POST /replays` stores replay payload pointer and visibility.
- [ ] `GET /replays/:shareId` returns replay payload and metadata.
- [ ] `POST /replays/:id/share` rotates or returns share link.

## 4.5 Challenge and Progress Logic

- [ ] `POST /challenges/attempts` scores attempt deterministically.
- [ ] `GET /challenges/attempts` paginated history.
- [ ] `GET /progress/overview` aggregated mastery + streaks.
- [ ] `GET /progress/algorithms/:algorithmId` detailed mastery breakdown.
- [ ] Achievement award worker executes on run/challenge completion events.

## 4.6 Classroom Realtime Logic

- [ ] WebSocket namespaces:
- [ ] `classroom:{sessionId}:control`.
- [ ] `classroom:{sessionId}:presence`.
- [ ] `classroom:{sessionId}:chat` (optional).

- [ ] Host actions:
- [ ] play/pause/step/jump.
- [ ] participant follow mode toggle.

- [ ] Reconnect logic:
- [ ] send last checkpoint + step index.
- [ ] deterministic catch-up for late joiners.

## 4.7 Security and Rate Limits

- [ ] Add per-IP and per-user rate limits.
- [ ] Add brute-force protection for auth endpoints.
- [ ] Add replay payload size limits and compression.
- [ ] Add request body size limits and timeout policy.
- [ ] Add audit logging for admin and educator actions.

## 4.8 Backend Testing

- [ ] Unit tests for each module service.
- [ ] Integration tests with Postgres + Redis.
- [ ] Contract tests against shared schemas.
- [ ] Load tests:
- [ ] replay retrieval hot path.
- [ ] classroom sync at target concurrency.

Definition of Done:
- [ ] All core endpoints documented and covered by automated tests.

---

## 5) Database Schema Checklist (PostgreSQL)

## 5.1 DB Standards

- [ ] Enable extensions:
- [ ] `pgcrypto` for `gen_random_uuid()`.
- [ ] `citext` for case-insensitive email.

- [ ] Naming conventions:
- [ ] snake_case.
- [ ] singular table names.
- [ ] `created_at`, `updated_at` on mutable tables.

- [ ] Add `deleted_at` only where soft-delete is required.

## 5.2 Core Tables and Constraints

### users

- [ ] Create table `users` with:
- [ ] `id uuid pk default gen_random_uuid()`.
- [ ] `email citext unique not null`.
- [ ] `display_name text not null`.
- [ ] `avatar_url text null`.
- [ ] `role text not null check role in ('user','educator','admin')`.
- [ ] `timezone text not null default 'UTC'`.
- [ ] `created_at timestamptz not null default now()`.
- [ ] `updated_at timestamptz not null default now()`.

### auth_identities

- [ ] Create table `auth_identities` with:
- [ ] `id uuid pk`.
- [ ] `user_id uuid not null references users(id) on delete cascade`.
- [ ] `provider text not null`.
- [ ] `provider_user_id text not null`.
- [ ] `created_at timestamptz not null default now()`.
- [ ] Unique `(provider, provider_user_id)`.
- [ ] Index `(user_id)`.

### user_sessions

- [ ] Create table `user_sessions` with:
- [ ] `id uuid pk`.
- [ ] `user_id uuid not null references users(id) on delete cascade`.
- [ ] `refresh_token_hash text not null`.
- [ ] `ip inet null`.
- [ ] `user_agent text null`.
- [ ] `expires_at timestamptz not null`.
- [ ] `created_at timestamptz not null default now()`.
- [ ] Index `(user_id, expires_at desc)`.

### algorithms

- [ ] Create table `algorithms` with:
- [ ] `id text pk` (example: `quick-sort`).
- [ ] `name text not null`.
- [ ] `category text not null`.
- [ ] `difficulty text not null`.
- [ ] `is_active boolean not null default true`.
- [ ] `version integer not null default 1`.
- [ ] `created_at timestamptz not null default now()`.
- [ ] `updated_at timestamptz not null default now()`.
- [ ] Index `(category, is_active)`.

### algorithm_runs

- [ ] Create table `algorithm_runs` with:
- [ ] `id uuid pk`.
- [ ] `user_id uuid null references users(id) on delete set null`.
- [ ] `algorithm_id text not null references algorithms(id)`.
- [ ] `input_hash text not null`.
- [ ] `input_payload jsonb not null`.
- [ ] `settings_payload jsonb not null`.
- [ ] `step_count integer not null`.
- [ ] `duration_ms integer null`.
- [ ] `status text not null check status in ('created','completed','abandoned')`.
- [ ] `created_at timestamptz not null default now()`.
- [ ] `updated_at timestamptz not null default now()`.
- [ ] Index `(user_id, created_at desc)`.
- [ ] Index `(algorithm_id, created_at desc)`.
- [ ] Index `(input_hash)`.

### run_bookmarks

- [ ] Create table `run_bookmarks` with:
- [ ] `id uuid pk`.
- [ ] `run_id uuid not null references algorithm_runs(id) on delete cascade`.
- [ ] `step_index integer not null`.
- [ ] `title text not null`.
- [ ] `note text null`.
- [ ] `created_at timestamptz not null default now()`.
- [ ] Index `(run_id, step_index)`.

### run_annotations

- [ ] Create table `run_annotations` with:
- [ ] `id uuid pk`.
- [ ] `run_id uuid not null references algorithm_runs(id) on delete cascade`.
- [ ] `step_index integer not null`.
- [ ] `annotation_text text not null`.
- [ ] `created_by_user_id uuid not null references users(id) on delete cascade`.
- [ ] `created_at timestamptz not null default now()`.
- [ ] Index `(run_id, step_index)`.

### replays

- [ ] Create table `replays` with:
- [ ] `id uuid pk`.
- [ ] `run_id uuid not null references algorithm_runs(id) on delete cascade`.
- [ ] `owner_user_id uuid not null references users(id) on delete cascade`.
- [ ] `share_id text not null unique`.
- [ ] `is_public boolean not null default false`.
- [ ] `payload_location text not null` (object storage key or inline pointer).
- [ ] `checksum text not null`.
- [ ] `created_at timestamptz not null default now()`.
- [ ] `updated_at timestamptz not null default now()`.
- [ ] Index `(owner_user_id, created_at desc)`.
- [ ] Index `(share_id)`.

### challenges

- [ ] Create table `challenges` with:
- [ ] `id uuid pk`.
- [ ] `algorithm_id text not null references algorithms(id)`.
- [ ] `challenge_type text not null`.
- [ ] `difficulty text not null`.
- [ ] `config_payload jsonb not null`.
- [ ] `is_active boolean not null default true`.
- [ ] `created_at timestamptz not null default now()`.

### challenge_attempts

- [ ] Create table `challenge_attempts` with:
- [ ] `id uuid pk`.
- [ ] `challenge_id uuid not null references challenges(id)`.
- [ ] `user_id uuid not null references users(id) on delete cascade`.
- [ ] `algorithm_id text not null references algorithms(id)`.
- [ ] `score integer not null`.
- [ ] `max_score integer not null`.
- [ ] `duration_ms integer null`.
- [ ] `attempt_payload jsonb not null`.
- [ ] `created_at timestamptz not null default now()`.
- [ ] Index `(user_id, created_at desc)`.
- [ ] Index `(algorithm_id, created_at desc)`.

### progress_snapshots

- [ ] Create table `progress_snapshots` with:
- [ ] `id uuid pk`.
- [ ] `user_id uuid not null references users(id) on delete cascade`.
- [ ] `algorithm_id text not null references algorithms(id)`.
- [ ] `mastery_level integer not null check mastery_level between 0 and 100`.
- [ ] `total_runs integer not null default 0`.
- [ ] `total_challenges integer not null default 0`.
- [ ] `last_practiced_at timestamptz null`.
- [ ] `created_at timestamptz not null default now()`.
- [ ] `updated_at timestamptz not null default now()`.
- [ ] Unique `(user_id, algorithm_id)`.

### achievements and user_achievements

- [ ] Create table `achievements` with:
- [ ] `id uuid pk`.
- [ ] `code text unique not null`.
- [ ] `title text not null`.
- [ ] `description text not null`.
- [ ] `criteria_payload jsonb not null`.

- [ ] Create table `user_achievements` with:
- [ ] `id uuid pk`.
- [ ] `user_id uuid not null references users(id) on delete cascade`.
- [ ] `achievement_id uuid not null references achievements(id) on delete cascade`.
- [ ] `awarded_at timestamptz not null default now()`.
- [ ] Unique `(user_id, achievement_id)`.

### classroom_sessions and participants

- [ ] Create table `classroom_sessions` with:
- [ ] `id uuid pk`.
- [ ] `host_user_id uuid not null references users(id) on delete cascade`.
- [ ] `title text not null`.
- [ ] `algorithm_id text not null references algorithms(id)`.
- [ ] `state_payload jsonb not null`.
- [ ] `status text not null check status in ('scheduled','live','ended')`.
- [ ] `created_at timestamptz not null default now()`.
- [ ] `updated_at timestamptz not null default now()`.
- [ ] Index `(host_user_id, created_at desc)`.

- [ ] Create table `classroom_participants` with:
- [ ] `id uuid pk`.
- [ ] `session_id uuid not null references classroom_sessions(id) on delete cascade`.
- [ ] `user_id uuid not null references users(id) on delete cascade`.
- [ ] `role text not null check role in ('host','participant')`.
- [ ] `joined_at timestamptz not null default now()`.
- [ ] Unique `(session_id, user_id)`.

### analytics_events

- [ ] Create table `analytics_events` with:
- [ ] `id uuid pk`.
- [ ] `user_id uuid null references users(id) on delete set null`.
- [ ] `session_id text not null`.
- [ ] `event_name text not null`.
- [ ] `event_time timestamptz not null`.
- [ ] `event_payload jsonb not null`.
- [ ] `created_at timestamptz not null default now()`.
- [ ] Partition by month on `event_time` (recommended for scale).

## 5.3 Migration and Seed Plan

- [ ] Migration order:
- [ ] `001_extensions`.
- [ ] `002_users_auth`.
- [ ] `003_algorithms`.
- [ ] `004_runs_replays`.
- [ ] `005_challenges_progress`.
- [ ] `006_achievements`.
- [ ] `007_classroom`.
- [ ] `008_analytics`.

- [ ] Seed data:
- [ ] baseline algorithm catalog (20+ items).
- [ ] initial achievements.
- [ ] sample challenges.

Definition of Done:
- [ ] `db:migrate` and `db:rollback` tested in CI.
- [ ] ERD exported to `/docs/architecture/erd.png`.

---

## 6) API Contract Checklist (MVP First)

## 6.1 Auth + Users

- [ ] `POST /api/v1/auth/login/oauth`
- [ ] `POST /api/v1/auth/login/magic-link/request`
- [ ] `POST /api/v1/auth/login/magic-link/verify`
- [ ] `POST /api/v1/auth/refresh`
- [ ] `POST /api/v1/auth/logout`
- [ ] `GET /api/v1/users/me`
- [ ] `PATCH /api/v1/users/me`

## 6.2 Runs + Replay

- [ ] `POST /api/v1/runs`
- [ ] `GET /api/v1/runs/:id`
- [ ] `GET /api/v1/runs`
- [ ] `POST /api/v1/runs/:id/bookmarks`
- [ ] `POST /api/v1/runs/:id/annotations`
- [ ] `POST /api/v1/replays`
- [ ] `GET /api/v1/replays/:shareId`
- [ ] `POST /api/v1/replays/:id/share`

## 6.3 Challenge + Progress + Achievements

- [ ] `POST /api/v1/challenges/attempts`
- [ ] `GET /api/v1/challenges/attempts`
- [ ] `GET /api/v1/progress/overview`
- [ ] `GET /api/v1/progress/algorithms/:algorithmId`
- [ ] `GET /api/v1/achievements`

## 6.4 Classroom + Analytics

- [ ] `POST /api/v1/classrooms`
- [ ] `POST /api/v1/classrooms/:id/start`
- [ ] `POST /api/v1/classrooms/:id/end`
- [ ] `POST /api/v1/analytics/events` (batched)

## 6.5 API Contract Artifacts

- [ ] Publish `openapi.yaml`.
- [ ] Generate typed client SDK for web app.
- [ ] Add API examples for all endpoint happy/error paths.

Definition of Done:
- [ ] OpenAPI validated in CI.
- [ ] Contract tests pass against running API.

---

## 7) Realtime and Caching Checklist

## 7.1 Redis Key Design

- [ ] Define key prefixes:
- [ ] `classroom:session:{id}:state`.
- [ ] `classroom:session:{id}:presence`.
- [ ] `rate_limit:{route}:{actor}`.
- [ ] `cache:algorithm:{id}`.
- [ ] `cache:replay:{shareId}`.

- [ ] Define TTL policy for each key type.
- [ ] Define invalidation rules for replay updates and session termination.

## 7.2 WebSocket Reliability

- [ ] Heartbeat/ping interval configured.
- [ ] Reconnect with jitter backoff.
- [ ] Last-known-step recovery handshake implemented.
- [ ] Server-authoritative timeline state.

Definition of Done:
- [ ] Load test verifies target concurrent classroom sessions without desync.

---

## 8) Security Checklist

- [ ] Enforce HTTPS everywhere.
- [ ] Add secure headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
- [ ] CSRF protection for cookie flows.
- [ ] Input schema validation on all endpoints.
- [ ] Output encoding for user-generated annotation text.
- [ ] Dependency vulnerability scan in CI.
- [ ] Secret rotation policy documented.
- [ ] Data deletion/export endpoints implemented for privacy compliance.

Definition of Done:
- [ ] Security checklist reviewed and signed before production release.

---

## 9) Observability and SLO Checklist

## 9.1 Logging

- [ ] Structured logs with `requestId`, `userId`, route, latency, status.
- [ ] Correlate web logs and API logs by `requestId`.

## 9.2 Metrics

- [ ] API metrics:
- [ ] request rate.
- [ ] p50/p95/p99 latency.
- [ ] error rate by endpoint.

- [ ] Frontend metrics:
- [ ] LCP, INP, CLS.
- [ ] step interaction latency.
- [ ] replay load success rate.

## 9.3 Tracing and Alerts

- [ ] Distributed tracing for critical flows:
- [ ] login.
- [ ] create run.
- [ ] save replay.
- [ ] load replay.

- [ ] Alerts configured:
- [ ] availability < 99.9%.
- [ ] replay load success < 99.5%.
- [ ] p95 latency breach.

Definition of Done:
- [ ] Dashboards and alert channels active in staging and prod.

---

## 10) Performance Checklist

- [ ] Offload heavy step generation to Web Workers.
- [ ] Snapshot + delta replay optimization implemented.
- [ ] Virtualize long timelines and event lists.
- [ ] Route-level and feature-level code splitting.
- [ ] Bundle budget in CI (`web` initial payload target < 250KB gzipped excluding framework chunk).
- [ ] Large graph safeguards (node/edge limits + warning mode).

Definition of Done:
- [ ] Performance budget tests pass on target devices.

---

## 11) Quality Assurance Checklist

## 11.1 Correctness

- [ ] Validate each algorithm against fixture suite.
- [ ] Validate deterministic event sequence for same seed/input.
- [ ] Validate reverse stepping from arbitrary checkpoints.

## 11.2 Resilience

- [ ] API chaos tests (timeouts, dependency failure fallback).
- [ ] Retry policy tests for replay persistence.
- [ ] Classroom reconnect tests.

## 11.3 Accessibility

- [ ] Keyboard-only walkthrough of full visualization flow.
- [ ] Screen reader announcements for step transitions.
- [ ] Contrast audits for state colors.

Definition of Done:
- [ ] QA sign-off for functional + non-functional criteria.

---

## 12) CI/CD and Release Checklist

- [ ] PR pipeline:
- [ ] lint.
- [ ] typecheck.
- [ ] unit tests.
- [ ] integration tests.

- [ ] Main branch pipeline:
- [ ] build artifacts.
- [ ] DB migration safety check.
- [ ] deploy staging.
- [ ] smoke tests.

- [ ] Production pipeline:
- [ ] manual approval gate.
- [ ] migration execute.
- [ ] rollout with health checks.
- [ ] auto rollback trigger.

Definition of Done:
- [ ] One-click rollback documented and tested.

---

## 13) Phase-by-Phase Build Plan (10 Weeks)

## Phase 1 (Week 1-2): Foundation

- [ ] Monorepo, tooling, CI baseline.
- [ ] Base schema migrations.
- [ ] Shared contracts package.
- [ ] Initial algorithm catalog seed.

Exit Gate:
- [ ] Fresh clone setup < 20 minutes.
- [ ] CI green on base skeleton.

## Phase 2 (Week 3-4): Core Visualizer MVP

- [ ] Step engine + deterministic playback.
- [ ] Sorting/searching baseline algorithms.
- [ ] Timeline + controls + code sync.
- [ ] Core API for runs.

Exit Gate:
- [ ] User can run, pause, step, reverse, and scrub reliably.

## Phase 3 (Week 5): Hyper-Visual + Scenario Lab

- [ ] State-diff overlays.
- [ ] Event minimap.
- [ ] Seeded/adversarial input generation.
- [ ] Graph/tree input editors.

Exit Gate:
- [ ] Visual transitions remain smooth on target device profile.

## Phase 4 (Week 6): Replay + Persistence

- [ ] Replay save/load/share.
- [ ] Bookmarks and annotations.
- [ ] User profile basics.

Exit Gate:
- [ ] Share link restores exact run state.

## Phase 5 (Week 7): Challenge Mode + Progress

- [ ] Challenge question engine.
- [ ] Scoring and hints.
- [ ] Progress snapshots and achievements.

Exit Gate:
- [ ] Challenge flow fully persisted and test-covered.

## Phase 6 (Week 8): Battle Arena + Classroom MVP

- [ ] 2/3 lane battle compare.
- [ ] Classroom session lifecycle + realtime controls.
- [ ] Presence and reconnect logic.

Exit Gate:
- [ ] Realtime session remains in sync under load target.

## Phase 7 (Week 9): Hardening

- [ ] Security pass.
- [ ] Performance tuning.
- [ ] Accessibility pass.
- [ ] Observability complete.

Exit Gate:
- [ ] SLOs met in staging soak test.

## Phase 8 (Week 10): Launch

- [ ] Final bug bash.
- [ ] Production rollout.
- [ ] Day-1 and Day-7 monitoring runbooks active.

Exit Gate:
- [ ] Launch checklist fully complete.

---

## 14) Launch Readiness Checklist

- [ ] No open P0 defects.
- [ ] P1 defects either fixed or explicitly waived.
- [ ] Critical user journeys pass in production-like environment.
- [ ] SLO dashboards live.
- [ ] Incident response runbook tested.
- [ ] Privacy pages and legal docs live.
- [ ] Analytics events validated.
- [ ] Rollback tested within target recovery time.

---

## 15) Post-Launch Backlog (Prioritized)

- [ ] AI Tutor step-grounded explanations.
- [ ] Replay export to GIF/MP4.
- [ ] Multi-language code tabs (Python/C++/Java).
- [ ] Algorithm plugin SDK for contributors.
- [ ] Adaptive curriculum and weak-area recommender.

---

End of document.
