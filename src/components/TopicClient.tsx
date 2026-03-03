"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Clock, Target, Video, FileText, CheckCircle, Play } from "lucide-react";
import { SAMPLE_QUIZZES } from "@/lib/data";
import QuizComponent from "@/components/QuizComponent";
import type { Subject, Topic, Lesson } from "@/lib/types";

const typeEmoji: Record<Lesson["type"], string> = {
  video: "🎬",
  interactive: "🕹️",
  reading: "📖",
  lab: "🔬",
};

const typeColor: Record<Lesson["type"], string> = {
  video: "bg-red-100 text-red-700",
  interactive: "bg-green-100 text-green-700",
  reading: "bg-blue-100 text-blue-700",
  lab: "bg-purple-100 text-purple-700",
};

interface TopicClientProps {
  subject: Subject;
  topic: Topic;
}

export default function TopicClient({ subject, topic }: TopicClientProps) {
  const [activeLesson, setActiveLesson] = useState(topic.lessons[0]?.id ?? null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState<{ xp: number } | null>(null);

  const currentLesson = topic.lessons.find((l) => l.id === activeLesson);
  const quiz = currentLesson?.quizId
    ? SAMPLE_QUIZZES.find((q) => q.id === currentLesson.quizId)
    : null;

  const handleMarkComplete = () => {
    if (activeLesson && !completedLessons.includes(activeLesson)) {
      setCompletedLessons((prev) => [...prev, activeLesson]);
    }
  };

  const handleQuizComplete = (_score: number, _total: number, xp: number) => {
    setQuizResult({ xp });
    handleMarkComplete();
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/subjects" className="hover:text-blue-600">Subjects</Link>
        <ChevronRight className="w-3 h-3" aria-hidden="true" />
        <Link href={`/subjects/${subject.id}`} className="hover:text-blue-600">{subject.name}</Link>
        <ChevronRight className="w-3 h-3" aria-hidden="true" />
        <span className="text-gray-800 font-medium">{topic.title}</span>
      </nav>

      {/* Topic header */}
      <div className={`${subject.bgColor} rounded-3xl p-5`}>
        <div className="flex items-start gap-3">
          <span className="text-3xl flex-shrink-0" aria-hidden="true">{subject.emoji}</span>
          <div>
            <span className={`text-xs font-bold ${subject.color} uppercase tracking-wide`}>
              {subject.name} · Year {topic.year}
            </span>
            <h1 className="text-2xl font-black text-gray-800 mt-0.5">{topic.title}</h1>
            <p className="text-gray-600 text-sm mt-1">{topic.description}</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4 flex-wrap">
          <div className="bg-white/70 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {topic.estimatedMinutes} min total
          </div>
          <div className="bg-white/70 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700">
            {topic.lessons.length} lessons
          </div>
          <div className="bg-white/70 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700">
            {completedLessons.length}/{topic.lessons.length} done
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Lesson list sidebar */}
        <div className="md:col-span-1 space-y-2">
          <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide px-1">Lessons</h2>
          {topic.lessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => {
                setActiveLesson(lesson.id);
                setShowQuiz(false);
                setQuizResult(null);
              }}
              className={`w-full text-left p-3 rounded-2xl border-2 transition-all ${
                activeLesson === lesson.id
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
              aria-pressed={activeLesson === lesson.id}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                    completedLessons.includes(lesson.id)
                      ? "bg-green-500 text-white"
                      : activeLesson === lesson.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                  aria-hidden="true"
                >
                  {completedLessons.includes(lesson.id) ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{lesson.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded-lg font-medium ${typeColor[lesson.type]}`}>
                      {typeEmoji[lesson.type]} {lesson.type}
                    </span>
                    <span className="text-xs text-gray-400">{lesson.durationMinutes}m</span>
                  </div>
                </div>
              </div>
            </button>
          ))}

          {/* Learning objectives */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 mt-4">
            <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-blue-600" aria-hidden="true" />
              Learning Objectives
            </h3>
            <ul className="space-y-2">
              {topic.learningObjectives.map((obj, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5 flex-shrink-0" aria-hidden="true">✦</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content area */}
        <div className="md:col-span-2 space-y-4">
          {currentLesson && !showQuiz && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Video placeholder */}
              {currentLesson.type === "video" && (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 aspect-video flex flex-col items-center justify-center text-white gap-3">
                  <button
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label={`Play video: ${currentLesson.title}`}
                  >
                    <Play className="w-7 h-7 ml-1" aria-hidden="true" />
                  </button>
                  <p className="text-sm opacity-70">{currentLesson.title}</p>
                  <div className="flex items-center gap-1 text-xs opacity-50">
                    <Video className="w-3 h-3" aria-hidden="true" />
                    {currentLesson.durationMinutes} min video
                  </div>
                </div>
              )}

              {/* Interactive / Lab placeholder */}
              {(currentLesson.type === "interactive" || currentLesson.type === "lab") && (
                <div className="bg-gradient-to-br from-green-600 to-teal-700 aspect-video flex flex-col items-center justify-center text-white gap-3">
                  <div className="text-5xl" aria-hidden="true">
                    {currentLesson.type === "lab" ? "🔬" : "🕹️"}
                  </div>
                  <p className="text-lg font-bold">
                    {currentLesson.type === "lab" ? "Virtual Lab" : "Interactive Activity"}
                  </p>
                  <p className="text-sm opacity-70 text-center max-w-xs px-4">{currentLesson.title}</p>
                  <button className="bg-white text-green-700 px-5 py-2 rounded-xl font-semibold text-sm hover:bg-green-50 transition-colors">
                    Launch {currentLesson.type === "lab" ? "Lab" : "Activity"} 🚀
                  </button>
                </div>
              )}

              {/* Reading banner */}
              {currentLesson.type === "reading" && (
                <div className={`${subject.bgColor} px-6 py-4 flex items-center gap-3`}>
                  <FileText className={`w-6 h-6 ${subject.color}`} aria-hidden="true" />
                  <span className={`font-semibold ${subject.color}`}>Reading: {currentLesson.title}</span>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs px-2.5 py-1 rounded-xl font-semibold ${typeColor[currentLesson.type]}`}>
                    {typeEmoji[currentLesson.type]} {currentLesson.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {currentLesson.durationMinutes} min
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">{currentLesson.title}</h2>
                <p className="text-gray-600 leading-relaxed">{currentLesson.content}</p>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleMarkComplete}
                    className={`flex-1 py-3 rounded-2xl font-semibold transition-colors ${
                      completedLessons.includes(currentLesson.id)
                        ? "bg-green-100 text-green-700 cursor-default"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    disabled={completedLessons.includes(currentLesson.id)}
                  >
                    {completedLessons.includes(currentLesson.id) ? "✓ Marked Complete" : "Mark Complete"}
                  </button>
                  {quiz && (
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="flex-1 py-3 rounded-2xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      Take Quiz 📝
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quiz view */}
          {showQuiz && quiz && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-800">{quiz.title}</h2>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back to lesson
                </button>
              </div>
              <QuizComponent quiz={quiz} onComplete={handleQuizComplete} />
              {quizResult && (
                <div className="mt-3 bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center" role="alert">
                  <p className="text-blue-700 font-semibold">
                    🎉 +{quizResult.xp} XP earned for this quiz!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* No quiz yet */}
          {!showQuiz && !quiz && currentLesson && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-sm text-yellow-700">
              💡 Quiz for this lesson is coming soon! Check back later.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
