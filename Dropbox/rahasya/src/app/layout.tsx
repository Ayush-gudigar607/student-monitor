import type { Metadata } from "next";
import { LenisProvider } from "@/components/providers/LenisProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahasya: The Final Suspect | Interactive Mystery Game",
  description:
    "An immersive anime-themed detective experience. Analyze clues, investigate suspects, and identify the real criminal in Neo-Tokyo.",
  keywords: [
    "mystery game",
    "detective",
    "anime",
    "interactive",
    "rahasya",
    "suspect",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#e0e0e0]">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
