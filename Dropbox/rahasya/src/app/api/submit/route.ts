import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { submissions } from "@/db/schema";
import { CORRECT_CRIMINAL_NAME } from "@/lib/gameData";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { playerName, selectedCriminal, reason, sessionId } = body;

    // Validate
    if (!playerName?.trim() || !selectedCriminal?.trim() || !reason?.trim() || !sessionId?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (playerName.length > 50 || reason.length > 500) {
      return NextResponse.json(
        { error: "Input too long." },
        { status: 400 }
      );
    }

    // Check for existing submission with this session
    const existing = await db
      .select()
      .from(submissions)
      .where(eq(submissions.sessionId, sessionId))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "You have already submitted your accusation." },
        { status: 409 }
      );
    }

    // Determine correctness
    const isCorrect =
      selectedCriminal.trim().toLowerCase() ===
      CORRECT_CRIMINAL_NAME.toLowerCase();

    // Insert
    await db.insert(submissions).values({
      playerName: playerName.trim(),
      selectedCriminal: selectedCriminal.trim(),
      reason: reason.trim(),
      isCorrect,
      sessionId: sessionId.trim(),
    });

    return NextResponse.json({ success: true, isCorrect });
  } catch (error: unknown) {
    console.error("Submission error:", error);

    // Handle unique constraint violation
    if (
      error instanceof Error &&
      error.message?.includes("unique")
    ) {
      return NextResponse.json(
        { error: "You have already submitted your accusation." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
