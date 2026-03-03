"use client";

import { useEffect, useState, useCallback } from "react";

interface SessionTimerProps {
  maxMinutes?: number;
  onBreakRequired?: () => void;
}

export default function SessionTimer({
  maxMinutes = 25,
  onBreakRequired,
}: SessionTimerProps) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [breakAlertShown, setBreakAlertShown] = useState(false);

  const maxSeconds = maxMinutes * 60;
  const remaining = Math.max(0, maxSeconds - secondsElapsed);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = (secondsElapsed / maxSeconds) * 100;

  const isWarning = remaining <= 300 && remaining > 0; // last 5 minutes
  const isExpired = remaining === 0;

  const handleBreak = useCallback(() => {
    setIsRunning(false);
    setBreakAlertShown(false);
    setSecondsElapsed(0);
    onBreakRequired?.();
  }, [onBreakRequired]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => {
        const next = prev + 1;
        if (next >= maxSeconds && !breakAlertShown) {
          setBreakAlertShown(true);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, maxSeconds, breakAlertShown]);

  useEffect(() => {
    if (isExpired && !breakAlertShown) {
      onBreakRequired?.();
    }
  }, [isExpired, breakAlertShown, onBreakRequired]);

  const progressColor = isExpired
    ? "bg-red-500"
    : isWarning
    ? "bg-amber-500"
    : "bg-emerald-500";

  return (
    <div className={`flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow-sm border ${isWarning || isExpired ? "border-amber-300" : "border-gray-100"}`}>
      <div className="text-lg" aria-hidden="true">⏱️</div>
      <div className="flex flex-col min-w-0">
        <div className={`text-sm font-semibold ${isExpired ? "text-red-600 timer-warning" : isWarning ? "text-amber-600" : "text-gray-700"}`}>
          {isExpired ? "Break time! 🧘" : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
        </div>
        <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${progressColor}`}
            style={{ width: `${Math.min(100, progress)}%` }}
            role="progressbar"
            aria-valuenow={Math.min(100, Math.round(progress))}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
      {isExpired && (
        <button
          onClick={handleBreak}
          className="ml-2 text-xs bg-amber-500 text-white px-2 py-1 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
        >
          Take break
        </button>
      )}
    </div>
  );
}
