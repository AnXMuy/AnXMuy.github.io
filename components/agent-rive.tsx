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
      aria-label="Interactive agent interface preview"
      initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.68, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="agent-rive-canvas" aria-hidden="true">
        {hasRiveAsset ? <AgentRiveCanvas autoplay={!reduceMotion} /> : null}
        {!hasRiveAsset ? (
          <div className="agent-rive-fallback">
            <span className="agent-core" />
            <span className="agent-node agent-node-a" />
            <span className="agent-node agent-node-b" />
            <span className="agent-node agent-node-c" />
            <span className="agent-wave agent-wave-a" />
            <span className="agent-wave agent-wave-b" />
          </div>
        ) : null}
      </div>
      <div className="agent-rive-meta">
        <span>Agent Interface</span>
        <strong>Listening · Reasoning · Revising</strong>
      </div>
    </motion.aside>
  );
}
