"use client";

import { usePathname } from "next/navigation";

import { AuthHydrator } from "@/components/auth/auth-hydrator";
import { AppShell } from "@/components/layout/app-shell";

const AUTH_ROUTES = ["/login", "/signup"];

export function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isAuthRoute) {
    return (
      <>
        <AuthHydrator />
        {children}
      </>
    );
  }

  return (
    <>
      <AuthHydrator />
      <AppShell>{children}</AppShell>
    </>
  );
}
