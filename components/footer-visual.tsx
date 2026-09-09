import { T } from "@/components/language-provider";
import { ArrowUp } from "lucide-react";
import { SeaNote } from "@/components/sea-note";

export function FooterVisual() {
  return (
    <footer className="footer-visual">
      <svg className="footer-current" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-40 150 C220 60 420 260 720 150 S1220 60 1480 150" />
        <path d="M-40 180 C220 90 420 290 720 180 S1220 90 1480 180" />
      </svg>
      <div className="footer-content">
        <div className="footer-scene">
          <div className="footer-copy">
            <p className="footer-kicker"><T>{"Driven by curiosity"}</T></p>
            <p className="footer-statement">Try · Train<br />Transfer · Transcend</p>
            <SeaNote />
          </div>
          <div className="footer-art" aria-hidden="true"><div className="footer-image" /></div>
        </div>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Zixuan Jiang</span>
          <a href="#top"><T>{"Back to top"}</T> <ArrowUp aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
