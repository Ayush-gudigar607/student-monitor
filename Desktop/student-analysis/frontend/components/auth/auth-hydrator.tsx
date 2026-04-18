"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/auth-store";

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`))
    ?.split("=")[1];
}

export function AuthHydrator() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const role = readCookie("user_role");
    const name = readCookie("user_name");

    if (role === "admin" || role === "teacher") {
      setAuth({ role, name: decodeURIComponent(name ?? "User") });
      return;
    }

    clearAuth();
  }, [clearAuth, setAuth]);

  return null;
}
