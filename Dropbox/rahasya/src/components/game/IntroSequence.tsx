"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { GlitchEffect } from "@/components/ui/GlitchEffect";
import { TypewriterText } from "@/components/ui/TypewriterText";

interface IntroSequenceProps {
  onComplete: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Phase 0: Initial black screen with scan lines
    tl.to(containerRef.current, {
      duration: 0.5,
      opacity: 1,
    });

    // Phase 1: Static/glitch
    tl.call(() => setPhase(1), [], "+=0.5");

    // Phase 2: Case file
    tl.call(() => setPhase(2), [], "+=2");

    // Phase 3: Narration
    tl.call(() => setPhase(3), [], "+=2.5");

    // Phase 4: "Begin Investigation"
    tl.call(() => setPhase(4), [], "+=6");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#0a0a0f] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
    >
      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      <AnimatePresence mode="wait">
        {phase === 1 && (
          <motion.div
            key="static"
            className="text-center z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GlitchEffect>
              <div className="font-orbitron text-2xl md:text-4xl text-[#ff1744] tracking-[0.3em]">
                CLASSIFIED
              </div>
            </GlitchEffect>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="casefile"
            className="text-center z-30 space-y-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-mono text-sm text-[#00e5ff] tracking-[0.5em] opacity-60">
              TOKYO METROPOLITAN POLICE
            </div>
            <div
              className="font-orbitron text-4xl md:text-6xl font-bold"
              style={{
                color: "#ff1744",
                textShadow:
                  "0 0 20px #ff174480, 0 0 40px #ff174440",
              }}
            >
              CASE FILE #2847
            </div>
            <div className="font-rajdhani text-lg text-gray-500 tracking-wider">
              PRIORITY: CRITICAL • STATUS: UNSOLVED
            </div>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div
            key="narration"
            className="text-center z-30 max-w-2xl px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="font-mono text-xs text-[#7c4dff] mb-4 tracking-[0.3em]">
              ▶ PLAYING AUDIO LOG...
            </div>
            <div className="font-rajdhani text-xl md:text-2xl text-gray-300 leading-relaxed">
              <TypewriterText
                text="A crime has been committed in the heart of Neo-Tokyo. Five suspects. One truth. The evidence is scattered, the alibis are fragile, and time is running out. Your mission: analyze the clues, eliminate the innocent, and identify the real criminal."
                speed={30}
                color="#e0e0e0"
              />
            </div>
          </motion.div>
        )}

        {phase === 4 && (
          <motion.div
            key="begin"
            className="text-center z-30 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
          >
            <GlitchEffect>
              <div
                className="font-orbitron text-3xl md:text-5xl font-bold"
                style={{
                  color: "#ffd740",
                  textShadow:
                    "0 0 20px #ffd74080, 0 0 40px #ffd74040",
                }}
              >
                BEGIN INVESTIGATION
              </div>
            </GlitchEffect>
            <motion.button
              onClick={onComplete}
              className="font-orbitron text-sm tracking-[0.3em] text-[#00e5ff] border border-[#00e5ff] px-8 py-3 cursor-pointer hover:bg-[#00e5ff10] transition-colors"
              animate={{
                boxShadow: [
                  "0 0 10px #00e5ff40",
                  "0 0 30px #00e5ff60",
                  "0 0 10px #00e5ff40",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ▶ ENTER
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button */}
      {showSkip && phase < 4 && (
        <motion.button
          className="absolute bottom-8 right-8 z-40 font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors cursor-pointer tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onComplete}
        >
          SKIP ▸▸
        </motion.button>
      )}
    </motion.div>
  );
}
