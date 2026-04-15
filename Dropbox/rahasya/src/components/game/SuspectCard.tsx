"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SuspectCardProps {
  suspect: {
    id: number;
    name: string;
    alias: string;
    description: string;
    trait: string;
    color: string;
  };
  index: number;
  eliminated?: boolean;
  highlighted?: boolean;
}

export function SuspectCard({
  suspect,
  index,
  eliminated = false,
  highlighted = false,
}: SuspectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer perspective-[1000px]"
      initial={{ opacity: 0, y: 60, rotateY: -15 }}
      animate={{
        opacity: eliminated ? 0.3 : 1,
        y: 0,
        rotateY: 0,
        scale: eliminated ? 0.95 : highlighted ? 1.05 : 1,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      whileHover={!eliminated ? { scale: 1.05, y: -8 } : {}}
      onClick={() => !eliminated && setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative rounded-sm overflow-hidden transition-all duration-500 ${
          eliminated ? "grayscale" : ""
        }`}
        style={{
          background: "linear-gradient(145deg, #12121a 0%, #0a0a0f 100%)",
          border: `1px solid ${eliminated ? "#333" : suspect.color}40`,
          boxShadow: highlighted
            ? `0 0 30px ${suspect.color}40, 0 0 60px ${suspect.color}20`
            : `0 0 15px ${suspect.color}15`,
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${suspect.color}, transparent)`,
          }}
        />

        {/* Suspect number */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="font-orbitron text-xs tracking-widest"
            style={{ color: suspect.color, opacity: 0.6 }}
          >
            #{String(suspect.id).padStart(2, "0")}
          </span>
        </div>

        {/* Avatar placeholder - styled initial */}
        <div className="flex justify-center pt-6 pb-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-orbitron font-bold"
            style={{
              border: `2px solid ${suspect.color}60`,
              background: `radial-gradient(circle, ${suspect.color}15, transparent)`,
              color: suspect.color,
              boxShadow: `0 0 20px ${suspect.color}20, inset 0 0 20px ${suspect.color}10`,
            }}
          >
            {suspect.name.charAt(0)}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-5 space-y-3">
          <div className="text-center">
            <h3
              className="font-orbitron text-base font-bold tracking-wide"
              style={{ color: suspect.color }}
            >
              {suspect.name}
            </h3>
            <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mt-1">
              「 {suspect.alias} 」
            </p>
          </div>

          <div className="border-t border-gray-800 pt-3">
            <p className="font-rajdhani text-sm text-gray-400 leading-relaxed">
              {isFlipped ? suspect.trait : suspect.description}
            </p>
          </div>

          {/* Flip hint */}
          <div className="text-center">
            <span className="font-mono text-[10px] text-gray-600 tracking-wider">
              {isFlipped ? "◁ CLICK TO FLIP BACK" : "CLICK TO REVEAL TRAIT ▷"}
            </span>
          </div>
        </div>

        {/* Eliminated stamp */}
        {eliminated && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 0, scale: 2, rotate: -15 }}
            animate={{ opacity: 0.7, scale: 1, rotate: -12 }}
            transition={{ type: "spring", damping: 10 }}
          >
            <div
              className="font-orbitron text-2xl font-bold tracking-widest px-6 py-2 border-2 rounded-sm"
              style={{
                color: "#ff1744",
                borderColor: "#ff1744",
                textShadow: "0 0 10px #ff174480",
              }}
            >
              ELIMINATED
            </div>
          </motion.div>
        )}

        {/* Highlighted glow border animation */}
        {highlighted && (
          <motion.div
            className="absolute inset-0 rounded-sm pointer-events-none"
            animate={{
              boxShadow: [
                `inset 0 0 20px ${suspect.color}20`,
                `inset 0 0 40px ${suspect.color}40`,
                `inset 0 0 20px ${suspect.color}20`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Bottom accent bar */}
        <div
          className="h-0.5 w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${suspect.color}40, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}
