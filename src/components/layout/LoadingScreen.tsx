"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
          <span className="text-white">SAYAK</span>
          <span className="text-gold ml-2">SARKAR</span>
        </h1>

        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gold rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 text-white/25 text-[10px] tracking-[0.2em] uppercase font-body">
          {progress < 100 ? "Loading Experience" : "Welcome"}
        </p>
      </motion.div>
    </motion.div>
  );
}
