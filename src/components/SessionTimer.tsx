"use client";
import { useState, useEffect, useCallback } from "react";
import { Timer, Coffee, Zap } from "lucide-react";

interface SessionTimerProps {
  sessionMinutes: number;
  breakMinutes?: number;
}

export default function SessionTimer({ sessionMinutes, breakMinutes = 5 }: SessionTimerProps) {
  const totalSeconds = sessionMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isBreak, setIsBreak] = useState(false);
  const [showBreakAlert, setShowBreakAlert] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  const resetSession = useCallback(() => {
    setIsBreak(false);
    setSecondsLeft(totalSeconds);
    setShowBreakAlert(false);
    setIsRunning(true);
  }, [totalSeconds]);

  // Countdown ticker
  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, isRunning]);

  // Trigger break or reset when timer hits zero
  useEffect(() => {
    if (secondsLeft !== 0) return;
    if (!isBreak) {
      setShowBreakAlert(true);
      setIsBreak(true);
      setSecondsLeft(breakMinutes * 60);
    } else {
      resetSession();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = isBreak
    ? ((breakMinutes * 60 - secondsLeft) / (breakMinutes * 60)) * 100
    : ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      {showBreakAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
            <div className="text-6xl mb-4">🧘</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Time for a Break!</h2>
            <p className="text-gray-600 mb-2">
              Amazing work! You&apos;ve been studying for {sessionMinutes} minutes.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Stand up, stretch, grab some water, and come back refreshed. 💪
            </p>
            <div className="bg-blue-50 rounded-2xl p-4 mb-6">
              <p className="text-blue-700 font-medium text-sm">💡 Break Ideas</p>
              <ul className="text-blue-600 text-sm mt-2 space-y-1 text-left">
                <li>🚶 Walk around for 2 minutes</li>
                <li>💧 Get a glass of water</li>
                <li>🙆 Do 10 jumping jacks</li>
                <li>🔭 Look at something far away</li>
              </ul>
            </div>
            <button
              onClick={() => setShowBreakAlert(false)}
              className="w-full bg-blue-600 text-white rounded-2xl py-3 font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Start {breakMinutes}-min Break ☕
            </button>
          </div>
        </div>
      )}

      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-sm font-semibold transition-all ${
          isBreak
            ? "bg-green-100 text-green-700"
            : secondsLeft < 60
            ? "bg-red-100 text-red-700 animate-pulse"
            : "bg-blue-100 text-blue-700"
        }`}
        title={isBreak ? "Break time!" : `Session timer — ${minutes}:${String(seconds).padStart(2, "0")} remaining`}
      >
        <div className="relative w-8 h-8">
          <svg className="w-8 h-8 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.2" />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {isBreak ? <Coffee className="w-3 h-3" /> : <Timer className="w-3 h-3" />}
          </div>
        </div>
        <span aria-live="polite">
          {isBreak ? "Break: " : ""}
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
        <button
          onClick={() => setIsRunning((r) => !r)}
          className="opacity-60 hover:opacity-100 transition-opacity"
          aria-label={isRunning ? "Pause timer" : "Resume timer"}
        >
          {isRunning ? "⏸" : "▶️"}
        </button>
        {isBreak && (
          <button
            onClick={resetSession}
            className="opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Skip break and return to study"
            title="Skip break"
          >
            <Zap className="w-3 h-3" />
          </button>
        )}
      </div>
    </>
  );
}
