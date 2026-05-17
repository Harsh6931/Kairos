import { Link } from "@tanstack/react-router";
import type { Category } from "@/lib/catalog";
import { byCategory } from "@/lib/catalog";
import { ArrowUpRight } from "lucide-react";

export function CategoryCard({ category }: { category: Category }) {
  const items = byCategory(category.slug);
  return (
    <Link to="/categories/$slug" params={{ slug: category.slug }}
      className="group relative block rounded-xl border border-border bg-card p-6 overflow-hidden transition-all hover:border-accent/50 hover:-translate-y-1">
      <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/20 transition" />
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-xs font-mono uppercase text-muted-foreground">{items.length} algorithm{items.length === 1 ? "" : "s"}</div>
          <h3 className="mt-1 font-display text-2xl font-bold">{category.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{category.tagline}</p>
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:rotate-12 transition" />
      </div>
      {category.comingSoon ? (
        <div className="font-mono text-xs text-accent">// coming soon</div>
      ) : (
        <div className="flex gap-1 h-10 items-end">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="flex-1 rounded-sm bg-muted group-hover:bg-accent/60 transition-all"
              style={{ height: `${20 + (i * 17 % 80)}%`, transitionDelay: `${i * 20}ms` }} />
          ))}
        </div>
      )}
    </Link>
  );
}
