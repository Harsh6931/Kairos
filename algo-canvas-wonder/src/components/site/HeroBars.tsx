import { useEffect, useRef, useState } from "react";

export function HeroBars({ count = 48 }: { count?: number }) {
  const [bars, setBars] = useState<number[]>([]);
  const [highlight, setHighlight] = useState<[number, number] | null>(null);
  const stateRef = useRef({ i: 0, j: 0 });

  useEffect(() => {
    const initial = Array.from({ length: count }, () => 20 + Math.random() * 80);
    setBars(initial);
  }, [count]);

  useEffect(() => {
    if (!bars.length) return;
    let arr = bars.slice();
    const id = setInterval(() => {
      const s = stateRef.current;
      if (s.j >= arr.length - s.i - 1) {
        s.j = 0; s.i++;
        if (s.i >= arr.length - 1) {
          arr = Array.from({ length: count }, () => 20 + Math.random() * 80);
          s.i = 0; s.j = 0;
        }
      }
      if (arr[s.j] > arr[s.j + 1]) {
        [arr[s.j], arr[s.j + 1]] = [arr[s.j + 1], arr[s.j]];
      }
      setHighlight([s.j, s.j + 1]);
      setBars(arr.slice());
      s.j++;
    }, 80);
    return () => clearInterval(id);
  }, [count, bars.length === 0]);

  return (
    <div className="absolute inset-0 flex items-end gap-[2px] sm:gap-1 px-2 pointer-events-none opacity-30">
      {bars.map((h, i) => {
        const on = highlight && (highlight[0] === i || highlight[1] === i);
        return (
          <div key={i}
            className="flex-1 rounded-t-sm transition-all duration-200"
            style={{
              height: `${h}%`,
              background: on ? "oklch(0.86 0.21 158)" : "oklch(0.3 0 0)",
              boxShadow: on ? "0 0 20px oklch(0.86 0.21 158 / 0.6)" : "none",
            }}
          />
        );
      })}
    </div>
  );
}
