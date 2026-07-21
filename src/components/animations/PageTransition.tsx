"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { DUR, EASE_OUT } from "@/lib/motion";

const variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: DUR.page,
      ease: EASE_OUT,
      delay: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: {
      duration: DUR.fast,
      ease: EASE_OUT,
    },
  },
};

/**
 * Wraps page content with AnimatePresence for smooth route transitions.
 * Uses the pathname as the key so animations fire on every navigation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ willChange: "opacity, transform, filter" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
