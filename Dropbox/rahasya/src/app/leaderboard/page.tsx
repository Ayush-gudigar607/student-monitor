"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { GlowText } from "@/components/ui/GlowText";
import { NeonButton } from "@/components/ui/NeonButton";

interface LeaderboardEntry {
  id: number;
  playerName: string;
  selectedCriminal: string;
  reason: string;
  isCorrect: boolean;
  submittedAt: string;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard");
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries || []);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchLeaderboard, 10000);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  const correctCount = entries.filter((e) => e.isCorrect).length;
  const totalCount = entries.length;

  return (
    <main className="relative min-h-screen">
      <ParticleBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <a
            href="/"
            className="font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors tracking-wider"
          >
            ◁ HOME
          </a>
          <a
            href="/game"
            className="font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors tracking-wider"
          >
            INVESTIGATE ▷
          </a>
        </div>

        {/* Title */}
        <div className="text-center mb-12 space-y-4">
          <div className="font-mono text-xs text-[#00e5ff80] tracking-[0.5em]">
            リーダーボード
          </div>
          <GlowText
            as="h1"
            color="#00e5ff"
            className="font-orbitron text-3xl md:text-5xl font-bold tracking-wider"
          >
            LEADERBOARD
          </GlowText>
          <div className="mx-auto w-32 h-px bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto">
          <motion.div
            className="text-center p-4 rounded-sm border border-[#ffffff08] bg-[#0e0e14]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div
              className="font-orbitron text-2xl font-bold"
              style={{ color: "#00e5ff" }}
            >
              {totalCount}
            </div>
            <div className="font-mono text-[10px] text-gray-600 tracking-wider mt-1">
              SUBMISSIONS
            </div>
          </motion.div>
          <motion.div
            className="text-center p-4 rounded-sm border border-[#ffffff08] bg-[#0e0e14]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="font-orbitron text-2xl font-bold"
              style={{ color: "#ffd740" }}
            >
              {correctCount}
            </div>
            <div className="font-mono text-[10px] text-gray-600 tracking-wider mt-1">
              CORRECT
            </div>
          </motion.div>
          <motion.div
            className="text-center p-4 rounded-sm border border-[#ffffff08] bg-[#0e0e14]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="font-orbitron text-2xl font-bold"
              style={{ color: "#ff1744" }}
            >
              {totalCount - correctCount}
            </div>
            <div className="font-mono text-[10px] text-gray-600 tracking-wider mt-1">
              WRONG
            </div>
          </motion.div>
        </div>

        {/* Table */}
        <motion.div
          className="rounded-sm border border-[#ffffff08] bg-[#0e0e14] p-4 md:p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {loading ? (
            <div className="text-center py-20">
              <motion.div
                className="font-orbitron text-lg text-gray-600"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                LOADING DATA...
              </motion.div>
            </div>
          ) : (
            <LeaderboardTable entries={entries} />
          )}
        </motion.div>

        {/* Last updated + refresh */}
        <div className="flex items-center justify-between mt-4">
          <span className="font-mono text-[10px] text-gray-700">
            {lastUpdated
              ? `LAST UPDATED: ${lastUpdated.toLocaleTimeString()}`
              : ""}
          </span>
          <NeonButton
            onClick={fetchLeaderboard}
            color="#00e5ff"
            size="sm"
          >
            ↻ REFRESH
          </NeonButton>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <span className="font-mono text-[9px] text-gray-800 tracking-wider">
            AUTO-REFRESHES EVERY 10 SECONDS • RANKED BY ACCURACY &amp; SPEED
          </span>
        </div>
      </div>
    </main>
  );
}
