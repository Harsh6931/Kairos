import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { analyzeCode, type AnalyzeResult } from "@/lib/lab.functions";
import { Visualizer } from "@/components/viz/Visualizer";
import { ALGORITHMS, type AlgoKey } from "@/lib/catalog";
import { Sparkles, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

const SAMPLES: Record<string, string> = {
  "Bubble sort": `function bubbleSort(a) {
  for (let i = 0; i < a.length; i++)
    for (let j = 0; j < a.length - i - 1; j++)
      if (a[j] > a[j+1]) [a[j], a[j+1]] = [a[j+1], a[j]];
  return a;
}`,
  "Binary search": `function search(a, t) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const m = (lo + hi) >> 1;
    if (a[m] === t) return m;
    if (a[m] < t) lo = m + 1; else hi = m - 1;
  }
  return -1;
}`,
  "BFS": `function bfs(g, s) {
  const q = [s], seen = new Set([s]);
  while (q.length) {
    const v = q.shift();
    for (const n of g[v]) if (!seen.has(n)) { seen.add(n); q.push(n); }
  }
}`,
};

export function CodeLab() {
  const [code, setCode] = useState(SAMPLES["Bubble sort"]);
  const [language, setLanguage] = useState<"javascript" | "python" | "cpp" | "java">("javascript");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const fn = useServerFn(analyzeCode);

  const run = async () => {
    setLoading(true); setResult(null);
    try {
      const r = await fn({ data: { code, language } });
      setResult(r);
    } catch (e) {
      setResult({ status: "error", algorithm: null, confidence: 0, reason: e instanceof Error ? e.message : "Request failed" });
    } finally { setLoading(false); }
  };

  const matched = result?.status === "match" && result.algorithm
    ? ALGORITHMS.find(a => a.key === (result.algorithm as AlgoKey)) : null;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Editor */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-muted-foreground">// paste your algorithm</span>
          </div>
          <select value={language} onChange={e => setLanguage(e.target.value as "javascript" | "python" | "cpp" | "java")}
            className="bg-background border border-border rounded-md px-2 py-1 text-xs font-mono">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>
        <textarea value={code} onChange={e => setCode(e.target.value)} spellCheck={false}
          className="w-full h-[420px] bg-background p-4 font-mono text-sm leading-relaxed resize-none outline-none caret-accent text-foreground"
          placeholder="// paste algorithm code here..." />
        <div className="px-4 py-3 border-t border-border flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {Object.keys(SAMPLES).map(k => (
              <button key={k} onClick={() => setCode(SAMPLES[k])}
                className="px-2 py-1 text-xs font-mono rounded-md border border-border hover:border-accent/50 hover:text-accent">
                Try: {k}
              </button>
            ))}
          </div>
          <button onClick={run} disabled={loading || !code.trim()}
            className="px-4 py-2 rounded-md bg-accent text-accent-foreground font-mono text-sm flex items-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Analyze & Visualize
          </button>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-xl border border-border bg-card p-6 min-h-[500px]">
        {!result && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-center py-20">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 grid place-items-center mb-4 animate-pulse">
              <Sparkles className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-display text-xl font-bold">Awaiting input</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Paste any algorithm. We&apos;ll detect the pattern and run our verified visualizer with sample input — your code is not executed.
            </p>
          </div>
        )}
        {loading && (
          <div className="h-full flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
            <p className="mt-4 font-mono text-xs text-muted-foreground">analyzing pattern...</p>
          </div>
        )}
        {result?.status === "error" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" /><span className="font-mono text-sm">ERROR</span>
            </div>
            <div className="font-mono text-sm p-4 rounded-md bg-destructive/10 border border-destructive/30">
              {result.reason}
            </div>
            {result.suggestion && <div className="text-sm text-muted-foreground">{result.suggestion}</div>}
          </div>
        )}
        {result?.status === "unsupported" && (
          <div className="space-y-3">
            <div className="font-mono text-sm text-amber-400">// unsupported</div>
            <div className="text-sm">{result.reason}</div>
            {result.suggestion && <div className="text-sm text-muted-foreground">{result.suggestion}</div>}
          </div>
        )}
        {matched && result && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span className="text-accent">DETECTED</span>
              <span className="text-foreground">{matched.name}</span>
              <span className="text-muted-foreground">— {matched.time}</span>
              <span className="ml-auto text-muted-foreground">confidence {(result.confidence * 100).toFixed(0)}%</span>
            </div>
            <Visualizer algoKey={matched.key} />
            <details className="text-xs font-mono text-muted-foreground">
              <summary className="cursor-pointer hover:text-accent">why this match</summary>
              <p className="mt-2 leading-relaxed">{result.reason}</p>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
