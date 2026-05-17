import { createFileRoute } from "@tanstack/react-router";
import { CodeLab } from "@/components/lab/CodeLab";

export const Route = createFileRoute("/lab")({
  component: LabPage,
  head: () => ({ meta: [
    { title: "Code Lab — SYNTAXIS" },
    { name: "description", content: "Paste your algorithm code and watch the matching visualization run." },
  ]}),
});

function LabPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="font-mono text-xs text-accent">// code lab</div>
      <h1 className="mt-2 font-display text-4xl sm:text-6xl font-black tracking-tight">Paste. Detect. Watch.</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Drop any algorithm implementation. We&apos;ll classify the pattern with AI and run our verified visualizer on sample input.
      </p>
      <div className="mt-10">
        <CodeLab />
      </div>
    </div>
  );
}
