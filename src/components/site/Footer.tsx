import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="font-display font-black text-xl">SYNTAXIS</div>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            A kinetic playground for understanding the algorithms that power software.
          </p>
        </div>
        <div>
          <div className="text-xs font-mono uppercase text-muted-foreground mb-3">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/categories" className="hover:text-accent">Categories</Link></li>
            <li><Link to="/lab" className="hover:text-accent">Code Lab</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-mono uppercase text-muted-foreground mb-3">Categories</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/categories/$slug" params={{ slug: "sorting" }} className="hover:text-accent">Sorting</Link></li>
            <li><Link to="/categories/$slug" params={{ slug: "graphs" }} className="hover:text-accent">Graphs</Link></li>
            <li><Link to="/categories/$slug" params={{ slug: "trees" }} className="hover:text-accent">Trees</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-mono uppercase text-muted-foreground mb-3">System</div>
          <div className="text-sm font-mono text-muted-foreground">
            v0.1 — <span className="text-accent">online</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 text-xs text-muted-foreground font-mono flex justify-between">
          <span>© {new Date().getFullYear()} SYNTAXIS</span>
          <span>built with kinetic logic</span>
        </div>
      </div>
    </footer>
  );
}
