'use client';

import { useState, useEffect, useCallback } from 'react';

interface FocusTimerProps {
  workMinutes?: number;
  breakMinutes?: number;
  onSessionComplete?: (sessions: number) => void;
}

type TimerMode = 'work' | 'break';

export default function FocusTimer({
  workMinutes = 25,
  breakMinutes = 5,
  onSessionComplete,
}: FocusTimerProps) {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const totalTime = mode === 'work' ? workMinutes * 60 : breakMinutes * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const switchMode = useCallback(() => {
    if (mode === 'work') {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      onSessionComplete?.(newSessions);
      setMode('break');
      setTimeLeft(breakMinutes * 60);
    } else {
      setMode('work');
      setTimeLeft(workMinutes * 60);
    }
    setIsRunning(false);
  }, [mode, sessions, workMinutes, breakMinutes, onSessionComplete]);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) {
      switchMode();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, switchMode]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? workMinutes * 60 : breakMinutes * 60);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className={`text-sm font-bold uppercase tracking-widest px-4 py-1 rounded-full ${mode === 'work' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
        {mode === 'work' ? '🍅 Focus Time' : '☕ Break Time'}
      </div>

      {/* Circular Progress */}
      <div className="relative w-52 h-52">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="45" fill="none"
            stroke={mode === 'work' ? '#9333ea' : '#22c55e'}
            strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-gray-800">{formatTime(timeLeft)}</span>
          <span className="text-sm text-gray-500 mt-1">{mode === 'work' ? 'focus' : 'rest'}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors text-lg"
        >
          ↺ Reset
        </button>
        <button
          onClick={() => setIsRunning((r) => !r)}
          className={`px-8 py-3 rounded-xl font-bold text-white text-lg transition-colors ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'}`}
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        <button
          onClick={switchMode}
          className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors text-lg"
        >
          Skip →
        </button>
      </div>

      <div className="text-center">
        <p className="text-gray-600 text-sm">Sessions completed today</p>
        <p className="text-4xl font-bold text-purple-600">{sessions}</p>
      </div>
    </div>
  );
}
