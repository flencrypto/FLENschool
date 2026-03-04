import { notFound } from "next/navigation";
import { SUBJECTS } from "@/lib/data";
import TopicClient from "@/components/TopicClient";

interface Props {
  params: { subject: string; topic: string };
}

export async function generateStaticParams() {
  const paths: { subject: string; topic: string }[] = [];
  for (const subject of SUBJECTS) {
    for (const topic of [...subject.year10Topics, ...subject.year11Topics]) {
      paths.push({ subject: subject.id, topic: topic.id });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props) {
  const subject = SUBJECTS.find((s) => s.id === params.subject);
  const topic =
    subject?.year10Topics.find((t) => t.id === params.topic) ||
    subject?.year11Topics.find((t) => t.id === params.topic);
  return {
    title: topic ? `${topic.title} | FLENschool` : "Lesson | FLENschool",
  };
}

export default function TopicPage({ params }: Props) {
  const subject = SUBJECTS.find((s) => s.id === params.subject);
  if (!subject) notFound();

  const topic =
    subject.year10Topics.find((t) => t.id === params.topic) ||
    subject.year11Topics.find((t) => t.id === params.topic);
  if (!topic) notFound();

  return <TopicClient subject={subject} topic={topic} />;
}
