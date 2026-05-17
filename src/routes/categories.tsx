import { createFileRoute } from "@tanstack/react-router";
import { CategoryCard } from "@/components/site/CategoryCard";
import { CATEGORIES } from "@/lib/catalog";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
  head: () => ({ meta: [
    { title: "Categories — SYNTAXIS" },
    { name: "description", content: "Browse algorithm categories: sorting, searching, graphs, trees, dynamic programming, strings." },
  ]}),
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="font-mono text-xs text-accent">// all categories</div>
      <h1 className="mt-2 font-display text-5xl sm:text-6xl font-black tracking-tight">Computational domains</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Pick a domain to see the algorithms inside. Each one ships with a full interactive visualizer.
      </p>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {CATEGORIES.map(c => <CategoryCard key={c.slug} category={c} />)}
      </div>
    </div>
  );
}
