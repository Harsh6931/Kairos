import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "./ai-gateway";

const Input = z.object({
  code: z.string().min(1).max(8000),
  language: z.enum(["javascript", "python", "cpp", "java"]).default("javascript"),
});

const ALGO_KEYS = ["bubble_sort", "quick_sort", "binary_search", "bfs", "dfs", "bst"] as const;

export interface AnalyzeResult {
  status: "match" | "error" | "unsupported";
  algorithm: (typeof ALGO_KEYS)[number] | null;
  confidence: number;
  reason: string;
  suggestion?: string;
}

export const analyzeCode = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }): Promise<AnalyzeResult> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { status: "error", algorithm: null, confidence: 0, reason: "AI gateway not configured." };
    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-2.5-flash");

    const system = `You classify code snippets into one of these algorithms: bubble_sort, quick_sort, binary_search, bfs, dfs, bst. Return STRICT JSON only, no prose, no markdown:
{"status":"match"|"error"|"unsupported","algorithm": one of the keys or null,"confidence":0..1,"reason":"<one short sentence>","suggestion":"<optional hint>"}
- "match" when you're confident the code implements one of the supported algorithms.
- "unsupported" when it's clearly an algorithm but not in the list.
- "error" when the code is broken, empty, or not an algorithm.`;

    const prompt = `Language: ${data.language}\n\nCode:\n\`\`\`\n${data.code}\n\`\`\``;

    try {
      const { text } = await generateText({ model, system, prompt });
      const m = text.match(/\{[\s\S]*\}/);
      if (!m) return { status: "error", algorithm: null, confidence: 0, reason: "Model did not return JSON." };
      const parsed = JSON.parse(m[0]);
      const Out = z.object({
        status: z.enum(["match", "error", "unsupported"]),
        algorithm: z.enum(ALGO_KEYS).nullable(),
        confidence: z.number().min(0).max(1),
        reason: z.string(),
        suggestion: z.string().optional(),
      });
      return Out.parse(parsed);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Analysis failed.";
      return { status: "error", algorithm: null, confidence: 0, reason: msg };
    }
  });
