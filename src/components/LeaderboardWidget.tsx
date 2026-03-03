import { LeaderboardEntry } from '@/types';

interface LeaderboardWidgetProps {
  entries: LeaderboardEntry[];
  maxEntries?: number;
}

export default function LeaderboardWidget({ entries, maxEntries = 5 }: LeaderboardWidgetProps) {
  const displayEntries = entries.slice(0, maxEntries);

  const rankEmojis = ['🥇', '🥈', '🥉'];

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🏆 Leaderboard</h3>
      <div className="space-y-3">
        {displayEntries.map((entry) => (
          <div
            key={entry.userId}
            className={`flex items-center gap-3 p-3 rounded-xl ${entry.username === 'You' ? 'bg-purple-50 border-2 border-purple-300' : 'bg-gray-50'}`}
          >
            <div className="text-xl font-bold w-8 text-center">
              {entry.rank <= 3 ? rankEmojis[entry.rank - 1] : <span className="text-gray-500">{entry.rank}</span>}
            </div>
            <div className="text-2xl">{entry.avatar}</div>
            <div className="flex-1">
              <p className={`font-bold text-sm ${entry.username === 'You' ? 'text-purple-700' : 'text-gray-800'}`}>
                {entry.username}
              </p>
              <p className="text-xs text-gray-500">🔥 {entry.streak} day streak</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-purple-600 text-sm">{entry.totalXP.toLocaleString()}</p>
              <p className="text-xs text-gray-500">XP</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
