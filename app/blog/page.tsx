import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { BlogExplorer } from "@/components/blog-explorer";

export const metadata: Metadata = { title: "Blog", description: "Research notes, course documents, projects, and occasional notes by Zixuan Jiang." };

export default function BlogPage() {
  return (
    <main className="subpage-main blog-main">
      <div className="wide-container">
        <PageIntro eyebrow="Andrew’s notebook" title="Blog" description="Notes on papers I read, projects I build, and ideas I keep coming back to. Browse by topic or search for something specific." />
        <BlogExplorer />
      </div>
    </main>
  );
}
