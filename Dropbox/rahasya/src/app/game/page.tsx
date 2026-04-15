"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { IntroSequence } from "@/components/game/IntroSequence";
import { SuspectsGallery } from "@/components/game/SuspectsGallery";
import { ClueTimeline } from "@/components/game/ClueTimeline";
import { CountdownTimer } from "@/components/game/CountdownTimer";

// Client-safe data (no correct answer exposed)
const SUSPECTS = [
  {
    id: 1,
    name: "Akira Tanaka",
    alias: "The Shadow Broker",
    description:
      "An underground information dealer who operates in the darkest corners of Neo-Tokyo. Known for selling secrets to the highest bidder.",
    trait: "Always wears dark glasses, even at night. Never makes eye contact.",
    color: "#00e5ff",
  },
  {
    id: 2,
    name: "Yuki Morishima",
    alias: "The Ice Queen",
    description:
      "A cold and calculating corporate executive at Morishima Industries. Her empire was built on ruthless acquisitions.",
    trait: "Never raises her voice. The quieter she speaks, the more dangerous she becomes.",
    color: "#7c4dff",
  },
  {
    id: 3,
    name: "Ryoma Kenshin",
    alias: "The Ronin",
    description:
      "An ex-detective turned vigilante. Once the best investigator in the city, now working outside the law.",
    trait: "Still carries his old police badge. Has a scar across his left cheek.",
    color: "#ff1744",
  },
  {
    id: 4,
    name: "Sakura Hayashi",
    alias: "The Phantom",
    description:
      "A legendary hacker who exists only in the digital world. No one has ever seen her face — or confirmed she even exists.",
    trait: "Communicates only through encrypted channels. Leaves a cherry blossom emoji as her signature.",
    color: "#ff4081",
  },
  {
    id: 5,
    name: "Daichi Nakamura",
    alias: "The Architect",
    description:
      "A brilliant structural engineer and urban planner. Known for designing impossible buildings — and impossible plans.",
    trait: "Always carries a leather notebook. Sketches blueprints obsessively, even in conversation.",
    color: "#ffd740",
  },
];

const CLUES = [
  {
    id: 1,
    text: "Security cameras captured a figure near the Shibuya data center at 2:47 AM. The person moved with purpose — they knew the layout intimately.",
    hint: "Someone who knew the building's architecture...",
    eliminates: [1],
  },
  {
    id: 2,
    text: "The suspect was wearing a tailored suit and carried a leather briefcase. This was not a street-level operation.",
    hint: "A professional, not a hacker or street operator...",
    eliminates: [4],
  },
  {
    id: 3,
    text: "The method used required advanced knowledge of structural systems — ventilation, load-bearing walls, and emergency exits were all exploited.",
    hint: "Only someone with engineering expertise could pull this off...",
    eliminates: [2],
  },
  {
    id: 4,
    text: "Investigators found hand-drawn blueprints of the victim's building in a nearby dumpster. The drawings were precise — not digital prints, but sketched by hand.",
    hint: "Who obsessively draws blueprints by hand?",
    eliminates: [],
  },
  {
    id: 5,
    text: "All communication related to the crime was conducted through analog methods — handwritten notes, face-to-face meetings. Zero digital footprint.",
    hint: "This rules out anyone who operates digitally...",
    eliminates: [],
  },
  {
    id: 6,
    text: 'A confidential informant revealed: "He always said he could design the perfect crime, just like he designs the perfect building. He wasn\'t joking."',
    hint: "The Architect... of crime itself.",
    eliminates: [],
  },
];

export default function GamePage() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [activeClueIndex, setActiveClueIndex] = useState(-1);
  const [revealedCount, setRevealedCount] = useState(0);

  // Calculate eliminated suspects based on revealed clues
  const eliminatedIds = useMemo(() => {
    const ids = new Set<number>();
    for (let i = 0; i < revealedCount; i++) {
      CLUES[i].eliminates?.forEach((id) => ids.add(id));
    }
    return Array.from(ids);
  }, [revealedCount]);

  const handleRevealNext = useCallback(() => {
    if (revealedCount < CLUES.length) {
      setActiveClueIndex(revealedCount);
    }
  }, [revealedCount]);

  const handleClueRevealed = useCallback(() => {
    setRevealedCount((prev) => prev + 1);
    setActiveClueIndex(-1);
  }, []);

  const clientClues = useMemo(
    () =>
      CLUES.map(({ id, text, hint }) => ({
        id,
        text,
        hint,
      })),
    []
  );

  return (
    <main className="relative min-h-screen">
      <ParticleBackground />

      {/* Intro */}
      <AnimatePresence>
        {showIntro && (
          <IntroSequence onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Game content */}
      {!showIntro && (
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Header bar */}
          <div className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-[#0a0a0f] to-transparent">
            <div className="flex items-center gap-4">
              <h1
                className="font-orbitron text-sm font-bold tracking-wider"
                style={{
                  color: "#ff1744",
                  textShadow: "0 0 10px #ff174440",
                }}
              >
                RAHASYA
              </h1>
              <span className="font-mono text-[10px] text-gray-600">
                CASE #2847
              </span>
            </div>
            <CountdownTimer />
          </div>

          {/* Spacer for fixed header */}
          <div className="h-20" />

          {/* Suspects Section */}
          <SuspectsGallery
            suspects={SUSPECTS}
            eliminatedIds={eliminatedIds}
          />

          {/* Divider */}
          <div className="max-w-3xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[#7c4dff30] to-transparent" />
          </div>

          {/* Clues Section */}
          <ClueTimeline
            clues={clientClues}
            activeClueIndex={activeClueIndex}
            revealedCount={revealedCount}
            onClueRevealed={handleClueRevealed}
            onAllCluesRevealed={() => router.push("/game/submit")}
            onRevealNext={handleRevealNext}
          />

          {/* Footer */}
          <div className="text-center py-8">
            <span className="font-mono text-[9px] text-gray-800 tracking-wider">
              TOKYO METROPOLITAN POLICE • CLASSIFIED INVESTIGATION
            </span>
          </div>
        </motion.div>
      )}
    </main>
  );
}
