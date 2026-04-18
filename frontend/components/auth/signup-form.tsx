"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { loginRequest, signupRequest } from "@/lib/auth";
import { PasswordStrength } from "@/components/auth/password-strength";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAuthStore } from "@/store/auth-store";

export function SignupForm() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "teacher" as "admin" | "teacher",
    adminSecret: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await signupRequest(form);
      const loginResult = await loginRequest({
        email: form.email,
        password: form.password,
        rememberMe: true,
      });
      setAuth({ role: loginResult.role, name: loginResult.user_name });
      setSuccess("Account created successfully. Redirecting to your class workspace...");
      window.location.href = "/classes";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account");
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
      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium dark:text-white">Name</label>
          <Input
            placeholder="Anita Sharma"
            value={form.name}
            onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))}
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium dark:text-white">Role</label>
          <Select
            value={form.role}
            onChange={(event) => setForm((state) => ({ ...state, role: event.target.value as "admin" | "teacher" }))}
          >
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </Select>
        </div>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium dark:text-white">Email</label>
        <Input
          type="email"
          placeholder="teacher@school.edu"
          value={form.email}
          onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium dark:text-white">Password</label>
        <Input
          type="password"
          placeholder="Create a secure password"
          value={form.password}
          onChange={(event) => setForm((state) => ({ ...state, password: event.target.value }))}
        />
        <PasswordStrength password={form.password} />
      </div>
      {form.role === "admin" && (
        <div className="grid gap-2">
          <label className="text-sm font-medium dark:text-white">Admin secret key</label>
          <Input
            type="password"
            placeholder="Enter organization secret"
            value={form.adminSecret}
            onChange={(event) => setForm((state) => ({ ...state, adminSecret: event.target.value }))}
          />
        </div>
      )}
      {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:bg-rose-500/10">{error}</p>}
      {success && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-500/10">{success}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </Button>
      <p className="text-center text-sm text-steel dark:text-slate-400">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-accent">
          Sign in
        </Link>
      </p>
    </motion.form>
  );
}
