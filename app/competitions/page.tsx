import type { Metadata } from "next";
import { ContentSection } from "@/components/content-section";
import { PageIntro } from "@/components/page-intro";
import { Timeline } from "@/components/timeline";

export const metadata: Metadata = { title: "Competitions" };

const aiCompetitions = [
  { date: "2025", title: "Second Prize", detail: "National Laser Radar Conference Point Cloud Intelligent Analysis Competition" },
  { date: "2025", title: "Silver Medal", detail: "ICPC Shaanxi Provincial Programming Contest" },
  { date: "2025", title: "Excellence Award · Finalist", detail: "AI+ College Innovation Program, AI Technology Track" },
  { date: "2024", title: "Bronze Medal", detail: "ICPC Shaanxi Provincial Programming Contest" },
];

const mathCompetitions = [
  { date: "2023 — 2025", title: "3× First Prize", detail: "National College Student Mathematical Modeling Competition, Shaanxi Division" },
  { date: "2024", title: "Meritorious Winner", detail: "Mathematical Contest in Modeling, USA" },
  { date: "2023", title: "Honorable Prize", detail: "Mathematical Contest in Modeling, USA" },
];

export default function CompetitionsPage() {
  return (
    <main className="subpage-main">
      <div className="content-container">
        <PageIntro eyebrow="Competitive record" title="Competitions" description="Results spanning artificial intelligence, programming, and mathematical modeling." />
        <div className="subpage-sections">
          <ContentSection index="01" title="AI & Programming"><Timeline items={aiCompetitions} /></ContentSection>
          <ContentSection index="02" title="Mathematical Modeling"><Timeline items={mathCompetitions} /></ContentSection>
        </div>
      </div>
    </main>
  );
}
