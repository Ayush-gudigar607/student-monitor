import { BrainCircuit, TrendingUp, TriangleAlert } from "lucide-react";

type Props = {
  name: string;
  studentClass: string;
  predictedScore: string;
};

export function StudentProfileCard({ name, studentClass, predictedScore }: Props) {
  return (
    <div className="panel p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-steel">Student Profile</p>
          <h2 className="mt-2 text-2xl font-semibold">{name}</h2>
          <p className="text-sm text-steel">Class {studentClass} • Attendance 97% • Stable improvement</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <TrendingUp className="h-4 w-4 text-accent" />
            <p className="mt-3 text-sm text-steel">Strength</p>
            <p className="font-semibold">Science</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-4">
            <TriangleAlert className="h-4 w-4 text-amberGlow" />
            <p className="mt-3 text-sm text-steel">Weakness</p>
            <p className="font-semibold">Mathematics</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-4">
            <BrainCircuit className="h-4 w-4 text-slateInk" />
            <p className="mt-3 text-sm text-steel">Predicted Score</p>
            <p className="font-semibold">{predictedScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
