## SYNTAXIS — Algorithm Visualization Site

Dark, kinetic site for visualizing data structures & algorithms. "Kinetic Logic" direction: black `#050505`, neon mint `#14f195`, Inter Tight + JetBrains Mono. Fully responsive (mobile → ultrawide).

### Pages (TanStack Start routes)

- `/` — Landing: out-of-the-box animated hero, category grid, featured ticker, mission, footer.
- `/categories` — All categories with previews.
- `/categories/$slug` — Algorithms inside a category.
- `/algorithms/$slug` — Interactive visualizer with Play / Pause / Step / Reset, speed + array-size controls, complexity card, pseudocode.
- `/lab` — **Code Lab**: paste/write code → AI detects the algorithm → visualize it (or show a clean error).
- `/auth` — **Custom auth screen** (sign-in / sign-up tabs). UI-only shell wired for Clerk later.
- `/about` — Mission, philosophy, stats.

Shared blurred sticky header + footer live in `__root.tsx`.

### Landing page — "out of the box" animation

Built with **Framer Motion** for orchestration plus CSS keyframes for ambient motion:

- **Hero canvas**: full-bleed animated bar field behind the headline — 40+ bars that continuously run a slow bubble-sort animation (height + color shift on swap, mint glow on the active pair). Pure SVG/divs, no library.
- **Headline reveal**: word-by-word mask reveal on mount (`Visualize. Understand. Master.`), JetBrains Mono complexity badge (`O(n log n)`) ticks through values every 2s.
- **Cursor parallax**: hero background grid translates ~8px on mouse move.
- **Marquee ticker**: featured algorithms scroll horizontally with hover-pause and live mini-viz dots.
- **Scroll-reveal**: each section slides + fades in via `useInView` (Framer Motion).
- **Magnetic CTAs**: primary buttons subtly attract the cursor.
- **Category cards**: each card runs its own micro-loop on hover (sorting bars, BFS node ping, BST node pulse).
- **Ambient noise**: subtle 2% grain overlay + radial mint glow that drifts.

### Custom auth screen (`/auth`)

- Split layout: left = animated visualizer panel (slow BFS grid traversal looping), right = form card.
- Tabbed **Sign in / Sign up** (shadcn `Tabs`) with email + password, "Continue with Google / GitHub" buttons (visual only).
- Form built with `react-hook-form` + `zod` for validation states.
- `onSubmit` calls a stubbed `auth.signIn()` / `auth.signUp()` in `src/lib/auth.ts` that just `console.log`s — clean integration point so the user can wire Clerk later by swapping that module's body (no UI changes needed).
- Mobile: stacks vertically, visualizer collapses to a top banner.
- Header gets a "Sign in" link → `/auth`.

### Built-in algorithm visualizers

1. Bubble Sort, 2. Quick Sort, 3. Binary Search, 4. BFS (grid), 5. DFS (grid), 6. BST insert/traverse. Other categories appear with "Coming soon" badges.

Each exports a generator producing frames `{ array, highlights, pointers, message }`. `useVisualizer` hook drives playback via `requestAnimationFrame`. Renderers: `BarsRenderer`, `GridRenderer`, `TreeRenderer`.

### Code Lab — paste/write code, auto-visualize

- Left: terminal-styled code editor (textarea + line numbers, JetBrains Mono, neon caret), language dropdown (JS / Python / C++ / Java), "Analyze & Visualize" button, sample chips.
- Right: result panel — three states:
  - **Idle** — empty state with mint pulse.
  - **Error** — terminal card with AI's explanation + suggestion.
  - **Match** — chip `DETECTED: QUICK SORT — O(n log n) — confidence 0.94`, the matched visualizer mounted inline with full controls, "Why this match" expandable.

#### Detection pipeline

`createServerFn POST` `analyzeCode` in `src/lib/lab.functions.ts` using **Lovable AI Gateway** (`google/gemini-2.5-flash`, default free model):

1. Zod-validate `{ code: 1–8000 chars, language }`.
2. Prompt the model to return JSON only:
   ```json
   { "status": "match" | "error" | "unsupported",
     "algorithm": "bubble_sort" | "quick_sort" | "binary_search" | "bfs" | "dfs" | "bst" | null,
     "confidence": 0.0,
     "reason": "short explanation",
     "suggestion": "optional hint" }
   ```
3. Zod-parse the response; map `algorithm` to the catalog and render the verified visualizer with sample input.

UI is explicit: "We detect the algorithm pattern and run our verified visualizer with sample input — your code is not executed." Requires enabling **Lovable Cloud** (for AI Gateway + server fn). I'll enable it first.

### Responsiveness

- Tailwind breakpoints `sm md lg xl 2xl`.
- Mobile-first: header collapses to a hamburger sheet, hero text scales `text-4xl → text-7xl`, category grid `1 → 2 → 3` cols, visualizer controls wrap, Code Lab stacks (editor on top, result below).
- Visualizer canvas is fluid SVG (`viewBox`), bar count auto-reduces under 640px.
- Auth split-layout becomes single-column under `md`.
- Tested mentally at 360, 414, 768, 1024, 1440.

### Design tokens (replace `src/styles.css`)

`--background #050505`, `--foreground #fafafa`, `--muted #71717a`, `--accent #14f195`, `--accent-foreground #050505`, `--border rgba(255,255,255,0.08)`. Fonts: Inter Tight (display), JetBrains Mono (data), Inter (body) via Google Fonts. Keyframes: `bar-pulse`, `node-ping`, `slide-up`, `marquee`, `grain`. Mint-on-black selection.

### File structure

```text
src/
  routes/
    __root.tsx, index.tsx, categories.tsx, categories.$slug.tsx,
    algorithms.$slug.tsx, lab.tsx, auth.tsx, about.tsx
  components/
    site/ Header.tsx, Footer.tsx, FeaturedTicker.tsx, CategoryCard.tsx,
          MagneticButton.tsx, HeroBars.tsx, GrainOverlay.tsx
    viz/  BarsRenderer.tsx, GridRenderer.tsx, TreeRenderer.tsx, VizControls.tsx
    lab/  CodeEditor.tsx, ResultPanel.tsx
    auth/ AuthForm.tsx, AuthVisualPanel.tsx
  lib/
    algorithms/  bubbleSort, quickSort, binarySearch, bfs, dfs, bst
    catalog.ts, useVisualizer.ts, lab.functions.ts, auth.ts
  styles.css
```

### Dependencies to add

- `framer-motion` (animations)
- `react-hook-form`, `@hookform/resolvers`, `zod` (auth form)

### Out of scope (now)

- Real auth provider — `/auth` is UI + stub module; Clerk wires in later.
- Executing user code in a sandbox (Code Lab is detection + verified visualizer).
- Saved runs / sharing / user accounts data.
