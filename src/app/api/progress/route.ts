import { NextRequest, NextResponse } from "next/server";
import { SUBJECT_PROGRESS } from "@/lib/data";
import { getAdaptiveRecommendations, calcOverallProgress } from "@/lib/utils";

/**
 * GET /api/progress
 * Returns current subject progress and overall completion for the student.
 */
export async function GET() {
  const overall = calcOverallProgress(SUBJECT_PROGRESS);
  const recommendations = getAdaptiveRecommendations(SUBJECT_PROGRESS);

  return NextResponse.json({
    subjects: SUBJECT_PROGRESS,
    overall,
    recommendations: recommendations.slice(0, 3),
  });
}

/**
 * POST /api/progress
 * Updates the progress for a given subject.
 * Body: { subjectId: string, progressPercent: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subjectId, progressPercent } = body as {
      subjectId?: string;
      progressPercent?: number;
    };

    if (!subjectId || typeof progressPercent !== "number") {
      return NextResponse.json(
        { error: "subjectId (string) and progressPercent (number) are required." },
        { status: 400 }
      );
    }

    if (progressPercent < 0 || progressPercent > 100) {
      return NextResponse.json(
        { error: "progressPercent must be between 0 and 100." },
        { status: 400 }
      );
    }

    // In a production app this would persist to a database.
    // Here we demonstrate the expected response shape.
    const updatedProgress = { ...SUBJECT_PROGRESS, [subjectId]: progressPercent };
    const overall = calcOverallProgress(updatedProgress);

    return NextResponse.json({ subjectId, progressPercent, overall }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
}
