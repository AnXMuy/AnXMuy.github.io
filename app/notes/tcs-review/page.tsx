import { T } from "@/components/language-provider";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "TCS — Review & Cheatlist" };

export default function TcsReviewPage() {
  return (
    <main className="subpage-main">
      <div className="content-container article-container">
        <PageIntro eyebrow="Document · 2026-05-27" title="TCS — Review & Cheatlist" description="Open-source Theoretical Computer Science exam review material for structured study and quick revision." />
        <Reveal className="article-body">
          <h2><T>{"What is included"}</T></h2>
          <ul>
            <li><T>{"Full review notes for Theoretical Computer Science exam preparation."}</T></li>
            <li><T>{"A compact cheat list for fast lookup before exams."}</T></li>
            <li><T>{"A downloadable 71-page PDF for offline reading."}</T></li>
          </ul>
          <a className="download-cta" href="/files/TCS_SUM.pdf" download><Download aria-hidden="true" /><T>{"Download TCS_SUM.pdf"}</T></a>
        </Reveal>
      </div>
    </main>
  );
}
