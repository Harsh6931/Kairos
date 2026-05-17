import { ALGORITHMS } from "@/lib/catalog";
import { Link } from "@tanstack/react-router";

export function FeaturedTicker() {
  const items = [...ALGORITHMS, ...ALGORITHMS];
  return (
    <div className="relative overflow-hidden border-y border-border bg-background py-4">
      <div className="flex gap-12 animate-[marquee_40s_linear_infinite] whitespace-nowrap">
        {items.map((a, i) => (
          <Link key={i} to="/algorithms/$slug" params={{ slug: a.slug }}
            className="flex items-center gap-3 group">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-display font-bold text-xl group-hover:text-accent transition-colors">{a.name}</span>
            <span className="font-mono text-xs text-muted-foreground">{a.time}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
