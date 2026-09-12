import Image from "next/image";
import { ExternalLink, GraduationCap, Mail, MapPin, Network } from "lucide-react";
import { site } from "@/data/site";
import { T } from "@/components/language-provider";
import { CopyEmail } from "@/components/copy-email";

export function AgentRive() {
  return (
    <aside className="research-card" aria-label="Research and contact">
      <div className="research-card-heading">
        <Image src="/images/siam-logo.webp" alt="" width={52} height={52} />
        <div><span className="research-overline">RESEARCH, WITH CURIOSITY</span><p><T>Multimodal LLMs · Human–Computer Interaction</T></p></div>
      </div>
      <div className="agent-rive-links">
        <span><MapPin aria-hidden="true" /><T>{site.location}</T></span>
        <a href={`mailto:${site.email}`}><Mail aria-hidden="true" /><T>Email</T></a>
        <CopyEmail />
        <a href={site.links.scholar} target="_blank" rel="noreferrer"><GraduationCap aria-hidden="true" />Scholar<ExternalLink className="external-mark" aria-hidden="true" /></a>
        <a href={site.links.orcid} target="_blank" rel="noreferrer"><Network aria-hidden="true" />ORCID<ExternalLink className="external-mark" aria-hidden="true" /></a>
      </div>
    </aside>
  );
}
