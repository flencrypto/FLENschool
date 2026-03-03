"use client";

import { useEffect, useState, startTransition } from "react";
import Link from "next/link";
import { loadProgress, getLevelFromPoints } from "@/lib/progress";

// Simulated leaderboard data (in production this would come from a backend)
const MOCK_LEADERBOARD = [
  { name: "You", points: 0, level: 1, streak: 0, isCurrentUser: true },
  { name: "Alex T.", points: 487, level: 5, streak: 12, isCurrentUser: false },
  { name: "Priya M.", points: 362, level: 4, streak: 8, isCurrentUser: false },
  { name: "Jake W.", points: 298, level: 3, streak: 5, isCurrentUser: false },
  { name: "Lily K.", points: 241, level: 3, streak: 3, isCurrentUser: false },
  { name: "Sam O.", points: 189, level: 2, streak: 7, isCurrentUser: false },
  { name: "Mia P.", points: 145, level: 2, streak: 2, isCurrentUser: false },
  { name: "Ravi S.", points: 98, level: 2, streak: 1, isCurrentUser: false },
];

const MEDALS = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const [board, setBoard] = useState(MOCK_LEADERBOARD);

  useEffect(() => {
    const p = loadProgress();
    const updated = MOCK_LEADERBOARD.map((entry) =>
      entry.isCurrentUser
        ? {
            ...entry,
            points: p.points,
            level: getLevelFromPoints(p.points),
            streak: p.streakDays,
          }
        : entry
    );
    updated.sort((a, b) => b.points - a.points);
    startTransition(() => {
      setBoard(updated);
    });
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f0f4ff" }}>
      <nav className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="text-gray-500 hover:text-indigo-600 transition-colors">
          ← Back
        </Link>
        <span className="text-gray-300">|</span>
        <span className="font-bold text-gray-800">🏅 Leaderboard</span>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-6 mb-6 text-white shadow-lg text-center">
          <div className="text-4xl mb-2">🏆</div>
          <h1 className="text-2xl font-black">Class Leaderboard</h1>
          <p className="text-amber-100 text-sm mt-1">Earn points by completing quizzes and topics!</p>
        </div>

        <div className="space-y-3">
          {board.map((entry, index) => (
            <div
              key={entry.name}
              className={`bg-white rounded-2xl border-2 p-4 flex items-center gap-4 transition-all ${
                entry.isCurrentUser
                  ? "border-indigo-400 shadow-md"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="text-2xl w-8 text-center shrink-0">
                {index < 3 ? MEDALS[index] : <span className="text-gray-400 text-sm font-bold">{index + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-sm ${entry.isCurrentUser ? "text-indigo-700" : "text-gray-800"}`}>
                    {entry.name}
                    {entry.isCurrentUser && (
                      <span className="ml-2 text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                        You
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex gap-3 text-xs text-gray-500 mt-0.5">
                  <span>Level {entry.level}</span>
                  <span>🔥 {entry.streak} day streak</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-black text-lg text-amber-500">{entry.points}</div>
                <div className="text-xs text-gray-400">points</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-center">
          <p className="text-sm text-indigo-700 font-medium">
            💡 Complete more quizzes to climb the leaderboard!
          </p>
          <Link
            href="/"
            className="inline-block mt-3 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-xl text-sm hover:bg-indigo-700 transition-colors"
          >
            Start studying →
          </Link>
        </div>
      </main>
    </div>
  );
}
