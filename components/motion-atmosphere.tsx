"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect } from "react";

export function MotionAtmosphere() {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(50), { stiffness: 90, damping: 24, mass: 0.35 });
  const y = useSpring(useMotionValue(28), { stiffness: 90, damping: 24, mass: 0.35 });
  const glow = useMotionTemplate`radial-gradient(520px circle at ${x}% ${y}%, rgba(229, 58, 69, 0.13), transparent 68%)`;

  useEffect(() => {
    if (reduceMotion) return;
    const onPointerMove = (event: PointerEvent) => {
      x.set((event.clientX / window.innerWidth) * 100);
      y.set((event.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reduceMotion, x, y]);

  return (
    <>
      <motion.div className="ambient-pointer" style={{ background: glow }} aria-hidden="true" />
      <div className="ambient-signal-field" aria-hidden="true">
        <svg viewBox="0 0 1440 760" preserveAspectRatio="none">
          <path className="signal-path signal-path-one" d="M-60 590H200l70-70h174l70-70h150l64-64h176l78-78h180l72-72h260" />
          <path className="signal-path signal-path-two" d="M-80 690h188l82-82h192l58-58h140l82-82h154l72-72h170l86-86h240" />
          <path className="signal-path signal-path-three" d="M80 140h184l60 60h186l72 72h152l62 62h170l76 76h210l70 70h180" />
          <circle className="signal-node signal-node-one" cx="444" cy="450" r="4" />
          <circle className="signal-node signal-node-two" cx="1008" cy="284" r="4" />
          <circle className="signal-node signal-node-three" cx="1170" cy="628" r="4" />
        </svg>
      </div>
    </>
  );
}
