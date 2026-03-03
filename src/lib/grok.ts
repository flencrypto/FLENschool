/**
 * Grok (xAI) API integration for FLENschool.
 *
 * The xAI API is OpenAI-compatible.
 * Base URL: https://api.x.ai/v1
 * Docs: https://docs.x.ai/api
 *
 * The API key is stored only in the user's localStorage – it is never
 * sent to any FLENschool server.
 */

const GROK_API_KEY_STORAGE = "flenSchool_grokApiKey";
const GROK_BASE_URL = "https://api.x.ai/v1";
/** Default model. grok-3-mini is cost-efficient for educational use. */
export const GROK_DEFAULT_MODEL = "grok-3-mini";

// ---------------------------------------------------------------------------
// API key helpers (localStorage)
// ---------------------------------------------------------------------------

export function saveGrokApiKey(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GROK_API_KEY_STORAGE, key.trim());
  } catch {
    // ignore
  }
}

export function loadGrokApiKey(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(GROK_API_KEY_STORAGE) ?? "";
  } catch {
    return "";
  }
}

export function clearGrokApiKey(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(GROK_API_KEY_STORAGE);
  } catch {
    // ignore
  }
}

export function hasGrokApiKey(): boolean {
  return loadGrokApiKey().length > 0;
}

// ---------------------------------------------------------------------------
// API call helpers
// ---------------------------------------------------------------------------

export interface GrokMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GrokRequestBody {
  model: string;
  messages: GrokMessage[];
  stream: boolean;
  max_tokens?: number;
  temperature?: number;
}

/**
 * Call the Grok API and stream the response, invoking `onChunk` for each
 * text delta and `onDone` when the stream ends.
 *
 * Returns a function that can be called to abort the stream.
 */
export function streamGrok(
  messages: GrokMessage[],
  apiKey: string,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (error: string) => void,
  options?: { model?: string; maxTokens?: number; temperature?: number }
): () => void {
  const controller = new AbortController();

  const body: GrokRequestBody = {
    model: options?.model ?? GROK_DEFAULT_MODEL,
    messages,
    stream: true,
    max_tokens: options?.maxTokens ?? 800,
    temperature: options?.temperature ?? 0.7,
  };

  fetch(`${GROK_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
    signal: controller.signal,
  })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        let msg = `Grok API error ${res.status}`;
        try {
          const json = JSON.parse(text) as { error?: { message?: string } };
          if (json.error?.message) msg = json.error.message;
        } catch {
          // ignore
        }
        onError(msg);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        onError("No response body");
        return;
      }
      const decoder = new TextDecoder();
      let buffer = "";

      const pump = async (): Promise<void> => {
        const { done, value } = await reader.read();
        if (done) {
          onDone();
          return;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === "data: [DONE]") continue;
          if (trimmed.startsWith("data: ")) {
            try {
              const json = JSON.parse(trimmed.slice(6)) as {
                choices?: { delta?: { content?: string } }[];
              };
              const delta = json.choices?.[0]?.delta?.content ?? "";
              if (delta) onChunk(delta);
            } catch {
              // ignore malformed SSE line
            }
          }
        }
        return pump();
      };

      pump().catch((err: unknown) => {
        if (
          typeof err === "object" &&
          err !== null &&
          "name" in err &&
          (err as { name: string }).name !== "AbortError"
        ) {
          onError(String(err));
        }
      });
    })
    .catch((err: unknown) => {
      if (
        typeof err === "object" &&
        err !== null &&
        "name" in err &&
        (err as { name: string }).name !== "AbortError"
      ) {
        onError(String(err));
      }
    });

  return () => controller.abort();
}

/**
 * Build the system prompt for a GCSE lesson explainer.
 */
export function buildLessonExplainerPrompt(
  topicTitle: string,
  subjectTitle: string,
  learningObjectives: string[]
): GrokMessage[] {
  return [
    {
      role: "system",
      content: `You are an enthusiastic, ADHD-friendly GCSE tutor. Your explanations are:
- Short, punchy and clear (max 250 words)
- Broken into 3–4 numbered steps or bullet points
- Full of relatable real-world examples and analogies
- Free of jargon unless you immediately define it
- Encouraging and positive in tone
Always end with one memorable "remember this!" takeaway.`,
    },
    {
      role: "user",
      content: `Explain the GCSE ${subjectTitle} topic "${topicTitle}" to a Year 10–11 student.
Key learning objectives:
${learningObjectives.map((o, i) => `${i + 1}. ${o}`).join("\n")}

Give a lively, easy-to-understand explanation as if you were narrating a short educational video.`,
    },
  ];
}
