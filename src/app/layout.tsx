import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FLENschool – ADHD-Friendly GCSE Learning",
  description:
    "A gamified, ADHD-friendly learning platform covering all GCSE subjects. Microlessons, adaptive quizzes, spaced repetition, and a focus on motivation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ background: "var(--background)" }}>
        {children}
      </body>
    </html>
  );
}
