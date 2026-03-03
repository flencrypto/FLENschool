'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { subjects } from '@/data/subjects';
import QuizQuestion from '@/components/QuizQuestion';
import { notFound } from 'next/navigation';

interface Props {
  params: { subjectId: string; lessonId: string };
}

export default function LessonPage({ params }: Props) {
  const router = useRouter();
  const subject = subjects.find((s) => s.id === params.subjectId);
  const lesson = subject?.topics.flatMap((t) => t.lessons).find((l) => l.id === params.lessonId);

  if (!subject || !lesson) notFound();

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleAnswer = (correct: boolean) => {
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (lesson.quiz && currentQuestion < lesson.quiz.questions.length - 1) {
        setCurrentQuestion((q) => q + 1);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={() => router.back()} className="text-purple-600 hover:underline font-medium">← Back</button>
        <span>/</span>
        <span>{subject.name}</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">{lesson.title}</span>
      </div>

      {/* Video placeholder */}
      <div className="bg-gray-800 rounded-2xl aspect-video flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-3">▶️</div>
          <p className="text-xl font-semibold">{lesson.title}</p>
          <p className="text-gray-300">{lesson.duration} minutes</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{lesson.title}</h1>
        <div className="prose max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed">{lesson.content}</p>
        </div>
      </div>

      {/* Quiz Section */}
      {lesson.quiz && !quizStarted && !quizComplete && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white text-center">
          <div className="text-4xl mb-3">🧠</div>
          <h2 className="text-2xl font-bold mb-2">Ready to test your knowledge?</h2>
          <p className="text-purple-100 mb-5">{lesson.quiz.questions.length} questions • Earn XP!</p>
          <button
            onClick={() => setQuizStarted(true)}
            className="px-8 py-3 bg-white text-purple-700 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors"
          >
            Start Quiz 🚀
          </button>
        </div>
      )}

      {lesson.quiz && quizStarted && !quizComplete && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Quiz Time! 🧠</h2>
            <span className="text-gray-500 text-sm">
              {currentQuestion + 1} / {lesson.quiz.questions.length}
            </span>
          </div>
          <QuizQuestion
            question={lesson.quiz.questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            onAnswer={handleAnswer}
          />
        </div>
      )}

      {quizComplete && lesson.quiz && (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="text-6xl mb-4">
            {score === lesson.quiz.questions.length ? '🎉' : score >= lesson.quiz.questions.length / 2 ? '👍' : '💪'}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          <p className="text-gray-600 text-lg mb-4">
            You scored {score} out of {lesson.quiz.questions.length}
          </p>
          <div className="text-4xl font-bold text-purple-600 mb-6">+{score * 25} XP earned!</div>
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors"
          >
            Continue Learning →
          </button>
        </div>
      )}
    </div>
  );
}
