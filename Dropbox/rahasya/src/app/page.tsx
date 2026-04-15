"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { GlowText } from "@/components/ui/GlowText";
import { NeonButton } from "@/components/ui/NeonButton";
import { TypewriterText } from "@/components/ui/TypewriterText";

export default function LandingPage() {
  const router = useRouter();
  const titleRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.call(() => setShowContent(true), [], "+=0.5");
    tl.call(() => setShowSubtitle(true), [], "+=1.5");
    tl.call(() => setShowQR(true), [], "+=1");

    return () => {
      tl.kill();
    };
  }, []);

  // Floating kanji characters
  const kanjiList = ["秘", "密", "犯", "罪", "探", "偵", "真", "実"];

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Floating kanji */}
      {kanjiList.map((k, i) => (
        <motion.div
          key={i}
          className="absolute font-noto-jp text-4xl md:text-6xl pointer-events-none select-none"
          style={{
            color: "#7c4dff08",
            left: `${10 + (i * 12) % 80}%`,
            top: `${10 + ((i * 17) % 70)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {k}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 space-y-8 max-w-2xl">
        {/* Top classification bar */}
        {showContent && (
          <motion.div
            className="font-mono text-[10px] tracking-[0.5em] text-[#ff174480]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            ▼ CLASSIFIED — LEVEL 5 CLEARANCE REQUIRED ▼
          </motion.div>
        )}

        {/* Title */}
        {showContent && (
          <div ref={titleRef}>
            <GlowText
              as="h1"
              color="#ff1744"
              className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black tracking-wider"
              delay={0.3}
            >
              RAHASYA
            </GlowText>
          </div>
        )}

        {/* Subtitle */}
        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-rajdhani text-xl md:text-2xl text-gray-300 tracking-[0.3em]">
              <TypewriterText
                text="THE FINAL SUSPECT"
                speed={80}
                color="#e0e0e0"
                showCursor={false}
              />
            </div>
            <motion.div
              className="mt-4 mx-auto w-48 h-px"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, #ff1744, transparent)",
              }}
            />
          </motion.div>
        )}

        {/* Tagline */}
        {showSubtitle && (
          <motion.p
            className="font-rajdhani text-base md:text-lg text-gray-500 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            Five suspects. One truth. One chance. <br />
            <span className="text-[#7c4dff]">
              Can you identify the real criminal?
            </span>
          </motion.p>
        )}

        {/* CTA Button */}
        {showQR && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-8"
          >
            <NeonButton
              onClick={() => router.push("/game")}
              color="#ff1744"
              size="lg"
            >
              ▶ ENTER INVESTIGATION
            </NeonButton>

            {/* QR Code */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="font-mono text-[10px] text-gray-600 tracking-wider">
                OR SCAN TO JOIN
              </div>
              <div
                className="p-3 rounded-sm inline-block"
                style={{
                  background: "linear-gradient(135deg, #12121a, #0e0e14)",
                  border: "1px solid #ffffff10",
                  boxShadow: "0 0 30px #7c4dff10",
                }}
              >
                <QRCodeSVG
                  value={
                    typeof window !== "undefined"
                      ? `${window.location.origin}/game`
                      : "/game"
                  }
                  size={120}
                  bgColor="transparent"
                  fgColor="#7c4dff"
                  level="M"
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Bottom credits */}
        {showQR && (
          <motion.div
            className="font-mono text-[9px] text-gray-800 tracking-[0.3em] pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            TOKYO METROPOLITAN POLICE DEPT • CASE #2847 • CLASSIFIED
          </motion.div>
        )}
      </div>

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 z-10 space-y-1">
        <div className="w-8 h-px bg-[#ff174440]" />
        <div className="w-4 h-px bg-[#ff174420]" />
      </div>
      <div className="fixed top-4 right-4 z-10 space-y-1">
        <div className="w-8 h-px bg-[#ff174440] ml-auto" />
        <div className="w-4 h-px bg-[#ff174420] ml-auto" />
      </div>
      <div className="fixed bottom-4 left-4 z-10 space-y-1">
        <div className="w-4 h-px bg-[#7c4dff20]" />
        <div className="w-8 h-px bg-[#7c4dff40]" />
      </div>
      <div className="fixed bottom-4 right-4 z-10 space-y-1">
        <div className="w-4 h-px bg-[#7c4dff20] ml-auto" />
        <div className="w-8 h-px bg-[#7c4dff40] ml-auto" />
      </div>
    </main>
  );
}
