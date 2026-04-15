"use client";

import { motion } from "framer-motion";
import { ClueReveal } from "./ClueReveal";
import { NeonButton } from "@/components/ui/NeonButton";

interface ClueTimelineProps {
  clues: Array<{
    id: number;
    text: string;
    hint: string;
  }>;
  activeClueIndex: number;
  revealedCount: number;
  onClueRevealed: () => void;
  onAllCluesRevealed: () => void;
  onRevealNext: () => void;
}

export function ClueTimeline({
  clues,
  activeClueIndex,
  revealedCount,
  onClueRevealed,
  onAllCluesRevealed,
  onRevealNext,
}: ClueTimelineProps) {
  const allRevealed = revealedCount >= clues.length;

  return (
    <section className="py-16 px-4 relative">
      {/* Section header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="font-mono text-xs text-[#00e5ff] tracking-[0.5em] mb-3">
          証拠ファイル
        </div>
        <h2
          className="font-orbitron text-3xl md:text-4xl font-bold tracking-wider"
          style={{
            color: "#7c4dff",
            textShadow: "0 0 20px #7c4dff40, 0 0 40px #7c4dff20",
          }}
        >
          EVIDENCE FILES
        </h2>
        <div className="mt-4 mx-auto w-32 h-px bg-gradient-to-r from-transparent via-[#7c4dff] to-transparent" />
      </motion.div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto relative">
        {/* Vertical connector line */}
        <div className="absolute left-[1.55rem] top-0 bottom-0 w-px bg-gradient-to-b from-[#7c4dff40] to-transparent" />

        <div className="space-y-6">
          {clues.map((clue, i) => (
            <ClueReveal
              key={clue.id}
              clue={clue}
              index={i}
              isActive={i === activeClueIndex}
              isRevealed={i < revealedCount}
              onRevealComplete={onClueRevealed}
            />
          ))}
        </div>

        {/* Reveal next button */}
        {!allRevealed && activeClueIndex === -1 && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <NeonButton
              onClick={onRevealNext}
              color="#7c4dff"
              size="md"
            >
              {revealedCount === 0
                ? "▶ DECLASSIFY FIRST EVIDENCE"
                : `▶ DECLASSIFY EVIDENCE #${revealedCount + 1}`}
            </NeonButton>
          </motion.div>
        )}

        {/* All revealed */}
        {allRevealed && (
          <motion.div
            className="text-center mt-12 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="font-orbitron text-xl text-[#ffd740] tracking-wider"
              style={{ textShadow: "0 0 20px #ffd74060" }}
            >
              ALL EVIDENCE DECLASSIFIED
            </div>
            <p className="font-rajdhani text-gray-400">
              You have reviewed all available evidence. Make your accusation now.
            </p>
            <NeonButton
              onClick={onAllCluesRevealed}
              color="#ff1744"
              size="lg"
            >
              ⚖ MAKE YOUR ACCUSATION
            </NeonButton>
          </motion.div>
        )}
      </div>
    </section>
  );
}
