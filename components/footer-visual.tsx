import { ArrowUp } from "lucide-react";

export function FooterVisual() {
  return (
    <footer className="footer-visual">
      <div className="footer-image" aria-hidden="true" />
      <svg className="footer-current" viewBox="0 0 1440 520" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-40 410h260l62-62h196l72-72h180l68-68h196l74-74h392" />
        <path d="M-60 474h360l52-52h210l62-62h210l56-56h244l70-70h276" />
      </svg>
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
