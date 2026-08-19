"use client";

import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

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
              <span className="agent-node agent-node-a">MMI</span>
              <span className="agent-node agent-node-b">Audio</span>
              <span className="agent-node agent-node-c">Agent</span>
              <span className="agent-node agent-node-d">DL</span>
              <span className="agent-wave agent-wave-a" />
              <span className="agent-wave agent-wave-b" />
            </div>
          ) : null}
        </div>
        <div className="agent-rive-meta">
          <span>Interaction Stack</span>
          <strong>Speech · Vision · Language</strong>
        </div>
      </div>
      <div className="agent-rive-copy">
        <p>Research Signal</p>
        <h2>Interested in multimodal intelligence, audio interaction, agents, and deep learning.</h2>
        <div className="agent-rive-tags">
          <span>Multi-Modal Intelligence</span>
          <span>Audio Interaction</span>
          <span>Agent</span>
          <span>Deep Learning</span>
        </div>
        <dl>
          <div>
            <dt>Multi-Modal</dt>
            <dd>Connecting vision, speech, and language into systems that understand context instead of isolated inputs.</dd>
          </div>
          <div>
            <dt>Audio</dt>
            <dd>Designing speech interfaces that can clean, revise, and preserve the speaker&apos;s final intent.</dd>
          </div>
          <div>
            <dt>Agent</dt>
            <dd>Studying how interactive AI systems plan, act, and respond to human feedback in real workflows.</dd>
          </div>
          <div>
            <dt>Deep Learning</dt>
            <dd>Using representation learning and model adaptation as the engine behind robust perception and interaction.</dd>
          </div>
        </dl>
      </div>
    </motion.aside>
  );
}
