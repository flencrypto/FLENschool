import {
  calcPercentage,
  percentageToGrade,
  calcQuizXP,
  getAdaptiveRecommendations,
  calcOverallProgress,
  formatDuration,
} from "../src/lib/utils";

describe("calcPercentage", () => {
  it("returns 0 when total is 0", () => {
    expect(calcPercentage(0, 0)).toBe(0);
  });

  it("returns 100 for full marks", () => {
    expect(calcPercentage(5, 5)).toBe(100);
  });

  it("rounds to the nearest integer", () => {
    expect(calcPercentage(1, 3)).toBe(33);
    expect(calcPercentage(2, 3)).toBe(67);
  });
});

describe("percentageToGrade", () => {
  const cases: [number, string][] = [
    [95, "9"],
    [85, "8"],
    [75, "7"],
    [65, "6"],
    [55, "5"],
    [45, "4"],
    [35, "3"],
    [25, "2"],
    [10, "1"],
  ];

  it.each(cases)("maps %i%% to grade %s", (pct, expected) => {
    expect(percentageToGrade(pct)).toBe(expected);
  });
});

describe("calcQuizXP", () => {
  it("awards base XP per correct mark plus completion bonus", () => {
    // 2 marks earned, 5 total => 2*20 + 10 = 50
    expect(calcQuizXP(2, 5)).toBe(50);
  });

  it("awards perfect bonus when all marks are earned", () => {
    // 5 marks earned, 5 total => 5*20 + 10 + 50 = 160
    expect(calcQuizXP(5, 5)).toBe(160);
  });

  it("returns 10 (completion only) for 0 correct marks", () => {
    expect(calcQuizXP(0, 5)).toBe(10);
  });
});

describe("getAdaptiveRecommendations", () => {
  it("returns high priority for subjects with 0% progress", () => {
    const progress = { maths: 0, english: 80 };
    const recs = getAdaptiveRecommendations(progress);
    const mathsRec = recs.find((r) => r.subjectId === "maths");
    expect(mathsRec).toBeDefined();
    expect(mathsRec?.priority).toBe("high");
  });

  it("returns medium priority for subjects between 1% and 49%", () => {
    const progress = { maths: 30 };
    const recs = getAdaptiveRecommendations(progress);
    const mathsRec = recs.find((r) => r.subjectId === "maths");
    expect(mathsRec).toBeDefined();
    expect(mathsRec?.priority).toBe("medium");
  });

  it("does not recommend subjects at 50% or above", () => {
    const progress = { maths: 50, english: 100 };
    const recs = getAdaptiveRecommendations(progress);
    const subjectIds = recs.map((r) => r.subjectId);
    expect(subjectIds).not.toContain("maths");
    expect(subjectIds).not.toContain("english");
  });

  it("sorts high priority recommendations before medium", () => {
    const progress = { maths: 0, english: 30 };
    const recs = getAdaptiveRecommendations(progress);
    if (recs.length >= 2) {
      const mathsIdx = recs.findIndex((r) => r.subjectId === "maths");
      const englishIdx = recs.findIndex((r) => r.subjectId === "english");
      expect(mathsIdx).toBeLessThan(englishIdx);
    }
  });
});

describe("calcOverallProgress", () => {
  it("returns 0 for empty progress", () => {
    expect(calcOverallProgress({})).toBe(0);
  });

  it("returns the average of all subject percentages", () => {
    expect(calcOverallProgress({ maths: 60, english: 80 })).toBe(70);
  });

  it("rounds to nearest integer", () => {
    expect(calcOverallProgress({ maths: 33, english: 66 })).toBe(50);
  });
});

describe("formatDuration", () => {
  it("formats minutes under 60 with m suffix", () => {
    expect(formatDuration(45)).toBe("45m");
  });

  it("formats exactly 60 minutes as 1h", () => {
    expect(formatDuration(60)).toBe("1h");
  });

  it("formats 90 minutes as 1h 30m", () => {
    expect(formatDuration(90)).toBe("1h 30m");
  });
});
