"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const interactiveSelector = [
  "a",
  "button",
  "summary",
  "[role='button']",
  "input",
  "select",
  "textarea",
  ".route-button",
  ".publication-card",
  ".featured-paper",
  ".standard-paper",
].join(",");

export function AgentCursor() {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(-80);
  const rawY = useMotionValue(-80);
  const x = useSpring(rawX, { stiffness: 520, damping: 38, mass: 0.28 });
  const y = useSpring(rawY, { stiffness: 520, damping: 38, mass: 0.28 });
  const [enabled, setEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    window.setTimeout(() => setEnabled(true), 0);
    document.documentElement.classList.add("agent-cursor-enabled");

    const onPointerMove = (event: PointerEvent) => {
      const target = document.elementFromPoint(event.clientX, event.clientY);
      const interactive = target?.closest(interactiveSelector);

      if (interactive instanceof HTMLElement) {
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const pull = Math.min(0.34, Math.max(0.12, 48 / Math.max(rect.width, rect.height)));

        rawX.set(event.clientX + (centerX - event.clientX) * pull);
        rawY.set(event.clientY + (centerY - event.clientY) * pull);
        setIsLocked(true);
      } else {
        rawX.set(event.clientX);
        rawY.set(event.clientY);
        setIsLocked(false);
      }
    };

    const onPointerDown = () => setIsPressed(true);
    const onPointerUp = () => setIsPressed(false);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    return () => {
      document.documentElement.classList.remove("agent-cursor-enabled");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [rawX, rawY, reduceMotion]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`agent-cursor ${isLocked ? "agent-cursor-locked" : ""} ${isPressed ? "agent-cursor-pressed" : ""}`}
      style={{ x, y }}
      aria-hidden="true"
    >
      <span />
      <i />
    </motion.div>
  );
}
