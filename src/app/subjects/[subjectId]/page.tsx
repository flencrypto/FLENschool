import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Clock, ChevronRight, Target, Video, Beaker, FileText, Gamepad2 } from "lucide-react";
import { SUBJECTS, SUBJECT_PROGRESS } from "@/lib/data";
import type { Lesson } from "@/lib/types";

interface Props {
  params: Promise<{ subjectId: string }>;
}

const lessonTypeIcon: Record<Lesson["type"], React.ReactNode> = {
  video: <Video className="w-4 h-4" aria-hidden="true" />,
  interactive: <Gamepad2 className="w-4 h-4" aria-hidden="true" />,
  reading: <FileText className="w-4 h-4" aria-hidden="true" />,
  lab: <Beaker className="w-4 h-4" aria-hidden="true" />,
};

const lessonTypeLabel: Record<Lesson["type"], string> = {
  video: "Video",
  interactive: "Interactive",
  reading: "Reading",
  lab: "Virtual Lab",
};

export async function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subjectId: s.id }));
}

export async function generateMetadata({ params }: Props) {
  const { subjectId } = await params;
  const subject = SUBJECTS.find((s) => s.id === subjectId);
  return {
    title: subject ? `${subject.name} | FLENschool` : "Subject | FLENschool",
  };
}

export default async function SubjectPage({ params }: Props) {
  const { subjectId } = await params;
  const subject = SUBJECTS.find((s) => s.id === subjectId);
  if (!subject) notFound();

  const progress = SUBJECT_PROGRESS[subject.id] ?? 0;
  const allTopics = [...subject.year10Topics, ...subject.year11Topics];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/subjects" className="hover:text-blue-600">Subjects</Link>
        <span aria-hidden="true">/</span>
        <span className="text-gray-800 font-medium">{subject.name}</span>
      </nav>

      {/* Subject header */}
      <div className="flex items-start gap-4">
        <div className={`${subject.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0`} aria-hidden="true">
          {subject.emoji}
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-800">{subject.name}</h1>
          <p className="text-gray-500 mt-0.5">
            {subject.examBoard} · Spec {subject.specCode} · {allTopics.length} topics
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-2 text-sm font-semibold text-gray-700">
          <span>Overall Progress</span>
          <span>{progress}%</span>
        </div>
        <div
          className="h-3 bg-gray-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Year 10 topics */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">Year 10</span>
          Foundation Topics
        </h2>
        <div className="space-y-3">
          {subject.year10Topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{topic.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{topic.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {topic.estimatedMinutes} min
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  {topic.learningObjectives.slice(0, 2).map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <Target className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      {obj}
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  {topic.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/subjects/${subject.id}/${topic.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all group"
                    >
                      <div className={`${subject.bgColor} ${subject.color} p-2 rounded-lg`}>
                        {lessonTypeIcon[lesson.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-blue-700 truncate">
                          {lesson.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {lessonTypeLabel[lesson.type]} · {lesson.durationMinutes} min
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Year 11 topics */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">Year 11</span>
          Advanced Topics
        </h2>
        <div className="space-y-3">
          {subject.year11Topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{topic.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{topic.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {topic.estimatedMinutes} min
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  {topic.learningObjectives.slice(0, 2).map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <Target className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      {obj}
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  {topic.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/subjects/${subject.id}/${topic.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all group"
                    >
                      <div className={`${subject.bgColor} ${subject.color} p-2 rounded-lg`}>
                        {lessonTypeIcon[lesson.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-purple-700 truncate">
                          {lesson.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {lessonTypeLabel[lesson.type]} · {lesson.durationMinutes} min
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 flex-shrink-0" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link
        href="/subjects"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
      >
        <BookOpen className="w-4 h-4" aria-hidden="true" />
        Back to all subjects
      </Link>
    </div>
  );
}
