"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import {
  loadGrokApiKey,
  streamGrok,
  buildLessonExplainerPrompt,
} from "@/lib/grok";
import Link from "next/link";

interface AiVideoPanelProps {
  topicTitle: string;
  subjectTitle: string;
  learningObjectives: string[];
  estimatedMinutes: number;
}

type PanelState = "idle" | "generating" | "done" | "error";

export default function AiVideoPanel({
  topicTitle,
  subjectTitle,
  learningObjectives,
  estimatedMinutes,
}: AiVideoPanelProps) {
  const [apiKey, setApiKey] = useState("");
  const [state, setState] = useState<PanelState>("idle");
  const [text, setText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const abortRef = useRef<(() => void) | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startTransition(() => {
      setApiKey(loadGrokApiKey());
    });
  }, []);

  // Auto-scroll as text streams in
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [text]);

  // Abort on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.();
    };
  }, []);

  const handleGenerate = () => {
    const key = loadGrokApiKey();
    if (!key) return;
    setState("generating");
    setText("");
    setErrorMsg("");

    const messages = buildLessonExplainerPrompt(
      topicTitle,
      subjectTitle,
      learningObjectives
    );

    abortRef.current = streamGrok(
      messages,
      key,
      (chunk) => setText((prev) => prev + chunk),
      () => setState("done"),
      (err) => {
        setErrorMsg(err);
        setState("error");
      }
    );
  };

  const handleStop = () => {
    abortRef.current?.();
    setState("done");
  };

  const handleReset = () => {
    abortRef.current?.();
    setState("idle");
    setText("");
    setErrorMsg("");
  };

  // No API key – show prompt to set one
  if (!apiKey) {
    return (
      <div className="bg-gray-900 rounded-2xl p-6 mb-4 text-center border border-gray-700">
        <div className="text-4xl mb-3">🤖</div>
        <p className="font-semibold text-white text-sm mb-1">AI Video Explainer</p>
        <p className="text-gray-400 text-xs mb-3">
          Add your Grok API key in Settings to unlock live AI-generated explanations for
          every topic.
        </p>
        <div className="text-xs text-gray-500 mb-3">
          ⏱ {estimatedMinutes} min lesson
        </div>
        <Link
          href="/"
          className="inline-block text-xs bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          ⚙️ Go to Settings → Add API Key
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-2xl mb-4 overflow-hidden border border-gray-700">
      {/* Fake video top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-gray-400 font-medium">🤖 AI Video Explainer · Powered by Grok</span>
        <span className="text-xs text-gray-500">⏱ ~{Math.min(estimatedMinutes, 10)} min</span>
      </div>

      {/* Content area */}
      <div className="p-5">
        {state === "idle" && (
          <div className="text-center py-6">
            <div className="text-5xl mb-3">▶️</div>
            <p className="font-semibold text-white text-base mb-1">
              {topicTitle}
            </p>
            <p className="text-gray-400 text-xs mb-4">
              Click below to generate a live AI explanation for this topic
            </p>
            <button
              onClick={handleGenerate}
              className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl text-sm hover:bg-indigo-500 transition-colors shadow"
            >
              ✨ Generate AI Explanation
            </button>
          </div>
        )}

        {(state === "generating" || state === "done") && text && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-sm">{topicTitle}</span>
                {state === "generating" && (
                  <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full animate-pulse">
                    ● Live
                  </span>
                )}
                {state === "done" && (
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                    ✓ Complete
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {state === "generating" && (
                  <button
                    onClick={handleStop}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    ⏹ Stop
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  🔄 Regenerate
                </button>
              </div>
            </div>

            {/* Streaming text */}
            <div
              ref={scrollRef}
              className="bg-gray-800 rounded-xl p-4 max-h-64 overflow-y-auto text-gray-100 text-sm leading-relaxed whitespace-pre-wrap"
              role="region"
              aria-label="AI generated explanation"
              aria-live="polite"
            >
              {text}
              {state === "generating" && (
                <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 animate-pulse" aria-hidden="true" />
              )}
            </div>
          </div>
        )}

        {state === "error" && (
          <div className="text-center py-4">
            <div className="text-3xl mb-2">⚠️</div>
            <p className="text-red-400 text-sm font-medium mb-1">Error generating explanation</p>
            <p className="text-gray-500 text-xs mb-3 break-all">{errorMsg}</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleGenerate}
                className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Try again
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-700 text-gray-300 text-sm rounded-xl hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
