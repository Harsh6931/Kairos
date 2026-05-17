import { Play, Pause, SkipForward, SkipBack, RotateCw } from "lucide-react";

interface Props {
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onStepBack: () => void;
  onReset: () => void;
  speed: number;
  onSpeed: (n: number) => void;
  index: number;
  total: number;
}
export function VizControls(p: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-card border border-border">
      <button onClick={p.onStepBack} className="p-2 rounded-md hover:bg-muted" aria-label="Back"><SkipBack className="w-4 h-4" /></button>
      {p.playing
        ? <button onClick={p.onPause} className="px-4 py-2 rounded-md bg-accent text-accent-foreground font-mono text-sm flex items-center gap-2"><Pause className="w-4 h-4" />Pause</button>
        : <button onClick={p.onPlay} className="px-4 py-2 rounded-md bg-accent text-accent-foreground font-mono text-sm flex items-center gap-2"><Play className="w-4 h-4" />Play</button>}
      <button onClick={p.onStep} className="p-2 rounded-md hover:bg-muted" aria-label="Step"><SkipForward className="w-4 h-4" /></button>
      <button onClick={p.onReset} className="p-2 rounded-md hover:bg-muted" aria-label="Reset"><RotateCw className="w-4 h-4" /></button>
      <div className="flex items-center gap-2 ml-auto">
        <span className="font-mono text-xs text-muted-foreground">SPEED</span>
        <input type="range" min={0.25} max={4} step={0.25} value={p.speed}
          onChange={e => p.onSpeed(parseFloat(e.target.value))} className="w-24 accent-accent" />
        <span className="font-mono text-xs text-accent w-10">{p.speed}x</span>
      </div>
      <div className="font-mono text-xs text-muted-foreground">
        {p.index + 1}/{p.total}
      </div>
    </div>
  );
}
