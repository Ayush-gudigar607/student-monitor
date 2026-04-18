"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { classificationMix } from "@/lib/mock-data";

const COLORS = ["#0F766E", "#F59E0B", "#FB7185"];

export function ClassificationPieChart() {
  return (
    <div className="panel h-[340px] p-6">
      <div className="mb-6">
        <p className="text-sm text-steel">Classification Mix</p>
        <h3 className="text-lg font-semibold">ML-based student categories</h3>
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <PieChart>
          <Pie data={classificationMix} dataKey="value" nameKey="name" innerRadius={70} outerRadius={108}>
            {classificationMix.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
