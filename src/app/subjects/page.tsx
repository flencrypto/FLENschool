import type { Metadata } from 'next';
import SubjectCard from '@/components/SubjectCard';
import { subjects } from '@/data/subjects';

export const metadata: Metadata = {
  title: 'Subjects - FLENschool',
};

export default function SubjectsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 All Subjects</h1>
        <p className="text-gray-600 text-lg">Choose a subject to start learning. You&apos;ve got this!</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} showProgress />
        ))}
      </div>
    </div>
  );
}
