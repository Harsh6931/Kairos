# AlgoViz - Algorithm Visualizer Platform
## Product Requirements Document (PRD) - v2.0 Legendary Edition - April 24, 2026

---

| Field | Details |
|---|---|
| Document Type | Product Requirements Document (PRD) |
| Product Name | AlgoViz - Algorithm Visualizer Platform |
| Version | 2.0 (Legendary Edition) |
| Date | April 24, 2026 |
| Status | Ready for Architecture and Sprint Planning |
| Audience | Engineering, Product, Design, QA, DevOps, Content |
| Primary Platform | Web (Desktop + Mobile) |
| Core Stack | React + TypeScript + Vite + Tailwind + Framer Motion |
| Production Stack | Vercel + Edge + Postgres + Redis + Object Storage + Observability |

---

## 0. What Changed From v1.0

This version keeps your original vision and upgrades it to a true production product with "legendary" interaction and visual depth.

New additions:

1. Hyper-Visual Engine with state-diff overlays, event timeline, and cinematic teaching mode.
2. Full interaction model with breakpoints, reversible timeline, variable watch, and "what-if" parameter controls.
3. Scenario Lab for edge-case generation, seeded input sets, and stress demos.
4. Battle Arena mode to compare up to three algorithms with synchronized metrics.
5. Replay Studio with shareable deep links to exact steps and annotated runs.
6. AI Tutor assistant for contextual explanations and guided learning prompts.
7. User accounts, progress tracking, achievements, and classroom/team collaboration rooms.
8. Production-grade SLOs, telemetry, feature flags, error budgets, and security requirements.

---

## 1. Executive Summary

AlgoViz is a production-grade, deeply interactive algorithm visualization platform that helps learners build intuition, not just memorization.

Unlike basic animation tools, AlgoViz lets users:

- control every execution step forward and backward,
- inspect internal state transitions in real time,
- compare algorithms under identical inputs,
- predict and test outcomes through interactive challenges,
- and replay/share exact learning sessions.

The product goal is to become the best visual algorithm learning experience on the web for students, educators, and interview-prep users.

---

## 2. Vision and Product Principle

### 2.1 Vision

Make algorithms feel physically understandable by turning execution into an explorable visual simulation.

### 2.2 Product Principles

1. Every animation must be explainable.
2. Every step must be inspectable and reversible.
3. Visual beauty must improve comprehension, not distract from it.
4. Performance and accessibility are first-class features.
5. Content should scale via a modular algorithm plugin model.

---

## 3. Problem Statement

Learners struggle to connect static code with dynamic behavior. Existing tools are either passive animations or code-only demos.

Key gaps in current solutions:

- no deep control over execution state,
- weak mapping between code and visual transitions,
- no meaningful practice mode,
- poor support for teaching live or collaborative sessions.

Opportunity:

Deliver a best-in-class visual algorithm platform combining step simulation, code synchronization, complexity instrumentation, and active learning.

---

## 4. Goals and Success Metrics

### 4.1 Product Goals

1. Launch with 20+ high-quality algorithms across core categories.
2. Maintain sub-100ms perceived latency for step interaction.
3. Support custom inputs and scenario presets for all major categories.
4. Ship hyper-visual and battle-compare modes as first-class experiences.
5. Achieve accessibility compliance (WCAG 2.2 AA).
6. Run production with measurable reliability and observability.

### 4.2 North-Star and KPI Targets

| Metric | Target | Timeframe |
|---|---|---|
| Monthly Active Users | 25,000+ | 6 months post launch |
| Average Session Duration | 10+ minutes | Ongoing |
| Step Interaction Rate | 75%+ of sessions | Ongoing |
| Challenge Mode Participation | 35%+ of sessions | Ongoing |
| Replay Link Shares | 8%+ of sessions | Ongoing |
| LCP | < 2.5s on mid-tier mobile | At launch |
| Interaction latency | < 100ms for step/scrub | At launch |
| Crash-free session rate | > 99.5% | Ongoing |
| Accessibility score | 95+ (Lighthouse + manual checks) | At launch |

---

## 5. User Personas and Jobs-to-be-Done

| Persona | Context | Job To Be Done |
|---|---|---|
| CS Student | DSA coursework + interviews | "Show me exactly why this step happened." |
| Self-Learner | Minimal CS background | "Let me learn by interacting, not memorizing." |
| Educator | Lecture or bootcamp | "Run live visual walkthroughs with audience control." |
| Interview Prep User | Speed + tradeoff focus | "Compare algorithms quickly under common constraints." |
| Team Lead | Internal upskilling | "Use reusable modules for technical onboarding." |

---

## 6. Scope

### 6.1 In Scope - Launch (v2.0)

- Sorting: Bubble, Selection, Insertion, Merge, Quick, Heap, Radix (LSD)
- Searching: Linear, Binary, Jump
- Graph: BFS, DFS, Dijkstra, A*, Prim, Kruskal, Topological Sort
- Tree: BST insert/delete/search, traversals, AVL rotations
- Core visualizer controls, code sync, complexity dashboard
- Hyper-visual timeline and state-diff overlays
- Battle Arena (up to 3 algorithms)
- Challenge mode (sorting/searching + select graph/tree flows)
- Replay Studio and deep-link sharing
- Accounts, progress persistence, and achievements

### 6.2 Near-Term Expansion (v2.x)

- Dynamic Programming: Knapsack, LCS, Coin Change, LIS
- String: KMP, Rabin-Karp, Z Algorithm, Trie search
- Advanced graph: Bellman-Ford, Floyd-Warshall, SCC, Max-Flow
- Classroom Live Sessions and team workspaces
- Multi-language code panel: JavaScript, Python, C++, Java

### 6.3 Out of Scope (for first production release)

- Native mobile apps
- Offline-first desktop packaging
- Marketplace for third-party plugin monetization

---

## 7. Core Feature Specifications

### 7.1 Hyper-Visual Engine (NEW)

Purpose: make state transitions immediately visible and memorable.

Capabilities:

1. Layered rendering system
- Data layer: bars/nodes/arrays/heaps.
- Control-flow layer: pointers, iterators, recursion stack.
- Memory layer: touched indices, read/write heatmap.
- Decision layer: active branch and condition outcomes.

2. State-Diff Overlay
- Highlights exactly what changed from step N to N+1.
- Uses ghost previews for incoming and outgoing states.

3. Event Timeline Minimap
- Horizontal timeline with event markers (compare, swap, push, pop, visit).
- Click any event to jump to that state.
- Supports bookmarks and labeled notes.

4. Cinematic Teach Mode
- Guided camera focus and slowed transitions for teaching.
- Optional narration text panel (future voice-over support).

5. Render Engine Auto-Scaling
- SVG mode for low-medium element counts.
- Canvas/WebGL mode for high-density scenarios.

### 7.2 Advanced Interactivity (Expanded)

1. Playback controls:
- Play, pause, step forward, step backward.
- Jump to start/end.
- Scrub timeline to any step.
- Speed from 0.1x to 8x.

2. Breakpoints:
- Pause at custom conditions (for example, "first pivot placed", "distance update").
- Break on event type (swap, comparison threshold reached, node discovered).

3. Variable Watch Panel:
- Live values of i, j, pivot, queue/stack size, recursion depth.
- User-selectable watch list per algorithm.

4. What-If Controls:
- Change input parameters mid-session where valid.
- Recompute from checkpoint without full page reset.

5. Direct Manipulation:
- Drag bars for custom arrays.
- Draw and edit graph nodes/edges on canvas.
- Toggle weighted/unweighted and directed/undirected modes.

### 7.3 Synchronized Code Intelligence Panel (Expanded)

- Pseudocode + implementation tabs.
- Active line highlight plus execution history trail.
- Inline step explanation for each highlighted line.
- "Why this line now?" contextual tooltip.
- Optional side-by-side code and visual lock mode.

### 7.4 Complexity and Runtime Dashboard (Expanded)

Real-time metrics:

- Comparisons
- Writes/swaps/pointer updates
- Reads/accesses
- Queue/stack operations
- Current and cumulative operation count
- Big-O reference (best/avg/worst)
- Input profile detector (sorted, nearly sorted, random, adversarial)

New visualization:

- operations-over-time chart
- memory pressure indicator
- bottleneck marker at expensive phases

### 7.5 Scenario Lab (NEW)

Purpose: teach edge cases and stress behavior.

Features:

- Preset generators: sorted, reverse, duplicates, nearly sorted, random seed.
- Adversarial generators: worst-case patterns for chosen algorithm.
- Input randomization with seed reproducibility.
- "Generate challenge case" button for quiz mode.

### 7.6 Battle Arena (NEW)

Compare up to three algorithms simultaneously:

- Shared input and synchronized timeline.
- Relative speed lane visualization ("race track").
- Side-by-side metric cards and complexity notes.
- Winner summary with context: "fastest here because..."

### 7.7 Challenge and Mission Mode (Expanded)

- Predict next step.
- Choose correct pivot/next node.
- Fix an intentionally wrong step.
- Time-bounded "beat the algorithm" missions.
- Session score, mastery tags, and weak-area suggestions.

### 7.8 Replay Studio and Sharing (NEW)

- Save complete run history with annotations.
- Share URL with algorithm, input, speed, step, camera mode, and notes.
- Export replay as short GIF/MP4 snippets (optional post-launch).
- "Teacher link" mode with hidden answers for classrooms.

### 7.9 AI Tutor Assistant (NEW)

Optional assistant panel:

- explains current step in plain language,
- answers "why not X?" questions,
- offers hints in challenge mode,
- suggests next algorithm based on weak concepts.

Guardrail:

- AI Tutor explanations must map to exact step and code line IDs from engine data.

### 7.10 Accounts, Progress, and Social Learning (NEW)

- Email/OAuth login.
- Save recent sessions and bookmarks.
- Progress map by topic and difficulty.
- Streaks, badges, and milestone certificates.
- Classroom/team mode with shared session links and facilitator controls.

---

## 8. Navigation and UX

- Left category rail with search and filters (difficulty, topic, interview frequency).
- Command palette for fast switching (`Ctrl/Cmd + K`).
- Fullscreen teaching mode.
- Mobile-optimized bottom controls and collapsible panels.
- Personalized home: resume where you left off, recommended next modules.

---

## 9. Algorithm Module System

Each algorithm is implemented as a module returning deterministic step events.

```ts
interface AlgorithmModule {
  id: string;
  name: string;
  category: "sorting" | "searching" | "graph" | "tree" | "dp" | "string";
  generate(input: AlgoInput, options?: AlgoOptions): StepEvent[];
  complexity: ComplexityInfo;
  code: { js: string; pseudo: string; py?: string; cpp?: string };
  explainers?: Record<string, string>;
  quizTemplates?: QuizTemplate[];
  supportsMidRunMutation?: boolean;
}
```

Step events must include:

- timestamp index
- operation type
- affected elements
- code-line mapping
- delta payload for reversible transitions

---

## 10. Technical Architecture

### 10.1 Frontend

- React 18 + TypeScript + Vite
- Tailwind + design tokens
- Framer Motion for transition choreography
- Zustand or Redux Toolkit for visualizer state machine
- React Router for deep links
- Web Workers for heavy step generation
- Canvas/WebGL renderer for high-density scenes

### 10.2 Backend Services

- API layer (Node.js or edge functions)
- Auth service (OAuth + email magic link)
- Postgres for users, progress, sessions, bookmarks
- Redis for caching and short-lived collaboration state
- Object storage for replay artifacts
- Real-time channel (WebSocket) for classroom sync

### 10.3 Observability and Analytics

- Product analytics events (session_start, step_jump, breakpoint_hit, quiz_submit)
- Error monitoring with stack traces and session replay
- Performance monitoring for FCP, LCP, INP, CLS, and step latency
- Feature flags and A/B testing for UI/learning experiments

### 10.4 Suggested Data Entities

- user
- algorithm_run
- run_step_bookmark
- challenge_attempt
- achievement
- classroom_session

---

## 11. Non-Functional Requirements

### 11.1 Performance

- LCP < 2.5s on mid-tier mobile
- INP < 200ms
- Step transition render budget <= 16ms at default load
- Initial JS payload target < 250KB gzipped (route-split)
- Lazy load algorithm packs by category

### 11.2 Reliability

- 99.9% monthly availability target
- Graceful degradation if AI Tutor or analytics is unavailable
- Retry strategy for replay save/share APIs

### 11.3 Accessibility (WCAG 2.2 AA)

- Full keyboard navigation for all controls
- ARIA live updates for step changes
- Reduced-motion support
- Color-independent status indicators
- Touch target >= 44x44 px

### 11.4 Security and Privacy

- CSP + strict transport security
- Input sanitization and validation for all user-provided data
- Rate-limited public APIs
- Least-privilege DB access
- GDPR-friendly data export and deletion flow

---

## 12. Design System Direction (Legendary, Not Generic)

### 12.1 Brand Direction

- Theme concept: "Digital Lab + Motion Blueprint"
- Visual hierarchy: bright data accents over deep neutral surfaces
- Distinctive typography: expressive heading font + readable UI font + coding mono

### 12.2 Color Token Strategy

- Semantic tokens by algorithm state (compare, pivot, swap, finalized, visited, queued)
- Separate tokens for "delta changed" and "focus target"
- Accessible contrast guaranteed for all paired states

### 12.3 Motion Language

- Fast micro transitions for regular stepping
- Deliberate cinematic transitions in teach mode
- Staggered reveals for event markers and code highlights

---

## 13. Delivery Plan

| Phase | Milestone | Deliverables | Duration |
|---|---|---|---|
| P1 | Core Engine | State machine, reversible steps, sorting + searching baseline | 2 weeks |
| P2 | Hyper Visuals | Timeline, state-diff overlay, code sync v2 | 2 weeks |
| P3 | Graph/Tree + Scenario Lab | Graph editor, tree visualizer, edge-case generators | 2 weeks |
| P4 | Battle + Challenge | 3-way compare, mission mode, scoring and hints | 1.5 weeks |
| P5 | Accounts + Replay Studio | Auth, persistence, share links, bookmarks | 1.5 weeks |
| P6 | Reliability + Launch | A11y audit, perf budget pass, observability, production deploy | 1 week |

Total: ~10 weeks for full v2.0 if one focused team; faster with parallel squads.

---

## 14. Acceptance Criteria (Launch Gate)

1. 20+ algorithms implemented and validated against known outputs.
2. Step forward/backward deterministically reproduces identical states.
3. Timeline jumps accurate within one step and never desync code panel.
4. Battle Arena works for at least 12 algorithms.
5. Challenge mode available for all sorting/searching and 4 graph/tree flows.
6. Replay links restore exact session state within 2 seconds.
7. Lighthouse + manual accessibility checks pass launch thresholds.
8. Production monitoring dashboards and alerts active before go-live.

---

## 15. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Visual complexity confuses users | Medium | High | Progressive disclosure: basic mode default, advanced toggles |
| Performance drops on large graphs | Medium | High | Auto-switch renderers, workers, graph-size caps |
| Scope creep from too many algorithms | High | Medium | Strict launch whitelist + plugin backlog |
| AI explanations become inaccurate | Medium | High | Step-ID-grounded prompts + human-verified templates |
| Collaboration sync instability | Low | Medium | Server-authoritative timeline + reconnect recovery |

---

## 16. Open Product Decisions

1. Should AI Tutor be enabled by default or opt-in?
2. Should Battle Arena allow 2 only at launch, then expand to 3?
3. Which login methods should ship first: Google, GitHub, email magic link?
4. Do we prioritize classroom mode before multi-language code tabs?

---

## 17. Final Positioning Statement

AlgoViz is not just an animation site. It is an interactive algorithm lab where users can inspect, manipulate, compare, test, and replay algorithm behavior with production-level performance and reliability.

---

End of Document - AlgoViz PRD v2.0 Legendary Edition
