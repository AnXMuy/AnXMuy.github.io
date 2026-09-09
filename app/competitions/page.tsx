import type { Metadata } from "next";
import { ContentSection } from "@/components/content-section";
import { PageIntro } from "@/components/page-intro";
import { Timeline } from "@/components/timeline";
import { competitionGroups } from "@/data/resume";

export const metadata: Metadata = { title: "Competitions" };

export default function CompetitionsPage() {
  return (
    <main className="subpage-main">
      <div className="content-container">
        <PageIntro eyebrow="Competitive record" title="Competitions" description="Results spanning artificial intelligence, programming, and mathematical modeling." />
        <div className="subpage-sections">
          {competitionGroups.map((group, index) => (
            <ContentSection key={group.title} index={String(index + 1).padStart(2, "0")} title={group.title}>
              <Timeline items={group.items} />
            </ContentSection>
          ))}
        </div>
      </div>
    </main>
  );
}
