import { useMemo } from "react";
import type { StepEvent } from "../types/step-event";
import { useVisualizerStore } from "../state/useVisualizerStore";

type TimelineProps = {
  events: StepEvent[];
  stepIndex: number;
};

export function Timeline({ events, stepIndex }: TimelineProps): JSX.Element {
  const jumpTo = useVisualizerStore((state) => state.jumpTo);
  const markers = useMemo(() => {
    if (events.length <= 1) {
      return [];
    }

    return events
      .filter((event) => event.operation === "swap" || event.operation === "complete")
      .map((event) => ({
        index: event.index,
        operation: event.operation,
        position: (event.index / (events.length - 1)) * 100
      }));
  }, [events]);

  return (
    <div className="timeline-wrap">
      <label className="timeline-label" htmlFor="timeline">
        Timeline Step {stepIndex + 1} / {events.length}
      </label>
      <div className="timeline-slider-wrap">
        <input
          id="timeline"
          className="timeline-slider"
          type="range"
          min={0}
          max={events.length - 1}
          value={stepIndex}
          onChange={(event) => jumpTo(Number(event.target.value))}
        />
        <div className="timeline-markers" aria-hidden="true">
          {markers.map((marker) => (
            <span
              key={`${marker.operation}-${marker.index}`}
              className={`timeline-marker timeline-marker-${marker.operation}`}
              style={{ left: `${marker.position}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
