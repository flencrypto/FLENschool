"use client";

import type { Subject } from "@/data/curriculum";
import type { UserProgress } from "@/lib/progress";
import Link from "next/link";

interface SubjectCardProps {
  subject: Subject;
  progress: UserProgress;
}

export default function SubjectCard({ subject, progress }: SubjectCardProps) {
  const completedInSubject = subject.topics.filter((t) =>
    progress.completedTopics.includes(t.id)
  ).length;
  const total = subject.topics.length;
  const pct = Math.round((completedInSubject / total) * 100);

  return (
    <Link
      href={`/subjects/${subject.id}`}
      className="block bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all p-5 group"
      aria-label={`${subject.title} – ${completedInSubject} of ${total} topics completed`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`text-3xl ${subject.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow`}>
          {subject.icon}
        </div>
        <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {subject.examBoard} {subject.specCode}
        </span>
      </div>
      <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-indigo-600 transition-colors">
        {subject.title}
      </h3>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{subject.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
        <span>{completedInSubject}/{total} topics</span>
        <span className="font-semibold text-indigo-600">{pct}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            pct === 100
              ? "bg-green-500"
              : pct > 50
              ? "bg-indigo-500"
              : "bg-indigo-300"
          }`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </Link>
  );
}
