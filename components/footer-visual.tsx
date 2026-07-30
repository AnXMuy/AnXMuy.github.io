import { ArrowUp } from "lucide-react";

export function FooterVisual() {
  return (
    <footer className="footer-visual">
      <div className="footer-image" aria-hidden="true" />
      <div className="footer-scanline" aria-hidden="true" />
      <div className="footer-content">
        <p className="footer-kicker">Driven by curiosity</p>
        <p className="footer-statement">Try · Train · Transfer · Transcend</p>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Zixuan Jiang</span>
          <a href="#top">Back to top <ArrowUp aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
