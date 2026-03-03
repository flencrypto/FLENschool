import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import { SUBJECTS, SUBJECT_PROGRESS } from "@/lib/data";

export const metadata = {
  title: "Subjects | FLENschool",
  description: "Browse all GCSE subjects covered in FLENschool",
};

export default function SubjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" aria-hidden="true" />
          GCSE Subjects
        </h1>
        <p className="text-gray-500 mt-1">
          All subjects aligned to AQA, Edexcel, and OCR specifications for Years 10–11
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SUBJECTS.map((subject) => {
          const progress = SUBJECT_PROGRESS[subject.id] ?? 0;
          const totalTopics = subject.year10Topics.length + subject.year11Topics.length;
          return (
            <Link
              key={subject.id}
              href={`/subjects/${subject.id}`}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all group"
              aria-label={`${subject.name} — ${progress}% complete`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${subject.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center text-3xl`} aria-hidden="true">
                  {subject.emoji}
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 font-medium">{subject.examBoard}</span>
                  <p className="text-xs text-gray-400">{subject.specCode}</p>
                </div>
              </div>

              <h2 className="font-bold text-lg text-gray-800 group-hover:text-blue-700 transition-colors mb-1">
                {subject.name}
              </h2>
              <p className="text-xs text-gray-500 mb-4">{totalTopics} topics · Year 10 &amp; 11</p>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-gray-600">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div
                  className="h-2 bg-gray-100 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${subject.name} progress: ${progress}%`}
                >
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1 flex-wrap">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-lg font-medium">
                    Y10: {subject.year10Topics.length}
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-lg font-medium">
                    Y11: {subject.year11Topics.length}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
