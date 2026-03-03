# FLENschool 🎓

**An ADHD-Friendly GCSE Learning Platform**

A full-stack web application designed to replace Year 10–11 GCSE teaching for a UK student with ADHD. Built with Next.js 14, TypeScript, and Tailwind CSS.

---

## Features

### 📚 GCSE Curriculum Coverage
All 9 core GCSE subjects mapped to AQA specifications:
| Subject | Spec Code | Topics |
|---------|-----------|--------|
| Mathematics | AQA 8300 | Number, Algebra, Geometry, Advanced Algebra, Trigonometry |
| English Language & Literature | AQA 8700/8702 | Reading, Writing, Literature |
| Biology | AQA 8461 | Cell Biology, Infection, Bioenergetics, Homeostasis, Ecology |
| Chemistry | AQA 8462 | Atomic Structure, Bonding, Chemical Changes |
| Physics | AQA 8463 | Energy, Forces, Waves, Magnetism |
| History | AQA 8145 | American West, WWI, Norman England |
| Geography | AQA 8035 | Natural Hazards, Urban Issues, Ecosystems |
| French | AQA 8652 | People & Lifestyle, Communication & the World |
| Computing | AQA 8520 | Algorithms, Programming, Networks |

Each topic includes:
- Learning objectives aligned to AQA specifications
- Multiple lesson types: 🎬 video, 🕹️ interactive, 🔬 virtual lab, 📖 reading
- Formative quizzes with instant feedback and AQA-aligned explanations
- Estimated study times

### 🧠 ADHD-Friendly Design
- **Session Timer**: Pomodoro-style 25-min countdown with automatic break reminders
- **Break Modal**: Suggests movement activities (jumping jacks, walking, water)
- **Focus Mode**: Minimal, distraction-free lesson view
- **Large Buttons**: High-contrast UI with clear typography
- **No Auto-playing Animations**: Avoids pulling attention away

### 🎮 Gamification
- XP (experience points) earned for quiz completions
- Level system with progression bar
- Badges for achievements (Quiz Starter, Week Warrior, Bio Genius, etc.)
- Class leaderboard with friendly competition
- 7-day study streak tracking

### 📊 Adaptive Learning Engine
- Rule-based recommendation engine that identifies subjects below 50% progress
- High-priority flags for subjects with 0% completion
- "Recommended for You" section on the home dashboard
- REST API endpoint for programmatic access (`GET /api/adaptive`)

### 🤖 Prompt Engineering Lab
Six interactive labs teaching AI prompt writing skills:
1. **Story Generator** — creative writing with LLMs
2. **Concept Explainer** — science explanations with analogies
3. **Historical Debate** — balanced analysis
4. **Maths Tutor** — step-by-step problem solving
5. **Prompt Debugger** — iterative prompt refinement
6. **AI Ethics Explorer** — critical evaluation of AI outputs

Each lab includes a prompt editor, simulated AI response, and self-evaluation rubric with scoring.

### 👩‍👧 Parent & Teacher Dashboard
- Password-protected overview (UI indicator)
- Subjects needing attention flagged (< 50% progress)
- Strengths highlighted (≥ 70% progress)
- Weekly study time bar chart with 30-min daily target
- ADHD support settings summary
- Per-subject notes and action recommendations

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Testing | Jest + @swc/jest |
| API | Next.js API Routes (REST) |
| Build | Next.js compiler |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build
```bash
npm run build
npm run start
```

### Tests
```bash
npm test
```
Runs 42 unit tests covering utility functions and data integrity.

### Lint
```bash
npm run lint
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                     # Home dashboard
│   ├── layout.tsx                   # Root layout with Navigation
│   ├── globals.css                  # Global styles
│   ├── subjects/
│   │   ├── page.tsx                 # Subject grid overview
│   │   └── [subject]/
│   │       ├── page.tsx             # Subject detail & topics
│   │       └── [topic]/
│   │           └── page.tsx         # Lesson view + quiz
│   ├── dashboard/
│   │   ├── page.tsx                 # Student progress dashboard
│   │   └── parent/
│   │       └── page.tsx             # Parent/teacher dashboard
│   ├── prompt-lab/
│   │   └── page.tsx                 # Prompt Engineering Lab
│   └── api/
│       ├── progress/route.ts        # GET/POST subject progress
│       ├── quiz/route.ts            # GET quiz, POST score attempt
│       └── adaptive/route.ts        # GET adaptive recommendations
├── components/
│   ├── Navigation.tsx               # Sticky nav + session timer
│   ├── SessionTimer.tsx             # Pomodoro timer with break alert
│   └── QuizComponent.tsx            # Interactive quiz engine
└── lib/
    ├── types.ts                     # TypeScript interfaces
    ├── data.ts                      # GCSE curriculum & quiz data
    └── utils.ts                     # Helper functions + adaptive engine
__tests__/
├── utils.test.ts                    # Unit tests for utility functions
└── data.test.ts                     # Data integrity tests
```

---

## API Reference

### `GET /api/progress`
Returns current subject progress and adaptive recommendations.

**Response:**
```json
{
  "subjects": { "maths": 65, "biology": 72, ... },
  "overall": 53,
  "recommendations": [
    { "subjectId": "french", "topicId": "french-foundation", "priority": "high", "reason": "Only 30% complete in French — keep going!" }
  ]
}
```

### `POST /api/progress`
Updates progress for a subject.

**Body:** `{ "subjectId": "maths", "progressPercent": 75 }`

### `GET /api/quiz?id=<quizId>`
Returns a quiz (without exposing correct answers).

### `POST /api/quiz`
Scores a quiz attempt.

**Body:** `{ "quizId": "quiz-bio-cells-l1", "answers": [1, 2, 1, 2, 1] }`

**Response includes:** `earnedMarks`, `totalMarks`, `percentage`, `grade` (GCSE 1-9), `xp`, `feedback[]`

### `GET /api/adaptive?subject=<subjectId>`
Returns personalised learning recommendations.

---

## Data Privacy & Security

- All student data is handled client-side (no server-side persistence in this demo)
- Production deployment would require UK GDPR compliance and Children's Code (KCSIE) adherence
- Parental consent flows required before registration for under-13s
- Data encrypted at rest and in transit (HTTPS/TLS)
- No personal data exposed in public leaderboard (first name + initial only)

---

## Roadmap

- [ ] Database persistence (PostgreSQL via Prisma)
- [ ] User authentication (NextAuth.js with OAuth)
- [ ] Spaced repetition flashcard system
- [ ] AR/VR virtual lab integration (WebXR)
- [ ] Full offline mode (PWA + service workers)
- [ ] LMS integration (Moodle LTI)
- [ ] Push notifications (break reminders, study schedules)
- [ ] Text-to-speech for all lesson content
- [ ] Spanish language option
