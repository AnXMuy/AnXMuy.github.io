import Link from "next/link";
import Image from "next/image";
import { FileText, Github } from "lucide-react";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-link" href="/" aria-label="Zixuan Jiang, back to About Me">
          <span className="brand-mark" aria-hidden="true">
            <Image src="/images/header-logo-red.png" alt="" width={42} height={42} priority />
          </span>
          <span className="brand-name">Zixuan Jiang</span>
        </Link>

        <nav className="utility-nav" aria-label="Profile links">
          <a href={site.cv} target="_blank" rel="noreferrer" title="View CV">
            <FileText aria-hidden="true" />
            <span>CV</span>
          </a>
          <a href={site.links.github} target="_blank" rel="noreferrer" title="GitHub">
            <Github aria-hidden="true" />
            <span className="utility-label">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
