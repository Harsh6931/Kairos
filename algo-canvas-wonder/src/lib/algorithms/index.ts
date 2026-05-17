import type { AlgoKey } from "../catalog";

export interface BarsFrame {
  kind: "bars";
  array: number[];
  highlights?: number[];
  pivot?: number;
  pointers?: { lo?: number; hi?: number; mid?: number };
  message: string;
}
export interface GridFrame {
  kind: "grid";
  rows: number;
  cols: number;
  walls: Set<string>;
  visited: string[];
  frontier: string[];
  start: string;
  goal: string;
  path?: string[];
  message: string;
}
export interface TreeNode { value: number; left: TreeNode | null; right: TreeNode | null; }
export interface TreeFrame {
  kind: "tree";
  root: TreeNode | null;
  highlight?: number;
  visited?: number[];
  message: string;
}
export type Frame = BarsFrame | GridFrame | TreeFrame;

function clone(arr: number[]) { return arr.slice(); }

export function* bubbleSort(input: number[]): Generator<BarsFrame> {
  const a = clone(input);
  yield { kind: "bars", array: clone(a), message: "Start" };
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      yield { kind: "bars", array: clone(a), highlights: [j, j + 1], message: `Compare ${a[j]} & ${a[j+1]}` };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { kind: "bars", array: clone(a), highlights: [j, j + 1], message: `Swap` };
      }
    }
  }
  yield { kind: "bars", array: clone(a), message: "Sorted" };
}

export function* quickSort(input: number[]): Generator<BarsFrame> {
  const a = clone(input);
  yield { kind: "bars", array: clone(a), message: "Start" };
  function* qs(lo: number, hi: number): Generator<BarsFrame> {
    if (lo >= hi) return;
    const pivot = a[hi];
    yield { kind: "bars", array: clone(a), pivot: hi, pointers: { lo, hi }, message: `Pivot=${pivot}` };
    let i = lo;
    for (let j = lo; j < hi; j++) {
      yield { kind: "bars", array: clone(a), pivot: hi, highlights: [j, i], message: `Scan` };
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        yield { kind: "bars", array: clone(a), pivot: hi, highlights: [i, j], message: `Swap` };
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    yield { kind: "bars", array: clone(a), highlights: [i], message: `Place pivot` };
    yield* qs(lo, i - 1);
    yield* qs(i + 1, hi);
  }
  yield* qs(0, a.length - 1);
  yield { kind: "bars", array: clone(a), message: "Sorted" };
}

export function* binarySearch(input: number[], target: number): Generator<BarsFrame> {
  const a = clone(input).sort((x, y) => x - y);
  let lo = 0, hi = a.length - 1;
  yield { kind: "bars", array: clone(a), pointers: { lo, hi }, message: `Searching ${target}` };
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    yield { kind: "bars", array: clone(a), pointers: { lo, hi, mid }, highlights: [mid], message: `Check mid=${a[mid]}` };
    if (a[mid] === target) {
      yield { kind: "bars", array: clone(a), highlights: [mid], message: `Found at ${mid}` };
      return;
    }
    if (a[mid] < target) lo = mid + 1; else hi = mid - 1;
  }
  yield { kind: "bars", array: clone(a), message: "Not found" };
}

interface GridConfig { rows: number; cols: number; walls: string[]; start: string; goal: string; }
const k = (r: number, c: number) => `${r},${c}`;
const parse = (s: string) => s.split(",").map(Number) as [number, number];

export function* bfs(cfg: GridConfig): Generator<GridFrame> {
  const walls = new Set(cfg.walls);
  const visited: string[] = [];
  const frontier: string[] = [cfg.start];
  const parents = new Map<string, string>();
  const seen = new Set<string>([cfg.start]);
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
  yield { kind: "grid", rows: cfg.rows, cols: cfg.cols, walls, visited: [], frontier: [cfg.start], start: cfg.start, goal: cfg.goal, message: "Start BFS" };
  while (frontier.length) {
    const cur = frontier.shift()!;
    visited.push(cur);
    yield { kind: "grid", rows: cfg.rows, cols: cfg.cols, walls, visited: [...visited], frontier: [...frontier], start: cfg.start, goal: cfg.goal, message: `Visit ${cur}` };
    if (cur === cfg.goal) {
      const path: string[] = [];
      let c: string | undefined = cur;
      while (c) { path.unshift(c); c = parents.get(c); }
      yield { kind: "grid", rows: cfg.rows, cols: cfg.cols, walls, visited: [...visited], frontier: [], start: cfg.start, goal: cfg.goal, path, message: "Goal reached" };
      return;
    }
    const [r, c] = parse(cur);
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      const nk = k(nr, nc);
      if (nr<0||nc<0||nr>=cfg.rows||nc>=cfg.cols||walls.has(nk)||seen.has(nk)) continue;
      seen.add(nk); parents.set(nk, cur); frontier.push(nk);
    }
  }
}

export function* dfs(cfg: GridConfig): Generator<GridFrame> {
  const walls = new Set(cfg.walls);
  const visited: string[] = [];
  const stack: string[] = [cfg.start];
  const seen = new Set<string>([cfg.start]);
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
  yield { kind: "grid", rows: cfg.rows, cols: cfg.cols, walls, visited: [], frontier: [cfg.start], start: cfg.start, goal: cfg.goal, message: "Start DFS" };
  while (stack.length) {
    const cur = stack.pop()!;
    visited.push(cur);
    yield { kind: "grid", rows: cfg.rows, cols: cfg.cols, walls, visited: [...visited], frontier: [...stack], start: cfg.start, goal: cfg.goal, message: `Visit ${cur}` };
    if (cur === cfg.goal) return;
    const [r, c] = parse(cur);
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      const nk = k(nr, nc);
      if (nr<0||nc<0||nr>=cfg.rows||nc>=cfg.cols||walls.has(nk)||seen.has(nk)) continue;
      seen.add(nk); stack.push(nk);
    }
  }
}

export function* bstInsert(values: number[]): Generator<TreeFrame> {
  let root: TreeNode | null = null;
  const visited: number[] = [];
  yield { kind: "tree", root, message: "Empty tree" };
  for (const v of values) {
    if (!root) { root = { value: v, left: null, right: null }; yield { kind: "tree", root, highlight: v, message: `Insert ${v} as root` }; continue; }
    let cur: TreeNode = root;
    while (true) {
      visited.push(cur.value);
      yield { kind: "tree", root, highlight: cur.value, visited: [...visited], message: `Compare ${v} vs ${cur.value}` };
      if (v < cur.value) {
        if (!cur.left) { cur.left = { value: v, left: null, right: null }; break; }
        cur = cur.left;
      } else {
        if (!cur.right) { cur.right = { value: v, left: null, right: null }; break; }
        cur = cur.right;
      }
    }
    yield { kind: "tree", root, highlight: v, message: `Inserted ${v}` };
  }
}

const SAMPLE_GRID: GridConfig = {
  rows: 10, cols: 16,
  walls: ["2,4","3,4","4,4","5,4","6,4","6,5","6,6","6,7","2,10","3,10","4,10","5,10","6,10","7,10"],
  start: "1,1", goal: "8,14"
};

export function framesFor(key: AlgoKey, opts?: { size?: number; target?: number }): Generator<Frame> {
  const size = opts?.size ?? 24;
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
  switch (key) {
    case "bubble_sort": return bubbleSort(arr) as Generator<Frame>;
    case "quick_sort": return quickSort(arr) as Generator<Frame>;
    case "binary_search": {
      const sorted = arr.slice().sort((a,b)=>a-b);
      return binarySearch(sorted, opts?.target ?? sorted[Math.floor(sorted.length/2)]) as Generator<Frame>;
    }
    case "bfs": return bfs(SAMPLE_GRID) as Generator<Frame>;
    case "dfs": return dfs(SAMPLE_GRID) as Generator<Frame>;
    case "bst": return bstInsert([50, 30, 70, 20, 40, 60, 80, 10, 35, 65]) as Generator<Frame>;
  }
}
