"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function AnimatedImage({
  src,
  alt,
  className = "",
  width = 800,
  height = 600,
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          scale: 1.05,
          x: mousePos.x * 10,
          y: mousePos.y * 10,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>

      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
      )}
    </div>
  );
}
