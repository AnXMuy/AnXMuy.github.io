"use client";

import { motion } from "motion/react";
import { useExperience } from "@/components/experience-provider";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { motionEnabled } = useExperience();

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={motionEnabled ? { y: [10, 0], opacity: [0.85, 1] } : undefined}
      animate={motionEnabled ? undefined : { y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: motionEnabled ? 0.65 : 0, delay: motionEnabled ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
