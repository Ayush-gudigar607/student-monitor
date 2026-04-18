import { BookCheck, ClipboardPenLine, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PerformanceLineChart } from "@/components/charts/performance-line-chart";
import { SubjectBarChart } from "@/components/charts/subject-bar-chart";

const students = [
  { name: "Aarav Sharma", rollNo: "10A-01", subject: "Math", status: "Updated today" },
  { name: "Diya Patel", rollNo: "10A-02", subject: "Science", status: "Needs marks entry" },
  { name: "Kabir Singh", rollNo: "10A-03", subject: "English", status: "Needs support" },
];

export function TeacherDashboard() {
  return (
    <div className="space-y-4">
      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="panel p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-50 p-3 text-accent dark:bg-accent/10">
              <ClipboardPenLine className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-steel dark:text-slate-400">Add Marks</p>
              <h3 className="text-lg font-semibold dark:text-white">Update daily or monthly performance</h3>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <select className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
              <option>Select student</option>
            </select>
            <select className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
              <option>Select subject</option>
            </select>
            <input className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Marks" />
            <input className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Date" />
          </div>
          <Button className="mt-6">Save Marks</Button>
        </div>
        <div className="panel p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 dark:bg-white/10">
              <BookCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-steel dark:text-slate-400">Assigned Scope</p>
              <h3 className="text-lg font-semibold dark:text-white">Teacher access rules</h3>
            </div>
          </div>
          <ul className="mt-5 space-y-3 text-sm text-steel dark:text-slate-300">
            <li>Can update marks and attendance for assigned classes only</li>
            <li>Can view analytics and student list for assigned class</li>
            <li>Cannot delete students or access other classes</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <PerformanceLineChart />
        <SubjectBarChart />
      </section>

      <section className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-white/10">
          <div>
            <p className="text-sm text-steel dark:text-slate-400">Assigned Class</p>
            <h3 className="text-lg font-semibold dark:text-white">Student list for class 10-A</h3>
          </div>
          <Users className="h-5 w-5 text-steel dark:text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-steel dark:bg-white/5 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Roll</th>
                <th className="px-6 py-4 font-medium">Focus Subject</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.rollNo} className="border-t border-slate-100 dark:border-white/10">
                  <td className="px-6 py-4 font-medium dark:text-white">{student.name}</td>
                  <td className="px-6 py-4 text-steel dark:text-slate-300">{student.rollNo}</td>
                  <td className="px-6 py-4 text-steel dark:text-slate-300">{student.subject}</td>
                  <td className="px-6 py-4 text-steel dark:text-slate-300">{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
