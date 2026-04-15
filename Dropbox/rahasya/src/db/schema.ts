import {
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  playerName: text("player_name").notNull(),
  selectedCriminal: text("selected_criminal").notNull(),
  reason: text("reason").notNull(),
  isCorrect: boolean("is_correct").notNull().default(false),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  sessionId: text("session_id").notNull().unique(),
});

export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
