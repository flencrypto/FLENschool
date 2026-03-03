"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import Link from "next/link";
import {
  loadGrokApiKey,
  streamGrok,
  type GrokMessage,
} from "@/lib/grok";
import GrokApiSetup from "@/components/GrokApiSetup";

// ---------------------------------------------------------------------------
// Lab exercises – guided prompts for students to try
// ---------------------------------------------------------------------------

interface Exercise {
  id: string;
  emoji: string;
  title: string;
  description: string;
  starterPrompt: string;
  category: "prompt-engineering" | "nlp-app" | "blockchain";
}

const EXERCISES: Exercise[] = [
  {
    id: "pe-1",
    emoji: "📝",
    title: "Role + Task prompt",
    description: "Write a prompt that gives Grok a role and a specific task.",
    starterPrompt:
      "You are an enthusiastic GCSE Science teacher. Explain photosynthesis to a Year 10 student in 5 bullet points, using a relatable everyday analogy.",
    category: "prompt-engineering",
  },
  {
    id: "pe-2",
    emoji: "🎭",
    title: "Few-shot examples",
    description:
      "Show Grok 2 examples of what you want, then ask it to do a third.",
    starterPrompt:
      'I will show you examples of converting casual text to formal English.\n\nCasual: "gonna grab lunch"\nFormal: "I am going to get some lunch."\n\nCasual: "tbh this is well boring"\nFormal: "Honestly, I find this rather tedious."\n\nNow convert this:\nCasual: "cant believe we got homework on a friday lol"',
    category: "prompt-engineering",
  },
  {
    id: "pe-3",
    emoji: "🔄",
    title: "Iterative refinement",
    description: "Start with a basic prompt, then improve it based on the output.",
    starterPrompt:
      "Explain blockchain in one sentence for a 14-year-old.",
    category: "prompt-engineering",
  },
  {
    id: "pe-4",
    emoji: "🧪",
    title: "Chain of thought",
    description: "Ask Grok to reason step-by-step before answering.",
    starterPrompt:
      "Think step-by-step and explain: Why is Bitcoin described as 'digital gold'? Consider scarcity, store of value, and portability in your answer.",
    category: "prompt-engineering",
  },
  {
    id: "nlp-1",
    emoji: "📱",
    title: "Describe an app",
    description: "Describe a simple app idea in plain English and ask Grok to plan it.",
    starterPrompt:
      'I want to build a simple web app. Here is what it should do:\n- Users can type a GCSE topic\n- The app shows a 5-question quiz on that topic\n- It tracks their score\n\nPlease:\n1. List the pages/screens needed\n2. Describe the data the app needs to store\n3. Write the HTML + JavaScript for the quiz input screen',
    category: "nlp-app",
  },
  {
    id: "nlp-2",
    emoji: "🤖",
    title: "Build a chatbot spec",
    description: "Use natural language to design a simple chatbot.",
    starterPrompt:
      "Design a simple GCSE revision chatbot. Describe:\n1. Its personality and tone\n2. 5 types of questions it should be able to answer\n3. What it should say when it doesn't know an answer\n4. Write a sample conversation showing the chatbot helping a student revise Biology cell biology",
    category: "nlp-app",
  },
  {
    id: "bc-1",
    emoji: "⛓️",
    title: "Explain blockchain simply",
    description: "Challenge Grok to explain blockchain using a real-world analogy.",
    starterPrompt:
      "Explain how a blockchain works using only the analogy of a school register or class notebook that many teachers share. Make it clear to a student who has never heard of cryptocurrency.",
    category: "blockchain",
  },
  {
    id: "bc-2",
    emoji: "💰",
    title: "Crypto investment debate",
    description: "Explore both sides of a crypto investment argument.",
    starterPrompt:
      "Present a balanced argument: should a 16-year-old invest their birthday money (£100) in Bitcoin?\n\n1. Give 3 reasons in favour\n2. Give 3 reasons against\n3. What would you recommend and why?\n\nKeep it relevant to a UK teenager.",
    category: "blockchain",
  },
];

// ---------------------------------------------------------------------------
// Message type
// ---------------------------------------------------------------------------

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AiLabPage() {
  const [apiKey, setApiKey] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<Exercise["category"]>("prompt-engineering");
  const abortRef = useRef<(() => void) | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    startTransition(() => {
      setApiKey(loadGrokApiKey());
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isStreaming) return;
    const key = loadGrokApiKey();
    if (!key) return;

    const userMsg: Message = { role: "user", content };
    const assistantMsg: Message = {
      role: "assistant",
      content: "",
      streaming: true,
    };

    startTransition(() => {
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setIsStreaming(true);
    });

    // Build history for context
    const history: GrokMessage[] = [
      {
        role: "system",
        content: `You are Grok, an AI assistant helping a GCSE student learn about prompt engineering, natural language app creation, and blockchain/crypto. You are enthusiastic, clear, and keep explanations suitable for a 15-year-old. Use bullet points and examples. Keep responses under 400 words unless asked for more.`,
      },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content },
    ];

    abortRef.current = streamGrok(
      history,
      key,
      (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === "assistant") {
            updated[updated.length - 1] = {
              ...last,
              content: last.content + chunk,
            };
          }
          return updated;
        });
      },
      () => {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === "assistant") {
            updated[updated.length - 1] = { ...last, streaming: false };
          }
          return updated;
        });
        setIsStreaming(false);
      },
      (err) => {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === "assistant") {
            updated[updated.length - 1] = {
              ...last,
              content: `⚠️ Error: ${err}`,
              streaming: false,
            };
          }
          return updated;
        });
        setIsStreaming(false);
      }
    );
  };

  const handleStop = () => {
    abortRef.current?.();
    setIsStreaming(false);
    setMessages((prev) => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      if (last?.streaming) {
        updated[updated.length - 1] = { ...last, streaming: false };
      }
      return updated;
    });
  };

  const handleExercise = (ex: Exercise) => {
    setInput(ex.starterPrompt);
    textareaRef.current?.focus();
  };

  const handleClearChat = () => {
    abortRef.current?.();
    startTransition(() => {
      setMessages([]);
      setIsStreaming(false);
      setInput("");
    });
  };

  const filteredExercises = EXERCISES.filter((e) => e.category === activeCategory);

  const categoryLabels: Record<Exercise["category"], string> = {
    "prompt-engineering": "🎯 Prompt Engineering",
    "nlp-app": "📱 NLP App Creation",
    blockchain: "⛓️ Blockchain",
  };

  return (
    <div className="min-h-screen" style={{ background: "#f0f4ff" }}>
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="text-gray-500 hover:text-indigo-600 transition-colors">
          ← Home
        </Link>
        <span className="text-gray-300">|</span>
        <span className="font-bold text-gray-800">🤖 AI Prompt Lab</span>
        <span className="ml-auto text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
          Powered by Grok
        </span>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* No API key banner */}
        {!apiKey && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
            <h2 className="font-bold text-amber-800 mb-2">🔑 Add your Grok API Key to start</h2>
            <p className="text-amber-700 text-sm mb-4">
              Get a free API key from{" "}
              <a
                href="https://console.x.ai"
                target="_blank"
                rel="noreferrer"
                className="underline font-medium"
              >
                console.x.ai
              </a>{" "}
              and enter it below. It is stored only in your browser.
            </p>
            <div className="max-w-sm">
              <GrokApiSetup
                onSaved={() => startTransition(() => setApiKey(loadGrokApiKey()))}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel: exercises */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sticky top-20">
              <h2 className="font-bold text-gray-800 mb-3 text-sm">💡 Lab Exercises</h2>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-1 mb-3">
                {(Object.keys(categoryLabels) as Exercise["category"][]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {filteredExercises.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => handleExercise(ex)}
                    className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 transition-all group"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg shrink-0">{ex.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                          {ex.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{ex.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {apiKey && (
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      ✓ Grok connected
                    </span>
                    <button
                      onClick={() => startTransition(() => setApiKey(""))}
                      className="text-xs text-gray-400 hover:text-gray-600"
                    >
                      Change key
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right panel: chat */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-800">Chat with Grok</span>
                  {isStreaming && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full animate-pulse">
                      ● Thinking…
                    </span>
                  )}
                </div>
                {messages.length > 0 && (
                  <button
                    onClick={handleClearChat}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Clear chat
                  </button>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-64 max-h-[500px]">
                {messages.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <div className="text-5xl mb-3">🤖</div>
                    <p className="text-sm font-medium">
                      {apiKey
                        ? "Pick an exercise on the left, or type your own prompt below!"
                        : "Add your Grok API key above to start chatting"}
                    </p>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {msg.content}
                        {msg.streaming && (
                          <span
                            className="inline-block w-0.5 h-4 bg-gray-500 ml-0.5 animate-pulse"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input area */}
              <div className="border-t border-gray-100 p-3">
                <div className="flex gap-2 items-end">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={
                      apiKey
                        ? "Type a prompt or pick an exercise… (Enter to send, Shift+Enter for new line)"
                        : "Add your API key above to start"
                    }
                    disabled={!apiKey || isStreaming}
                    rows={3}
                    className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Prompt input"
                  />
                  <div className="flex flex-col gap-2">
                    {isStreaming ? (
                      <button
                        onClick={handleStop}
                        className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-colors"
                      >
                        ⏹ Stop
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSend()}
                        disabled={!apiKey || !input.trim()}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Send →
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-center">
                  ⚠️ Always verify AI responses – Grok can make mistakes.
                </p>
              </div>
            </div>

            {/* Tips card */}
            <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
              <h3 className="font-bold text-indigo-800 text-sm mb-2">📚 Prompt Engineering Tips</h3>
              <ul className="text-xs text-indigo-700 space-y-1">
                <li>✅ <strong>Give Grok a role:</strong> {'"'}You are a GCSE Chemistry teacher…{'"'}</li>
                <li>✅ <strong>Be specific:</strong> {'"'}Explain in 5 bullet points{'"'} not just {'"'}Explain{'"'}</li>
                <li>✅ <strong>Set the audience:</strong> {'"'}For a Year 10 student with ADHD{'"'}</li>
                <li>✅ <strong>Ask for examples:</strong> {'"'}Give a real-world analogy{'"'}</li>
                <li>✅ <strong>Iterate:</strong> If the answer isn&apos;t right, refine your prompt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
