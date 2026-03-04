import { notFound } from "next/navigation";
import { SUBJECTS } from "@/lib/data";
import TopicClient from "@/components/TopicClient";

interface Props {
  params: Promise<{ subjectId: string; topicId: string }>;
}

export async function generateStaticParams() {
  const paths: { subjectId: string; topicId: string }[] = [];
  for (const subject of SUBJECTS) {
    for (const topic of [...subject.year10Topics, ...subject.year11Topics]) {
      paths.push({ subjectId: subject.id, topicId: topic.id });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { subjectId, topicId } = await params;
  const subject = SUBJECTS.find((s) => s.id === subjectId);
  const topic =
    subject?.year10Topics.find((t) => t.id === topicId) ||
    subject?.year11Topics.find((t) => t.id === topicId);
  return {
    title: topic ? `${topic.title} | FLENschool` : "Lesson | FLENschool",
  };
}

export default async function TopicPage({ params }: Props) {
  const { subjectId, topicId } = await params;
  const subject = SUBJECTS.find((s) => s.id === subjectId);
  if (!subject) notFound();

  const topic =
    subject.year10Topics.find((t) => t.id === topicId) ||
    subject.year11Topics.find((t) => t.id === topicId);
  if (!topic) notFound();

  return <TopicClient subject={subject} topic={topic} />;
}
