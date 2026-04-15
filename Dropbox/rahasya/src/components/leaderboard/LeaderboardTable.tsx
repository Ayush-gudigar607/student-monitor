"use client";

import { motion } from "framer-motion";
import { formatTimestamp } from "@/lib/utils";

interface LeaderboardEntry {
  id: number;
  playerName: string;
  selectedCriminal: string;
  reason: string;
  isCorrect: boolean;
  submittedAt: string;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

const RANK_COLORS: Record<number, { bg: string; text: string; glow: string }> = {
  1: { bg: "#ffd74020", text: "#ffd740", glow: "#ffd74040" },
  2: { bg: "#c0c0c020", text: "#c0c0c0", glow: "#c0c0c040" },
  3: { bg: "#cd7f3220", text: "#cd7f32", glow: "#cd7f3240" },
};

const RANK_BADGES = ["👑", "🥈", "🥉"];

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="font-orbitron text-xl text-gray-600">
          NO SUBMISSIONS YET
        </div>
        <p className="font-rajdhani text-gray-700 mt-2">
          Be the first to crack the case.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Desktop table */}
      <table className="w-full hidden md:table">
        <thead>
          <tr className="border-b border-[#ffffff10]">
            <th className="font-mono text-xs text-gray-600 tracking-[0.2em] text-left py-3 px-4 w-16">
              RANK
            </th>
            <th className="font-mono text-xs text-gray-600 tracking-[0.2em] text-left py-3 px-4">
              INVESTIGATOR
            </th>
            <th className="font-mono text-xs text-gray-600 tracking-[0.2em] text-left py-3 px-4">
              ACCUSED
            </th>
            <th className="font-mono text-xs text-gray-600 tracking-[0.2em] text-left py-3 px-4">
              REASONING
            </th>
            <th className="font-mono text-xs text-gray-600 tracking-[0.2em] text-center py-3 px-4 w-24">
              RESULT
            </th>
            <th className="font-mono text-xs text-gray-600 tracking-[0.2em] text-right py-3 px-4 w-40">
              TIMESTAMP
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            const rank = i + 1;
            const rankStyle = RANK_COLORS[rank];

            return (
              <motion.tr
                key={entry.id}
                className="border-b border-[#ffffff06] hover:bg-[#ffffff05] transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={
                  rankStyle
                    ? {
                        background: rankStyle.bg,
                        boxShadow: `inset 0 0 30px ${rankStyle.glow}`,
                      }
                    : undefined
                }
              >
                <td className="py-4 px-4">
                  <span
                    className="font-orbitron text-sm font-bold"
                    style={{ color: rankStyle?.text || "#666" }}
                  >
                    {rank <= 3 ? RANK_BADGES[rank - 1] : `#${rank}`}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className="font-rajdhani text-base font-semibold"
                    style={{ color: rankStyle?.text || "#ccc" }}
                  >
                    {entry.playerName}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-rajdhani text-sm text-gray-400">
                    {entry.selectedCriminal}
                  </span>
                </td>
                <td className="py-4 px-4 max-w-xs">
                  <span className="font-rajdhani text-sm text-gray-500 line-clamp-2">
                    {entry.reason}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  {entry.isCorrect ? (
                    <span
                      className="font-mono text-xs px-3 py-1 rounded-full"
                      style={{
                        background: "#ffd74020",
                        color: "#ffd740",
                        border: "1px solid #ffd74040",
                      }}
                    >
                      ✓ CORRECT
                    </span>
                  ) : (
                    <span
                      className="font-mono text-xs px-3 py-1 rounded-full"
                      style={{
                        background: "#ff174420",
                        color: "#ff1744",
                        border: "1px solid #ff174440",
                      }}
                    >
                      ✗ WRONG
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="font-mono text-xs text-gray-600">
                    {formatTimestamp(entry.submittedAt)}
                  </span>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {entries.map((entry, i) => {
          const rank = i + 1;
          const rankStyle = RANK_COLORS[rank];

          return (
            <motion.div
              key={entry.id}
              className="p-4 rounded-sm border border-[#ffffff10]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={
                rankStyle
                  ? {
                      background: rankStyle.bg,
                      borderColor: `${rankStyle.text}30`,
                    }
                  : { background: "#0e0e14" }
              }
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className="font-orbitron text-lg font-bold"
                    style={{ color: rankStyle?.text || "#666" }}
                  >
                    {rank <= 3 ? RANK_BADGES[rank - 1] : `#${rank}`}
                  </span>
                  <span
                    className="font-rajdhani text-base font-semibold"
                    style={{ color: rankStyle?.text || "#ccc" }}
                  >
                    {entry.playerName}
                  </span>
                </div>
                {entry.isCorrect ? (
                  <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-[#ffd74020] text-[#ffd740] border border-[#ffd74040]">
                    ✓
                  </span>
                ) : (
                  <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-[#ff174420] text-[#ff1744] border border-[#ff174440]">
                    ✗
                  </span>
                )}
              </div>
              <div className="font-rajdhani text-sm text-gray-400">
                Accused: {entry.selectedCriminal}
              </div>
              <div className="font-rajdhani text-xs text-gray-600 mt-1 line-clamp-2">
                {entry.reason}
              </div>
              <div className="font-mono text-[10px] text-gray-700 mt-2">
                {formatTimestamp(entry.submittedAt)}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
