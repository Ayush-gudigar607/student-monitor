import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { submissions } from "@/db/schema";
import { desc, asc } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch all submissions, ordered by:
    // 1. Correct answers first
    // 2. Then by submission time (earliest first)
    const allSubmissions = await db
      .select({
        id: submissions.id,
        playerName: submissions.playerName,
        selectedCriminal: submissions.selectedCriminal,
        reason: submissions.reason,
        isCorrect: submissions.isCorrect,
        submittedAt: submissions.submittedAt,
      })
      .from(submissions)
      .orderBy(desc(submissions.isCorrect), asc(submissions.submittedAt));

    return NextResponse.json({
      entries: allSubmissions.map((s) => ({
        ...s,
        submittedAt: s.submittedAt?.toISOString() || new Date().toISOString(),
      })),
    });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { error: "Internal server error.", entries: [] },
      { status: 500 }
    );
  }
}
