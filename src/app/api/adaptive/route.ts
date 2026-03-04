import { NextRequest, NextResponse } from "next/server";
import { SUBJECT_PROGRESS } from "@/lib/data";
import { getAdaptiveRecommendations } from "@/lib/utils";

/**
 * GET /api/adaptive?subject=<subjectId>
 * Returns personalised adaptive recommendations for the student.
 * If a subjectId query param is given, returns recommendations for that subject only.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subjectFilter = searchParams.get("subject");

  const allRecs = getAdaptiveRecommendations(SUBJECT_PROGRESS);
  const filtered = subjectFilter
    ? allRecs.filter((r) => r.subjectId === subjectFilter)
    : allRecs;

  return NextResponse.json({
    recommendations: filtered,
    totalRecommendations: filtered.length,
    progressSnapshot: SUBJECT_PROGRESS,
  });
}
