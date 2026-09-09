import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { BlogExplorer } from "@/components/blog-explorer";

export const metadata: Metadata = { title: "Blog", description: "Research notes, study resources, projects, and personal reflections by Zixuan Jiang." };

export default function BlogPage() {
  return (
    <main className="subpage-main blog-main">
      <div className="wide-container">
        <PageIntro eyebrow="Andrew’s field notes" title="Ideas, along the way." description="A place for paper notes, things I build, and the journey of learning. Take your time; there is no finish line here." />
        <BlogExplorer />
      </div>
    </main>
  );
}
