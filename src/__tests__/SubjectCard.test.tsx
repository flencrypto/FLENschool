import { render, screen } from '@testing-library/react';
import SubjectCard from '@/components/SubjectCard';
import { Subject } from '@/types';

const mockSubject: Subject = {
  id: 'maths',
  name: 'Mathematics',
  icon: '📐',
  color: 'text-blue-700',
  bgColor: 'bg-blue-100',
  description: 'Numbers, algebra, geometry and statistics',
  topics: [
    {
      id: 'maths-algebra',
      subjectId: 'maths',
      title: 'Algebra',
      description: 'Test',
      completed: false,
      progress: 50,
      lessons: [
        { id: 'l1', topicId: 'maths-algebra', title: 'Lesson 1', content: 'Content', duration: 10, completed: true },
        { id: 'l2', topicId: 'maths-algebra', title: 'Lesson 2', content: 'Content', duration: 10, completed: false },
      ],
    },
  ],
};

describe('SubjectCard', () => {
  it('renders subject name', () => {
    render(<SubjectCard subject={mockSubject} />);
    expect(screen.getByText('Mathematics')).toBeInTheDocument();
  });

  it('renders subject description', () => {
    render(<SubjectCard subject={mockSubject} />);
    expect(screen.getByText('Numbers, algebra, geometry and statistics')).toBeInTheDocument();
  });

  it('renders subject icon', () => {
    render(<SubjectCard subject={mockSubject} />);
    expect(screen.getByText('📐')).toBeInTheDocument();
  });

  it('shows progress when showProgress is true', () => {
    render(<SubjectCard subject={mockSubject} showProgress />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
