"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { performanceTrend } from "@/lib/mock-data";

export function PerformanceLineChart({
  data = performanceTrend,
  title = "Score growth over time",
  subtitle = "Performance Trend",
}: {
  data?: Array<{ month: string; score: number }>;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="panel h-[340px] p-6">
      <div className="mb-6">
        <p className="text-sm text-steel">{subtitle}</p>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="month" stroke="#64748B" />
          <YAxis stroke="#64748B" />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#0F766E" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
