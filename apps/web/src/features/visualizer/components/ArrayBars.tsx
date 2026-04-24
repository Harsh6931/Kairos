import type { StepEvent } from "../types/step-event";

type ArrayBarsProps = {
  currentEvent: StepEvent;
  previousEvent?: StepEvent;
};

export function ArrayBars({
  currentEvent,
  previousEvent
}: ArrayBarsProps): JSX.Element {
  const values = currentEvent.array;
  const maxValue = Math.max(...values, 1);

  return (
    <div className="bars-wrap">
      {values.map((value, index) => {
        const previousValue = previousEvent?.array[index];
        const hasChanged =
          previousValue !== undefined && previousValue !== value;
        const isPointer = index === currentEvent.pointers.j;
        const isBoundary = index === currentEvent.pointers.boundary;
        const isFinalized = currentEvent.pointers.i === index;

        return (
          <div className="bar-slot" key={`${index}-${value}`}>
            <div
              className={[
                "bar",
                hasChanged ? "bar-changed" : "",
                isPointer ? "bar-pointer" : "",
                isBoundary ? "bar-boundary" : "",
                isFinalized ? "bar-finalized" : ""
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ height: `${Math.max((value / maxValue) * 100, 5)}%` }}
            >
              <span className="bar-value">{value}</span>
            </div>
            <span className="bar-index">{index}</span>
          </div>
        );
      })}
    </div>
  );
}

