import type { StepEvent, StepMetrics, StepPointers } from "../types/step-event";

function cloneMetrics(metrics: StepMetrics): StepMetrics {
  return {
    comparisons: metrics.comparisons,
    swaps: metrics.swaps,
    accesses: metrics.accesses
  };
}

export function generateBubbleSortEvents(input: number[]): StepEvent[] {
  const arr = [...input];
  const events: StepEvent[] = [];
  const metrics: StepMetrics = {
    comparisons: 0,
    swaps: 0,
    accesses: 0
  };

  const pushEvent = (
    operation: StepEvent["operation"],
    description: string,
    pointers: StepPointers = {}
  ) => {
    events.push({
      index: events.length,
      operation,
      array: [...arr],
      pointers,
      metrics: cloneMetrics(metrics),
      description
    });
  };

  pushEvent("init", "Initialized bubble sort run.");

  for (let boundary = arr.length - 1; boundary > 0; boundary -= 1) {
    let swapped = false;

    for (let j = 0; j < boundary; j += 1) {
      const left = arr[j]!;
      const right = arr[j + 1]!;
      metrics.comparisons += 1;
      metrics.accesses += 2;

      pushEvent(
        "compare",
        `Comparing index ${j} (${left}) with index ${j + 1} (${right}).`,
        { j, boundary }
      );

      if (left > right) {
        arr[j] = right;
        arr[j + 1] = left;
        swapped = true;
        metrics.swaps += 1;
        metrics.accesses += 2;

        pushEvent(
          "swap",
          `Swapped index ${j} and ${j + 1} because left value was larger.`,
          { j, boundary }
        );
      }
    }

    pushEvent(
      "mark-sorted",
      `Boundary index ${boundary} is now in its final position.`,
      { i: boundary, boundary }
    );

    if (!swapped) {
      pushEvent(
        "complete",
        "No swaps in this pass, array is already sorted.",
        { boundary: 0 }
      );
      return events;
    }
  }

  pushEvent("complete", "Sorting completed.");
  return events;
}
