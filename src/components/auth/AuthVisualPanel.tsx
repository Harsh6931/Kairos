import { useVisualizer } from "@/lib/useVisualizer";
import { GridRenderer } from "@/components/viz/GridRenderer";
import { useEffect } from "react";

export function AuthVisualPanel() {
  const v = useVisualizer("bfs");
  useEffect(() => { v.setPlaying(true); v.setSpeed(2); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);
  useEffect(() => {
    if (v.index >= v.total - 1 && v.total > 0) {
      const t = setTimeout(() => v.reset(), 1200);
      return () => clearTimeout(t);
    }
  }, [v.index, v.total]);
  return (
    <div className="hidden md:flex flex-col justify-between h-full p-8 lg:p-12 bg-card border-r border-border relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative">
        <div className="font-mono text-xs text-accent">// breadth-first search</div>
        <h2 className="mt-4 font-display text-3xl lg:text-5xl font-black tracking-tight">
          Algorithms,<br /><span className="text-accent">in motion.</span>
        </h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-sm">
          Sign in to bookmark visualizations, save Code Lab runs, and unlock advanced playback.
        </p>
      </div>
      <div className="relative mt-8">
        {v.frame?.kind === "grid" && <GridRenderer frame={v.frame} />}
      </div>
    </div>
  );
}
