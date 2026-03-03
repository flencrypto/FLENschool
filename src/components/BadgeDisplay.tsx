"use client";

import { BADGES } from "@/lib/progress";

interface BadgeDisplayProps {
  unlockedBadgeIds: string[];
  showAll?: boolean;
}

export default function BadgeDisplay({
  unlockedBadgeIds,
  showAll = false,
}: BadgeDisplayProps) {
  const badgesToShow = showAll ? BADGES : BADGES.slice(0, 6);

  return (
    <div className="grid grid-cols-3 gap-3">
      {badgesToShow.map((badge) => {
        const unlocked = unlockedBadgeIds.includes(badge.id);
        return (
          <div
            key={badge.id}
            title={unlocked ? `${badge.name}: ${badge.description}` : `Locked: ${badge.description}`}
            className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
              unlocked
                ? "border-amber-300 bg-amber-50 shadow-sm"
                : "border-gray-100 bg-gray-50 opacity-50 grayscale"
            }`}
            aria-label={`${badge.name} – ${unlocked ? "Unlocked" : "Locked"}`}
          >
            <span className="text-2xl mb-1" aria-hidden="true">{badge.icon}</span>
            <span className="text-xs font-semibold text-center text-gray-700 leading-tight">
              {badge.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
