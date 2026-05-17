import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/lab", label: "Code Lab" },
  { to: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative w-7 h-7 grid place-items-center rounded-md bg-accent/10 border border-accent/30">
            <Zap className="w-4 h-4 text-accent" />
          </span>
          <span className="font-display font-black text-lg tracking-tight">SYNTAXIS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(n => (
            <Link key={n.to} to={n.to}
              className={`px-3 py-1.5 text-sm font-mono rounded-md transition-colors ${loc.pathname === n.to ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Link to="/auth" className="px-4 py-1.5 text-sm font-mono rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
            Sign in
          </Link>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="px-4 py-3 flex flex-col gap-1">
            {nav.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm font-mono rounded-md hover:bg-muted">
                {n.label}
              </Link>
            ))}
            <Link to="/auth" onClick={() => setOpen(false)}
              className="px-3 py-2 text-sm font-mono rounded-md bg-accent text-accent-foreground text-center mt-2">
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
