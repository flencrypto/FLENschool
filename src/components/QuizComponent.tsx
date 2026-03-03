"use client";

import { useState, useEffect, useCallback } from "react";
import type { QuizQuestion } from "@/data/quizzes";

interface QuizComponentProps {
  topicTitle: string;
  questions: QuizQuestion[];
  onComplete: (score: number, total: number, timeSpentSeconds: number) => void;
}

export default function QuizComponent({
  topicTitle,
  questions,
  onComplete,
}: QuizComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(() => Date.now());
  const [finished, setFinished] = useState(false);
  const [shuffledQuestions] = useState(() =>
    [...questions].sort(() => Math.random() - 0.5)
  );

  const current = shuffledQuestions[currentIndex];
  const isLastQuestion = currentIndex === shuffledQuestions.length - 1;

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === current.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const finalScore = score + (selectedOption === current.correctIndex ? 1 : 0);
      setFinished(true);
      onComplete(finalScore, shuffledQuestions.length, timeSpent);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  }, [isLastQuestion, startTime, score, selectedOption, current, shuffledQuestions.length, onComplete]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && showExplanation) handleNext();
      if (!showExplanation && e.key >= "1" && e.key <= "4") {
        handleSelect(parseInt(e.key) - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showExplanation, handleNext]);

  if (finished) {
    const pct = Math.round((score / shuffledQuestions.length) * 100);
    const grade =
      pct >= 90 ? "⭐ Excellent!" : pct >= 70 ? "👍 Good work!" : pct >= 50 ? "📚 Keep practising!" : "💪 Review this topic!";
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">{pct >= 70 ? "🎉" : "💪"}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
        <p className="text-gray-500 mb-4">{topicTitle}</p>
        <div className="text-4xl font-bold text-indigo-600 mb-2">
          {score}/{shuffledQuestions.length}
        </div>
        <div className="text-lg text-gray-600 mb-4">{pct}% • {grade}</div>
        <div className="w-full bg-gray-200 rounded-full h-4 max-w-xs mx-auto mb-6">
          <div
            className="h-4 rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {currentIndex + 1} of {shuffledQuestions.length}
        </span>
        <div className="flex gap-1">
          {shuffledQuestions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < currentIndex
                  ? "bg-indigo-500"
                  : i === currentIndex
                  ? "bg-indigo-300"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-500">
          Score: {score}
        </span>
      </div>

      {/* Difficulty badge */}
      <div className="mb-4">
        <span
          className={`inline-block text-xs px-2 py-0.5 rounded-full font-semibold ${
            current.difficulty === 1
              ? "bg-green-100 text-green-700"
              : current.difficulty === 2
              ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {current.difficulty === 1 ? "⭐ Foundation" : current.difficulty === 2 ? "⭐⭐ Intermediate" : "⭐⭐⭐ Higher"}
        </span>
      </div>

      {/* Question */}
      <p className="text-lg font-semibold text-gray-800 mb-6">{current.question}</p>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {current.options.map((option, idx) => {
          let style =
            "w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all text-base ";
          if (selectedOption === null) {
            style += "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 bg-white text-gray-700 cursor-pointer";
          } else if (idx === current.correctIndex) {
            style += "border-green-500 bg-green-50 text-green-800";
          } else if (idx === selectedOption) {
            style += "border-red-400 bg-red-50 text-red-700";
          } else {
            style += "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed";
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={style}
              disabled={selectedOption !== null}
              aria-pressed={selectedOption === idx}
            >
              <span className="text-gray-400 mr-3">{idx + 1}.</span>
              {option}
              {selectedOption !== null && idx === current.correctIndex && (
                <span className="ml-2">✅</span>
              )}
              {selectedOption === idx && idx !== current.correctIndex && (
                <span className="ml-2">❌</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="mb-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
          <p className="text-sm font-semibold text-blue-700 mb-1">💡 Explanation</p>
          <p className="text-sm text-blue-900">{current.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {showExplanation && (
        <button
          onClick={handleNext}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-base"
        >
          {isLastQuestion ? "Finish Quiz 🎉" : "Next Question →"}
        </button>
      )}
    </div>
  );
}
