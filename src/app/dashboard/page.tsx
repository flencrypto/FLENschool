import type { Metadata } from 'next';
import { subjects } from '@/data/subjects';
import ProgressBar from '@/components/ProgressBar';

export const metadata: Metadata = {
  title: 'Dashboard - FLENschool',
};

const students = [
  { name: 'Alex', xp: 2540, streak: 5, lessonsThisWeek: 8, weakSubject: 'Chemistry' },
  { name: 'Jordan', xp: 1820, streak: 3, lessonsThisWeek: 5, weakSubject: 'History' },
  { name: 'Sam', xp: 3100, streak: 12, lessonsThisWeek: 11, weakSubject: 'French' },
];

const recentActivity = [
  { student: 'Alex', action: 'Completed lesson: Introduction to Algebra', time: '2 hours ago', icon: '📐' },
  { student: 'Sam', action: 'Earned badge: Week Warrior 🏅', time: '3 hours ago', icon: '⭐' },
  { student: 'Jordan', action: 'Started topic: Cell Biology', time: '5 hours ago', icon: '🧬' },
  { student: 'Alex', action: 'Scored 80% on Chemistry Quiz', time: '1 day ago', icon: '⚗️' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">👩‍🏫 Parent / Teacher Dashboard</h1>
        <p className="text-gray-600 text-lg">Monitor student progress and identify areas needing support</p>
      </div>

      {/* Student Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {students.map((student) => (
          <div key={student.name} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                😊
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{student.name}</h3>
                <p className="text-gray-500 text-sm">⚡ {student.xp.toLocaleString()} XP total</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">🔥 Streak</span>
                <span className="font-semibold">{student.streak} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">📖 This week</span>
                <span className="font-semibold">{student.lessonsThisWeek} lessons</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">⚠️ Needs help</span>
                <span className="font-semibold text-red-600">{student.weakSubject}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subject Progress Overview */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">📊 Class Subject Progress</h2>
        <div className="space-y-4">
          {subjects.slice(0, 8).map((subject) => {
            const avgProgress = subject.topics.length > 0
              ? Math.round(subject.topics.reduce((acc, t) => acc + t.progress, 0) / subject.topics.length)
              : 0;

            return (
              <div key={subject.id} className="flex items-center gap-4">
                <span className="text-2xl w-8">{subject.icon}</span>
                <span className="w-32 text-sm font-medium text-gray-700">{subject.name}</span>
                <div className="flex-1">
                  <ProgressBar progress={avgProgress} height="h-3" />
                </div>
                <span className="text-sm font-bold text-gray-600 w-12 text-right">{avgProgress}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">🕒 Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <span className="text-2xl">{activity.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{activity.student}</p>
                <p className="text-gray-600 text-sm">{activity.action}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
