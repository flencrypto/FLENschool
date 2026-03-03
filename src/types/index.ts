export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  lessons: Lesson[];
  completed: boolean;
  progress: number;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  content: string;
  videoUrl?: string;
  duration: number;
  completed: boolean;
  quiz?: Quiz;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  userId: string;
  subjectId: string;
  totalXP: number;
  lessonsCompleted: number;
  quizzesCompleted: number;
  currentStreak: number;
  longestStreak: number;
  badgesEarned: string[];
  lastActive: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
  xpReward: number;
  earned?: boolean;
  earnedDate?: Date;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  totalXP: number;
  weeklyXP: number;
  streak: number;
  badgesCount: number;
}
