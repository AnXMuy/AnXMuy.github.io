import Image from "next/image";
import { T } from "@/components/language-provider";
import { ContactLinks } from "@/components/contact-links";

export function AgentRive() {
  return (
    <aside className="research-card" aria-label="Research and contact">
      <div className="research-card-heading">
        <Image src="/images/siam-logo.webp" alt="" width={52} height={52} />
        <div><span className="research-overline">RESEARCH, WITH CURIOSITY</span><p><T>Multimodal LLMs · Audio-Visual Intelligence</T></p></div>
      </div>
      <ContactLinks />
    </aside>
  );
}
