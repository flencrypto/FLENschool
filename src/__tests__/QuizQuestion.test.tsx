import { render, screen, fireEvent } from '@testing-library/react';
import QuizQuestion from '@/components/QuizQuestion';
import { Question } from '@/types';

const mockQuestion: Question = {
  id: 'q1',
  text: 'What is 2 + 2?',
  options: ['3', '4', '5', '6'],
  correctAnswer: 1,
  explanation: '2 + 2 = 4',
};

describe('QuizQuestion', () => {
  it('renders question text', () => {
    render(<QuizQuestion question={mockQuestion} questionNumber={1} onAnswer={jest.fn()} />);
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<QuizQuestion question={mockQuestion} questionNumber={1} onAnswer={jest.fn()} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('calls onAnswer with true when correct option selected', () => {
    const onAnswer = jest.fn();
    render(<QuizQuestion question={mockQuestion} questionNumber={1} onAnswer={onAnswer} />);
    fireEvent.click(screen.getByText('4'));
    expect(onAnswer).toHaveBeenCalledWith(true);
  });

  it('calls onAnswer with false when wrong option selected', () => {
    const onAnswer = jest.fn();
    render(<QuizQuestion question={mockQuestion} questionNumber={1} onAnswer={onAnswer} />);
    fireEvent.click(screen.getByText('3'));
    expect(onAnswer).toHaveBeenCalledWith(false);
  });

  it('shows explanation after answering', () => {
    render(<QuizQuestion question={mockQuestion} questionNumber={1} onAnswer={jest.fn()} />);
    fireEvent.click(screen.getByText('4'));
    expect(screen.getByText('2 + 2 = 4')).toBeInTheDocument();
  });
});
