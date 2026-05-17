import type { GridFrame } from "@/lib/algorithms";

export function GridRenderer({ frame }: { frame: GridFrame }) {
  const cells = [];
  const pathSet = new Set(frame.path ?? []);
  const visitedSet = new Set(frame.visited);
  const frontierSet = new Set(frame.frontier);
  for (let r = 0; r < frame.rows; r++) {
    for (let c = 0; c < frame.cols; c++) {
      const k = `${r},${c}`;
      let bg = "oklch(0.18 0 0)";
      if (frame.walls.has(k)) bg = "oklch(0.3 0 0)";
      if (visitedSet.has(k)) bg = "oklch(0.4 0.12 158)";
      if (frontierSet.has(k)) bg = "oklch(0.6 0.18 158)";
      if (pathSet.has(k)) bg = "oklch(0.86 0.21 158)";
      if (k === frame.start) bg = "oklch(0.75 0.2 50)";
      if (k === frame.goal) bg = "oklch(0.86 0.21 158)";
      cells.push(<div key={k} className="aspect-square rounded-sm transition-colors" style={{ background: bg }} />);
    }
  }
  return (
    <div className="w-full p-4 rounded-lg bg-card border border-border">
      <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${frame.cols}, minmax(0,1fr))` }}>
        {cells}
      </div>
    </div>
  );
}
