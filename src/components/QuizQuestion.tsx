'use client';

import { useState } from 'react';
import { Question } from '@/types';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  onAnswer: (correct: boolean) => void;
}

export default function QuizQuestion({ question, questionNumber, onAnswer }: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    onAnswer(index === question.correctAnswer);
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selected === index
        ? 'border-purple-500 bg-purple-50'
        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50';
    }
    if (index === question.correctAnswer) return 'border-green-500 bg-green-50 text-green-800';
    if (selected === index) return 'border-red-500 bg-red-50 text-red-800';
    return 'border-gray-200 bg-gray-50 opacity-50';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <p className="text-sm text-purple-600 font-semibold mb-2">Question {questionNumber}</p>
      <h3 className="text-xl font-bold text-gray-800 mb-5">{question.text}</h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-full text-left p-4 rounded-xl border-2 font-medium text-lg transition-all duration-200 ${getOptionStyle(index)}`}
            disabled={showResult}
          >
            <span className="mr-3 font-bold text-purple-600">{String.fromCharCode(65 + index)}.</span>
            {option}
          </button>
        ))}
      </div>
      {showResult && (
        <div className={`mt-5 p-4 rounded-xl ${selected === question.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <p className="font-bold text-lg mb-1">
            {selected === question.correctAnswer ? '🎉 Correct!' : '❌ Not quite!'}
          </p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
