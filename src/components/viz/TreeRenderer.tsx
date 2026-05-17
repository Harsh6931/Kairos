import type { TreeFrame, TreeNode } from "@/lib/algorithms";

interface Pos { x: number; y: number; node: TreeNode; }

function layout(root: TreeNode | null): { positions: Pos[]; edges: [Pos, Pos][] } {
  if (!root) return { positions: [], edges: [] };
  const positions: Pos[] = [];
  const edges: [Pos, Pos][] = [];
  function walk(n: TreeNode, lo: number, hi: number, y: number) {
    const x = (lo + hi) / 2;
    const p: Pos = { x, y, node: n };
    positions.push(p);
    if (n.left) { const lp = walk(n.left, lo, x, y + 1); edges.push([p, lp]); }
    if (n.right) { const rp = walk(n.right, x, hi, y + 1); edges.push([p, rp]); }
    return p;
  }
  walk(root, 0, 100, 0);
  return { positions, edges };
}

export function TreeRenderer({ frame }: { frame: TreeFrame }) {
  const { positions, edges } = layout(frame.root);
  const maxY = positions.reduce((m, p) => Math.max(m, p.y), 0);
  const H = (maxY + 1) * 60 + 40;
  return (
    <div className="w-full rounded-lg bg-card border border-border p-4">
      <svg viewBox={`0 0 100 ${H}`} className="w-full" style={{ height: H * 4 + "px", maxHeight: "500px" }} preserveAspectRatio="xMidYMid meet">
        {edges.map(([a, b], i) => (
          <line key={i} x1={a.x} y1={a.y * 60 + 20} x2={b.x} y2={b.y * 60 + 20}
            stroke="oklch(1 0 0 / 0.2)" strokeWidth="0.3" />
        ))}
        {positions.map((p, i) => {
          const hi = frame.highlight === p.node.value;
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y * 60 + 20} r="4"
                fill={hi ? "oklch(0.86 0.21 158)" : "oklch(0.22 0 0)"}
                stroke={hi ? "oklch(0.86 0.21 158)" : "oklch(1 0 0 / 0.3)"} strokeWidth="0.4" />
              <text x={p.x} y={p.y * 60 + 21.5} textAnchor="middle" fontSize="3"
                fill={hi ? "oklch(0.13 0 0)" : "oklch(0.985 0 0)"} fontFamily="JetBrains Mono">
                {p.node.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
