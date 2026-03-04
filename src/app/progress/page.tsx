import type { Metadata } from 'next';
import { subjects } from '@/data/subjects';
import { badges } from '@/data/badges';
import ProgressBar from '@/components/ProgressBar';
import BadgeCard from '@/components/BadgeCard';

export const metadata: Metadata = {
  title: 'Progress - FLENschool',
};

const subjectProgress = [
  { id: 'maths', xp: 520, lessonsCompleted: 4 },
  { id: 'biology', xp: 380, lessonsCompleted: 3 },
  { id: 'cs', xp: 490, lessonsCompleted: 5 },
  { id: 'english', xp: 310, lessonsCompleted: 2 },
  { id: 'history', xp: 290, lessonsCompleted: 2 },
  { id: 'geography', xp: 200, lessonsCompleted: 1 },
];

export default function ProgressPage() {
  const totalXP = subjectProgress.reduce((acc, s) => acc + s.xp, 0);
  const totalLessons = subjectProgress.reduce((acc, s) => acc + s.lessonsCompleted, 0);
  const earnedBadges = badges.filter((b) => b.earned);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📈 Your Progress</h1>
        <p className="text-gray-600 text-lg">Keep it up! Every lesson counts.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total XP', value: totalXP.toLocaleString(), icon: '⚡', color: 'bg-purple-100 text-purple-800' },
          { label: 'Lessons Done', value: totalLessons.toString(), icon: '📖', color: 'bg-blue-100 text-blue-800' },
          { label: 'Badges Earned', value: earnedBadges.length.toString(), icon: '🏅', color: 'bg-yellow-100 text-yellow-800' },
          { label: 'Day Streak', value: '5', icon: '🔥', color: 'bg-orange-100 text-orange-800' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-2xl p-5 text-center`}>
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm font-medium mt-1 opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Subject Progress */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Subject Progress</h2>
        <div className="space-y-5">
          {subjectProgress.map((sp) => {
            const subject = subjects.find((s) => s.id === sp.id);
            if (!subject) return null;
            const totalTopicProgress = subject.topics.reduce((acc, t) => acc + t.progress, 0);
            const avgProgress = subject.topics.length > 0 ? Math.round(totalTopicProgress / subject.topics.length) : 0;

            return (
              <div key={sp.id} className="flex items-center gap-4">
                <div className={`w-12 h-12 ${subject.bgColor} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                  {subject.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-800">{subject.name}</span>
                    <span className="text-sm text-purple-600 font-bold">{sp.xp} XP</span>
                  </div>
                  <ProgressBar progress={avgProgress} height="h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">🏅 All Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} size="md" />
          ))}
        </div>
      </div>
    </div>
  );
}
