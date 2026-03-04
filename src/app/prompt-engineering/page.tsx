'use client';

import { useState } from 'react';

const examples = [
  {
    id: 'bad',
    label: '❌ Bad Prompt',
    prompt: 'Explain photosynthesis',
    response: 'Photosynthesis is the process by which plants convert light energy...',
    color: 'bg-red-50 border-red-200',
  },
  {
    id: 'good',
    label: '✅ Good Prompt',
    prompt: 'Explain photosynthesis to a 15-year-old GCSE Biology student in simple steps, using an analogy to a kitchen.',
    response: "Great prompt! The AI will give a clearer, more targeted response with a fun analogy that's easy to remember.",
    color: 'bg-green-50 border-green-200',
  },
  {
    id: 'best',
    label: '🌟 Best Prompt',
    prompt: 'You are a friendly GCSE Biology tutor. Explain photosynthesis to a 15-year-old with ADHD. Use: 1) A simple analogy 2) Bullet points 3) A memory trick. Keep it under 150 words.',
    response: "Perfect! Specifying role, audience, format, and length gets the most useful response for studying.",
    color: 'bg-purple-50 border-purple-200',
  },
];

const tips = [
  { icon: '🎯', title: 'Be Specific', desc: "Tell the AI exactly what subject, level, and topic you're studying" },
  { icon: '👤', title: 'Set the Role', desc: "Tell the AI to act as a tutor: 'You are a GCSE Maths teacher...'" },
  { icon: '📝', title: 'Specify Format', desc: 'Ask for bullet points, numbered lists, or tables to help with ADHD' },
  { icon: '📏', title: 'Set Length', desc: "Say 'keep it under 100 words' to get concise answers" },
  { icon: '🔄', title: 'Iterate', desc: "If the answer isn't right, say 'Make it simpler' or 'Give me an example'" },
  { icon: '❓', title: 'Ask to Explain', desc: "Use 'Explain your reasoning step by step' for Maths problems" },
];

export default function PromptEngineeringPage() {
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState('');

  const analyzePrompt = () => {
    if (!userPrompt.trim()) {
      setFeedback('Please enter a prompt first!');
      return;
    }
    const score = [
      userPrompt.length > 30 ? 1 : 0,
      /gcse|year|student|level/i.test(userPrompt) ? 1 : 0,
      /explain|list|give|show/i.test(userPrompt) ? 1 : 0,
      /bullet|steps|table|format/i.test(userPrompt) ? 1 : 0,
      /tutor|teacher|expert/i.test(userPrompt) ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    const feedbacks = [
      '❌ Very basic prompt - try adding more detail about your level and what format you want',
      '⚠️ Getting better! Try specifying you are a GCSE student and what format you want',
      '✅ Good prompt! Consider specifying a role for the AI (e.g. "act as a GCSE tutor")',
      '🌟 Great prompt! Very specific and well-structured',
      '💎 Excellent prompt! Professional-level prompt engineering!',
    ];

    setFeedback(feedbacks[Math.min(score, 4)]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🤖 Prompt Engineering</h1>
        <p className="text-gray-600 text-lg">Learn how to talk to AI like a pro to supercharge your studying!</p>
      </div>

      {/* What is prompt engineering */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-3">What is Prompt Engineering?</h2>
        <p className="text-purple-100 text-lg leading-relaxed">
          Prompt engineering is the skill of writing clear, specific instructions for AI tools like ChatGPT or Claude. 
          The better your prompt, the better the AI&apos;s response. Think of it like giving directions — the more 
          precise you are, the more likely you&apos;ll get where you want to go! 🗺️
        </p>
      </div>

      {/* Tips */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-5">💡 Top Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip) => (
            <div key={tip.title} className="bg-white rounded-2xl shadow-md p-5 flex gap-4">
              <div className="text-3xl flex-shrink-0">{tip.icon}</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-5">📊 Prompt Examples</h2>
        <div className="space-y-4">
          {examples.map((example) => (
            <div key={example.id} className={`rounded-2xl border-2 p-6 ${example.color}`}>
              <p className="font-bold text-gray-800 mb-3 text-lg">{example.label}</p>
              <div className="bg-white rounded-xl p-4 mb-3">
                <p className="text-xs text-gray-500 font-semibold mb-1">PROMPT:</p>
                <p className="text-gray-800">{example.prompt}</p>
              </div>
              <p className="text-gray-700 italic text-sm">💬 {example.response}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive practice */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🎮 Practice Zone</h2>
        <p className="text-gray-600 mb-5">Write a prompt to ask an AI to help you study a GCSE topic. We&apos;ll rate it!</p>
        <textarea
          className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-800 text-lg min-h-32 focus:border-purple-500 focus:outline-none resize-none"
          placeholder="Type your prompt here... e.g. 'Explain the causes of World War 1 for my GCSE History exam'"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <button
          onClick={analyzePrompt}
          className="mt-4 px-8 py-3 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors"
        >
          Rate My Prompt 🔍
        </button>
        {feedback && (
          <div className="mt-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
            <p className="text-purple-800 font-semibold text-lg">{feedback}</p>
          </div>
        )}
      </div>

      {/* Best practices */}
      <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">⚠️ AI Safety Tips</h2>
        <ul className="space-y-2 text-yellow-700">
          <li>🔒 Never share personal information with AI tools</li>
          <li>✅ Always check AI answers against your textbook or teacher</li>
          <li>🧠 Use AI to understand, not just to copy answers</li>
          <li>📚 AI can make mistakes - treat it as a study helper, not a definitive source</li>
          <li>🤝 Tell your teacher you used AI if asked</li>
        </ul>
      </div>
    </div>
  );
}
