import { GraduationCap, LayoutList, ShieldCheck, UserRoundPlus } from "lucide-react";

import { LeaderboardTable } from "@/components/dashboard/leaderboard-table";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Button } from "@/components/ui/button";

const metrics = [
  { title: "Total Students", value: "1,248", change: "+32 this term" },
  { title: "Average Score", value: "78.4%", change: "+2.1%" },
  { title: "Teachers Assigned", value: "24", change: "3 pending mappings" },
  { title: "Protected Access", value: "100%", change: "JWT active" },
];

const students = [
  { name: "Aarav Sharma", className: "10-A", rollNo: "10A-01", subjects: "Math, Science", contact: "9876543210" },
  { name: "Diya Patel", className: "10-A", rollNo: "10A-02", subjects: "English, Science", contact: "9876543211" },
  { name: "Meera Nair", className: "10-B", rollNo: "10B-01", subjects: "Math, CS", contact: "9876543213" },
];

export function AdminDashboard() {
  return (
    <div className="space-y-4">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="panel p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 dark:bg-white/10">
              <UserRoundPlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-steel dark:text-slate-400">Add Student</p>
              <h3 className="text-lg font-semibold dark:text-white">Create a new student record</h3>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Student name" />
            <input className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Class" />
            <input className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Roll number" />
            <input className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Subjects" />
            <input className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white md:col-span-2" placeholder="Contact details" />
          </div>
          <Button className="mt-6 w-full md:w-auto">Save Student</Button>
        </div>

        <div className="panel p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-50 p-3 text-accent dark:bg-accent/10">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-steel dark:text-slate-400">Assign Teacher</p>
              <h3 className="text-lg font-semibold dark:text-white">Map teachers to classes</h3>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Teacher name" />
            <input className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Class and section" />
          </div>
          <Button variant="secondary" className="mt-6">
            Assign Class
          </Button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-white/10">
            <div>
              <p className="text-sm text-steel dark:text-slate-400">Student Registry</p>
              <h3 className="text-lg font-semibold dark:text-white">Search, filter, and edit students</h3>
            </div>
            <LayoutList className="h-5 w-5 text-steel dark:text-slate-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-steel dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Student</th>
                  <th className="px-6 py-4 font-medium">Class</th>
                  <th className="px-6 py-4 font-medium">Roll</th>
                  <th className="px-6 py-4 font-medium">Subjects</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.rollNo} className="border-t border-slate-100 dark:border-white/10">
                    <td className="px-6 py-4 font-medium dark:text-white">{student.name}</td>
                    <td className="px-6 py-4 text-steel dark:text-slate-300">{student.className}</td>
                    <td className="px-6 py-4 text-steel dark:text-slate-300">{student.rollNo}</td>
                    <td className="px-6 py-4 text-steel dark:text-slate-300">{student.subjects}</td>
                    <td className="px-6 py-4 text-steel dark:text-slate-300">{student.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-4">
          <div className="panel p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-50 p-3 text-amberGlow dark:bg-amber-400/10">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-steel dark:text-slate-400">Role Controls</p>
                <h3 className="text-lg font-semibold dark:text-white">Admin permissions</h3>
              </div>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-steel dark:text-slate-300">
              <li>Full student CRUD access</li>
              <li>Teacher-class assignment management</li>
              <li>Subject administration and leaderboard visibility</li>
            </ul>
          </div>
          <LeaderboardTable />
        </div>
      </section>
    </div>
  );
}
