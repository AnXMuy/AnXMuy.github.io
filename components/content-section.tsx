import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type ContentSectionProps = {
  index: string;
  title: string;
  children: ReactNode;
  id?: string;
};

export function ContentSection({ index, title, children, id }: ContentSectionProps) {
  return (
    <Reveal className="content-section">
      <section id={id}>
        <header className="section-heading">
          <span>{index}</span>
          <h2>{title}</h2>
          <div aria-hidden="true" />
        </header>
        <div className="section-body">{children}</div>
      </section>
    </Reveal>
  );
}
