import type { Metadata } from 'next';
import Link from 'next/link';
import { subjects } from '@/data/subjects';
import ProgressBar from '@/components/ProgressBar';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ subjectId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subjectId } = await params;
  const subject = subjects.find((s) => s.id === subjectId);
  return { title: subject ? `${subject.name} - FLENschool` : 'Subject - FLENschool' };
}

export default async function SubjectPage({ params }: Props) {
  const { subjectId } = await params;
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) notFound();

  return (
    <div>
      <div className={`${subject.bgColor} rounded-3xl p-8 mb-8`}>
        <div className="text-5xl mb-3">{subject.icon}</div>
        <h1 className={`text-3xl font-bold ${subject.color} mb-2`}>{subject.name}</h1>
        <p className="text-gray-600 text-lg">{subject.description}</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-5">Topics</h2>
      <div className="space-y-4">
        {subject.topics.map((topic) => {
          const totalLessons = topic.lessons.length;
          const completedLessons = topic.lessons.filter((l) => l.completed).length;

          return (
            <div key={topic.id} className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{topic.title}</h3>
                  <p className="text-gray-500">{topic.description}</p>
                </div>
                <span className="ml-4 text-sm text-gray-500 whitespace-nowrap">
                  {completedLessons}/{totalLessons} lessons
                </span>
              </div>
              <ProgressBar progress={topic.progress} showLabel />
              <div className="mt-4 space-y-2">
                {topic.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/subjects/${subject.id}/lessons/${lesson.id}`}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${lesson.completed ? 'bg-green-50 text-green-700' : 'bg-gray-50 hover:bg-purple-50 text-gray-700'}`}
                  >
                    <span className="text-xl">{lesson.completed ? '✅' : '📖'}</span>
                    <span className="font-medium">{lesson.title}</span>
                    <span className="ml-auto text-sm text-gray-400">{lesson.duration} min</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
