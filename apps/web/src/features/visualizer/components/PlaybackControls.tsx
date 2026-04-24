import { useMemo, useState } from "react";
import { useVisualizerStore } from "../state/useVisualizerStore";

export function PlaybackControls(): JSX.Element {
  const inputArray = useVisualizerStore((state) => state.inputArray);
  const status = useVisualizerStore((state) => state.status);
  const speed = useVisualizerStore((state) => state.speed);
  const events = useVisualizerStore((state) => state.events);
  const stepIndex = useVisualizerStore((state) => state.stepIndex);
  const play = useVisualizerStore((state) => state.play);
  const pause = useVisualizerStore((state) => state.pause);
  const reset = useVisualizerStore((state) => state.reset);
  const stepForward = useVisualizerStore((state) => state.stepForward);
  const stepBackward = useVisualizerStore((state) => state.stepBackward);
  const setSpeed = useVisualizerStore((state) => state.setSpeed);
  const setInputFromText = useVisualizerStore((state) => state.setInputFromText);
  const randomize = useVisualizerStore((state) => state.randomize);

  const [rawInput, setRawInput] = useState(inputArray.join(", "));
  const isAtEnd = stepIndex >= events.length - 1;
  const isPlaying = status === "PLAYING";

  const statusLabel = useMemo(() => {
    switch (status) {
      case "READY":
        return "Ready";
      case "PLAYING":
        return "Playing";
      case "PAUSED":
        return "Paused";
      case "COMPLETED":
        return "Completed";
      default:
        return "Idle";
    }
  }, [status]);

  return (
    <div className="controls-wrap">
      <div className="controls-row">
        <button className="button-ghost" type="button" onClick={reset}>
          Reset
        </button>
        <button
          className="button-ghost"
          type="button"
          onClick={stepBackward}
          disabled={stepIndex <= 0}
        >
          Step Back
        </button>
        {!isPlaying ? (
          <button className="button-primary" type="button" onClick={play}>
            {isAtEnd ? "Replay" : "Play"}
          </button>
        ) : (
          <button className="button-primary" type="button" onClick={pause}>
            Pause
          </button>
        )}
        <button
          className="button-ghost"
          type="button"
          onClick={stepForward}
          disabled={isAtEnd}
        >
          Step Forward
        </button>
        <span className="status-pill">Status: {statusLabel}</span>
      </div>

      <div className="controls-row">
        <label className="field-group">
          <span>Input</span>
          <input
            className="text-input"
            value={rawInput}
            onChange={(event) => setRawInput(event.target.value)}
            placeholder="7, 4, 9, 1, 5, 2"
          />
        </label>
        <button
          className="button-ghost"
          type="button"
          onClick={() => setInputFromText(rawInput)}
        >
          Apply Input
        </button>
        <button className="button-ghost" type="button" onClick={() => randomize(8)}>
          Randomize
        </button>
      </div>

      <div className="controls-row">
        <label className="field-group speed-control">
          <span>Speed ({speed.toFixed(2)}x)</span>
          <input
            type="range"
            min={0.25}
            max={8}
            step={0.25}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
          />
        </label>
      </div>
    </div>
  );
}

