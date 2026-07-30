import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "TCS — Review & Cheatlist" };

export default function TcsReviewPage() {
  return (
    <main className="subpage-main">
      <div className="content-container article-container">
        <PageIntro eyebrow="Document · 2026-05-27" title="TCS — Review & Cheatlist" description="Open-source Theory of Computation exam review material for structured study and quick revision." />
        <Reveal className="article-body">
          <h2>What is included</h2>
          <ul>
            <li>Full review notes for Theory of Computation exam preparation.</li>
            <li>A compact cheat list for fast lookup before exams.</li>
            <li>A downloadable 71-page PDF for offline reading.</li>
          </ul>
          <a className="download-cta" href="/files/TCS_SUM.pdf" download><Download aria-hidden="true" />Download TCS_SUM.pdf</a>
        </Reveal>
      </div>
    </main>
  );
}
