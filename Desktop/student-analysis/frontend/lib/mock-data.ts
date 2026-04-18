import type { ClassificationDatum, LeaderboardEntry, MetricCard, SubjectDatum, TrendDatum } from "@/lib/types";

export const dashboardMetrics: MetricCard[] = [
  { title: "Total Students", value: "1,248", change: "+4.2%" },
  { title: "Average Score", value: "78.4%", change: "+2.1%" },
  { title: "Top Performer", value: "Meera Nair", change: "94.1 avg" },
  { title: "Weak Subject", value: "Mathematics", change: "61.2 avg" },
];

export const performanceTrend: TrendDatum[] = [
  { month: "Jan", score: 68 },
  { month: "Feb", score: 72 },
  { month: "Mar", score: 75 },
  { month: "Apr", score: 79 },
  { month: "May", score: 82 },
  { month: "Jun", score: 84 },
];

export const subjectComparison: SubjectDatum[] = [
  { subject: "Math", value: 61 },
  { subject: "Science", value: 74 },
  { subject: "English", value: 82 },
  { subject: "History", value: 77 },
  { subject: "CS", value: 86 },
];

export const classificationMix: ClassificationDatum[] = [
  { name: "Excellent", value: 38 },
  { name: "Average", value: 44 },
  { name: "Needs Improvement", value: 18 },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, student: "Meera Nair", score: 94.1, className: "10-B" },
  { rank: 2, student: "Aarav Sharma", score: 86.0, className: "10-A" },
  { rank: 3, student: "Diya Patel", score: 78.7, className: "10-A" },
  { rank: 4, student: "Rohan Gupta", score: 70.0, className: "10-B" },
  { rank: 5, student: "Kabir Singh", score: 59.7, className: "10-A" },
];
