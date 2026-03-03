"use client";

import { useState } from "react";

interface BreakReminderProps {
  onDismiss: () => void;
  onTakeBreak: () => void;
}

export default function BreakReminder({ onDismiss, onTakeBreak }: BreakReminderProps) {
  const [breakStarted, setBreakStarted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleTakeBreak = () => {
    setBreakStarted(true);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          onTakeBreak();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="break-title"
    >
      <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center shadow-2xl">
        {!breakStarted ? (
          <>
            <div className="text-6xl mb-4">🧘</div>
            <h2 id="break-title" className="text-xl font-bold text-gray-800 mb-2">
              Time for a Break!
            </h2>
            <p className="text-gray-500 mb-2">
              You&apos;ve been studying for a while. Your brain needs rest to absorb information!
            </p>
            <p className="text-sm text-indigo-600 font-medium mb-6">
              🌟 Try: stretch your arms, get a glass of water, or do 10 jumping jacks!
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleTakeBreak}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Take a 5-minute break ✅
              </button>
              <button
                onClick={onDismiss}
                className="w-full py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-colors text-sm"
              >
                I&apos;ll continue for now
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">⏸️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Break time!</h2>
            <p className="text-gray-500 mb-4">
              Stand up, move around, and rest your eyes. Resuming in...
            </p>
            <div className="text-5xl font-bold text-indigo-600 mb-6">{countdown}</div>
            <button
              onClick={onDismiss}
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
            >
              I&apos;m ready to continue! 💪
            </button>
          </>
        )}
      </div>
    </div>
  );
}
