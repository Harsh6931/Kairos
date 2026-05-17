import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getAlgo, CATEGORIES } from "@/lib/catalog";
import { Visualizer } from "@/components/viz/Visualizer";

export const Route = createFileRoute("/algorithms/$slug")({
  component: AlgoPage,
  loader: ({ params }) => {
    const algo = getAlgo(params.slug);
    if (!algo) throw notFound();
    return { algo };
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.algo.name ?? "Algorithm"} — SYNTAXIS` },
    { name: "description", content: loaderData?.algo.blurb ?? "" },
  ]}),
});

function AlgoPage() {
  const { algo } = Route.useLoaderData();
  const [size, setSize] = useState(24);
  const cat = CATEGORIES.find(c => c.slug === algo.category)!;
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
      <Link to="/categories/$slug" params={{ slug: cat.slug }} className="font-mono text-xs text-muted-foreground hover:text-accent">← {cat.name}</Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-accent">// {algo.key}</div>
          <h1 className="mt-1 font-display text-4xl sm:text-6xl font-black tracking-tight">{algo.name}</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">{algo.blurb}</p>
        </div>
        <div className="flex gap-3">
          <Stat label="time" value={algo.time} />
          <Stat label="space" value={algo.space} />
        </div>
      </div>

      <div className="mt-10 grid lg:grid-cols-[1fr_300px] gap-6">
        <div>
          <Visualizer algoKey={algo.key} size={size} />
        </div>
        <aside className="space-y-4">
          {algo.renderer === "bars" && (
            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="font-mono text-xs text-muted-foreground uppercase mb-3">array size</div>
              <input type="range" min={8} max={48} value={size} onChange={e => setSize(parseInt(e.target.value))} className="w-full accent-accent" />
              <div className="font-mono text-xs text-accent mt-1">{size} elements</div>
            </div>
          )}
          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="font-mono text-xs text-muted-foreground uppercase mb-2">legend</div>
            <ul className="space-y-2 text-xs font-mono">
              <li className="flex items-center gap-2"><Sw c="oklch(0.86 0.21 158)" /> active / selected</li>
              <li className="flex items-center gap-2"><Sw c="oklch(0.75 0.2 50)" /> pivot / start</li>
              <li className="flex items-center gap-2"><Sw c="oklch(0.3 0 0)" /> resting</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg border border-border bg-card min-w-[110px]">
      <div className="font-mono text-[10px] uppercase text-muted-foreground">{label}</div>
      <div className="font-mono text-sm text-accent">{value}</div>
    </div>
  );
}
function Sw({ c }: { c: string }) {
  return <span className="w-3 h-3 rounded-sm" style={{ background: c }} />;
}
