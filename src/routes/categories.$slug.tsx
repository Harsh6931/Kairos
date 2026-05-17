import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CATEGORIES, byCategory } from "@/lib/catalog";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/categories/$slug")({
  component: CategoryDetail,
  loader: ({ params }) => {
    const cat = CATEGORIES.find(c => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat, algos: byCategory(cat.slug) };
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.cat.name ?? "Category"} — SYNTAXIS` },
    { name: "description", content: loaderData?.cat.tagline ?? "" },
  ]}),
});

function CategoryDetail() {
  const { cat, algos } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
      <Link to="/categories" className="font-mono text-xs text-muted-foreground hover:text-accent">← all categories</Link>
      <div className="mt-4 font-mono text-xs text-accent">// {cat.slug}</div>
      <h1 className="mt-2 font-display text-5xl sm:text-6xl font-black tracking-tight">{cat.name}</h1>
      <p className="mt-3 text-muted-foreground">{cat.tagline}</p>

      {algos.length === 0 ? (
        <div className="mt-16 p-12 rounded-xl border border-border bg-card text-center">
          <div className="font-mono text-sm text-accent">// coming soon</div>
          <p className="mt-2 text-muted-foreground">Algorithms in this category are being prepared.</p>
        </div>
      ) : (
        <div className="mt-12 grid gap-4">
          {algos.map((a: typeof algos[number]) => (
            <Link key={a.slug} to="/algorithms/$slug" params={{ slug: a.slug }}
              className="group flex flex-wrap items-center gap-4 p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-colors">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-display text-2xl font-bold group-hover:text-accent transition-colors">{a.name}</h3>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/30">{a.time}</span>
                  <span className="font-mono text-xs text-muted-foreground">space {a.space}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{a.blurb}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
