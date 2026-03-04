interface PointsBadgeProps {
  points: number;
  streak?: number;
}

export default function PointsBadge({ points, streak }: PointsBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-bold text-lg">
        <span>⚡</span>
        <span>{points.toLocaleString()} XP</span>
      </div>
      {streak !== undefined && streak > 0 && (
        <div className="flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-bold text-lg">
          <span>🔥</span>
          <span>{streak} day streak</span>
        </div>
      )}
    </div>
  );
}
