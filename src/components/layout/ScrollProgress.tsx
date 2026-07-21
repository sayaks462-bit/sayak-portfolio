"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion, useSpring } from "framer-motion";

export function ScrollProgress() {
  const progress = useScrollProgress();
  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{ scaleX }}
    >
      <div className="w-full h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
    </motion.div>
  );
}
