"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlitchEffectProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export function GlitchEffect({
  children,
  className = "",
  active = true,
}: GlitchEffectProps) {
  if (!active) return <div className={className}>{children}</div>;

  return (
    <div className={`relative ${className}`}>
      {/* Main content */}
      <div className="relative z-10">{children}</div>

      {/* Glitch layers */}
      <motion.div
        className="absolute inset-0 z-0 opacity-70"
        style={{ color: "#ff1744", clipPath: "inset(0 0 0 0)" }}
        animate={{
          clipPath: [
            "inset(0% 0% 90% 0%)",
            "inset(40% 0% 40% 0%)",
            "inset(80% 0% 0% 0%)",
            "inset(10% 0% 70% 0%)",
            "inset(0% 0% 90% 0%)",
          ],
          x: [0, -3, 3, -1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute inset-0 z-0 opacity-70"
        style={{ color: "#00e5ff", clipPath: "inset(0 0 0 0)" }}
        animate={{
          clipPath: [
            "inset(80% 0% 0% 0%)",
            "inset(10% 0% 70% 0%)",
            "inset(0% 0% 90% 0%)",
            "inset(60% 0% 20% 0%)",
            "inset(80% 0% 0% 0%)",
          ],
          x: [0, 3, -3, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: 0.1,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
