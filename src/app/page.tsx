"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import SubjectCard from "@/components/SubjectCard";
import BadgeDisplay from "@/components/BadgeDisplay";
import SessionTimer from "@/components/SessionTimer";
import BreakReminder from "@/components/BreakReminder";
import GrokApiSetup from "@/components/GrokApiSetup";
import {
  loadProgress,
  saveProgress,
  getLevelFromPoints,
  getPointsForNextLevel,
  BADGES,
  getWeakTopics,
} from "@/lib/progress";
import type { UserProgress } from "@/lib/progress";

const LEVEL_TITLES = [
  "Newcomer",
  "Explorer",
  "Scholar",
  "Achiever",
  "Expert",
  "Champion",
  "Master",
  "Legend",
  "Elite",
  "GCSE Hero",
];

export default function HomePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [showBreakReminder, setShowBreakReminder] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  useEffect(() => {
    const p = loadProgress();
    startTransition(() => {
      setProgress(p);
    });
  }, []);

  useEffect(() => {
    if (!progress) return;
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    document.body.className = [
      highContrast ? "high-contrast" : "",
      dyslexiaFont ? "dyslexia-font" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }, [highContrast, dyslexiaFont]);

  if (!progress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-500">Loading your dashboard...</div>
      </div>
    );
  }

  const level = getLevelFromPoints(progress.points);
  const levelTitle = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  const levelProgress = getPointsForNextLevel(progress.points);
  const weakTopics = getWeakTopics(progress);
  const unlockedCount = progress.unlockedBadges.length;
  const totalBadges = BADGES.length;
  const todayStr = new Date().toDateString();
  const quizzesToday = progress.quizAttempts.filter(
    (a) => new Date(a.timestamp).toDateString() === todayStr
  ).length;

  return (
    <div className="min-h-screen" style={{ background: "#f0f4ff" }}>
      {/* Top navigation bar */}
      <nav className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-indigo-600 tracking-tight">
            FLEN<span className="text-orange-500">school</span>
          </span>
          <span className="hidden sm:block text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
            GCSE Learning
          </span>
        </div>
        <div className="flex items-center gap-3">
          <SessionTimer
            maxMinutes={sessionMinutes}
            onBreakRequired={() => setShowBreakReminder(true)}
          />
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
          >
            📊 Dashboard
          </Link>
          <button
            onClick={() => setShowSettings((s) => !s)}
            className="p-2 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
      </nav>

      {/* Settings panel */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-start justify-end p-4" onClick={() => setShowSettings(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-72 p-6 mt-16"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-gray-800 mb-4">⚙️ Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">
                  Session length: {sessionMinutes} min
                </label>
                <input
                  type="range"
                  min={10}
                  max={45}
                  step={5}
                  value={sessionMinutes}
                  onChange={(e) => setSessionMinutes(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                  aria-label="Session length in minutes"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>10 min</span><span>45 min</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">High contrast</span>
                <button
                  onClick={() => setHighContrast((h) => !h)}
                  className={`w-12 h-6 rounded-full transition-colors ${highContrast ? "bg-indigo-600" : "bg-gray-200"}`}
                  role="switch"
                  aria-checked={highContrast}
                  aria-label="Toggle high contrast mode"
                >
                  <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${highContrast ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Dyslexia font</span>
                <button
                  onClick={() => setDyslexiaFont((d) => !d)}
                  className={`w-12 h-6 rounded-full transition-colors ${dyslexiaFont ? "bg-indigo-600" : "bg-gray-200"}`}
                  role="switch"
                  aria-checked={dyslexiaFont}
                  aria-label="Toggle dyslexia-friendly font"
                >
                  <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${dyslexiaFont ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
              <Link
                href="/dashboard"
                className="block w-full text-center py-2 bg-indigo-50 text-indigo-700 font-medium rounded-xl text-sm hover:bg-indigo-100 transition-colors"
                onClick={() => setShowSettings(false)}
              >
                📊 Parent/Teacher Dashboard
              </Link>
              <div className="border-t border-gray-100 pt-3">
                <GrokApiSetup />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Break reminder modal */}
      {showBreakReminder && (
        <BreakReminder
          onDismiss={() => setShowBreakReminder(false)}
          onTakeBreak={() => setShowBreakReminder(false)}
        />
      )}

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Student profile hero */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-3xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold shadow-inner">
                🎓
              </div>
              <div>
                <h1 className="text-xl font-bold">Welcome back! 👋</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-indigo-200 text-sm">Level {level}</span>
                  <span className="bg-orange-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {levelTitle}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-black">{progress.points}</div>
                <div className="text-xs text-indigo-200">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black">{progress.streakDays}🔥</div>
                <div className="text-xs text-indigo-200">Day streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black">{progress.completedTopics.length}</div>
                <div className="text-xs text-indigo-200">Topics done</div>
              </div>
            </div>
          </div>

          {/* Level progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-indigo-200 mb-1">
              <span>Level {level}</span>
              <span>{levelProgress.current}/{levelProgress.next} XP to {levelProgress.isMaxLevel ? "Max Level" : `Level ${level + 1}`}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-orange-400 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (levelProgress.current / Math.max(1, levelProgress.next)) * 100)}%`,
                }}
                role="progressbar"
                aria-valuenow={levelProgress.current}
                aria-valuemax={levelProgress.next}
              />
            </div>
          </div>
        </div>

        {/* Weak topics alert */}
        {weakTopics.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-semibold text-amber-800 text-sm">Topics to review</p>
              <p className="text-amber-700 text-xs mt-0.5">
                You scored below 60% on:{" "}
                {weakTopics.slice(0, 3).join(", ")}
                {weakTopics.length > 3 && ` +${weakTopics.length - 3} more`}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content: subjects */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">📚 GCSE Subjects</h2>
              <span className="text-sm text-gray-500">
                {progress.completedTopics.length} topics completed
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {curriculum.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} progress={progress} />
              ))}
            </div>
          </div>

          {/* Sidebar: badges + quick actions */}
          <div className="space-y-4">
            {/* Quick stats */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3 text-sm">📈 Your Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Study time</span>
                  <span className="font-semibold text-gray-800">{progress.totalStudyMinutes} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quizzes taken</span>
                  <span className="font-semibold text-gray-800">{progress.quizAttempts.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Badges earned</span>
                  <span className="font-semibold text-gray-800">{unlockedCount}/{totalBadges}</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800 text-sm">🏆 Badges</h3>
                <Link href="/badges" className="text-xs text-indigo-600 hover:underline">
                  View all
                </Link>
              </div>
              <BadgeDisplay unlockedBadgeIds={progress.unlockedBadges} />
            </div>

            {/* Daily challenge */}
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-4 text-white shadow-sm">
              <h3 className="font-bold text-sm mb-1">⚡ Daily Challenge</h3>
              <p className="text-xs text-orange-100 mb-3">
                Complete 3 quizzes today to earn a bonus 15 points!
              </p>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${i < Math.min(3, quizzesToday) ? "bg-white" : "bg-orange-300"}`}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-2">
              <Link
                href="/leaderboard"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                🏅 Leaderboard
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                📊 Parent/Teacher Dashboard
              </Link>
              <Link
                href="/ai-lab"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                🤖 AI Prompt Lab
              </Link>
              <Link
                href="/subjects/blockchain"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                ⛓️ Blockchain & Crypto
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
