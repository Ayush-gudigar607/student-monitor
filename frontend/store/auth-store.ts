"use client";

import { create } from "zustand";

type UserRole = "admin" | "teacher" | null;

type AuthState = {
  role: UserRole;
  name: string | null;
  setAuth: (payload: { role: Exclude<UserRole, null>; name: string }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  name: null,
  setAuth: ({ role, name }) => set({ role, name }),
  clearAuth: () => set({ role: null, name: null }),
}));
