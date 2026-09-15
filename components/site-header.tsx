import { LanguageSwitch } from "@/components/language-provider";
import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { site } from "@/data/site";
import { PrimaryNavigation } from "@/components/primary-navigation";
import { CVLink } from "@/components/cv-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-link" href="/" aria-label="Zixuan Jiang, back to About Me">
          <span className="brand-mark" aria-hidden="true">
            <Image src="/images/siam-logo.webp" alt="" width={42} height={42} priority />
          </span>
          <span className="brand-name">Zixuan Jiang</span>
        </Link>

        <PrimaryNavigation />

        <nav className="utility-nav" aria-label="Profile links">
          <LanguageSwitch />
          <CVLink />
          <a href={site.links.github} target="_blank" rel="noreferrer" title="GitHub">
            <Github aria-hidden="true" />
            <span className="utility-label">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
