import type { StepEvent } from "../types/step-event";
import type { PlaybackStatus } from "../state/useVisualizerStore";

type WatchPanelProps = {
  event: StepEvent;
  status: PlaybackStatus;
  stepIndex: number;
  totalSteps: number;
  algorithmId: string;
};

export function WatchPanel({
  event,
  status,
  stepIndex,
  totalSteps,
  algorithmId
}: WatchPanelProps): JSX.Element {
  return (
    <div className="watch-grid">
      <div className="watch-item">
        <span className="watch-label">Algorithm</span>
        <span className="watch-value">{algorithmId}</span>
      </div>
      <div className="watch-item">
        <span className="watch-label">Status</span>
        <span className="watch-value">{status}</span>
      </div>
      <div className="watch-item">
        <span className="watch-label">Step</span>
        <span className="watch-value">
          {stepIndex + 1} / {totalSteps}
        </span>
      </div>
      <div className="watch-item">
        <span className="watch-label">Operation</span>
        <span className="watch-value">{event.operation}</span>
      </div>
      <div className="watch-item">
        <span className="watch-label">Pointer j</span>
        <span className="watch-value">{event.pointers.j ?? "-"}</span>
      </div>
      <div className="watch-item">
        <span className="watch-label">Boundary</span>
        <span className="watch-value">{event.pointers.boundary ?? "-"}</span>
      </div>
      <div className="watch-item">
        <span className="watch-label">Comparisons</span>
        <span className="watch-value">{event.metrics.comparisons}</span>
      </div>
      <div className="watch-item">
        <span className="watch-label">Swaps</span>
        <span className="watch-value">{event.metrics.swaps}</span>
      </div>
      <div className="watch-item">
        <span className="watch-label">Accesses</span>
        <span className="watch-value">{event.metrics.accesses}</span>
      </div>
      <div className="watch-item watch-item-wide">
        <span className="watch-label">Why this step?</span>
        <span className="watch-value">{event.description}</span>
      </div>
    </div>
  );
}

