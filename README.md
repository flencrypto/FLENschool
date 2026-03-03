# FLENschool – ADHD-Friendly GCSE Learning Platform

An engaging, gamified web learning platform built to support Year 10–11 GCSE students with ADHD. Covers all core GCSE subjects mapped to AQA/Edexcel/OCR specifications, with ADHD-friendly pedagogy, adaptive quizzes and gamification.

## Screenshots

**Student Dashboard**
![Dashboard](https://github.com/user-attachments/assets/682d80da-f8b6-4fc5-a3f7-7a93d25df691)

**Lesson View (Cell Biology)**
![Lesson](https://github.com/user-attachments/assets/ed5f885d-ffe2-4026-b2d0-fabdcb4696bc)

**Interactive Quiz**
![Quiz](https://github.com/user-attachments/assets/b0c9e6b9-9e2c-4ee5-ac43-66309f997787)

**Quiz Feedback with Explanation**
![Quiz Feedback](https://github.com/user-attachments/assets/6f948795-7fe5-4ee8-b0e7-206818dd16cc)

## Features

### 📚 GCSE Curriculum Coverage
All subjects mapped to AQA specifications with Year 10 / Year 11 splits:
- **English Language & Literature** (AQA 8700/8702) – reading skills, creative writing, Shakespeare, 19th-century literature, viewpoint writing, modern prose
- **Mathematics** (AQA 8300) – number, algebra, geometry, statistics, quadratics, trigonometry
- **Biology** (AQA 8461) – cell biology, organisation, infection & response, genetics, ecology
- **Chemistry** (AQA 8462) – atomic structure, bonding, reactions, organic chemistry, resources
- **Physics** (AQA 8463) – energy, electricity, forces, waves, magnetism
- **History** (AQA 8145) – American West, WWI, Norman England, thematic study (migration)
- **Geography** (AQA 8035) – natural hazards, ecosystems, urban issues, resource management
- **French** (AQA 8652) – present tense, past/future tenses, popular culture
- **Computer Science** (AQA 8520) – algorithms, data representation, programming, networks, prompt engineering & AI literacy

### 🧠 ADHD-Friendly Pedagogy
- **Session Timer** – configurable 10–45 min study blocks with a visible countdown (combats time-blindness)
- **Break Reminders** – automatic pop-up when session ends with movement suggestions
- **Microlessons** – every topic broken into ~25–30 min focused lessons
- **Clear Structure** – visual progress indicators and consistent navigation

### 🎮 Gamification
- **Points & XP** – earn points on each quiz; score bonuses for speed and accuracy
- **Levels** – 10 levels from "Newcomer" to "GCSE Hero" with an XP progress bar
- **Badges** – 10 achievement badges (First Step, Quiz Ace, Week Warrior, Science Starter, Maths Master, Bookworm, Century Club, Focus Hero, Polyglot, Coder)
- **Daily Challenge** – complete 3 quizzes per day for bonus points
- **Leaderboard** – friendly class competition

### 📝 Adaptive Quizzes
- Multiple-choice quizzes with instant feedback and full explanations
- Difficulty indicators (Foundation / Intermediate / Higher)
- Progress dots, score tracking, keyboard navigation support
- Best-score tracking per topic; weak-topic identification

### 📊 Parent / Teacher Dashboard
- Key statistics: points, level, topics completed, badges earned
- Subject-by-subject progress breakdown with average quiz scores
- Weak-topics alert for targeted support
- Recent quiz activity log
- Export progress as JSON
- Reset student progress option

### ♿ Accessibility
- WCAG 2.1 compliant: ARIA labels, roles, and live regions throughout
- High-contrast mode toggle
- Dyslexia-friendly font toggle
- Keyboard navigation for all interactive elements
- `role="progressbar"` with `aria-valuenow/min/max` on all progress indicators

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State | React `useState` + `localStorage` |
| Deployment | Static + SSR via Next.js |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                          # Student home / dashboard
│   ├── subjects/[subject]/page.tsx       # Subject topic list
│   ├── subjects/[subject]/[topic]/page.tsx  # Lesson + quiz view
│   ├── dashboard/page.tsx                # Parent/teacher dashboard
│   ├── leaderboard/page.tsx              # Class leaderboard
│   └── badges/page.tsx                   # All badges view
├── components/
│   ├── SessionTimer.tsx                  # ADHD session countdown timer
│   ├── QuizComponent.tsx                 # Adaptive quiz engine
│   ├── SubjectCard.tsx                   # Subject progress card
│   ├── BadgeDisplay.tsx                  # Badge grid display
│   └── BreakReminder.tsx                 # Break prompt modal
├── data/
│   ├── curriculum.ts                     # All GCSE topics, objectives & key terms
│   └── quizzes.ts                        # Quiz questions with explanations
└── lib/
    └── progress.ts                       # Progress tracking, gamification, localStorage
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

```bash
npm run build   # Production build
npm run lint    # ESLint check
```

## Roadmap

- [ ] Video content embedding (YouTube/Vimeo captioned explainers)
- [ ] Spaced repetition scheduler for flashcard reviews
- [ ] AR/VR lab simulations (WebXR for physics/chemistry)
- [ ] Coding sandbox for Computer Science (embedded Python/JS REPL)
- [ ] Backend API + database (PostgreSQL) for multi-user support
- [ ] LMS integration via LTI (Moodle/Google Classroom)
- [ ] Offline mode with service workers
- [ ] Push notifications for study reminders
- [ ] Past paper question bank integration (AQA Exampro API)
