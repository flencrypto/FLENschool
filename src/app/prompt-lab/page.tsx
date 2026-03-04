"use client";
import { useState } from "react";
import { FlaskConical, Lightbulb, ChevronRight, CheckCircle, RefreshCw } from "lucide-react";

interface Lab {
  id: string;
  title: string;
  description: string;
  subject: string;
  emoji: string;
  promptHint: string;
  exampleResponse: string;
  rubric: string[];
}

const LABS: Lab[] = [
  {
    id: "storytelling",
    title: "Story Generator",
    description: "Use a prompt to generate a short story with specific characters, setting, and theme.",
    subject: "English",
    emoji: "📖",
    promptHint: 'Try: "Write a short story about a young inventor who discovers a time machine hidden in their school library. Include themes of curiosity and friendship."',
    exampleResponse: "Maya's fingers trembled as she pulled the dusty lever. The school library had always been her sanctuary, but never had she imagined it held the town's greatest secret — a brass-and-copper machine that hummed with the energy of a thousand untold stories...",
    rubric: [
      "Specified the characters clearly",
      "Included the setting",
      "Mentioned a theme",
      "Used vivid, specific language",
      "Gave a length or style instruction",
    ],
  },
  {
    id: "explain-concept",
    title: "Concept Explainer",
    description: "Ask an AI to explain a complex GCSE concept in a simple, memorable way.",
    subject: "Science",
    emoji: "🧪",
    promptHint: 'Try: "Explain osmosis to a 14-year-old using an analogy. Include a simple diagram description and a real-life example."',
    exampleResponse: "Imagine osmosis like a crowd at a concert. Water molecules are the crowd, and the semi-permeable membrane is a fence with small gaps. Lots of people (water) want to get to the exciting side (concentrated solution) through the gaps. They move from the quiet, empty side to the crowded, exciting side until the crowd evens out...",
    rubric: [
      "Named the target audience (e.g. 'explain to a 14-year-old')",
      "Asked for an analogy or metaphor",
      "Requested a real-life example",
      "Specified the level of detail needed",
      "Kept the prompt focused and specific",
    ],
  },
  {
    id: "history-debate",
    title: "Historical Debate",
    description: "Prompt an AI to argue both sides of a historical debate, then evaluate its reasoning.",
    subject: "History",
    emoji: "🏛️",
    promptHint: 'Try: "Present arguments for and against this statement: \'The Treaty of Versailles was the main cause of World War II.\' Give 3 points on each side with evidence. Write in the style of a GCSE History essay."',
    exampleResponse: "FOR: The treaty's humiliating terms fuelled German nationalism. The £6.6 billion reparations crippled the German economy, creating mass unemployment and desperation that Hitler exploited...\n\nAGAINST: Other factors were equally significant. The Great Depression of 1929 created the economic conditions for extremism across Europe, regardless of Versailles...",
    rubric: [
      "Stated the exact claim to debate",
      "Asked for a specific number of points",
      "Requested supporting evidence",
      "Specified the style (e.g. GCSE essay format)",
      "Kept a balanced, academic tone in the instruction",
    ],
  },
  {
    id: "maths-tutor",
    title: "Maths Tutor",
    description: "Ask an AI to walk you through solving a specific type of problem step-by-step.",
    subject: "Mathematics",
    emoji: "➕",
    promptHint: 'Try: "Solve this quadratic equation step-by-step: 2x² + 5x - 3 = 0. Show every step clearly and explain what you\'re doing at each stage. Then give me a similar practice question."',
    exampleResponse: "Step 1: Check if it factorises. We need two numbers that multiply to (2×-3) = -6 and add to +5. Those are +6 and -1.\nStep 2: Rewrite the middle term: 2x² + 6x - x - 3 = 0\nStep 3: Factor by grouping: 2x(x + 3) - 1(x + 3) = 0\nStep 4: (2x - 1)(x + 3) = 0\nStep 5: x = ½ or x = -3 ✓\n\nYour turn: Solve 3x² - 7x + 2 = 0",
    rubric: [
      "Gave the specific problem to solve",
      "Asked for step-by-step explanation",
      "Requested explanation of reasoning (not just steps)",
      "Asked for a practice question at the end",
      "Was specific about the method to use",
    ],
  },
  {
    id: "debug-prompt",
    title: "Prompt Debugger",
    description: "Start with a vague prompt, see a weak AI response, then refine the prompt to get a better result.",
    subject: "Prompt Engineering",
    emoji: "🐛",
    promptHint: 'First try a vague prompt like "Tell me about the water cycle" — then refine it:\n"Explain the water cycle for a GCSE Geography student. Include the names and definitions of all 5 stages (evaporation, condensation, precipitation, surface run-off, and infiltration). Use bullet points and give one example of each stage."',
    exampleResponse: "Vague response: 'The water cycle is how water moves around the Earth through evaporation and rain...'\n\nRefined response:\n• Evaporation: Water turns from liquid to gas. Example: ocean water heated by the sun.\n• Condensation: Water vapour cools to form clouds. Example: water droplets forming on a cold glass.\n• Precipitation: Water falls from clouds as rain, snow, or hail. Example: UK rainfall events.\n• Surface run-off: Water flows over land into rivers. Example: flooding after heavy rain.\n• Infiltration: Water soaks into the ground. Example: water entering aquifers.",
    rubric: [
      "Identified what was wrong with the vague prompt",
      "Added specific topics or stages to cover",
      "Specified the output format (e.g. bullet points)",
      "Targeted a specific audience or level",
      "Measured improvement between versions",
    ],
  },
  {
    id: "ethics",
    title: "AI Ethics Explorer",
    description: "Use AI to explore ethical questions about technology. Then critically evaluate the AI's own answer.",
    subject: "Computing / PSHE",
    emoji: "⚖️",
    promptHint: 'Try: "Discuss the ethical implications of AI-generated homework for students. Consider both benefits and risks. Then evaluate: should AI tools be allowed in schools? Present 3 arguments for and 3 against. Write a balanced conclusion."',
    exampleResponse: "Benefits: AI can provide instant, personalised explanations, helping students who lack access to tutors...\n\nRisks: Over-reliance may reduce critical thinking. AI can produce plausible-sounding incorrect information (hallucination)...\n\nConclusion: AI tools should be permitted as a study aid — like a calculator — but with clear guidelines that prevent misuse. Exam conditions should remain AI-free to ensure fair assessment.",
    rubric: [
      "Asked for multiple perspectives (for and against)",
      "Requested a specific number of arguments",
      "Asked for a conclusion or recommendation",
      "Prompted critical evaluation of the AI's own response",
      "Connected the topic to real-world context",
    ],
  },
];

export default function PromptLabPage() {
  const [activeLab, setActiveLab] = useState<string>(LABS[0].id);
  const [userPrompt, setUserPrompt] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [promptScore, setPromptScore] = useState<number | null>(null);

  const lab = LABS.find((l) => l.id === activeLab)!;
  const rubricItems = lab.rubric;

  const handleLabChange = (labId: string) => {
    setActiveLab(labId);
    setUserPrompt("");
    setShowResponse(false);
    setCheckedItems({});
    setPromptScore(null);
  };

  const handleRun = () => {
    if (!userPrompt.trim()) return;
    setShowResponse(true);
    setCheckedItems({});
    setPromptScore(null);
  };

  const handleCheckRubric = (item: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [item]: !prev[item] };
      const score = Math.round((Object.values(updated).filter(Boolean).length / rubricItems.length) * 100);
      setPromptScore(score);
      return updated;
    });
  };

  const handleReset = () => {
    setUserPrompt("");
    setShowResponse(false);
    setCheckedItems({});
    setPromptScore(null);
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <FlaskConical className="w-7 h-7 text-emerald-200" aria-hidden="true" />
          <h1 className="text-2xl font-black">Prompt Engineering Lab 🤖</h1>
        </div>
        <p className="text-emerald-200 text-sm leading-relaxed">
          Learn to write effective AI prompts. Great prompts = better AI responses.
          This is a key skill for the future of work and study!
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Lab selector */}
        <nav aria-label="Prompt labs" className="md:col-span-1 space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide px-1">Labs</p>
          {LABS.map((l) => (
            <button
              key={l.id}
              onClick={() => handleLabChange(l.id)}
              className={`w-full text-left p-3 rounded-2xl border-2 transition-all ${
                activeLab === l.id
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
              aria-pressed={activeLab === l.id}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl flex-shrink-0" aria-hidden="true">{l.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{l.title}</p>
                  <p className="text-xs text-gray-400">{l.subject}</p>
                </div>
              </div>
            </button>
          ))}
        </nav>

        {/* Main lab area */}
        <div className="md:col-span-3 space-y-4">
          {/* Lab brief */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <span className="text-3xl flex-shrink-0" aria-hidden="true">{lab.emoji}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{lab.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{lab.description}</p>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-lg font-medium mt-2 inline-block">
                  {lab.subject}
                </span>
              </div>
            </div>
          </div>

          {/* Hint */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-blue-700 font-semibold text-sm mb-1">Prompt Hint</p>
                <p className="text-blue-600 text-sm whitespace-pre-line">{lab.promptHint}</p>
              </div>
            </div>
          </div>

          {/* Prompt editor */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <label htmlFor="prompt-input" className="block text-sm font-bold text-gray-700 mb-2">
              ✍️ Write your prompt:
            </label>
            <textarea
              id="prompt-input"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              rows={5}
              placeholder="Type your AI prompt here. Be specific, clear, and detailed..."
              className="w-full border-2 border-gray-200 rounded-2xl p-4 text-sm font-mono focus:border-blue-400 focus:ring-0 resize-none outline-none transition-colors"
              aria-describedby="prompt-chars"
            />
            <div className="flex items-center justify-between mt-2">
              <span id="prompt-chars" className="text-xs text-gray-400">
                {userPrompt.length} characters
              </span>
              <div className="flex gap-2">
                {showResponse && (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Reset prompt and response"
                  >
                    <RefreshCw className="w-4 h-4" aria-hidden="true" />
                    Reset
                  </button>
                )}
                <button
                  onClick={handleRun}
                  disabled={!userPrompt.trim()}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Run Prompt
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* AI response (simulated) */}
          {showResponse && (
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center text-white text-sm" aria-hidden="true">
                  🤖
                </div>
                <span className="font-bold text-gray-700 text-sm">AI Response (example)</span>
                <span className="text-xs text-gray-400">(simulated for learning)</span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {lab.exampleResponse}
              </div>
            </div>
          )}

          {/* Rubric evaluation */}
          {showResponse && (
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-1">
                📋 Self-Evaluate Your Prompt
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Tick each element you included in your prompt. Be honest!
              </p>
              <div className="space-y-2" role="group" aria-label="Prompt quality checklist">
                {rubricItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleCheckRubric(item)}
                    className={`w-full text-left flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                      checkedItems[item]
                        ? "border-green-400 bg-green-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    role="checkbox"
                    aria-checked={!!checkedItems[item]}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      checkedItems[item] ? "bg-green-500 text-white" : "bg-gray-100"
                    }`} aria-hidden="true">
                      {checkedItems[item] && <CheckCircle className="w-4 h-4" />}
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </button>
                ))}
              </div>

              {checkedCount > 0 && promptScore !== null && (
                <div
                  className={`mt-4 rounded-2xl p-4 text-center ${
                    promptScore >= 80 ? "bg-green-100" : promptScore >= 60 ? "bg-yellow-100" : "bg-orange-100"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <div className="text-3xl font-black text-gray-800">{promptScore}%</div>
                  <div className="text-sm font-semibold text-gray-700 mt-1">
                    {promptScore >= 80
                      ? "🎉 Excellent prompt! Specific, detailed, and targeted."
                      : promptScore >= 60
                      ? "👍 Good start! Try adding more specific details."
                      : "📚 Needs work — be more specific about what you want."}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {checkedCount} / {rubricItems.length} elements included
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
