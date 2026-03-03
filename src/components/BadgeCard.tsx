import { Badge } from '@/types';

interface BadgeCardProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
}

export default function BadgeCard({ badge, size = 'md' }: BadgeCardProps) {
  const sizeClasses = {
    sm: 'p-3 text-2xl',
    md: 'p-4 text-3xl',
    lg: 'p-6 text-4xl',
  };

  return (
    <div
      className={`flex flex-col items-center text-center rounded-2xl ${badge.earned ? badge.color : 'bg-gray-100 text-gray-400'} ${sizeClasses[size]} transition-transform hover:scale-105 cursor-pointer`}
      title={badge.description}
    >
      <div className={badge.earned ? '' : 'grayscale opacity-50'}>{badge.icon}</div>
      <p className="font-bold mt-2 text-sm">{badge.name}</p>
      {size !== 'sm' && (
        <p className="text-xs mt-1 opacity-75">{badge.description}</p>
      )}
      {badge.earned && (
        <div className="mt-2 text-xs font-semibold">+{badge.xpReward} XP</div>
      )}
    </div>
  );
}
