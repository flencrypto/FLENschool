import Link from 'next/link';
import { Subject } from '@/types';
import ProgressBar from './ProgressBar';

interface SubjectCardProps {
  subject: Subject;
  showProgress?: boolean;
}

export default function SubjectCard({ subject, showProgress = false }: SubjectCardProps) {
  const totalLessons = subject.topics.reduce((acc, t) => acc + t.lessons.length, 0);
  const completedLessons = subject.topics.reduce(
    (acc, t) => acc + t.lessons.filter((l) => l.completed).length,
    0
  );
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <Link href={`/subjects/${subject.id}`}>
      <div className={`${subject.bgColor} rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 h-full flex flex-col`}>
        <div className="text-4xl mb-3">{subject.icon}</div>
        <h3 className={`text-lg font-bold ${subject.color} mb-1`}>{subject.name}</h3>
        <p className="text-gray-600 text-sm flex-1 mb-3">{subject.description}</p>
        {showProgress && (
          <div className="mt-auto">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{completedLessons}/{totalLessons} lessons</span>
              <span>{overallProgress}%</span>
            </div>
            <ProgressBar progress={overallProgress} height="h-2" />
          </div>
        )}
      </div>
    </Link>
  );
}
