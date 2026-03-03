import { AdaptiveRecommendation } from "./types";
import { SUBJECTS, SUBJECT_PROGRESS } from "./data";

/**
 * Calculate the percentage score from marks earned and total marks.
 */
export function calcPercentage(earned: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((earned / total) * 100);
}

/**
 * Convert a percentage score to an estimated GCSE grade descriptor.
 * Based on AQA/DfE grade boundaries (approximate).
 */
export function percentageToGrade(percentage: number): string {
  if (percentage >= 90) return "9";
  if (percentage >= 80) return "8";
  if (percentage >= 70) return "7";
  if (percentage >= 60) return "6";
  if (percentage >= 50) return "5";
  if (percentage >= 40) return "4";
  if (percentage >= 30) return "3";
  if (percentage >= 20) return "2";
  return "1";
}

/**
 * Calculate the XP earned for a quiz attempt.
 * Correct answers award more XP; completing the quiz adds a bonus.
 */
export function calcQuizXP(earnedMarks: number, totalMarks: number): number {
  const base = earnedMarks * 20;
  const completionBonus = 10;
  const perfectBonus = earnedMarks === totalMarks ? 50 : 0;
  return base + completionBonus + perfectBonus;
}

/**
 * Adaptive engine: returns recommended topics based on lowest progress scores.
 * Rule-based: topics in subjects with <50% progress are flagged as high priority.
 */
export function getAdaptiveRecommendations(
  progress: Record<string, number>
): AdaptiveRecommendation[] {
  const recommendations: AdaptiveRecommendation[] = [];

  for (const subject of SUBJECTS) {
    const pct = progress[subject.id] ?? 0;
    if (pct < 50) {
      const allTopics = [...subject.year10Topics, ...subject.year11Topics];
      const firstTopic = allTopics[0];
      if (firstTopic) {
        recommendations.push({
          topicId: firstTopic.id,
          subjectId: subject.id,
          reason:
            pct === 0
              ? `You haven't started ${subject.name} yet — jump in!`
              : `Only ${pct}% complete in ${subject.name} — keep going!`,
          priority: pct < 20 ? "high" : "medium",
        });
      }
    }
  }

  // Sort: high priority first, then medium, then low
  return recommendations.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });
}

/**
 * Calculate the overall progress percentage across all subjects.
 */
export function calcOverallProgress(progress: Record<string, number>): number {
  const values = Object.values(progress);
  if (values.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

/**
 * Format minutes into a human-readable duration string.
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

// Re-export SUBJECT_PROGRESS so utils is a single import for common helpers
export { SUBJECT_PROGRESS };
