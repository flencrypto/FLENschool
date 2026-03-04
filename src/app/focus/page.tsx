'use client';

import { useState } from 'react';
import FocusTimer from '@/components/FocusTimer';
import BreakReminder from '@/components/BreakReminder';

export default function FocusPage() {
  const [showBreakReminder, setShowBreakReminder] = useState(false);
  const [totalSessions, setTotalSessions] = useState(0);

  const handleSessionComplete = (sessions: number) => {
    setTotalSessions(sessions);
    setShowBreakReminder(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🍅 Focus Mode</h1>
        <p className="text-gray-600 text-lg">Pomodoro timer to help you study with focus and regular breaks</p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-10 mb-6">
        <FocusTimer
          workMinutes={25}
          breakMinutes={5}
          onSessionComplete={handleSessionComplete}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-purple-50 rounded-2xl p-5">
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="font-bold text-purple-800">25 min focus</h3>
          <p className="text-gray-600 text-sm">Work without distractions</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-5">
          <div className="text-3xl mb-2">☕</div>
          <h3 className="font-bold text-green-800">5 min break</h3>
          <p className="text-gray-600 text-sm">Rest and recharge</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-5">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="font-bold text-yellow-800">{totalSessions} sessions</h3>
          <p className="text-gray-600 text-sm">Completed today</p>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-blue-50 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-3">💡 Focus Tips for ADHD</h3>
        <ul className="space-y-2 text-blue-700">
          <li>✅ Remove your phone from sight during focus time</li>
          <li>✅ Use noise-cancelling headphones or white noise</li>
          <li>✅ Have a glass of water nearby</li>
          <li>✅ Write down distracting thoughts to deal with later</li>
          <li>✅ Stand up and stretch during every break</li>
        </ul>
      </div>

      {showBreakReminder && (
        <BreakReminder
          onDismiss={() => setShowBreakReminder(false)}
          onStartBreak={() => setShowBreakReminder(false)}
        />
      )}
    </div>
  );
}
