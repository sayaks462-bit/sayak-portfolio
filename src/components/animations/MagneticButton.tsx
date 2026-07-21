"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches
    );
  }, []);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (isTouchDevice) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      ref.current?.getBoundingClientRect() || {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  }, [isTouchDevice]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isTouchDevice) return;
      const touch = e.touches[0];
      const { left, top, width, height } =
        ref.current?.getBoundingClientRect() || {
          left: 0,
          top: 0,
          width: 0,
          height: 0,
        };
      const x = touch.clientX - left - width / 2;
      const y = touch.clientY - top - height / 2;
      setPosition({ x: x * 0.15, y: y * 0.15 });
    },
    [isTouchDevice]
  );

  const reset = useCallback(() => setPosition({ x: 0, y: 0 }), []);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onTouchStart={handleTouchStart}
      onTouchEnd={reset}
      onTouchCancel={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      style={{ touchAction: "manipulation" }}
    >
      {children}
    </motion.div>
  );
}
