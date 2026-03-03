export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (progress: UserProgress) => boolean;
}

export interface UserProgress {
  userId: string;
  points: number;
  level: number;
  completedTopics: string[];
  quizAttempts: QuizAttempt[];
  streakDays: number;
  lastStudyDate: string;
  totalStudyMinutes: number;
  unlockedBadges: string[];
  weeklyReflections: WeeklyReflection[];
}

export interface QuizAttempt {
  topicId: string;
  score: number;
  totalQuestions: number;
  timestamp: string;
  timeSpentSeconds: number;
}

export interface WeeklyReflection {
  weekStart: string;
  favouriteTopic: string;
  reflection: string;
}

export const BADGES: Badge[] = [
  {
    id: "first-lesson",
    name: "First Step",
    description: "Complete your first lesson",
    icon: "🌟",
    condition: (p) => p.completedTopics.length >= 1,
  },
  {
    id: "quiz-ace",
    name: "Quiz Ace",
    description: "Score 100% on a quiz",
    icon: "🎯",
    condition: (p) =>
      p.quizAttempts.some((a) => a.score === a.totalQuestions && a.totalQuestions > 0),
  },
  {
    id: "week-warrior",
    name: "Week Warrior",
    description: "Study 5 days in a row",
    icon: "🔥",
    condition: (p) => p.streakDays >= 5,
  },
  {
    id: "science-starter",
    name: "Science Starter",
    description: "Complete a Science topic",
    icon: "🔬",
    condition: (p) =>
      p.completedTopics.some(
        (t) => t.startsWith("bio-") || t.startsWith("chem-") || t.startsWith("phys-")
      ),
  },
  {
    id: "maths-master",
    name: "Maths Master",
    description: "Complete 3 Maths topics",
    icon: "📐",
    condition: (p) =>
      p.completedTopics.filter((t) => t.startsWith("maths-")).length >= 3,
  },
  {
    id: "bookworm",
    name: "Bookworm",
    description: "Complete 3 English topics",
    icon: "📖",
    condition: (p) =>
      p.completedTopics.filter((t) => t.startsWith("english-")).length >= 3,
  },
  {
    id: "century-club",
    name: "Century Club",
    description: "Earn 100 points",
    icon: "💯",
    condition: (p) => p.points >= 100,
  },
  {
    id: "focus-hero",
    name: "Focus Hero",
    description: "Study for a total of 60 minutes",
    icon: "⏱️",
    condition: (p) => p.totalStudyMinutes >= 60,
  },
  {
    id: "polyglot",
    name: "Polyglot",
    description: "Complete a French topic",
    icon: "🗼",
    condition: (p) => p.completedTopics.some((t) => t.startsWith("fr-")),
  },
  {
    id: "coder",
    name: "Coder",
    description: "Complete a Computer Science topic",
    icon: "💻",
    condition: (p) => p.completedTopics.some((t) => t.startsWith("cs-")),
  },
  {
    id: "crypto-explorer",
    name: "Crypto Explorer",
    description: "Complete a Blockchain & Crypto topic",
    icon: "⛓️",
    condition: (p) => p.completedTopics.some((t) => t.startsWith("blockchain-")),
  },
  {
    id: "ai-pioneer",
    name: "AI Pioneer",
    description: "Complete both Prompt Engineering and NLP App Creation",
    icon: "🤖",
    condition: (p) =>
      p.completedTopics.includes("cs-prompt-engineering") &&
      p.completedTopics.includes("cs-nlp-app-creation"),
  },
];

export const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 750, 1000, 1500, 2000, 3000];

export function getLevelFromPoints(points: number): number {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (points >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return level;
}

export function getPointsForNextLevel(currentPoints: number): {
  current: number;
  next: number;
  threshold: number;
  isMaxLevel: boolean;
} {
  const level = getLevelFromPoints(currentPoints);
  const isMaxLevel = level >= LEVEL_THRESHOLDS.length;
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold = isMaxLevel
    ? currentThreshold + 500
    : LEVEL_THRESHOLDS[level] ?? currentThreshold + 500;
  return {
    current: currentPoints - currentThreshold,
    next: nextThreshold - currentThreshold,
    threshold: nextThreshold,
    isMaxLevel,
  };
}

export function calculateQuizPoints(
  score: number,
  total: number,
  timeSpentSeconds: number
): number {
  const basePoints = Math.round((score / total) * 10);
  const speedBonus = timeSpentSeconds < 60 && score === total ? 5 : 0;
  return basePoints + speedBonus;
}

export function checkNewBadges(
  progress: UserProgress
): string[] {
  const newBadges: string[] = [];
  for (const badge of BADGES) {
    if (!progress.unlockedBadges.includes(badge.id) && badge.condition(progress)) {
      newBadges.push(badge.id);
    }
  }
  return newBadges;
}

export function getDefaultProgress(userId: string = "student"): UserProgress {
  return {
    userId,
    points: 0,
    level: 1,
    completedTopics: [],
    quizAttempts: [],
    streakDays: 0,
    lastStudyDate: "",
    totalStudyMinutes: 0,
    unlockedBadges: [],
    weeklyReflections: [],
  };
}

const STORAGE_KEY = "flenSchool_progress";

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as UserProgress;
    }
  } catch {
    // ignore
  }
  return getDefaultProgress();
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function addQuizAttempt(
  progress: UserProgress,
  topicId: string,
  score: number,
  totalQuestions: number,
  timeSpentSeconds: number
): UserProgress {
  const points = calculateQuizPoints(score, totalQuestions, timeSpentSeconds);
  const attempt: QuizAttempt = {
    topicId,
    score,
    totalQuestions,
    timestamp: new Date().toISOString(),
    timeSpentSeconds,
  };
  const newCompletedTopics = progress.completedTopics.includes(topicId)
    ? progress.completedTopics
    : [...progress.completedTopics, topicId];

  const updatedProgress: UserProgress = {
    ...progress,
    points: progress.points + points,
    quizAttempts: [...progress.quizAttempts, attempt],
    completedTopics: newCompletedTopics,
    totalStudyMinutes: progress.totalStudyMinutes + Math.round(timeSpentSeconds / 60),
  };
  updatedProgress.level = getLevelFromPoints(updatedProgress.points);

  const newBadges = checkNewBadges(updatedProgress);
  if (newBadges.length > 0) {
    updatedProgress.unlockedBadges = [...updatedProgress.unlockedBadges, ...newBadges];
  }

  return updatedProgress;
}

export function getTopicBestScore(
  progress: UserProgress,
  topicId: string
): { score: number; total: number } | null {
  const attempts = progress.quizAttempts.filter((a) => a.topicId === topicId);
  if (attempts.length === 0) return null;
  const best = attempts.reduce((prev, curr) =>
    curr.score / curr.totalQuestions > prev.score / prev.totalQuestions ? curr : prev
  );
  return { score: best.score, total: best.totalQuestions };
}

export function getWeakTopics(progress: UserProgress): string[] {
  const topicScores: Record<string, number[]> = {};
  for (const attempt of progress.quizAttempts) {
    if (!topicScores[attempt.topicId]) topicScores[attempt.topicId] = [];
    topicScores[attempt.topicId].push(attempt.score / attempt.totalQuestions);
  }
  return Object.entries(topicScores)
    .filter(([, scores]) => {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return avg < 0.6;
    })
    .map(([topicId]) => topicId);
}
