import { ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  value: string;
  change: string;
};

export function MetricCard({ title, value, change }: Props) {
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-steel">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-2 text-accent">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-4 text-sm text-accent">{change}</p>
    </div>
  );
}
