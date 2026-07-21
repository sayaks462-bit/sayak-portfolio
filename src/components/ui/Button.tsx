"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticButton } from "../animations/MagneticButton";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300";

  const variantClasses = {
    primary:
      "bg-gold text-bg hover:bg-gold-light shadow-lg shadow-gold/20 hover:shadow-gold/30",
    secondary:
      "bg-white/[0.03] text-white/70 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white/90 hover:border-white/[0.12]",
    outline:
      "bg-transparent text-gold border border-gold/30 hover:bg-gold/10 hover:border-gold/50",
  };

  const content = (
    <>
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </>
  );

  if (href) {
    return (
      <MagneticButton className="inline-block">
        <Link
          href={href}
          className={`${baseClasses} ${variantClasses[variant]} group ${className}`}
        >
          {content}
        </Link>
      </MagneticButton>
    );
  }

  return (
    <MagneticButton className="inline-block">
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} group ${className}`}
      >
        {content}
      </button>
    </MagneticButton>
  );
}
