"use client";

import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import { ExternalLink, GraduationCap, Mail, MapPin, Network } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const riveSrc = "/rive/agent-interface.riv";

function AgentRiveCanvas({ autoplay }: { autoplay: boolean }) {
  const { RiveComponent } = useRive({
    src: riveSrc,
    stateMachines: "Agent Interface",
    autoplay,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return <RiveComponent />;
}

export function AgentRive() {
  const reduceMotion = useReducedMotion();
  const [hasRiveAsset, setHasRiveAsset] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch(riveSrc, { method: "HEAD" })
      .then((response) => {
        if (isMounted) setHasRiveAsset(response.ok);
      })
      .catch(() => {
        if (isMounted) setHasRiveAsset(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.aside
      className="agent-rive"
      aria-label="Research signal summary"
      initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.68, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="agent-rive-visual">
        <div className="agent-rive-canvas" aria-hidden="true">
          {hasRiveAsset ? <AgentRiveCanvas autoplay={!reduceMotion} /> : null}
          {!hasRiveAsset ? (
            <div className="agent-rive-fallback">
              <span className="agent-core" />
              <span className="agent-orbit-tag agent-orbit-tag-a">multimodal</span>
              <span className="agent-orbit-tag agent-orbit-tag-b">audio</span>
              <span className="agent-orbit-tag agent-orbit-tag-c">vision</span>
              <span className="agent-orbit-tag agent-orbit-tag-d">agent</span>
              <span className="agent-orbit-tag agent-orbit-tag-e">deep learning</span>
              <span className="agent-orbit-tag agent-orbit-tag-f">LLM</span>
              <span className="agent-wave agent-wave-a" />
              <span className="agent-wave agent-wave-b" />
            </div>
          ) : null}
        </div>
      </div>
      <div className="agent-rive-links">
        <span><MapPin aria-hidden="true" />{site.location}</span>
        <a href={`mailto:${site.email}`}><Mail aria-hidden="true" />Email</a>
        <a href={site.links.scholar} target="_blank" rel="noreferrer">
          <GraduationCap aria-hidden="true" />Scholar<ExternalLink className="external-mark" aria-hidden="true" />
        </a>
        <a href={site.links.orcid} target="_blank" rel="noreferrer">
          <Network aria-hidden="true" />ORCID<ExternalLink className="external-mark" aria-hidden="true" />
        </a>
      </div>
    </motion.aside>
  );
}
