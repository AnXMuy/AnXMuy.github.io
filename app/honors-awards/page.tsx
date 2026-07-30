import type { Metadata } from "next";
import { ContentSection } from "@/components/content-section";
import { PageIntro } from "@/components/page-intro";
import { Timeline } from "@/components/timeline";

export const metadata: Metadata = { title: "Honors & Awards" };

const honors = [
  { date: "2025.10", title: "National Scholarship" },
  { date: "2025.10", title: "Outstanding Student", detail: "Xi'an Jiaotong University" },
  { date: "2024.11", title: "Shuiyou First-Class Scholarship", detail: "Top 4 in the university" },
  { date: "2024.11", title: "Outstanding Student", detail: "Xi'an Jiaotong University" },
  { date: "2023.11", title: "Third-Class Scholarship", detail: "Xi'an Jiaotong University" },
];

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
