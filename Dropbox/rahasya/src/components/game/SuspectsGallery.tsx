"use client";

import { motion } from "framer-motion";
import { SuspectCard } from "./SuspectCard";

interface SuspectsGalleryProps {
  suspects: Array<{
    id: number;
    name: string;
    alias: string;
    description: string;
    trait: string;
    color: string;
  }>;
  eliminatedIds: number[];
  highlightedId?: number;
}

export function SuspectsGallery({
  suspects,
  eliminatedIds,
  highlightedId,
}: SuspectsGalleryProps) {
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
        <div className="font-mono text-xs text-[#7c4dff] tracking-[0.5em] mb-3">
          容疑者ファイル
        </div>
        <h2
          className="font-orbitron text-3xl md:text-4xl font-bold tracking-wider"
          style={{
            color: "#ff1744",
            textShadow: "0 0 20px #ff174440, 0 0 40px #ff174420",
          }}
        >
          THE SUSPECTS
        </h2>
        <div className="mt-4 mx-auto w-32 h-px bg-gradient-to-r from-transparent via-[#ff1744] to-transparent" />
      </motion.div>

      {/* Suspects grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {suspects.map((suspect, i) => (
          <SuspectCard
            key={suspect.id}
            suspect={suspect}
            index={i}
            eliminated={eliminatedIds.includes(suspect.id)}
            highlighted={suspect.id === highlightedId}
          />
        ))}
      </div>

      {/* Eliminated counter */}
      {eliminatedIds.length > 0 && (
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="font-mono text-sm text-gray-500">
            SUSPECTS ELIMINATED:{" "}
            <span className="text-[#ff1744]">{eliminatedIds.length}</span> / {suspects.length}
          </span>
        </motion.div>
      )}
    </section>
  );
}
