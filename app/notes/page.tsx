import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download, FileText, Github } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Blog" };

export default function NotesPage() {
  return (
    <main className="subpage-main">
      <div className="content-container">
        <PageIntro eyebrow="Working notes" title="Blog" description="Technical writing, open resources, and projects built along the way." />
        <div className="notes-list">
          <Reveal>
            <article className="note-row">
              <div className="note-icon"><FileText aria-hidden="true" /></div>
              <div>
                <p>Document · 2026-05-27</p>
                <h2><Link href="/blog/tcs-review/">TCS — Review & Cheatlist</Link></h2>
                <span>Open-source Theory of Computation exam review notes and a compact cheat list.</span>
                <div className="note-links">
                  <Link href="/blog/tcs-review/">Read blog <ArrowUpRight aria-hidden="true" /></Link>
                  <a href="/files/TCS_SUM.pdf" download>Download PDF <Download aria-hidden="true" /></a>
                </div>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="note-row">
              <div className="note-icon"><Github aria-hidden="true" /></div>
              <div>
                <p>Project · GitHub</p>
                <h2><a href="https://github.com/AnXMuy/RoboticNavigationXJTU26" target="_blank" rel="noreferrer">Robotic Navigation</a></h2>
                <span>A practical robotics navigation project and its implementation notes.</span>
                <div className="note-links">
                  <a href="https://github.com/AnXMuy/RoboticNavigationXJTU26" target="_blank" rel="noreferrer">View repository <ArrowUpRight aria-hidden="true" /></a>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
