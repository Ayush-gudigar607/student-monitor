"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  size?: "sm" | "md" | "lg";
}

export function NeonButton({
  children,
  onClick,
  color = "#ff1744",
  className = "",
  disabled = false,
  type = "button",
  size = "md",
}: NeonButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative font-orbitron font-bold uppercase tracking-wider
        ${sizeClasses[size]}
        border-2 rounded-sm
        transition-all duration-300
        disabled:opacity-40 disabled:cursor-not-allowed
        cursor-pointer
        ${className}
      `}
      style={{
        borderColor: color,
        color: color,
        boxShadow: `0 0 10px ${color}40, inset 0 0 10px ${color}10`,
        background: `linear-gradient(135deg, ${color}08, ${color}04)`,
      }}
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.05,
              boxShadow: `0 0 20px ${color}80, 0 0 40px ${color}40, inset 0 0 20px ${color}20`,
            }
      }
      whileTap={disabled ? {} : { scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated corner accents */}
      <span
        className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2"
        style={{ borderColor: color }}
      />
      <span
        className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2"
        style={{ borderColor: color }}
      />
      <span
        className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2"
        style={{ borderColor: color }}
      />
      <span
        className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2"
        style={{ borderColor: color }}
      />
      {children}
    </motion.button>
  );
}
