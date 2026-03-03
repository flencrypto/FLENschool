export interface Subject {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  examBoard: string;
  specCode: string;
  year10Topics: Topic[];
  year11Topics: Topic[];
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  year: 10 | 11;
  description: string;
  learningObjectives: string[];
  estimatedMinutes: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  type: "video" | "interactive" | "reading" | "lab";
  durationMinutes: number;
  content: string;
  videoUrl?: string;
  quizId?: string;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  type: "multiple_choice" | "short_answer" | "true_false";
  options?: string[];
  correctAnswer: number;
  explanation: string;
  marks: number;
  difficulty: "easy" | "medium" | "hard";
}

export interface Quiz {
  id: string;
  lessonId?: string;
  topicId: string;
  title: string;
  questions: Question[];
  timeLimit?: number;
  isSummative: boolean;
}

export interface UserProgress {
  userId: string;
  subjectId: string;
  topicId: string;
  lessonId?: string;
  quizId?: string;
  score?: number;
  completed: boolean;
  completedAt?: string;
  timeSpentMinutes: number;
  grade?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  year: 10 | 11;
  points: number;
  level: number;
  badges: Badge[];
  streakDays: number;
  subjects: string[];
  sessionLengthMinutes: number;
  breakIntervalMinutes: number;
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  earnedAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  studentName: string;
  points: number;
  level: number;
  avatar: string;
}

export interface AdaptiveRecommendation {
  topicId: string;
  subjectId: string;
  reason: string;
  priority: "high" | "medium" | "low";
}
