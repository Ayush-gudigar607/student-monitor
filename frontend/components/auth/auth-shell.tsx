import { BookOpenCheck, ShieldCheck, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cloud px-4 py-8 dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.16),transparent_24%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden rounded-[2rem] border border-white/50 bg-slateInk px-10 py-10 text-white shadow-2xl lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4" />
              Student Pulse Auth Suite
            </div>
            <div className="space-y-4">
              <h1 className="max-w-lg text-5xl font-semibold leading-tight">
                Secure school analytics for admins and teachers.
              </h1>
              <p className="max-w-xl text-base text-white/70">
                Role-aware workflows, premium dashboards, and secure access designed for real school operations.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <ShieldCheck className="h-5 w-5" />
              <p className="mt-3 font-medium">JWT + bcrypt security</p>
              <p className="mt-1 text-sm text-white/65">Secure authentication and protected routes for every role.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <BookOpenCheck className="h-5 w-5" />
              <p className="mt-3 font-medium">Class-aware access</p>
              <p className="mt-1 text-sm text-white/65">Teachers only see the students and marks they are assigned.</p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-xl">
            <div className="mb-6 flex justify-end">
              <ThemeToggle />
            </div>
            <div className="panel rounded-[2rem] p-8 dark:border-white/10 dark:bg-white/5">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.3em] text-steel dark:text-slate-400">Welcome</p>
                <h2 className="mt-3 text-3xl font-semibold dark:text-white">{title}</h2>
                <p className="mt-2 text-sm text-steel dark:text-slate-400">{subtitle}</p>
              </div>
              {children}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
