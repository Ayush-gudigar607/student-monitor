"use client";

import { motion } from "framer-motion";
import { BookCopy, ChevronRight, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ClassCard } from "@/lib/auth";
import { useUIStore } from "@/store/ui-store";

export function ClassSelectionGrid({ classes, role }: { classes: ClassCard[]; role: string }) {
  const router = useRouter();
  const setSelectedClass = useUIStore((state) => state.setSelectedClass);

  return (
    <div className="space-y-6">
      <div className="panel p-6">
        <p className="text-sm text-steel dark:text-slate-400">Class Selection</p>
        <h2 className="mt-2 text-2xl font-semibold dark:text-white">
          {role === "admin" ? "Choose any class workspace" : "Choose your assigned class"}
        </h2>
        <p className="mt-2 text-sm text-steel dark:text-slate-400">
          Cards are driven from the database, so adding 11th, 12th, or new sections later won’t require UI rewrites.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {classes.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            onClick={() => {
              setSelectedClass(`Class ${item.name}-${item.section}`, item.id);
              router.push(`/classes/${item.id}`);
            }}
            className="panel group p-6 text-left transition hover:-translate-y-1 hover:border-accent/30 dark:hover:border-accent/30"
          >
            <div className="flex items-start justify-between">
              <div className="rounded-2xl bg-slate-100 p-3 dark:bg-white/10">
                <BookCopy className="h-5 w-5 text-slateInk dark:text-white" />
              </div>
              <ChevronRight className="h-4 w-4 text-steel transition group-hover:translate-x-1 dark:text-slate-400" />
            </div>
            <div className="mt-5">
              <p className="text-sm text-steel dark:text-slate-400">Class</p>
              <h3 className="mt-1 text-2xl font-semibold dark:text-white">
                {item.name}
                <span className="ml-2 text-base text-steel dark:text-slate-400">Section {item.section}</span>
              </h3>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/5">
                <Users className="h-4 w-4 text-accent" />
                <p className="mt-2 text-xs text-steel dark:text-slate-400">Students</p>
                <p className="font-semibold dark:text-white">{item.total_students}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/5">
                <p className="text-xs text-steel dark:text-slate-400">Average</p>
                <p className="mt-2 font-semibold dark:text-white">{item.average_score}%</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/5">
                <p className="text-xs text-steel dark:text-slate-400">Topper</p>
                <p className="mt-2 line-clamp-1 font-semibold dark:text-white">{item.topper_name}</p>
              </div>
            </div>
            <Button className="mt-6 w-full">Open Class Dashboard</Button>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
