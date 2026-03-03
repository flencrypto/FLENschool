"use client";

import { use, useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { getSubject } from "@/data/curriculum";
import { getQuiz } from "@/data/quizzes";
import { loadProgress, getTopicBestScore } from "@/lib/progress";
import type { UserProgress } from "@/lib/progress";

export default function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectId } = use(params);
  const subject = getSubject(subjectId);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    startTransition(() => {
      setProgress(loadProgress());
    });
  }, []);

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Subject not found</h1>
          <Link href="/" className="text-indigo-600 hover:underline">← Back to home</Link>
        </div>
      </div>
    );
  }

  const year10Topics = subject.topics.filter((t) => t.year === 10);
  const year11Topics = subject.topics.filter((t) => t.year === 11);

  return (
    <div className="min-h-screen" style={{ background: "#f0f4ff" }}>
      {/* Header */}
      <nav className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link
          href="/"
          className="text-gray-500 hover:text-indigo-600 transition-colors"
          aria-label="Back to home"
        >
          ← Back
        </Link>
        <span className="text-gray-300">|</span>
        <span className="font-bold text-gray-800">{subject.icon} {subject.title}</span>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Subject hero */}
        <div className={`${subject.color} rounded-3xl p-6 mb-8 text-white`}>
          <div className="text-4xl mb-3">{subject.icon}</div>
          <h1 className="text-2xl font-black mb-1">{subject.title}</h1>
          <p className="text-white/80 text-sm mb-2">{subject.description}</p>
          <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {subject.examBoard} • {subject.specCode}
          </span>
        </div>

        {/* Topics by year */}
        {[
          { year: 10, topics: year10Topics, label: "Year 10 Topics" },
          { year: 11, topics: year11Topics, label: "Year 11 Topics" },
        ].map(({ year, topics, label }) =>
          topics.length > 0 ? (
            <div key={year} className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 text-sm px-3 py-0.5 rounded-full font-bold">
                  Year {year}
                </span>
                {label}
              </h2>
              <div className="space-y-3">
                {topics.map((topic) => {
                  const quiz = getQuiz(topic.id);
                  const bestScore = progress
                    ? getTopicBestScore(progress, topic.id)
                    : null;
                  const isCompleted = progress?.completedTopics.includes(topic.id) ?? false;
                  const pct = bestScore
                    ? Math.round((bestScore.score / bestScore.total) * 100)
                    : null;

                  return (
                    <Link
                      key={topic.id}
                      href={`/subjects/${subjectId}/${topic.id}`}
                      className="block bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all p-4 group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                              {topic.title}
                            </h3>
                            {isCompleted && (
                              <span className="text-green-500 text-sm" aria-label="Completed">✅</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2">{topic.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-gray-400">⏱ {topic.estimatedMinutes} min</span>
                            {quiz && (
                              <span className="text-xs text-indigo-500 font-medium">
                                📝 {quiz.questions.length} questions
                              </span>
                            )}
                            {pct !== null && (
                              <span
                                className={`text-xs font-semibold ${
                                  pct >= 70 ? "text-green-600" : "text-amber-600"
                                }`}
                              >
                                Best: {pct}%
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-gray-300 group-hover:text-indigo-400 transition-colors text-xl shrink-0">
                          →
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null
        )}
      </main>
    </div>
  );
}
