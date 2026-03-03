import Link from "next/link";
import { Users, AlertTriangle, CheckCircle, BookOpen, Clock } from "lucide-react";
import { SUBJECTS, SUBJECT_PROGRESS, STUDENT_PROFILE, WEEKLY_PROGRESS } from "@/lib/data";

export const metadata = {
  title: "Parent & Teacher View | FLENschool",
};

const SUBJECT_NOTES: Record<string, { strength: boolean; note: string }> = {
  maths: { strength: false, note: "Advanced algebra needs work — schedule extra practice sessions." },
  english: { strength: false, note: "Creative writing is improving but analysis paragraphs need more detail." },
  biology: { strength: true, note: "Excellent progress! Consistently scoring above 70%." },
  chemistry: { strength: false, note: "Low engagement — consider interactive labs to boost interest." },
  physics: { strength: false, note: "Energy and Forces units are solid; Waves needs attention." },
  history: { strength: true, note: "Top subject — strong recall and analysis skills." },
  geography: { strength: false, note: "Physical geography covered; Human geography unit not started." },
  french: { strength: false, note: "Vocabulary gaps in tenses — daily 5-min flashcard practice recommended." },
  computing: { strength: false, note: "Algorithms understood; programming tasks not yet attempted." },
};

export default function ParentDashboardPage() {
  const profile = STUDENT_PROFILE;
  const totalMinutesThisWeek = WEEKLY_PROGRESS.reduce((a, d) => a + d.minutes, 0);
  const avgMinutesPerDay = Math.round(totalMinutesThisWeek / 7);
  const subjectsNeedingAttention = SUBJECTS.filter((s) => (SUBJECT_PROGRESS[s.id] ?? 0) < 50);
  const subjectStrengths = SUBJECTS.filter((s) => (SUBJECT_PROGRESS[s.id] ?? 0) >= 70);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-7 h-7 text-indigo-200" aria-hidden="true" />
          <h1 className="text-2xl font-black">Parent &amp; Teacher View</h1>
        </div>
        <p className="text-indigo-200 text-sm">
          Monitoring <strong className="text-white">{profile.name}</strong> · Year {profile.year} ·{" "}
          <strong className="text-white">{profile.points.toLocaleString()} XP</strong> · Level {profile.level}
        </p>
        <p className="text-indigo-300 text-xs mt-1">
          🔒 This view is password-protected in the production app.
        </p>
      </div>

      {/* Weekly summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-label="Weekly summary statistics">
        {[
          { label: "Total Study Time", value: `${totalMinutesThisWeek} min`, icon: "⏱️" },
          { label: "Daily Average", value: `${avgMinutesPerDay} min`, icon: "📅" },
          { label: "Current Streak", value: `${profile.streakDays} days`, icon: "🔥" },
          { label: "Subjects Active", value: `${SUBJECTS.length}`, icon: "📚" },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-1" aria-hidden="true">{icon}</div>
            <div className="text-xl font-black text-gray-800">{value}</div>
            <div className="text-xs text-gray-500 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Areas needing attention */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-500" aria-hidden="true" />
          Areas Needing Attention
          <span className="text-sm font-normal text-gray-400">(under 50% progress)</span>
        </h2>
        {subjectsNeedingAttention.length === 0 ? (
          <p className="text-green-600 text-sm">🎉 All subjects on track!</p>
        ) : (
          <div className="space-y-3">
            {subjectsNeedingAttention.map((subject) => {
              const note = SUBJECT_NOTES[subject.id];
              const progress = SUBJECT_PROGRESS[subject.id] ?? 0;
              return (
                <div key={subject.id} className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-2xl">
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">{subject.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-800">{subject.name}</span>
                      <span className="text-xs bg-orange-200 text-orange-700 px-2 py-0.5 rounded-lg font-bold">
                        {progress}% done
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{note?.note}</p>
                    <div className="mt-2 h-1.5 bg-orange-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <Link
                    href={`/subjects/${subject.id}`}
                    className="text-xs text-blue-600 hover:underline font-medium flex-shrink-0"
                  >
                    View →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Strengths */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
          Strengths
          <span className="text-sm font-normal text-gray-400">(70%+ progress)</span>
        </h2>
        {subjectStrengths.length === 0 ? (
          <p className="text-gray-500 text-sm">No subjects at 70%+ yet — keep encouraging!</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {subjectStrengths.map((subject) => {
              const note = SUBJECT_NOTES[subject.id];
              const progress = SUBJECT_PROGRESS[subject.id] ?? 0;
              return (
                <div key={subject.id} className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">{subject.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{subject.name}</span>
                      <span className="text-xs bg-green-200 text-green-700 px-2 py-0.5 rounded-lg font-bold">
                        {progress}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{note?.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* All subjects progress */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-blue-600" aria-hidden="true" />
          All Subjects Progress
        </h2>
        <div className="space-y-3">
          {SUBJECTS.map((subject) => {
            const progress = SUBJECT_PROGRESS[subject.id] ?? 0;
            const color =
              progress >= 70 ? "from-green-500 to-green-400" :
              progress >= 50 ? "from-blue-500 to-blue-400" :
              progress >= 30 ? "from-yellow-500 to-yellow-400" :
              "from-red-400 to-red-300";
            return (
              <div key={subject.id}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xl" aria-hidden="true">{subject.emoji}</span>
                  <span className="text-sm font-semibold text-gray-700 flex-1">{subject.name}</span>
                  <span className="text-xs font-bold text-gray-600">{progress}%</span>
                </div>
                <div
                  className="h-2 bg-gray-100 rounded-full overflow-hidden ml-8"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${subject.name}: ${progress}%`}
                >
                  <div
                    className={`h-full bg-gradient-to-r ${color} rounded-full transition-all`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly study time */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-purple-600" aria-hidden="true" />
          Weekly Study Time
        </h2>
        <div className="flex items-end gap-2 h-28" role="img" aria-label="Weekly study time bar chart">
          {WEEKLY_PROGRESS.map(({ day, minutes }) => {
            const maxMin = Math.max(...WEEKLY_PROGRESS.map((d) => d.minutes));
            const height = (minutes / maxMin) * 100;
            const recommended = minutes >= 30;
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-600 font-medium">{minutes}m</span>
                <div className="w-full relative" style={{ height: "64px" }}>
                  <div
                    className={`absolute bottom-0 w-full rounded-t-xl ${
                      recommended ? "bg-gradient-to-t from-green-600 to-green-400" : "bg-gradient-to-t from-orange-400 to-orange-300"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 font-medium">{day}</span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          🟢 Green = 30+ min (recommended daily target) · 🟠 Orange = under target
        </p>
      </div>

      {/* ADHD settings summary */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-6">
        <h2 className="text-xl font-bold text-indigo-800 mb-4">⚙️ ADHD Support Settings</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Session length", value: `${profile.sessionLengthMinutes} minutes`, desc: "Before a break reminder" },
            { label: "Break duration", value: `${profile.breakIntervalMinutes} minutes`, desc: "Suggested movement break" },
            { label: "Focus mode", value: "Enabled", desc: "Hides distracting notifications" },
            { label: "Spaced repetition", value: "Active", desc: "Reviews scheduled automatically" },
          ].map(({ label, value, desc }) => (
            <div key={label} className="bg-white rounded-2xl p-4 border border-indigo-100">
              <p className="text-xs text-indigo-600 font-medium">{label}</p>
              <p className="text-lg font-bold text-gray-800">{value}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-indigo-600 mt-4">
          💡 Tip: Consistent 25-minute study sessions with 5-minute movement breaks are most effective for students with ADHD.
        </p>
      </div>
    </div>
  );
}
