import { useVisualizer } from "@/lib/useVisualizer";
import type { AlgoKey } from "@/lib/catalog";
import { BarsRenderer } from "./BarsRenderer";
import { GridRenderer } from "./GridRenderer";
import { TreeRenderer } from "./TreeRenderer";
import { VizControls } from "./VizControls";

export function Visualizer({ algoKey, size }: { algoKey: AlgoKey; size?: number }) {
  const v = useVisualizer(algoKey, { size });
  if (!v.frame) return <div className="h-72 rounded-lg bg-card border border-border" />;
  return (
    <div className="space-y-3">
      {v.frame.kind === "bars" && <BarsRenderer frame={v.frame} />}
      {v.frame.kind === "grid" && <GridRenderer frame={v.frame} />}
      {v.frame.kind === "tree" && <TreeRenderer frame={v.frame} />}
      <div className="px-4 py-2 rounded-md bg-muted/40 border border-border font-mono text-xs text-accent">
        &gt; {v.frame.message}
      </div>
      <VizControls
        playing={v.playing}
        onPlay={() => v.setPlaying(true)}
        onPause={() => v.setPlaying(false)}
        onStep={v.step} onStepBack={v.stepBack} onReset={v.reset}
        speed={v.speed} onSpeed={v.setSpeed}
        index={v.index} total={v.total}
      />
    </div>
  );
}
