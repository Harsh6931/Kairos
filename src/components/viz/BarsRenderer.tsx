import type { BarsFrame } from "@/lib/algorithms";

export function BarsRenderer({ frame }: { frame: BarsFrame }) {
  const max = Math.max(...frame.array, 1);
  return (
    <div className="w-full h-72 sm:h-96 flex items-end gap-1 p-4 rounded-lg bg-card border border-border">
      {frame.array.map((v, i) => {
        const isHi = frame.highlights?.includes(i);
        const isPivot = frame.pivot === i;
        const isMid = frame.pointers?.mid === i;
        const inRange = frame.pointers && frame.pointers.lo !== undefined && frame.pointers.hi !== undefined
          ? i >= frame.pointers.lo! && i <= frame.pointers.hi!
          : true;
        let bg = "oklch(0.3 0 0)";
        if (!inRange) bg = "oklch(0.18 0 0)";
        if (isHi) bg = "oklch(0.86 0.21 158)";
        if (isPivot) bg = "oklch(0.75 0.2 50)";
        if (isMid) bg = "oklch(0.86 0.21 158)";
        return (
          <div key={i} className="flex-1 rounded-t-sm transition-all duration-200 relative"
            style={{ height: `${(v / max) * 100}%`, background: bg, boxShadow: isHi || isMid ? "0 0 16px oklch(0.86 0.21 158 / 0.6)" : "none" }}>
            {frame.array.length <= 32 && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground">{v}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
