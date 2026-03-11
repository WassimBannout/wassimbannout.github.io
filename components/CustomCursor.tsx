"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const springCfg = { damping: 28, stiffness: 550, mass: 0.5 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only show on pointer-fine devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(
        el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          !!el.closest("a") ||
          !!el.closest("button")
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [visible, rawX, rawY]);

  if (!visible) return null;

  return (
    <>
      {/* Dot — instant */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: rawX,
          y: rawY,
          width: hovering ? 10 : 6,
          height: hovering ? 10 : 6,
          backgroundColor: hovering ? "var(--accent)" : "var(--fg)",
          translateX: "-50%",
          translateY: "-50%",
          transition: "width 0.2s, height 0.2s, background-color 0.2s",
        }}
      />
      {/* Ring — spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{
          x,
          y,
          width: hovering ? 44 : 32,
          height: hovering ? 44 : 32,
          borderColor: hovering ? "var(--accent)" : "rgba(255,255,255,0.15)",
          translateX: "-50%",
          translateY: "-50%",
          transition: "width 0.25s, height 0.25s, border-color 0.25s",
        }}
      />
    </>
  );
}
