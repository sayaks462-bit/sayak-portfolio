"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    setIsVisible(true);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(animate);

    const interactives = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll(
        "a, button, [data-cursor-hover]"
      );
      newInteractives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          border: `1.5px solid ${isHovering ? "#C7A14A" : "rgba(255,255,255,0.3)"}`,
          borderRadius: "50%",
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          width: isHovering ? 6 : 4,
          height: isHovering ? 6 : 4,
          background: "#C7A14A",
          borderRadius: "50%",
          transition: "width 0.2s, height 0.2s",
        }}
      />
    </>
  );
}
