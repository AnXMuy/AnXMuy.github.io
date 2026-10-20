import { T } from "@/components/language-provider";
import type { ReactNode } from "react";

type ContentSectionProps = {
  index: string;
  title: string;
  children: ReactNode;
  id?: string;
};

export function ContentSection({ title, children, id }: ContentSectionProps) {
  return (
    <div className="content-section">
      <section id={id}>
        <header className="section-heading">
          <h2><T>{title}</T></h2>
        </header>
        <div className="section-body">{children}</div>
      </section>
    </div>
  );
}
