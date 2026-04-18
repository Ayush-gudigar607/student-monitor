export default function SubjectAnalysisPage() {
  const subjects = [
    { name: "Mathematics", average: 61, weakStudents: 18, indicator: "Critical" },
    { name: "Science", average: 74, weakStudents: 8, indicator: "Watch" },
    { name: "English", average: 82, weakStudents: 4, indicator: "Healthy" },
    { name: "History", average: 77, weakStudents: 6, indicator: "Stable" },
  ];

  return (
    <div className="space-y-4">
      <div className="panel p-6">
        <p className="text-sm text-steel">Subject Analysis</p>
        <h2 className="text-2xl font-semibold">Class-wide subject diagnostics</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {subjects.map((subject) => (
          <div key={subject.name} className="panel p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-steel">{subject.name}</p>
                <p className="mt-2 text-3xl font-semibold">{subject.average}%</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-steel">
                {subject.indicator}
              </span>
            </div>
            <div className="mt-6">
              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 rounded-full bg-accent" style={{ width: `${subject.average}%` }} />
              </div>
              <p className="mt-3 text-sm text-steel">{subject.weakStudents} students flagged for support</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
