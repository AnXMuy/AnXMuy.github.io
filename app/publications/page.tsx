import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { PublicationTree } from "@/components/publication-tree";
import { publications } from "@/data/publications";

const researchOrder = ["audio-intelligence", "audio-generation-editing", "remote-sensing"];
const orderedPublications = [...publications]
  .sort((a, b) => researchOrder.indexOf(a.id) - researchOrder.indexOf(b.id))
  .map((node, index) => node.kind === "series" ? { ...node, eyebrow: `Research Series ${String(index + 1).padStart(2, "0")}` } : node);

export const metadata: Metadata = {
  title: "Publications",
  description: "Selected publications and research series by Zixuan Jiang.",
};

export default function PublicationsPage() {
  return (
    <main className="subpage-main">
      <div className="wide-container">
        <PageIntro
          eyebrow="Research archive"
          title="Publications"
          description="Selected work, connected research series, and the broader publication record. * Equal contribution. † Corresponding author."
        />
        <PublicationTree nodes={orderedPublications} />
      </div>
    </main>
  );
}
