# FLENschool

An ADHD-friendly GCSE learning platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 📚 **18 GCSE Subjects** with topics and lessons
- 🧠 **Interactive Quizzes** with instant feedback and XP rewards
- 🍅 **Pomodoro Focus Timer** with break reminders
- 🏆 **Gamification** - XP points, badges, and leaderboard
- 📈 **Progress Tracking** across all subjects
- 🤖 **Prompt Engineering Guide** to use AI tools effectively
- 👩‍🏫 **Teacher/Parent Dashboard** to monitor student progress

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Jest** + **React Testing Library**

## Running Tests

```bash
npm test
```

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home dashboard
│   ├── subjects/           # Subject listing and detail pages
│   ├── focus/              # Pomodoro timer page
│   ├── progress/           # Progress tracking page
│   ├── dashboard/          # Teacher/parent dashboard
│   └── prompt-engineering/ # AI prompt engineering guide
├── components/             # Reusable React components
├── data/                   # Static data (subjects, badges, leaderboard)
├── types/                  # TypeScript type definitions
└── __tests__/              # Jest test files
```
