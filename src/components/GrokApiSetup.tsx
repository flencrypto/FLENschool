"use client";

import { useState, useEffect, startTransition } from "react";
import { saveGrokApiKey, loadGrokApiKey, clearGrokApiKey } from "@/lib/grok";

interface GrokApiSetupProps {
  onSaved?: () => void;
}

export default function GrokApiSetup({ onSaved }: GrokApiSetupProps) {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [hasSavedKey, setHasSavedKey] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const existing = loadGrokApiKey();
    startTransition(() => {
      setHasSavedKey(existing.length > 0);
      if (existing) setApiKey(existing);
    });
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) return;
    saveGrokApiKey(apiKey.trim());
    setHasSavedKey(true);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onSaved?.();
  };

  const handleClear = () => {
    clearGrokApiKey();
    setApiKey("");
    setHasSavedKey(false);
  };

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-700">🤖 Grok (xAI) API Key</span>
          {hasSavedKey && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              ✓ Saved
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-2">
          Enter your{" "}
          <a
            href="https://console.x.ai"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:underline"
          >
            xAI Console
          </a>{" "}
          API key to enable live AI explanations and the Prompt Lab. Stored locally only.
        </p>
        <div className="relative">
          <input
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder="xai-…"
            className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Grok API key"
          />
          <button
            type="button"
            onClick={() => setShowKey((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            aria-label={showKey ? "Hide API key" : "Show API key"}
          >
            {showKey ? "🙈" : "👁️"}
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={!apiKey.trim()}
          className="flex-1 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {saved ? "✓ Saved!" : "Save Key"}
        </button>
        {hasSavedKey && (
          <button
            onClick={handleClear}
            className="px-3 py-2 bg-red-50 text-red-600 text-sm rounded-xl hover:bg-red-100 transition-colors"
            aria-label="Remove saved API key"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}
