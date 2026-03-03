import Link from "next/link";
import { Zap, Trophy, Target, BookOpen, ChevronRight, Star, Flame } from "lucide-react";
import { STUDENT_PROFILE, SUBJECTS, LEADERBOARD, WEEKLY_PROGRESS, SUBJECT_PROGRESS } from "@/lib/data";
import { getAdaptiveRecommendations, calcOverallProgress } from "@/lib/utils";

export default function Home() {
  const profile = STUDENT_PROFILE;
  const todaySubjects = SUBJECTS.slice(0, 3);
  const topBadges = profile.badges.slice(0, 3);
  const recommendations = getAdaptiveRecommendations(SUBJECT_PROGRESS);
  const overallProgress = calcOverallProgress(SUBJECT_PROGRESS);

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 text-[120px] opacity-10 leading-none select-none" aria-hidden="true">🎓</div>
        <div className="relative">
          <p className="text-blue-200 text-sm font-medium mb-1">Welcome back,</p>
          <h1 className="text-3xl font-black mb-3">Hey {profile.name}! 👋</h1>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white/20 rounded-2xl px-4 py-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-300" aria-hidden="true" />
              <span className="font-bold">{profile.points.toLocaleString()} XP</span>
            </div>
            <div className="bg-white/20 rounded-2xl px-4 py-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-300" aria-hidden="true" />
              <span className="font-bold">Level {profile.level}</span>
            </div>
            <div className="bg-white/20 rounded-2xl px-4 py-2 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-300" aria-hidden="true" />
              <span className="font-bold">{profile.streakDays}-day streak!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section aria-label="Quick stats" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Level", value: profile.level, emoji: "⭐", color: "bg-yellow-100 text-yellow-700" },
          { label: "Streak", value: `${profile.streakDays} days`, emoji: "🔥", color: "bg-orange-100 text-orange-700" },
          { label: "Badges", value: profile.badges.length, emoji: "🏅", color: "bg-purple-100 text-purple-700" },
          { label: "Overall", value: `${overallProgress}%`, emoji: "📊", color: "bg-blue-100 text-blue-700" },
        ].map(({ label, value, emoji, color }) => (
          <div key={label} className={`${color} rounded-2xl p-4 text-center`}>
            <div className="text-2xl mb-1" aria-hidden="true">{emoji}</div>
            <div className="text-2xl font-black">{value}</div>
            <div className="text-xs font-medium opacity-80">{label}</div>
          </div>
        ))}
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Today's plan */}
        <section className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" aria-hidden="true" />
              Today&apos;s Plan
            </h2>
            <Link href="/subjects" className="text-blue-600 text-sm font-semibold hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {todaySubjects.map((subject) => {
              const progress = SUBJECT_PROGRESS[subject.id] ?? 0;
              const nextTopic = subject.year10Topics[0];
              return (
                <Link
                  key={subject.id}
                  href={`/subjects/${subject.id}`}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
                  aria-label={`${subject.name}: ${progress}% complete`}
                >
                  <div className={`${subject.bgColor} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0`} aria-hidden="true">
                    {subject.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                      {subject.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{nextTopic?.title}</p>
                    <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-bold text-gray-700">{progress}%</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-auto mt-1 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            href="/subjects"
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-2xl border-2 border-dashed border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-all text-sm font-medium"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            Browse all {SUBJECTS.length} subjects
          </Link>
        </section>

        {/* Leaderboard */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-500" aria-hidden="true" />
            Leaderboard
          </h2>
          <ol>
            {LEADERBOARD.map((entry) => (
              <li
                key={entry.rank}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all mb-2 ${
                  entry.studentName.includes("You")
                    ? "bg-blue-50 border-2 border-blue-300"
                    : "hover:bg-gray-50"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 ${
                    entry.rank === 1 ? "bg-yellow-400 text-white" :
                    entry.rank === 2 ? "bg-gray-300 text-white" :
                    entry.rank === 3 ? "bg-orange-400 text-white" :
                    "bg-gray-100 text-gray-600"
                  }`}
                  aria-hidden="true"
                >
                  {entry.rank}
                </span>
                <span className="text-xl" aria-hidden="true">{entry.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${entry.studentName.includes("You") ? "text-blue-700" : "text-gray-700"}`}>
                    {entry.studentName}
                  </p>
                  <p className="text-xs text-gray-400">Lv. {entry.level}</p>
                </div>
                <span className="text-xs font-bold text-gray-600">{entry.points.toLocaleString()}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* AI Adaptive recommendations */}
      {recommendations.length > 0 && (
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🤖 Recommended for You</h2>
          <p className="text-sm text-gray-500 mb-4">Based on your progress, focus on these subjects next:</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {recommendations.slice(0, 3).map((rec) => {
              const subject = SUBJECTS.find((s) => s.id === rec.subjectId);
              const topic = [...(subject?.year10Topics ?? []), ...(subject?.year11Topics ?? [])].find(
                (t) => t.id === rec.topicId
              );
              if (!subject || !topic) return null;
              return (
                <Link
                  key={rec.topicId}
                  href={`/subjects/${rec.subjectId}/${rec.topicId}`}
                  className={`flex items-start gap-3 p-4 rounded-2xl border-2 hover:shadow-sm transition-all ${
                    rec.priority === "high"
                      ? "border-red-200 bg-red-50 hover:border-red-400"
                      : "border-yellow-200 bg-yellow-50 hover:border-yellow-400"
                  }`}
                >
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">{subject.emoji}</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{topic.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{rec.reason}</p>
                    <span className={`text-xs font-bold mt-1 inline-block px-2 py-0.5 rounded-lg ${
                      rec.priority === "high" ? "bg-red-200 text-red-700" : "bg-yellow-200 text-yellow-700"
                    }`}>
                      {rec.priority === "high" ? "🔴 High priority" : "🟡 Focus area"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Weekly activity */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📅 This Week</h2>
        <div className="flex items-end gap-2 h-24" role="img" aria-label="Weekly study activity bar chart">
          {WEEKLY_PROGRESS.map(({ day, minutes }) => {
            const maxMin = Math.max(...WEEKLY_PROGRESS.map((d) => d.minutes));
            const height = (minutes / maxMin) * 100;
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full relative" style={{ height: "80px" }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl transition-all hover:from-purple-600 hover:to-purple-400"
                    style={{ height: `${height}%` }}
                    title={`${day}: ${minutes} min`}
                  />
                </div>
                <span className="text-xs text-gray-500 font-medium">{day}</span>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-gray-500 mt-3 text-center">
          Total this week:{" "}
          <strong className="text-gray-800">
            {WEEKLY_PROGRESS.reduce((a, d) => a + d.minutes, 0)} minutes
          </strong>{" "}
          ·{" "}
          <strong className="text-blue-700">
            {WEEKLY_PROGRESS.reduce((a, d) => a + d.points, 0)} XP earned
          </strong>
        </p>
      </section>

      {/* Badges */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">🏅 My Badges</h2>
          <Link href="/dashboard" className="text-blue-600 text-sm font-semibold hover:underline">
            View all →
          </Link>
        </div>
        <div className="flex gap-4 flex-wrap">
          {topBadges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center gap-1 bg-gradient-to-b from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4 w-28 text-center"
              title={badge.description}
            >
              <span className="text-3xl" aria-hidden="true">{badge.emoji}</span>
              <span className="text-xs font-semibold text-gray-700">{badge.name}</span>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center gap-1 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-4 w-28 text-center text-gray-400">
            <span className="text-2xl" aria-hidden="true">🔒</span>
            <span className="text-xs font-medium">More to unlock!</span>
          </div>
        </div>
      </section>

      {/* Quick action tiles */}
      <section aria-label="Quick actions" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: "/subjects", label: "Browse Subjects", emoji: "📚", color: "from-blue-500 to-blue-600" },
          { href: "/dashboard", label: "My Progress", emoji: "📊", color: "from-purple-500 to-purple-600" },
          { href: "/prompt-lab", label: "Prompt Lab", emoji: "🤖", color: "from-green-500 to-green-600" },
          { href: "/dashboard/parent", label: "Parent View", emoji: "👩‍👧", color: "from-orange-500 to-orange-600" },
        ].map(({ href, label, emoji, color }) => (
          <Link
            key={href}
            href={href}
            className={`bg-gradient-to-br ${color} text-white rounded-2xl p-5 text-center hover:opacity-90 transition-opacity`}
          >
            <div className="text-3xl mb-2" aria-hidden="true">{emoji}</div>
            <div className="font-semibold text-sm">{label}</div>
          </Link>
        ))}
      </section>
    </div>
  );
}
