"use client";

import { motion } from "framer-motion";
import { FileText, FolderPlus, Sparkles, UserPlus } from "lucide-react";

import { useDashboard, type ActionId } from "@/components/providers/dashboard-provider";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const actions: {
  id: ActionId;
  label: string;
  hint: string;
  icon: typeof FolderPlus;
}[] = [
  { id: "project", label: "Create Project", hint: "Start a workspace", icon: FolderPlus },
  { id: "invite", label: "Invite Member", hint: "Add a teammate", icon: UserPlus },
  { id: "report", label: "Generate Report", hint: "Export this range", icon: FileText },
  { id: "ask", label: "Ask AI", hint: "Query your data", icon: Sparkles },
];

export function QuickActions() {
  const { openAction } = useDashboard();

  return (
    <Card className="flex h-full flex-col p-5 sm:p-6">
      <CardTitle>Quick Actions</CardTitle>
      <div className="mt-4 grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
        {actions.map((action) => {
          const Icon = action.icon;
          const featured = action.id === "ask";
          return (
            <motion.button
              key={action.id}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openAction(action.id)}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 text-left transition",
                featured
                  ? "border-accent/40 bg-accent/15 hover:bg-accent/20"
                  : "border-border bg-secondary/50 hover:border-accent/30 hover:bg-secondary",
              )}
            >
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-xl",
                  featured ? "bg-accent text-white" : "bg-accent/15 text-accent",
                )}
              >
                <Icon className="size-[18px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{action.label}</span>
                <span className="mt-0.5 block text-xs text-muted">{action.hint}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </Card>
  );
}
