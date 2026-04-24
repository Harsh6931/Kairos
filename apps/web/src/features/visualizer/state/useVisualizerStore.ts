import { create } from "zustand";
import { generateBubbleSortEvents } from "../lib/generateBubbleSortEvents";
import type { StepEvent } from "../types/step-event";

export type PlaybackStatus =
  | "IDLE"
  | "READY"
  | "PLAYING"
  | "PAUSED"
  | "COMPLETED";

type VisualizerState = {
  algorithmId: string;
  inputArray: number[];
  events: StepEvent[];
  stepIndex: number;
  status: PlaybackStatus;
  speed: number;
  setAlgorithm: (algorithmId: string) => void;
  setInputFromText: (rawInput: string) => void;
  randomize: (size?: number) => void;
  setSpeed: (speed: number) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  jumpTo: (index: number) => void;
};

const DEFAULT_INPUT = [7, 4, 9, 1, 5, 2];

function buildEvents(inputArray: number[], algorithmId: string): StepEvent[] {
  if (algorithmId === "quick-sort") {
    // Temporary mapping while we bootstrap more algorithm modules.
    return generateBubbleSortEvents(inputArray);
  }

  return generateBubbleSortEvents(inputArray);
}

function sanitizeInput(values: number[]): number[] {
  const cleaned = values
    .map((value) => Math.trunc(value))
    .filter((value) => Number.isFinite(value))
    .filter((value) => value >= 0 && value <= 999);

  return cleaned.length > 1 ? cleaned : DEFAULT_INPUT;
}

export const useVisualizerStore = create<VisualizerState>((set, get) => {
  const initialEvents = buildEvents(DEFAULT_INPUT, "quick-sort");

  return {
    algorithmId: "quick-sort",
    inputArray: DEFAULT_INPUT,
    events: initialEvents,
    stepIndex: 0,
    status: "READY",
    speed: 1,
    setAlgorithm: (algorithmId) => {
      const inputArray = get().inputArray;
      const events = buildEvents(inputArray, algorithmId);

      set({
        algorithmId,
        events,
        stepIndex: 0,
        status: "READY"
      });
    },
    setInputFromText: (rawInput) => {
      const parsed = rawInput
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => !Number.isNaN(value));

      const inputArray = sanitizeInput(parsed);
      const algorithmId = get().algorithmId;
      const events = buildEvents(inputArray, algorithmId);

      set({
        inputArray,
        events,
        stepIndex: 0,
        status: "READY"
      });
    },
    randomize: (size = 8) => {
      const length = Math.min(Math.max(size, 4), 24);
      const inputArray = Array.from({ length }, () =>
        Math.floor(Math.random() * 90) + 10
      );
      const algorithmId = get().algorithmId;
      const events = buildEvents(inputArray, algorithmId);

      set({
        inputArray,
        events,
        stepIndex: 0,
        status: "READY"
      });
    },
    setSpeed: (speed) => {
      const next = Math.max(0.25, Math.min(speed, 8));
      set({ speed: next });
    },
    play: () => {
      const { events, stepIndex } = get();
      if (events.length <= 1) {
        return;
      }
      set({ status: stepIndex >= events.length - 1 ? "COMPLETED" : "PLAYING" });
    },
    pause: () => set({ status: "PAUSED" }),
    reset: () => set({ stepIndex: 0, status: "READY" }),
    stepForward: () => {
      const { stepIndex, events } = get();
      const isLastStep = stepIndex >= events.length - 1;
      if (isLastStep) {
        set({ status: "COMPLETED" });
        return;
      }

      const nextStep = stepIndex + 1;
      set({
        stepIndex: nextStep,
        status: nextStep >= events.length - 1 ? "COMPLETED" : "PAUSED"
      });
    },
    stepBackward: () => {
      const { stepIndex } = get();
      const nextStep = Math.max(0, stepIndex - 1);
      set({
        stepIndex: nextStep,
        status: "PAUSED"
      });
    },
    jumpTo: (index) => {
      const { events } = get();
      const nextStep = Math.max(0, Math.min(index, events.length - 1));
      set({
        stepIndex: nextStep,
        status: nextStep >= events.length - 1 ? "COMPLETED" : "PAUSED"
      });
    }
  };
});

