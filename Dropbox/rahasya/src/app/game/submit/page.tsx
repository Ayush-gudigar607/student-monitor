"use client";

import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { SubmissionForm } from "@/components/submission/SubmissionForm";
import { GlowText } from "@/components/ui/GlowText";

const SUSPECTS = [
  { id: 1, name: "Akira Tanaka", alias: "The Shadow Broker", color: "#00e5ff" },
  { id: 2, name: "Yuki Morishima", alias: "The Ice Queen", color: "#7c4dff" },
  { id: 3, name: "Ryoma Kenshin", alias: "The Ronin", color: "#ff1744" },
  { id: 4, name: "Sakura Hayashi", alias: "The Phantom", color: "#ff4081" },
  { id: 5, name: "Daichi Nakamura", alias: "The Architect", color: "#ffd740" },
];

export default function SubmitPage() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 px-6 py-4 flex items-center gap-4">
        <a
          href="/game"
          className="font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors tracking-wider"
        >
          ◁ BACK TO EVIDENCE
        </a>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          className="w-full max-w-xl space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="font-mono text-xs text-[#ff174480] tracking-[0.5em]">
              ▼ FINAL PHASE ▼
            </div>
            <GlowText
              as="h1"
              color="#ff1744"
              className="font-orbitron text-3xl md:text-4xl font-bold tracking-wider"
            >
              MAKE YOUR ACCUSATION
            </GlowText>
            <p className="font-rajdhani text-gray-500">
              Review the evidence carefully. Once submitted, your answer is final.
            </p>
            <div className="mx-auto w-32 h-px bg-gradient-to-r from-transparent via-[#ff174460] to-transparent" />
          </div>

          {/* Form */}
          <SubmissionForm suspects={SUSPECTS} />
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-6">
        <span className="font-mono text-[9px] text-gray-800 tracking-wider">
          ⚠ ONE SUBMISSION PER INVESTIGATOR • ALL ANSWERS ARE FINAL
        </span>
      </div>
    </main>
  );
}
