"use client";

import { useEffect, useState, startTransition } from "react";
import Link from "next/link";
import { BADGES, loadProgress } from "@/lib/progress";
import type { UserProgress } from "@/lib/progress";

export default function BadgesPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    startTransition(() => {
      setProgress(loadProgress());
    });
  }, []);

  const unlocked = progress?.unlockedBadges ?? [];

  return (
    <div className="min-h-screen" style={{ background: "#f0f4ff" }}>
      <nav className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="text-gray-500 hover:text-indigo-600 transition-colors">
          ← Back
        </Link>
        <span className="text-gray-300">|</span>
        <span className="font-bold text-gray-800">🏆 Badges</span>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-amber-400 to-yellow-400 rounded-3xl p-6 mb-6 text-white shadow-lg text-center">
          <div className="text-4xl mb-2">🏆</div>
          <h1 className="text-2xl font-black">Your Badges</h1>
          <p className="text-amber-100 text-sm mt-1">
            {unlocked.length} / {BADGES.length} badges earned
          </p>
          <div className="w-full bg-amber-300/50 rounded-full h-3 mt-3 overflow-hidden">
            <div
              className="h-3 bg-white rounded-full transition-all duration-500"
              style={{ width: `${(unlocked.length / BADGES.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {BADGES.map((badge) => {
            const isUnlocked = unlocked.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`bg-white rounded-2xl border-2 p-4 text-center transition-all ${
                  isUnlocked
                    ? "border-amber-300 shadow-md"
                    : "border-gray-100 opacity-60 grayscale"
                }`}
                aria-label={`${badge.name}: ${isUnlocked ? "Unlocked" : "Locked – " + badge.description}`}
              >
                <div className={`text-4xl mb-2 ${isUnlocked ? "" : "filter grayscale"}`}>
                  {badge.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{badge.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                {isUnlocked && (
                  <span className="mt-2 inline-block text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">
                    ✅ Unlocked
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
