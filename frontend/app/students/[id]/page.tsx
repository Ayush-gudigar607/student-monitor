import { PerformanceLineChart } from "@/components/charts/performance-line-chart";
import { SubjectBarChart } from "@/components/charts/subject-bar-chart";
import { StudentProfileCard } from "@/components/students/student-profile-card";

export default function StudentProfilePage() {
  return (
    <div className="space-y-4">
      <StudentProfileCard name="Aarav Sharma" studentClass="10-A" predictedScore="88.6%" />
      <div className="grid gap-4 xl:grid-cols-2">
        <PerformanceLineChart />
        <SubjectBarChart />
      </div>
      <div className="panel p-6">
        <p className="text-sm text-steel">ML Insights</p>
        <h3 className="text-lg font-semibold">Actionable recommendations</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-sm text-steel">Strength</p>
            <p className="mt-2 font-semibold">Strong conceptual retention in Science</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-4">
            <p className="text-sm text-steel">Focus Area</p>
            <p className="mt-2 font-semibold">Math problem-solving speed needs attention</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-4">
            <p className="text-sm text-steel">Recommendation</p>
            <p className="mt-2 font-semibold">Assign 3 targeted algebra tests over the next 2 weeks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
