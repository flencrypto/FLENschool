'use client';

interface BreakReminderProps {
  onDismiss: () => void;
  onStartBreak: () => void;
}

export default function BreakReminder({ onDismiss, onStartBreak }: BreakReminderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl">
        <div className="text-6xl mb-4">🌟</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Time for a Break!</h2>
        <p className="text-gray-600 mb-6 text-lg">
          You&apos;ve worked hard! Take a 5-minute break to rest your eyes and stretch. Your brain will thank you! 🧠
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onStartBreak}
            className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-colors"
          >
            ☕ Start Break
          </button>
          <button
            onClick={onDismiss}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
          >
            Keep Going
          </button>
        </div>
      </div>
    </div>
  );
}
