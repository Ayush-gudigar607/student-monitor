"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, BookOpen, FolderKanban, GraduationCap, LayoutDashboard, LogOut, Menu, Shield, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const linksByRole = {
  admin: [
    { href: "/classes", label: "Classes", icon: FolderKanban },
    { href: "/dashboard/admin", label: "Admin Panel", icon: LayoutDashboard },
    { href: "/students/1", label: "Student Profile", icon: GraduationCap },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/subjects", label: "Subject Analysis", icon: BookOpen },
  ],
  teacher: [
    { href: "/classes", label: "Classes", icon: FolderKanban },
    { href: "/dashboard/teacher", label: "Teacher Panel", icon: LayoutDashboard },
    { href: "/students/1", label: "Student Profile", icon: GraduationCap },
    { href: "/subjects", label: "Class Analysis", icon: BookOpen },
  ],
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const role = useAuthStore((state) => state.role) ?? "admin";
  const name = useAuthStore((state) => state.name);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const links = linksByRole[role];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    clearAuth();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen p-4 md:p-6 dark:bg-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl gap-4">
        <aside
          className={cn(
            "panel hidden flex-col justify-between p-4 transition-all duration-300 md:flex dark:border-white/10 dark:bg-white/5",
            collapsed ? "w-24" : "w-72"
          )}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className={cn("overflow-hidden transition-all", collapsed && "w-0 opacity-0")}>
                <p className="text-xs uppercase tracking-[0.3em] text-steel dark:text-slate-400">Analytics</p>
                <h1 className="text-lg font-semibold dark:text-white">Student Pulse</h1>
              </div>
              <button
                onClick={() => setCollapsed((value) => !value)}
                className="rounded-2xl border border-slate-200 p-2 text-steel transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
                type="button"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
            <nav className="space-y-2">
              {links.map(({ href, label, icon: Icon }) => {
                const active = href === "/classes" ? pathname.startsWith("/classes") : pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition",
                      active
                        ? "bg-slateInk text-white dark:bg-white dark:text-slate-950"
                        : "text-steel hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {!collapsed && <span>{label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="space-y-3">
            <div className="rounded-3xl bg-slateInk p-4 text-white dark:bg-white dark:text-slate-950">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-2 dark:bg-slate-100">
                  {role === "admin" ? <Shield className="h-4 w-4" /> : <BarChart3 className="h-4 w-4" />}
                </div>
                {!collapsed && (
                  <div>
                    <p className="text-sm font-medium">{role === "admin" ? "Admin Access" : "Teacher Access"}</p>
                    <p className="text-xs text-white/70 dark:text-slate-500">
                      {name ? `Signed in as ${name}` : "Prediction engine active"}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 px-3 py-3 text-sm text-steel transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Log out</span>}
            </button>
          </div>
        </aside>

        <div className="flex-1 space-y-4">
          <header className="panel flex items-center justify-between p-4 dark:border-white/10 dark:bg-white/5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-steel dark:text-slate-400">Overview</p>
              <h2 className="text-xl font-semibold dark:text-white">Student Performance Analysis</h2>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden rounded-2xl border border-slate-200 px-4 py-2 text-sm text-steel md:block dark:border-white/10 dark:text-slate-300">
                {role === "admin" ? "Manage students, classes, teachers" : "Assigned class performance workspace"}
              </div>
              <div className="rounded-2xl bg-accent px-4 py-2 text-sm font-medium text-white">
                {role === "admin" ? "Admin" : "Teacher"}
              </div>
            </div>
          </header>
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
