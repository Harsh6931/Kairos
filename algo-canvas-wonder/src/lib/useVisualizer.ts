import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Frame } from "./algorithms";
import type { AlgoKey } from "./catalog";
import { framesFor } from "./algorithms";

export function useVisualizer(key: AlgoKey, opts?: { size?: number; target?: number }) {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const seed = useRef(0);
  const build = useCallback(() => {
    const out: Frame[] = [];
    for (const f of framesFor(key, opts)) out.push(f);
    setFrames(out);
    setIndex(0);
  }, [key, opts?.size, opts?.target]);

  useEffect(() => { build(); }, [build, seed.current]);

  useEffect(() => {
    if (!playing) return;
    const delay = 600 / speed;
    const t = setTimeout(() => {
      setIndex(i => {
        if (i >= frames.length - 1) { setPlaying(false); return i; }
        return i + 1;
      });
    }, delay);
    return () => clearTimeout(t);
  }, [playing, index, frames.length, speed]);

  const reset = () => { seed.current++; build(); setPlaying(false); };
  const step = () => setIndex(i => Math.min(i + 1, frames.length - 1));
  const stepBack = () => setIndex(i => Math.max(i - 1, 0));

  return useMemo(() => ({
    frame: frames[index],
    frames, index, playing, speed,
    setPlaying, setSpeed, setIndex,
    reset, step, stepBack,
    total: frames.length,
  }), [frames, index, playing, speed]);
}
