import type { Metadata } from 'next';
import Link from 'next/link';
import PointsBadge from '@/components/PointsBadge';
import BadgeCard from '@/components/BadgeCard';
import LeaderboardWidget from '@/components/LeaderboardWidget';
import SubjectCard from '@/components/SubjectCard';
import { subjects } from '@/data/subjects';
import { badges } from '@/data/badges';
import { leaderboardEntries } from '@/data/leaderboard';

export const metadata: Metadata = {
  title: 'Home - FLENschool',
};

export default function HomePage() {
  const earnedBadges = badges.filter((b) => b.earned);
  const featuredSubjects = subjects.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Good morning! 👋</h1>
        <p className="text-purple-100 text-lg mb-5">Ready to learn something amazing today?</p>
        <PointsBadge points={2540} streak={5} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total XP', value: '2,540', icon: '⚡', color: 'bg-purple-100 text-purple-800' },
          { label: 'Day Streak', value: '5 🔥', icon: '🔥', color: 'bg-orange-100 text-orange-800' },
          { label: 'Badges', value: earnedBadges.length.toString(), icon: '🏅', color: 'bg-yellow-100 text-yellow-800' },
          { label: 'Lessons Done', value: '12', icon: '✅', color: 'bg-green-100 text-green-800' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-2xl p-4 text-center`}>
            <div className="text-3xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm font-medium opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Subject Grid */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Quick Start 🚀</h2>
            <Link href="/subjects" className="text-purple-600 font-semibold hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {featuredSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} showProgress />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <LeaderboardWidget entries={leaderboardEntries} />

          {/* Badges */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🏅 Recent Badges</h3>
            <div className="grid grid-cols-3 gap-2">
              {earnedBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
