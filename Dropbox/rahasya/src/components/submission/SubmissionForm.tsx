"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlitchEffect } from "@/components/ui/GlitchEffect";
import { getSessionId, markSubmitted, hasSubmitted } from "@/lib/utils";

interface SubmissionFormProps {
  suspects: Array<{
    id: number;
    name: string;
    alias: string;
    color: string;
  }>;
}

type SubmissionState = "form" | "processing" | "correct" | "incorrect" | "already_submitted" | "error";

export function SubmissionForm({ suspects }: SubmissionFormProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [reason, setReason] = useState("");
  const [state, setState] = useState<SubmissionState>("form");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (hasSubmitted()) {
      setState("already_submitted");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId || !playerName.trim() || !reason.trim()) return;

    setState("processing");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: playerName.trim(),
          selectedCriminal: suspects.find((s) => s.id === selectedId)?.name || "",
          reason: reason.trim(),
          sessionId: getSessionId(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setState("already_submitted");
        } else {
          setErrorMsg(data.error || "Unknown error");
          setState("error");
        }
        return;
      }

      markSubmitted();

      // Dramatic reveal delay
      await new Promise((resolve) => setTimeout(resolve, 2500));

      setState(data.isCorrect ? "correct" : "incorrect");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  };

  const selectedSuspect = suspects.find((s) => s.id === selectedId);

  // Already submitted
  if (state === "already_submitted") {
    return (
      <motion.div
        className="text-center space-y-4 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="font-orbitron text-2xl text-[#7c4dff]">
          CASE FILE SEALED
        </div>
        <p className="font-rajdhani text-gray-400 text-lg">
          You have already submitted your accusation. Each investigator gets only one shot.
        </p>
        <NeonButton
          onClick={() => (window.location.href = "/leaderboard")}
          color="#00e5ff"
        >
          VIEW LEADERBOARD
        </NeonButton>
      </motion.div>
    );
  }

  // Processing animation
  if (state === "processing") {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-20 space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <GlitchEffect>
          <div
            className="font-orbitron text-2xl md:text-3xl tracking-widest"
            style={{
              color: "#ff1744",
              textShadow: "0 0 20px #ff174480",
            }}
          >
            ANALYZING...
          </div>
        </GlitchEffect>
        <div className="w-64 h-1 bg-[#1a1a2a] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#7c4dff] to-[#ff1744]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </div>
        <div className="font-mono text-xs text-gray-600 tracking-wider animate-pulse">
          CROSS-REFERENCING EVIDENCE DATABASE...
        </div>
      </motion.div>
    );
  }

  // Result: Correct
  if (state === "correct") {
    return (
      <motion.div
        className="text-center space-y-6 py-20 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 10 }}
      >
        {/* Confetti-like particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ["#ffd740", "#ff1744", "#7c4dff", "#00e5ff"][i % 4],
              left: `${50 + (Math.random() - 0.5) * 80}%`,
              top: `${50 + (Math.random() - 0.5) * 80}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: (Math.random() - 0.5) * 300,
              y: (Math.random() - 0.5) * 300,
            }}
            transition={{
              duration: 2,
              delay: i * 0.05,
              ease: "easeOut",
            }}
          />
        ))}

        <motion.div
          className="font-orbitron text-5xl md:text-7xl font-bold"
          style={{
            color: "#ffd740",
            textShadow:
              "0 0 30px #ffd74080, 0 0 60px #ffd74040, 0 0 100px #ffd74020",
          }}
          animate={{
            textShadow: [
              "0 0 30px #ffd74080, 0 0 60px #ffd74040",
              "0 0 50px #ffd740a0, 0 0 100px #ffd74060",
              "0 0 30px #ffd74080, 0 0 60px #ffd74040",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          CASE SOLVED
        </motion.div>
        <p className="font-rajdhani text-xl text-gray-300">
          Brilliant work, detective. You identified the criminal correctly.
        </p>
        <div className="font-mono text-sm text-[#ffd740] tracking-wider">
          ★ YOUR NAME HAS BEEN RECORDED ON THE LEADERBOARD ★
        </div>
        <NeonButton
          onClick={() => (window.location.href = "/leaderboard")}
          color="#ffd740"
          size="lg"
        >
          VIEW LEADERBOARD
        </NeonButton>
      </motion.div>
    );
  }

  // Result: Incorrect
  if (state === "incorrect") {
    return (
      <motion.div
        className="text-center space-y-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <GlitchEffect active>
          <div
            className="font-orbitron text-4xl md:text-6xl font-bold"
            style={{
              color: "#ff1744",
              textShadow: "0 0 30px #ff174480, 0 0 60px #ff174440",
            }}
          >
            WRONG SUSPECT
          </div>
        </GlitchEffect>
        <p className="font-rajdhani text-xl text-gray-400 mt-4">
          The real criminal remains at large. Your submission has been recorded.
        </p>
        <NeonButton
          onClick={() => (window.location.href = "/leaderboard")}
          color="#ff1744"
        >
          VIEW LEADERBOARD
        </NeonButton>
      </motion.div>
    );
  }

  // Error state
  if (state === "error") {
    return (
      <motion.div
        className="text-center space-y-4 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="font-orbitron text-2xl text-[#ff1744]">
          SYSTEM ERROR
        </div>
        <p className="font-rajdhani text-gray-400">{errorMsg}</p>
        <NeonButton onClick={() => setState("form")} color="#00e5ff">
          TRY AGAIN
        </NeonButton>
      </motion.div>
    );
  }

  // Form
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Player Name */}
      <div className="space-y-2">
        <label className="font-mono text-xs text-gray-500 tracking-[0.2em]">
          INVESTIGATOR NAME
        </label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name..."
          required
          maxLength={50}
          className="w-full bg-[#0e0e14] border border-[#ffffff15] rounded-sm px-4 py-3 font-rajdhani text-gray-200 placeholder-gray-700 focus:outline-none focus:border-[#7c4dff] transition-colors"
          style={{
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      {/* Suspect Selection */}
      <div className="space-y-3">
        <label className="font-mono text-xs text-gray-500 tracking-[0.2em]">
          SELECT THE CRIMINAL
        </label>
        <div className="grid grid-cols-1 gap-3">
          <AnimatePresence>
            {suspects.map((suspect) => (
              <motion.button
                key={suspect.id}
                type="button"
                onClick={() => setSelectedId(suspect.id)}
                className={`text-left px-4 py-3 rounded-sm border transition-all cursor-pointer ${
                  selectedId === suspect.id
                    ? "border-opacity-100"
                    : "border-opacity-20 hover:border-opacity-40"
                }`}
                style={{
                  borderColor: selectedId === suspect.id ? suspect.color : "#ffffff20",
                  background:
                    selectedId === suspect.id
                      ? `linear-gradient(135deg, ${suspect.color}15, transparent)`
                      : "#0e0e14",
                  boxShadow:
                    selectedId === suspect.id
                      ? `0 0 20px ${suspect.color}20`
                      : "none",
                }}
                whileHover={{ x: 4 }}
                layout
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-orbitron text-xs font-bold shrink-0"
                    style={{
                      border: `1px solid ${suspect.color}60`,
                      color: suspect.color,
                    }}
                  >
                    {suspect.id}
                  </div>
                  <div>
                    <span
                      className="font-orbitron text-sm"
                      style={{
                        color:
                          selectedId === suspect.id
                            ? suspect.color
                            : "#888",
                      }}
                    >
                      {suspect.name}
                    </span>
                    <span className="font-mono text-xs text-gray-600 ml-2">
                      {suspect.alias}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Reason */}
      <div className="space-y-2">
        <label className="font-mono text-xs text-gray-500 tracking-[0.2em]">
          YOUR REASONING
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Explain why you believe this suspect is the criminal..."
          required
          maxLength={500}
          rows={4}
          className="w-full bg-[#0e0e14] border border-[#ffffff15] rounded-sm px-4 py-3 font-rajdhani text-gray-200 placeholder-gray-700 focus:outline-none focus:border-[#7c4dff] transition-colors resize-none"
          style={{
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
          }}
        />
        <div className="text-right font-mono text-[10px] text-gray-700">
          {reason.length}/500
        </div>
      </div>

      {/* Selected suspect summary */}
      {selectedSuspect && (
        <motion.div
          className="p-4 rounded-sm border text-center"
          style={{
            borderColor: `${selectedSuspect.color}40`,
            background: `linear-gradient(135deg, ${selectedSuspect.color}08, transparent)`,
          }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <span className="font-mono text-xs text-gray-500">
            YOUR ACCUSATION:
          </span>
          <div
            className="font-orbitron text-lg font-bold mt-1"
            style={{ color: selectedSuspect.color }}
          >
            {selectedSuspect.name} — &quot;{selectedSuspect.alias}&quot;
          </div>
        </motion.div>
      )}

      {/* Submit */}
      <div className="text-center pt-4">
        <NeonButton
          type="submit"
          color="#ff1744"
          size="lg"
          disabled={!selectedId || !playerName.trim() || !reason.trim()}
        >
          ⚡ SUBMIT FINAL ACCUSATION
        </NeonButton>
        <p className="font-mono text-[10px] text-gray-700 mt-3 tracking-wider">
          WARNING: YOU CAN ONLY SUBMIT ONCE
        </p>
      </div>
    </motion.form>
  );
}
