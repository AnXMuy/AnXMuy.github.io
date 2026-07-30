import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/reveal";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <Reveal className="page-intro">
      <Link href="/" className="back-link"><ArrowLeft aria-hidden="true" />About Me</Link>
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <span>{description}</span>
    </Reveal>
  );
}
