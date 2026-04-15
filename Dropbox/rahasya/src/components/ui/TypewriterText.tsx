"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
  color?: string;
}

export function TypewriterText({
  text,
  speed = 40,
  delay = 0,
  className = "",
  onComplete,
  showCursor = true,
  color,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const animate = useCallback(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setCompleted(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  useEffect(() => {
    return animate();
  }, [animate]);

  if (!started) return null;

  return (
    <motion.span
      className={`${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={color ? { color } : undefined}
    >
      {displayedText}
      {showCursor && !completed && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block ml-0.5"
          style={{ color: color || "#ff1744" }}
        >
          █
        </motion.span>
      )}
    </motion.span>
  );
}
