import { LeaderboardTable } from "@/components/dashboard/leaderboard-table";

export default function LeaderboardPage() {
  return (
    <div className="space-y-4">
      <div className="panel p-6">
        <p className="text-sm text-steel">Leaderboard</p>
        <h2 className="text-2xl font-semibold">Ranked student performance</h2>
        <p className="mt-2 max-w-2xl text-sm text-steel">
          Highlight top performers, identify middle-band students, and spot learners who need intervention.
        </p>
      </div>
      <LeaderboardTable />
    </div>
  );
}
