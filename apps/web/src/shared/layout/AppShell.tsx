import type { PropsWithChildren } from "react";
import { Link, NavLink } from "react-router-dom";
import { navRoutes } from "../../app/router/routes";
import { classNames } from "../lib/classNames";

export function AppShell({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className="app-shell">
      <div className="ambient-glow ambient-glow-left" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-right" aria-hidden="true" />

      <aside className="sidebar">
        <div className="brand-block">
          <p className="brand-kicker">AlgoViz</p>
          <h1 className="brand-title">
            {"\u26A1"} Algorithm Lab
          </h1>
          <p className="brand-caption">Visualize every step</p>
        </div>
        <div className="sidebar-divider" />
        <nav className="sidebar-nav" aria-label="Primary">
          {navRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                classNames("nav-link", isActive && "nav-link-active")
              }
              end={route.path === "/"}
            >
              <span className="nav-emoji" aria-hidden="true">
                {route.emoji}
              </span>
              <span>{route.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-infinity">
            <span aria-hidden="true">{"\u221E"}</span>
            <h2>Infinite Imagination</h2>
          </div>
          <div className="topbar-actions">
            <Link className="button-ghost top-action-btn" to="/visualize/quick-sort">
              Visualizer
            </Link>
            <Link className="button-primary top-action-btn" to="/battle">
              Open Arena
            </Link>
          </div>
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}

