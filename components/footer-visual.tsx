import { T } from "@/components/language-provider";
import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";

export function FooterVisual() {
  return (
    <footer className="academic-footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} Zixuan Jiang · 蒋梓轩</span>
        <nav aria-label="Additional profile links">
          <a href={`mailto:${site.email}`}><T zh="联系我">Contact</T></a>
          <a href={site.links.researchGate} target="_blank" rel="noreferrer">ResearchGate</a>
          <a href={site.links.xiaohongshu} target="_blank" rel="noreferrer"><T zh="小红书">Xiaohongshu</T></a>
          <a href="#top"><T>{"Back to top"}</T><ArrowUp aria-hidden="true" /></a>
        </nav>
      </div>
    </footer>
  );
}
