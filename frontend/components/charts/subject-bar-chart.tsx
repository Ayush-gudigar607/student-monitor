"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { subjectComparison } from "@/lib/mock-data";

export function SubjectBarChart({
  data = subjectComparison,
  title = "Class average by subject",
  subtitle = "Subject Comparison",
}: {
  data?: Array<{ subject: string; value: number }>;
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
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="subject" stroke="#64748B" />
          <YAxis stroke="#64748B" />
          <Tooltip />
          <Bar dataKey="value" fill="#F59E0B" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
