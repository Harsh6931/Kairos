import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../shared/ui/Card";
import { PlaybackControls } from "./components/PlaybackControls";
import { Timeline } from "./components/Timeline";
import { ArrayBars } from "./components/ArrayBars";
import { WatchPanel } from "./components/WatchPanel";
import { useVisualizerStore } from "./state/useVisualizerStore";

export function VisualizerPage(): JSX.Element {
  const { algorithmId = "quick-sort" } = useParams();
  const setAlgorithm = useVisualizerStore((state) => state.setAlgorithm);
  const events = useVisualizerStore((state) => state.events);
  const stepIndex = useVisualizerStore((state) => state.stepIndex);
  const speed = useVisualizerStore((state) => state.speed);
  const status = useVisualizerStore((state) => state.status);
  const stepForward = useVisualizerStore((state) => state.stepForward);
  const currentAlgorithmId = useVisualizerStore((state) => state.algorithmId);

  useEffect(() => {
    setAlgorithm(algorithmId);
  }, [algorithmId, setAlgorithm]);

  useEffect(() => {
    if (status !== "PLAYING") {
      return;
    }

    const intervalMs = Math.max(50, Math.floor(700 / speed));
    const interval = window.setInterval(() => {
      stepForward();
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [speed, status, stepForward]);

  const currentEvent = events[stepIndex];
  const previousEvent = stepIndex > 0 ? events[stepIndex - 1] : undefined;

  if (!currentEvent) {
    return (
      <div className="page-grid">
        <Card title="Visualizer unavailable">
          <p>No step events are available for this algorithm yet.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-grid">
      <Card
        className="controls-card"
        title="Algorithm Visualizer"
        subtitle="Deterministic timeline playback with step-by-step event insight."
      >
        <PlaybackControls />
      </Card>

      <Card className="timeline-card" title="Event Timeline">
        <Timeline events={events} stepIndex={stepIndex} />
      </Card>

      <div className="visualizer-layout">
        <Card className="visualizer-canvas-card state-card" title="State View">
          <ArrayBars currentEvent={currentEvent} previousEvent={previousEvent} />
          <div className="state-legend">
            <span>
              <i className="legend-dot legend-changed" /> Changed
            </span>
            <span>
              <i className="legend-dot legend-pointer" /> Active Pointer
            </span>
            <span>
              <i className="legend-dot legend-finalized" /> Finalized
            </span>
          </div>
        </Card>
        <Card
          className="visualizer-watch-card insight-card"
          title="Watch Panel"
          subtitle="Pointers, counters, and contextual explanation."
        >
          <WatchPanel
            event={currentEvent}
            status={status}
            stepIndex={stepIndex}
            totalSteps={events.length}
            algorithmId={currentAlgorithmId}
          />
        </Card>
      </div>
    </div>
  );
}
