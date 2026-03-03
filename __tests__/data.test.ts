import { SUBJECTS, SAMPLE_QUIZZES, STUDENT_PROFILE, LEADERBOARD } from "../src/lib/data";

describe("SUBJECTS data", () => {
  it("contains all 9 required GCSE subjects", () => {
    const ids = SUBJECTS.map((s) => s.id);
    const required = ["maths", "english", "biology", "chemistry", "physics", "history", "geography", "french", "computing"];
    required.forEach((id) => expect(ids).toContain(id));
  });

  it("every subject has at least one Year 10 topic and one Year 11 topic", () => {
    SUBJECTS.forEach((subject) => {
      expect(subject.year10Topics.length).toBeGreaterThanOrEqual(1);
      expect(subject.year11Topics.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("every topic has at least one lesson", () => {
    SUBJECTS.forEach((subject) => {
      const allTopics = [...subject.year10Topics, ...subject.year11Topics];
      allTopics.forEach((topic) => {
        expect(topic.lessons.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it("every topic has at least one learning objective", () => {
    SUBJECTS.forEach((subject) => {
      const allTopics = [...subject.year10Topics, ...subject.year11Topics];
      allTopics.forEach((topic) => {
        expect(topic.learningObjectives.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it("every lesson has a valid type", () => {
    const validTypes = ["video", "interactive", "reading", "lab"];
    SUBJECTS.forEach((subject) => {
      const allTopics = [...subject.year10Topics, ...subject.year11Topics];
      allTopics.forEach((topic) => {
        topic.lessons.forEach((lesson) => {
          expect(validTypes).toContain(lesson.type);
        });
      });
    });
  });

  it("every topic has positive estimatedMinutes", () => {
    SUBJECTS.forEach((subject) => {
      const allTopics = [...subject.year10Topics, ...subject.year11Topics];
      allTopics.forEach((topic) => {
        expect(topic.estimatedMinutes).toBeGreaterThan(0);
      });
    });
  });
});

describe("SAMPLE_QUIZZES data", () => {
  it("contains at least 5 quizzes", () => {
    expect(SAMPLE_QUIZZES.length).toBeGreaterThanOrEqual(5);
  });

  it("every quiz has at least 2 questions", () => {
    SAMPLE_QUIZZES.forEach((quiz) => {
      expect(quiz.questions.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("every question has a valid correctAnswer index within options length", () => {
    SAMPLE_QUIZZES.forEach((quiz) => {
      quiz.questions.forEach((question) => {
        if (question.options) {
          expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
          expect(question.correctAnswer).toBeLessThan(question.options.length);
        }
      });
    });
  });

  it("every question has a non-empty explanation", () => {
    SAMPLE_QUIZZES.forEach((quiz) => {
      quiz.questions.forEach((question) => {
        expect(question.explanation).toBeTruthy();
        expect(question.explanation.length).toBeGreaterThan(0);
      });
    });
  });

  it("every question has positive marks", () => {
    SAMPLE_QUIZZES.forEach((quiz) => {
      quiz.questions.forEach((question) => {
        expect(question.marks).toBeGreaterThan(0);
      });
    });
  });
});

describe("STUDENT_PROFILE data", () => {
  it("has positive points and level", () => {
    expect(STUDENT_PROFILE.points).toBeGreaterThan(0);
    expect(STUDENT_PROFILE.level).toBeGreaterThan(0);
  });

  it("sessionLengthMinutes and breakIntervalMinutes are positive", () => {
    expect(STUDENT_PROFILE.sessionLengthMinutes).toBeGreaterThan(0);
    expect(STUDENT_PROFILE.breakIntervalMinutes).toBeGreaterThan(0);
  });

  it("has at least one badge", () => {
    expect(STUDENT_PROFILE.badges.length).toBeGreaterThanOrEqual(1);
  });
});

describe("LEADERBOARD data", () => {
  it("has 6 entries", () => {
    expect(LEADERBOARD.length).toBe(6);
  });

  it("ranks are in ascending order", () => {
    LEADERBOARD.forEach((entry, i) => {
      expect(entry.rank).toBe(i + 1);
    });
  });

  it("points are in descending order", () => {
    for (let i = 1; i < LEADERBOARD.length; i++) {
      expect(LEADERBOARD[i - 1].points).toBeGreaterThanOrEqual(LEADERBOARD[i].points);
    }
  });
});
