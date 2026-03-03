"use client";

import { useEffect, useState, startTransition } from "react";
import Link from "next/link";
import { curriculum, getAllTopics } from "@/data/curriculum";
import {
  loadProgress,
  saveProgress,
  getWeakTopics,
  getLevelFromPoints,
  BADGES,
} from "@/lib/progress";
import type { UserProgress } from "@/lib/progress";

function ProgressBar({ value, max, color = "bg-indigo-500" }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <span className="text-xs font-semibold text-gray-600 w-8 text-right">{pct}%</span>
    </div>
  );
}

export default function DashboardPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setProgress(loadProgress());
    });
  }, []);

  if (!progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  const weakTopics = getWeakTopics(progress);
  const allTopics = getAllTopics();
  const totalTopics = allTopics.length;
  const completedTopics = progress.completedTopics.length;
  const level = getLevelFromPoints(progress.points);
  const totalBadges = BADGES.length;

  // Subject-by-subject breakdown
  const subjectStats = curriculum.map((subject) => {
    const total = subject.topics.length;
    const completed = subject.topics.filter((t) =>
      progress.completedTopics.includes(t.id)
    ).length;
    const attempts = progress.quizAttempts.filter((a) =>
      subject.topics.some((t) => t.id === a.topicId)
    );
    const avgScore =
      attempts.length > 0
        ? Math.round(
            (attempts.reduce((sum, a) => sum + a.score / a.totalQuestions, 0) /
              attempts.length) *
              100
          )
        : null;
    return { subject, total, completed, avgScore };
  });

  // Recent quiz attempts (last 5)
  const recentAttempts = [...progress.quizAttempts]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const handleReset = () => {
    const fresh = {
      userId: "student",
      points: 0,
      level: 1,
      completedTopics: [],
      quizAttempts: [],
      streakDays: 0,
      lastStudyDate: "",
      totalStudyMinutes: 0,
      unlockedBadges: [],
      weeklyReflections: [],
    };
    setProgress(fresh);
    saveProgress(fresh);
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="text-gray-500 hover:text-indigo-600 transition-colors">
          ← Home
        </Link>
        <span className="text-gray-300">|</span>
        <span className="font-bold text-gray-800">📊 Parent / Teacher Dashboard</span>
        <span className="ml-auto text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
          Overview
        </span>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-gray-800 mb-6">Student Progress Report</h1>

        {/* KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Points", value: progress.points, icon: "⭐", color: "text-amber-600" },
            { label: "Current Level", value: level, icon: "🎓", color: "text-indigo-600" },
            { label: "Topics Done", value: `${completedTopics}/${totalTopics}`, icon: "📚", color: "text-green-600" },
            { label: "Badges", value: `${progress.unlockedBadges.length}/${totalBadges}`, icon: "🏆", color: "text-orange-500" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="text-2xl mb-1">{icon}</div>
              <div className={`text-2xl font-black ${color}`}>{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* More stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="text-sm font-semibold text-gray-700 mb-1">Study Time</div>
            <div className="text-2xl font-black text-indigo-600">{progress.totalStudyMinutes} min</div>
            <div className="text-xs text-gray-400">Total recorded</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="text-sm font-semibold text-gray-700 mb-1">Quizzes Taken</div>
            <div className="text-2xl font-black text-indigo-600">{progress.quizAttempts.length}</div>
            <div className="text-xs text-gray-400">All attempts</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="text-sm font-semibold text-gray-700 mb-1">Day Streak</div>
            <div className="text-2xl font-black text-orange-500">{progress.streakDays} 🔥</div>
            <div className="text-xs text-gray-400">Consecutive days</div>
          </div>
        </div>

        {/* Weak topics alert */}
        {weakTopics.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
            <h2 className="font-bold text-amber-800 mb-2">⚠️ Topics Needing Support</h2>
            <p className="text-amber-700 text-sm mb-3">
              The student has scored below 60% on these topics. Consider reviewing them together:
            </p>
            <div className="flex flex-wrap gap-2">
              {weakTopics.map((t) => (
                <span key={t} className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Subject breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4">📚 Subject Progress</h2>
          <div className="space-y-4">
            {subjectStats.map(({ subject, total, completed, avgScore }) => (
              <div key={subject.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {subject.icon} {subject.title}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{completed}/{total} topics</span>
                    {avgScore !== null && (
                      <span
                        className={`text-xs font-semibold ${
                          avgScore >= 70 ? "text-green-600" : avgScore >= 50 ? "text-amber-600" : "text-red-500"
                        }`}
                      >
                        Avg: {avgScore}%
                      </span>
                    )}
                  </div>
                </div>
                <ProgressBar
                  value={completed}
                  max={total}
                  color={completed === total ? "bg-green-500" : "bg-indigo-500"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        {recentAttempts.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="font-bold text-gray-800 mb-4">🕐 Recent Quiz Activity</h2>
            <div className="space-y-2">
              {recentAttempts.map((attempt, i) => {
                const pct = Math.round((attempt.score / attempt.totalQuestions) * 100);
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">{attempt.topicId}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(attempt.timestamp).toLocaleDateString("en-GB", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                        {" "}• {Math.round(attempt.timeSpentSeconds / 60)} min
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-sm font-bold ${
                          pct >= 70 ? "text-green-600" : pct >= 50 ? "text-amber-600" : "text-red-500"
                        }`}
                      >
                        {attempt.score}/{attempt.totalQuestions}
                      </span>
                      <p className="text-xs text-gray-400">{pct}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4">⚙️ Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                const data = JSON.stringify(progress, null, 2);
                const blob = new Blob([data], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "student-progress.json";
                a.click();
              }}
              className="px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-xl text-sm hover:bg-indigo-100 transition-colors"
            >
              📥 Export Progress
            </button>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-xl text-sm hover:bg-red-100 transition-colors"
            >
              🗑️ Reset Progress
            </button>
          </div>
        </div>

        {/* Reset confirmation modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
              <div className="text-4xl mb-3">⚠️</div>
              <h2 className="font-bold text-gray-800 mb-2">Reset all progress?</h2>
              <p className="text-sm text-gray-500 mb-4">
                This will permanently delete all quiz attempts, points, badges, and completed topics.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
