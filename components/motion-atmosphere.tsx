"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

export function MotionAtmosphere() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const x = useSpring(useMotionValue(50), { stiffness: 90, damping: 24, mass: 0.35 });
  const y = useSpring(useMotionValue(28), { stiffness: 90, damping: 24, mass: 0.35 });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 });
  const glow = useMotionTemplate`radial-gradient(560px circle at ${x}% ${y}%, rgba(229, 58, 69, 0.14), transparent 66%)`;
  const progressScale = useTransform(progress, [0, 1], [0.03, 1]);
  const signalOffset = useTransform(progress, [0, 1], [0, -520]);
  const signalOpacity = useTransform(progress, [0, 0.18, 0.7, 1], [0.62, 0.82, 0.54, 0.28]);

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
      <motion.div className="ambient-progress" style={{ scaleX: progressScale }} aria-hidden="true" />
      <div className="ambient-signal-field" aria-hidden="true">
        <motion.svg viewBox="0 0 1440 760" preserveAspectRatio="none" style={{ opacity: signalOpacity }}>
          <motion.path style={{ strokeDashoffset: signalOffset }} className="signal-path signal-path-one" d="M-60 590H200l70-70h174l70-70h150l64-64h176l78-78h180l72-72h260" />
          <motion.path style={{ strokeDashoffset: signalOffset }} className="signal-path signal-path-two" d="M-80 690h188l82-82h192l58-58h140l82-82h154l72-72h170l86-86h240" />
          <motion.path style={{ strokeDashoffset: signalOffset }} className="signal-path signal-path-three" d="M80 140h184l60 60h186l72 72h152l62 62h170l76 76h210l70 70h180" />
          <motion.path style={{ strokeDashoffset: signalOffset }} className="signal-path signal-path-four" d="M-120 290h250l46 46h164l80-80h180l56 56h154l86-86h186l52 52h266" />
          <circle className="signal-node signal-node-one" cx="444" cy="450" r="4" />
          <circle className="signal-node signal-node-two" cx="1008" cy="284" r="4" />
          <circle className="signal-node signal-node-three" cx="1170" cy="628" r="4" />
          <circle className="signal-node signal-node-four" cx="718" cy="336" r="3.5" />
        </motion.svg>
      </div>
    </>
  );
}
