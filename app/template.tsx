"use client";

import { motion } from "motion/react";
import { useExperience } from "@/components/experience-provider";

export default function Template({ children }: { children: React.ReactNode }) {
  const { motionEnabled } = useExperience();
  return (
    <motion.div
      initial={false}
      animate={motionEnabled ? { y: [6, 0] } : { y: 0 }}
      transition={{ duration: motionEnabled ? 0.42 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
