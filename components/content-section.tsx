import { T } from "@/components/language-provider";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { BriefcaseBusiness, GraduationCap, UserRound, Layers3 } from "lucide-react";

type ContentSectionProps = {
  index: string;
  title: string;
  children: ReactNode;
  id?: string;
};

export function ContentSection({ index, title, children, id }: ContentSectionProps) {
  const Icon = id === "about" ? UserRound : id === "education" ? GraduationCap : id === "internships" ? BriefcaseBusiness : Layers3;
  return (
    <Reveal className="content-section">
      <section id={id}>
        <header className="section-heading">
          <span title={index}><Icon aria-hidden="true" size={19} /></span>
          <h2><T>{title}</T></h2>
          <div aria-hidden="true" />
        </header>
        <div className="section-body">{children}</div>
      </section>
    </Reveal>
  );
}
