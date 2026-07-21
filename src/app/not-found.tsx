"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-8xl font-bold text-gold mb-4"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/40 text-[15px] font-light mb-8"
        >
          This page could not be found.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-bg font-semibold text-[13px] tracking-wide rounded-full hover:bg-gold-light active:bg-gold-dark active:scale-[0.97] shadow-lg shadow-gold/20 transition-all duration-400"
          >
            Go Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
