import { NextRequest, NextResponse } from "next/server";
import { SAMPLE_QUIZZES } from "@/lib/data";
import { calcPercentage, calcQuizXP, percentageToGrade } from "@/lib/utils";

/**
 * GET /api/quiz?id=<quizId>
 * Returns a quiz (without correct answers exposed).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    // Return all quiz ids and titles
    const list = SAMPLE_QUIZZES.map((q) => ({ id: q.id, title: q.title, topicId: q.topicId, questionCount: q.questions.length }));
    return NextResponse.json({ quizzes: list });
  }

  const quiz = SAMPLE_QUIZZES.find((q) => q.id === id);
  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
  }

  // Strip correct answers before sending to client (real app would do this)
  const safeQuestions = quiz.questions.map(({ id, text, type, options, marks, difficulty }) => ({
    id,
    text,
    type,
    options,
    marks,
    difficulty,
  }));

  return NextResponse.json({ id: quiz.id, title: quiz.title, topicId: quiz.topicId, questions: safeQuestions });
}

/**
 * POST /api/quiz
 * Scores a quiz attempt.
 * Body: { quizId: string; answers: number[] }
 * Returns score, grade, XP earned, and per-question feedback.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quizId, answers } = body as { quizId?: string; answers?: number[] };

    if (!quizId || !Array.isArray(answers)) {
      return NextResponse.json({ error: "quizId (string) and answers (number[]) are required." }, { status: 400 });
    }

    const quiz = SAMPLE_QUIZZES.find((q) => q.id === quizId);
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    if (answers.length !== quiz.questions.length) {
      return NextResponse.json(
        { error: `Expected ${quiz.questions.length} answers, got ${answers.length}.` },
        { status: 400 }
      );
    }

    let earnedMarks = 0;
    const totalMarks = quiz.questions.reduce((a, q) => a + q.marks, 0);

    const feedback = quiz.questions.map((question, i) => {
      const correct = answers[i] === question.correctAnswer;
      if (correct) earnedMarks += question.marks;
      return {
        questionId: question.id,
        correct,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        marksEarned: correct ? question.marks : 0,
        marksAvailable: question.marks,
      };
    });

    const percentage = calcPercentage(earnedMarks, totalMarks);
    const grade = percentageToGrade(percentage);
    const xp = calcQuizXP(earnedMarks, totalMarks);

    return NextResponse.json({ earnedMarks, totalMarks, percentage, grade, xp, feedback });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
}
