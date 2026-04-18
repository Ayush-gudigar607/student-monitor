const levels = [
  { label: "Very weak", color: "bg-rose-400" },
  { label: "Weak", color: "bg-orange-400" },
  { label: "Good", color: "bg-amber-400" },
  { label: "Strong", color: "bg-emerald-500" },
];

export function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9!@#$%^&*]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const current = levels[Math.max(0, score - 1)];

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-2">
        {levels.map((item, index) => (
          <div
            key={item.label}
            className={`h-2 rounded-full ${index < score ? item.color : "bg-slate-200 dark:bg-white/10"}`}
          />
        ))}
      </div>
      <p className="text-xs text-steel dark:text-slate-400">{current?.label ?? "Enter a password"}</p>
    </div>
  );
}
