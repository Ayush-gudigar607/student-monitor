"use client";

import { motion } from "framer-motion";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { useState } from "react";

interface ClueRevealProps {
  clue: {
    id: number;
    text: string;
    hint: string;
  };
  index: number;
  isActive: boolean;
  isRevealed: boolean;
  onRevealComplete?: () => void;
}

export function ClueReveal({
  clue,
  index,
  isActive,
  isRevealed,
  onRevealComplete,
}: ClueRevealProps) {
  const [textComplete, setTextComplete] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -50 }}
      animate={{
        opacity: isActive || isRevealed ? 1 : 0.2,
        x: 0,
      }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div
        className="relative border rounded-sm p-6 md:p-8 overflow-hidden"
        style={{
          background: isActive
            ? "linear-gradient(135deg, #12121a 0%, #1a1025 50%, #12121a 100%)"
            : "linear-gradient(135deg, #0e0e14 0%, #0a0a0f 100%)",
          borderColor: isActive ? "#7c4dff60" : "#ffffff10",
          boxShadow: isActive ? "0 0 30px #7c4dff20" : "none",
        }}
      >
        {/* Clue number badge */}
        <div className="flex items-start gap-4">
          <div
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-orbitron text-sm font-bold"
            style={{
              background: isActive
                ? "linear-gradient(135deg, #7c4dff, #ff1744)"
                : "#1a1a2a",
              color: isActive ? "#fff" : "#555",
              boxShadow: isActive
                ? "0 0 15px #7c4dff60"
                : "none",
            }}
          >
            {clue.id}
          </div>

          <div className="flex-1 space-y-3">
            {/* Classification header */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-[0.3em] text-gray-600">
                EVIDENCE #{String(clue.id).padStart(3, "0")}
              </span>
              {isActive && (
                <motion.span
                  className="inline-block w-2 h-2 rounded-full bg-[#ff1744]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>

            {/* Clue text */}
            <div className="font-rajdhani text-base md:text-lg text-gray-300 leading-relaxed">
              {isActive && !isRevealed ? (
                <TypewriterText
                  text={clue.text}
                  speed={25}
                  color="#d0d0d0"
                  onComplete={() => {
                    setTextComplete(true);
                    setTimeout(() => onRevealComplete?.(), 1500);
                  }}
                />
              ) : (
                <span className={isRevealed ? "text-gray-400" : "text-gray-700"}>
                  {isRevealed ? clue.text : "[ CLASSIFIED — AWAITING CLEARANCE ]"}
                </span>
              )}
            </div>

            {/* Hint */}
            {(isRevealed || textComplete) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-2 pl-4 border-l-2 border-[#ffd740] py-1"
              >
                <span className="font-mono text-xs text-[#ffd740] tracking-wider">
                  ⚡ {clue.hint}
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Active indicator line */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#7c4dff] to-[#ff1744]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        )}
      </div>
    </motion.div>
  );
}
