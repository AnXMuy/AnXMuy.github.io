import { T } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <Reveal className="page-intro">
      <p><T>{eyebrow}</T></p>
      <h1><T>{title}</T></h1>
      <span><T>{description}</T></span>
    </Reveal>
  );
}
