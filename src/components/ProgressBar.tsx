'use client';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  animated?: boolean;
}

export default function ProgressBar({
  progress,
  color = 'bg-purple-500',
  height = 'h-3',
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
          <span>Progress</span>
          <span>{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${color} ${height} rounded-full ${animated ? 'transition-all duration-700 ease-out' : ''}`}
          style={{ width: `${clampedProgress}%` }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
