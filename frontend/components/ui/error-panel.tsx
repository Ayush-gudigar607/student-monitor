import Link from "next/link";

import { Button } from "@/components/ui/button";

export function ErrorPanel({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="panel mx-auto max-w-3xl p-8">
      <p className="text-xs uppercase tracking-[0.3em] text-steel dark:text-slate-400">Request Failed</p>
      <h2 className="mt-3 text-2xl font-semibold dark:text-white">{title}</h2>
      <p className="mt-3 text-sm text-steel dark:text-slate-300">{message}</p>
      <div className="mt-6 flex gap-3">
        <Link href="/classes">
          <Button>Back to Classes</Button>
        </Link>
        <Link href="/login">
          <Button variant="secondary">Go to Login</Button>
        </Link>
      </div>
    </div>
  );
}
