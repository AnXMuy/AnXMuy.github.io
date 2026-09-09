import type { Metadata } from "next";
import { ContentSection } from "@/components/content-section";
import { PageIntro } from "@/components/page-intro";
import { Timeline } from "@/components/timeline";
import { honors } from "@/data/resume";

export const metadata: Metadata = { title: "Honors & Awards" };

export default function HonorsPage() {
  return (
    <main className="subpage-main">
      <div className="content-container">
        <PageIntro eyebrow="Recognition" title="Honors & Awards" description="Scholarships and university distinctions earned throughout my undergraduate study." />
        <div className="subpage-sections">
          <ContentSection index="01" title="Selected Honors"><Timeline items={honors} /></ContentSection>
        </div>
      </div>
    </main>
  );
}
