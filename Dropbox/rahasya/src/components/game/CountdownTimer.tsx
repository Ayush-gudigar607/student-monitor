"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  duration?: number; // in seconds
  onComplete?: () => void;
  className?: string;
}

export function CountdownTimer({
  duration = 300,
  className = "",
}: CountdownTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  const progress = Math.min(elapsed / duration, 1);
  const isUrgent = progress > 0.75;

  return (
    <motion.div
      className={`font-orbitron text-sm tracking-wider ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-3">
        <motion.span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: isUrgent ? "#ff1744" : "#00e5ff" }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: isUrgent ? 0.5 : 1.5, repeat: Infinity }}
        />
        <span
          style={{
            color: isUrgent ? "#ff1744" : "#00e5ff",
            textShadow: isUrgent
              ? "0 0 10px #ff174480"
              : "0 0 10px #00e5ff80",
          }}
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
        <span className="text-gray-600 text-xs">ELAPSED</span>
      </div>
    </motion.div>
  );
}
