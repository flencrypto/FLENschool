import Link from "next/link";
import { BarChart2, Zap, Star, Flame, Trophy } from "lucide-react";
import { STUDENT_PROFILE, SUBJECTS, LEADERBOARD, WEEKLY_PROGRESS, SUBJECT_PROGRESS } from "@/lib/data";
import { calcOverallProgress } from "@/lib/utils";

export const metadata = {
  title: "My Progress | FLENschool",
};

export default function DashboardPage() {
  const profile = STUDENT_PROFILE;
  const overallProgress = calcOverallProgress(SUBJECT_PROGRESS);
  const levelXP = profile.points % 200;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3">
          <BarChart2 className="w-8 h-8 text-blue-600" aria-hidden="true" />
          My Progress
        </h1>
        <p className="text-gray-500 mt-1">Track your learning journey across all GCSE subjects</p>
      </div>

      {/* Level & XP card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-200 text-sm font-medium">Current Level</p>
            <p className="text-5xl font-black">{profile.level}</p>
          </div>
          <div className="text-right">
            <p className="text-blue-200 text-sm font-medium">Total XP</p>
            <p className="text-3xl font-black">{profile.points.toLocaleString()}</p>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-blue-200">
            <span>Level {profile.level}</span>
            <span>{levelXP} / 200 XP to Level {profile.level + 1}</span>
          </div>
          <div
            className="h-3 bg-white/30 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={levelXP}
            aria-valuemin={0}
            aria-valuemax={200}
            aria-label={`Level progress: ${levelXP} of 200 XP`}
          >
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${(levelXP / 200) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-label="Achievement statistics">
        {[
          { label: "Streak", value: `${profile.streakDays} days`, icon: Flame, color: "bg-orange-100 text-orange-700" },
          { label: "Badges", value: profile.badges.length, icon: Trophy, color: "bg-yellow-100 text-yellow-700" },
          { label: "Overall", value: `${overallProgress}%`, icon: Star, color: "bg-purple-100 text-purple-700" },
          { label: "Level", value: profile.level, icon: Zap, color: "bg-blue-100 text-blue-700" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`${color} rounded-2xl p-4 text-center`}>
            <Icon className="w-5 h-5 mx-auto mb-1" aria-hidden="true" />
            <div className="text-2xl font-black">{value}</div>
            <div className="text-xs font-medium opacity-80">{label}</div>
          </div>
        ))}
      </div>

      {/* Subject progress */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Subject Progress</h2>
        <div className="space-y-4">
          {SUBJECTS.map((subject) => {
            const progress = SUBJECT_PROGRESS[subject.id] ?? 0;
            return (
              <Link
                key={subject.id}
                href={`/subjects/${subject.id}`}
                className="block group"
                aria-label={`${subject.name}: ${progress}% complete`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl flex-shrink-0" aria-hidden="true">{subject.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                        {subject.name}
                      </span>
                      <span className="text-xs font-bold text-gray-500">{progress}%</span>
                    </div>
                    <div
                      className="h-2 bg-gray-100 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={`h-full rounded-full transition-all ${subject.bgColor.replace("bg-", "bg-gradient-to-r from-").replace("-100", "-400")} to-purple-400`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Weekly activity */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">This Week&apos;s Activity</h2>
        <div className="flex items-end gap-2 h-32" role="img" aria-label="Weekly study activity bar chart">
          {WEEKLY_PROGRESS.map(({ day, minutes }) => {
            const maxMin = Math.max(...WEEKLY_PROGRESS.map((d) => d.minutes));
            const height = (minutes / maxMin) * 100;
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-600 font-medium">{minutes}m</span>
                <div className="w-full relative" style={{ height: "80px" }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 font-medium">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🏅 All Badges</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {profile.badges.map((badge) => (
            <div
              key={badge.id}
              className="bg-gradient-to-b from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-3 text-center"
              title={badge.description}
            >
              <div className="text-3xl mb-1" aria-hidden="true">{badge.emoji}</div>
              <div className="text-xs font-semibold text-gray-700 leading-tight">{badge.name}</div>
            </div>
          ))}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-3 text-center opacity-50">
              <div className="text-2xl mb-1" aria-hidden="true">🔒</div>
              <div className="text-xs text-gray-400">Locked</div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-500" aria-hidden="true" />
          Class Leaderboard
        </h2>
        <ol>
          {LEADERBOARD.map((entry) => (
            <li
              key={entry.rank}
              className={`flex items-center gap-3 p-3 rounded-2xl mb-2 ${
                entry.studentName.includes("You") ? "bg-blue-50 border-2 border-blue-300" : "hover:bg-gray-50"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 ${
                  entry.rank === 1 ? "bg-yellow-400 text-white" :
                  entry.rank === 2 ? "bg-gray-300 text-gray-700" :
                  entry.rank === 3 ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-600"
                }`}
                aria-hidden="true"
              >
                {entry.rank}
              </span>
              <span className="text-2xl" aria-hidden="true">{entry.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${entry.studentName.includes("You") ? "text-blue-700" : "text-gray-700"}`}>
                  {entry.studentName}
                </p>
                <p className="text-xs text-gray-400">Level {entry.level}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-700">{entry.points.toLocaleString()}</p>
                <p className="text-xs text-gray-400">XP</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
