import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({ meta: [
    { title: "About — SYNTAXIS" },
    { name: "description", content: "Why SYNTAXIS exists and what it stands for." },
  ]}),
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="font-mono text-xs text-accent">// about</div>
      <h1 className="mt-2 font-display text-5xl sm:text-7xl font-black tracking-tight leading-[0.95]">
        Algorithms<br />you can <span className="text-accent">feel.</span>
      </h1>
      <div className="mt-12 space-y-8 text-lg leading-relaxed text-muted-foreground">
        <p>
          SYNTAXIS started with a stubborn idea: every algorithm is a small story in time, and most learning material strips the time out.
          You read a description, you read pseudocode, and you&apos;re left with a static diagram. The motion — the <em>kinetic logic</em> — is missing.
        </p>
        <p>
          We rebuild each algorithm as a frame-by-frame engine. Play it. Pause it. Step backward.
          Resize the input. Swap the target. Paste your own implementation in the Lab and see ours run on the same input you wrote.
        </p>
        <p>
          The catalog grows every release. Sorting and search are first. Graphs and trees are here.
          Dynamic programming, string algorithms, and bit manipulation are next.
        </p>
      </div>
      <div className="mt-16 grid sm:grid-cols-3 gap-4">
        {[
          { k: "06", v: "algorithms live" },
          { k: "∞", v: "frames per session" },
          { k: "0", v: "tracking scripts" },
        ].map(s => (
          <div key={s.v} className="p-6 rounded-xl border border-border bg-card">
            <div className="font-display text-4xl font-black text-accent">{s.k}</div>
            <div className="mt-1 font-mono text-xs uppercase text-muted-foreground">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
