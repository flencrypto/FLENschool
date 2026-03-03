"use client";

import { use, useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { getSubject, getTopic } from "@/data/curriculum";
import { getQuiz } from "@/data/quizzes";
import QuizComponent from "@/components/QuizComponent";
import {
  loadProgress,
  saveProgress,
  addQuizAttempt,
  BADGES,
} from "@/lib/progress";
import type { UserProgress } from "@/lib/progress";

type ViewMode = "lesson" | "quiz" | "completed";

export default function TopicPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}) {
  const { subject: subjectId, topic: topicId } = use(params);
  const subject = getSubject(subjectId);
  const topic = getTopic(subjectId, topicId);
  const quiz = getQuiz(topicId);

  const [mode, setMode] = useState<ViewMode>("lesson");
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null);

  useEffect(() => {
    startTransition(() => {
      setProgress(loadProgress());
    });
  }, []);

  const handleQuizComplete = (score: number, total: number, timeSpentSeconds: number) => {
    if (!progress) return;

    const before = { ...progress, unlockedBadges: [...progress.unlockedBadges] };
    const updated = addQuizAttempt(progress, topicId, score, total, timeSpentSeconds);

    const newly = updated.unlockedBadges.filter(
      (b) => !before.unlockedBadges.includes(b)
    );
    const pointsDiff = updated.points - before.points;

    startTransition(() => {
      setProgress(updated);
      setNewBadges(newly);
      setEarnedPoints(pointsDiff);
      setQuizResult({ score, total });
      setMode("completed");
    });
    saveProgress(updated);
  };

  if (!subject || !topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Topic not found</h1>
          <Link href="/" className="text-indigo-600 hover:underline">← Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#f0f4ff" }}>
      {/* Header */}
      <nav className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link
          href={`/subjects/${subjectId}`}
          className="text-gray-500 hover:text-indigo-600 transition-colors"
        >
          ← {subject.title}
        </Link>
        <span className="text-gray-300">|</span>
        <span className="font-semibold text-gray-700 truncate">{topic.title}</span>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setMode("lesson")}
            className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              mode === "lesson"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            📖 Lesson
          </button>
          {quiz && (
            <button
              onClick={() => setMode("quiz")}
              className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
                mode === "quiz"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              📝 Quiz
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Lesson view */}
        {mode === "lesson" && (
          <div>
            <div className={`${subject.color} rounded-3xl p-6 mb-6 text-white`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium mb-2 inline-block">
                    Year {topic.year}
                  </span>
                  <h1 className="text-xl font-black mb-1">{topic.title}</h1>
                  <p className="text-white/80 text-sm">{topic.description}</p>
                </div>
                <span className="text-4xl">{subject.icon}</span>
              </div>
              <div className="flex gap-4 mt-4 text-sm text-white/70">
                <span>⏱ {topic.estimatedMinutes} min</span>
                {quiz && <span>📝 {quiz.questions.length} quiz questions</span>}
              </div>
            </div>

            {/* Learning objectives */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                🎯 Learning Objectives
              </h2>
              <ul className="space-y-2">
                {topic.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key terms */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                📌 Key Terms
              </h2>
              <div className="space-y-3">
                {topic.keyTerms.map((kt, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                    <div className="min-w-0">
                      <span className="font-semibold text-indigo-800 text-sm">{kt.term}</span>
                      <p className="text-sm text-gray-600 mt-0.5">{kt.definition}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video placeholder */}
            <div className="bg-gray-900 rounded-2xl p-8 mb-4 text-center text-white border border-gray-700">
              <div className="text-5xl mb-3">▶️</div>
              <p className="font-semibold text-base">
                Lesson Video: {topic.title}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Short explainer video (~{Math.min(topic.estimatedMinutes, 10)} min) with captions
              </p>
              <p className="text-xs text-gray-600 mt-2">
                (Video content would be embedded here in production)
              </p>
            </div>

            {/* Start quiz CTA */}
            {quiz && (
              <button
                onClick={() => setMode("quiz")}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors text-base shadow-sm"
              >
                📝 Take the Quiz → Earn Points!
              </button>
            )}
          </div>
        )}

        {/* Quiz view */}
        {mode === "quiz" && quiz && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className={`${subject.color} w-10 h-10 rounded-xl flex items-center justify-center text-xl text-white`}>
                {subject.icon}
              </div>
              <div>
                <h1 className="font-bold text-gray-800">{topic.title}</h1>
                <p className="text-sm text-gray-500">Quiz • {quiz.questions.length} questions</p>
              </div>
            </div>
            <QuizComponent
              topicTitle={topic.title}
              questions={quiz.questions}
              onComplete={handleQuizComplete}
            />
          </div>
        )}

        {/* Completed view */}
        {mode === "completed" && quizResult && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="text-6xl mb-4">
              {quizResult.score / quizResult.total >= 0.7 ? "🎉" : "💪"}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {quizResult.score}/{quizResult.total} correct!
            </h2>
            <p className="text-gray-500 mb-4">
              {Math.round((quizResult.score / quizResult.total) * 100)}% score
            </p>

            {earnedPoints !== null && earnedPoints > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 inline-block">
                <span className="text-amber-700 font-bold">+{earnedPoints} points earned! 🌟</span>
              </div>
            )}

            {newBadges.length > 0 && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-4">
                <p className="font-bold text-indigo-800 mb-2">🏆 New badge{newBadges.length > 1 ? "s" : ""} unlocked!</p>
                <div className="flex justify-center gap-3 flex-wrap">
                  {newBadges.map((badgeId) => {
                    const badge = BADGES.find((b) => b.id === badgeId);
                    return badge ? (
                      <div key={badgeId} className="text-center badge-unlocked">
                        <div className="text-3xl">{badge.icon}</div>
                        <div className="text-xs font-semibold text-indigo-700 mt-1">{badge.name}</div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => {
                  setMode("quiz");
                  setNewBadges([]);
                  setEarnedPoints(null);
                  setQuizResult(null);
                }}
                className="py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Retry Quiz 🔄
              </button>
              <Link
                href={`/subjects/${subjectId}`}
                className="py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors text-center"
              >
                ← Back to {subject.title}
              </Link>
              <Link
                href="/"
                className="py-3 bg-white border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors text-center"
              >
                🏠 Home
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
