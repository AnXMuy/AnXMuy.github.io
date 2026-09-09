import { T } from "@/components/language-provider";
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
      <Link href="/" className="back-link"><ArrowLeft aria-hidden="true" /><span><T>{"Back to About Me"}</T></span></Link>
      <p><T>{eyebrow}</T></p>
      <h1><T>{title}</T></h1>
      <span><T>{description}</T></span>
    </Reveal>
  );
}
