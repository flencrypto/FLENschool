"use client";
import { useState } from "react";
import { CheckCircle, XCircle, HelpCircle, ChevronRight } from "lucide-react";
import { Quiz, Question } from "@/lib/types";
import { calcPercentage, calcQuizXP } from "@/lib/utils";

interface QuizComponentProps {
  quiz: Quiz;
  onComplete?: (score: number, total: number, xp: number) => void;
}

export default function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const question: Question = quiz.questions[current];
  const totalQ = quiz.questions.length;
  const totalMarks = quiz.questions.reduce((a, q) => a + q.marks, 0);
  const earnedMarks = quiz.questions
    .slice(0, results.length)
    .reduce((a, q, i) => a + (results[i] ? q.marks : 0), 0);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    const correct = selected === question.correctAnswer;
    const newResults = [...results, correct];
    setResults(newResults);
    setAnswered(true);
  };

  const handleNext = () => {
    if (current + 1 >= totalQ) {
      const xp = calcQuizXP(earnedMarks, totalMarks);
      setFinished(true);
      onComplete?.(earnedMarks, totalMarks, xp);
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setResults([]);
    setFinished(false);
  };

  const percentage = calcPercentage(earnedMarks, totalMarks);
  const gradeEmoji = percentage >= 90 ? "🏆" : percentage >= 70 ? "🌟" : percentage >= 50 ? "👍" : "📚";
  const gradeLabel =
    percentage >= 90
      ? "Outstanding!"
      : percentage >= 70
      ? "Great work!"
      : percentage >= 50
      ? "Good effort!"
      : "Keep practising!";

  if (finished) {
    const xp = calcQuizXP(earnedMarks, totalMarks);
    return (
      <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100">
        <div className="text-6xl mb-4" role="img" aria-label={gradeLabel}>{gradeEmoji}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{gradeLabel}</h2>
        <p className="text-gray-500 mb-6">{quiz.title}</p>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-4">
          <div className="text-5xl font-black">{percentage}%</div>
          <div className="text-blue-100 mt-1">
            {earnedMarks} / {totalMarks} marks
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 mb-6">
          <p className="text-yellow-700 font-semibold">⚡ +{xp} XP earned!</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6" role="list" aria-label="Question results">
          {results.map((correct, i) => (
            <div
              key={i}
              role="listitem"
              className={`rounded-xl p-3 text-sm font-medium ${
                correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
              }`}
            >
              {correct ? "✓" : "✗"} Q{i + 1}
            </div>
          ))}
        </div>

        <button
          onClick={handleRestart}
          className="w-full bg-blue-600 text-white rounded-2xl py-3 font-semibold hover:bg-blue-700 transition-colors"
        >
          Try Again 🔄
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Progress header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="flex items-center justify-between text-white mb-3">
          <span className="text-sm font-medium opacity-80">{quiz.title}</span>
          <span className="text-sm font-bold" aria-label={`Question ${current + 1} of ${totalQ}`}>
            {current + 1} / {totalQ}
          </span>
        </div>
        <div
          className="h-2 bg-white/30 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={totalQ}
          aria-label={`Quiz progress: ${current} of ${totalQ} questions answered`}
        >
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${(current / totalQ) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6">
        {/* Question text */}
        <div className="flex items-start gap-3 mb-6">
          <div className="bg-blue-100 text-blue-700 rounded-xl px-2.5 py-1 text-xs font-bold flex-shrink-0 mt-0.5">
            {question.marks} {question.marks === 1 ? "mark" : "marks"}
          </div>
          <p className="text-gray-800 font-medium leading-relaxed">{question.text}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6" role="radiogroup" aria-label="Answer options">
          {question.options?.map((option, idx) => {
            const isSelected = selected === idx;
            const isCorrect = idx === question.correctAnswer;
            let containerStyle = "border-2 border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer";
            if (!answered && isSelected) {
              containerStyle = "border-2 border-blue-500 bg-blue-50 cursor-pointer";
            }
            if (answered) {
              if (isCorrect) containerStyle = "border-2 border-green-500 bg-green-50 cursor-not-allowed";
              else if (isSelected) containerStyle = "border-2 border-red-400 bg-red-50 cursor-not-allowed";
              else containerStyle = "border-2 border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed";
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                aria-pressed={isSelected}
                className={`w-full text-left rounded-2xl p-4 transition-all flex items-center gap-3 ${containerStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-bold border-2 ${
                    answered && isCorrect
                      ? "bg-green-500 border-green-500 text-white"
                      : answered && isSelected && !isCorrect
                      ? "bg-red-400 border-red-400 text-white"
                      : isSelected
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                  aria-hidden="true"
                >
                  {["A", "B", "C", "D"][idx]}
                </span>
                <span className="text-gray-700 flex-1">{option}</span>
                {answered && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" aria-label="Correct answer" />
                )}
                {answered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" aria-label="Incorrect" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div
            className={`rounded-2xl p-4 mb-4 flex gap-3 ${
              selected === question.correctAnswer
                ? "bg-green-50 border border-green-200"
                : "bg-orange-50 border border-orange-200"
            }`}
            role="alert"
          >
            <HelpCircle
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                selected === question.correctAnswer ? "text-green-600" : "text-orange-600"
              }`}
              aria-hidden="true"
            />
            <div>
              <p className={`text-sm font-semibold mb-1 ${
                selected === question.correctAnswer ? "text-green-700" : "text-orange-700"
              }`}>
                {selected === question.correctAnswer ? "✓ Correct!" : "✗ Not quite"}
              </p>
              <p className="text-sm text-gray-700">{question.explanation}</p>
            </div>
          </div>
        )}

        {/* Action buttons */}
        {!answered ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="w-full bg-blue-600 text-white rounded-2xl py-3 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl py-3 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {current + 1 >= totalQ ? "See Results 🏆" : "Next Question"}
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
