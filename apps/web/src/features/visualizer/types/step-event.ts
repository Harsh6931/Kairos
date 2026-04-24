export type EventOperation =
  | "init"
  | "compare"
  | "swap"
  | "mark-sorted"
  | "complete";

export type StepPointers = {
  i?: number;
  j?: number;
  boundary?: number;
};

export type StepMetrics = {
  comparisons: number;
  swaps: number;
  accesses: number;
};

export type StepEvent = {
  index: number;
  operation: EventOperation;
  array: number[];
  pointers: StepPointers;
  metrics: StepMetrics;
  description: string;
};

