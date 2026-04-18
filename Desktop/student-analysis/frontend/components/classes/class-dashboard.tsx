"use client";

import { Search, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";

import { PerformanceLineChart } from "@/components/charts/performance-line-chart";
import { SubjectBarChart } from "@/components/charts/subject-bar-chart";
import { LeaderboardTable } from "@/components/dashboard/leaderboard-table";
import { MetricCard } from "@/components/dashboard/metric-card";

type Props = {
  analytics: {
    class_id: number;
    class_name: string;
    total_students: number;
    class_average: number;
    top_performer: string;
    weak_subject: string;
    weak_students: Array<{ student_name: string; subject: string; average_score: number }>;
    leaderboard: Array<{ rank: number; student_name: string; average_score: number }>;
    subject_performance: Array<{ subject: string; value: number }>;
    trend: Array<{ period: string; average_score: number }>;
  };
  students: Array<{ id: number; name: string; roll_no: string; average_score: number; rank: number }>;
};

export function ClassDashboard({ analytics, students }: Props) {
  const [search, setSearch] = useState("");

  const filteredStudents = useMemo(
    () =>
      students.filter((student) => {
        const query = search.toLowerCase();
        return student.name.toLowerCase().includes(query) || student.roll_no.toLowerCase().includes(query);
      }),
    [search, students]
  );

  const metrics = [
    { title: "Total Students", value: String(analytics.total_students), change: `Class ${analytics.class_name}` },
    { title: "Class Average", value: `${analytics.class_average}%`, change: "Performance snapshot" },
    { title: "Top Performer", value: analytics.top_performer, change: "Leaderboard leader" },
    { title: "Weak Subject", value: analytics.weak_subject, change: "Requires intervention" },
  ];

  return (
    <div className="space-y-4">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-white/10">
            <div>
              <p className="text-sm text-steel dark:text-slate-400">Student Table</p>
              <h3 className="text-lg font-semibold dark:text-white">Search, rank, and review class roster</h3>
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel dark:text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name or roll no"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 py-3 pl-10 pr-4 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-steel dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Rank</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Roll No</th>
                  <th className="px-6 py-4 font-medium">Average Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-t border-slate-100 dark:border-white/10">
                    <td className="px-6 py-4 dark:text-white">{student.rank}</td>
                    <td className="px-6 py-4 font-medium dark:text-white">{student.name}</td>
                    <td className="px-6 py-4 text-steel dark:text-slate-300">{student.roll_no}</td>
                    <td className="px-6 py-4 text-steel dark:text-slate-300">{student.average_score}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-rose-50 p-3 text-rose-500 dark:bg-rose-500/10">
              <TriangleAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-steel dark:text-slate-400">Weak Student Detection</p>
              <h3 className="text-lg font-semibold dark:text-white">Students below 40%</h3>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {analytics.weak_students.length ? (
              analytics.weak_students.map((item) => (
                <div key={`${item.student_name}-${item.subject}`} className="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
                  <p className="font-medium dark:text-white">{item.student_name}</p>
                  <p className="mt-1 text-sm text-steel dark:text-slate-400">
                    {item.subject} • {item.average_score}%
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-steel dark:bg-white/5 dark:text-slate-400">
                No students are currently below the configured threshold.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <SubjectBarChart data={analytics.subject_performance} title="Subject-wise performance" subtitle="Average by subject for the selected class" />
        <PerformanceLineChart data={analytics.trend.map((item) => ({ month: item.period, score: item.average_score }))} title="Performance over time" subtitle="Average marks trend for the selected class" />
      </section>

      <LeaderboardTable
        title="Class Leaderboard"
        subtitle="Top 3 are visually highlighted for faster review"
        entries={analytics.leaderboard.map((item) => ({
          rank: item.rank,
          student: item.student_name,
          score: item.average_score,
          className: analytics.class_name,
        }))}
      />
    </div>
  );
}
