"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { loginRequest } from "@/lib/auth";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function LoginForm() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "admin",
    rememberMe: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await loginRequest({
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe,
      });

      if (result.role !== form.role) {
        throw new Error(`This account is registered as ${result.role}, not ${form.role}.`);
      }

      setAuth({ role: result.role, name: result.user_name });
      window.location.href = "/classes";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <label className="text-sm font-medium dark:text-white">Email</label>
        <Input
          type="email"
          placeholder="admin@school.edu"
          value={form.email}
          onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
          error={error}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium dark:text-white">Password</label>
        <Input
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(event) => setForm((state) => ({ ...state, password: event.target.value }))}
          error={error}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium dark:text-white">Login as</label>
        <Select
          value={form.role}
          onChange={(event) => setForm((state) => ({ ...state, role: event.target.value }))}
        >
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
        </Select>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 px-4 py-3 dark:border-white/10">
        <label className="flex items-center gap-3 text-sm text-steel dark:text-slate-300">
          <input
            type="checkbox"
            checked={form.rememberMe}
            onChange={(event) => setForm((state) => ({ ...state, rememberMe: event.target.checked }))}
          />
          Remember me
        </label>
        <span className="text-xs text-steel dark:text-slate-400">JWT session</span>
      </div>
      {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:bg-rose-500/10">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      <p className="text-center text-sm text-steel dark:text-slate-400">
        Need an account?{" "}
        <Link href="/signup" className="font-medium text-accent">
          Create one
        </Link>
      </p>
    </motion.form>
  );
}
