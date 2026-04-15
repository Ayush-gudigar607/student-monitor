"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowTextProps {
  children: ReactNode;
  color?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
}

export function GlowText({
  children,
  color = "#ff1744",
  className = "",
  as: Tag = "h1",
  delay = 0,
}: GlowTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      <Tag
        className={`${className}`}
        style={{
          textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}40, 0 0 80px ${color}20`,
          color: color,
        }}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
