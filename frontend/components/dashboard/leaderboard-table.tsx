import { leaderboard } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function LeaderboardTable({
  entries = leaderboard,
  title = "Top performing students",
  subtitle = "Leaderboard",
}: {
  entries?: Array<{ rank: number; student: string; score: number; className: string }>;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="panel overflow-hidden">
      <div className="border-b border-slate-100 px-6 py-5">
        <p className="text-sm text-steel">{subtitle}</p>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-steel">
            <tr>
              <th className="px-6 py-4 font-medium">Rank</th>
              <th className="px-6 py-4 font-medium">Student</th>
              <th className="px-6 py-4 font-medium">Class</th>
              <th className="px-6 py-4 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.rank} className="border-t border-slate-100">
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-full font-semibold",
                      entry.rank === 1 && "bg-amber-100 text-amber-700",
                      entry.rank === 2 && "bg-slate-200 text-slate-700",
                      entry.rank === 3 && "bg-rose-100 text-rose-700",
                      entry.rank > 3 && "bg-slate-100 text-steel"
                    )}
                  >
                    {entry.rank}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">{entry.student}</td>
                <td className="px-6 py-4 text-steel">{entry.className}</td>
                <td className="px-6 py-4 font-semibold">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
