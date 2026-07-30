import Image from "next/image";
import { ExternalLink, GraduationCap, Mail, MapPin, Network } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";

export function ProfileHero() {
  return (
    <section className="profile-hero" aria-labelledby="profile-name">
      <div className="hero-grid" aria-hidden="true" />
      <Reveal className="portrait-wrap">
        <div className="portrait-frame">
          <Image
            src={site.avatar}
            alt="Portrait of Zixuan Jiang"
            width={864}
            height={864}
            priority
            sizes="(max-width: 640px) 144px, 176px"
          />
        </div>
      </Reveal>

      <Reveal className="identity-block" delay={0.08}>
        <p className="hero-kicker">Multimodal Intelligence · AI Research</p>
        <h1 id="profile-name">
          Zixuan Jiang <span>(Andrew)</span>
        </h1>
        <p className="hero-summary">{site.description}</p>
      </Reveal>

      <Reveal className="identity-links" delay={0.16}>
        <span><MapPin aria-hidden="true" />{site.location}</span>
        <a href={`mailto:${site.email}`}><Mail aria-hidden="true" />Email</a>
        <a href={site.links.scholar} target="_blank" rel="noreferrer">
          <GraduationCap aria-hidden="true" />Scholar<ExternalLink className="external-mark" aria-hidden="true" />
        </a>
        <a href={site.links.orcid} target="_blank" rel="noreferrer">
          <Network aria-hidden="true" />ORCID<ExternalLink className="external-mark" aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
