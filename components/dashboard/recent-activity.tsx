"use client";

import { Calendar, Crown, MessageSquare, PenLine, Receipt, UserPlus } from "lucide-react";
import { useState } from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { activities, type ActivityIcon } from "@/lib/dashboard-data";

const icons: Record<ActivityIcon, typeof UserPlus> = {
  user: UserPlus,
  pen: PenLine,
  crown: Crown,
  receipt: Receipt,
  message: MessageSquare,
  calendar: Calendar,
};

const tones: Record<ActivityIcon, string> = {
  user: "bg-accent/15 text-accent",
  pen: "bg-sky-400/15 text-sky-400",
  crown: "bg-amber-400/15 text-amber-400",
  receipt: "bg-positive/15 text-positive",
  message: "bg-highlight/15 text-highlight",
  calendar: "bg-[#6366f1]/15 text-[#818cf8]",
};

export function RecentActivity() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? activities : activities.slice(0, 3);

  return (
    <Card className="flex h-full flex-col p-5 sm:p-6">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="cursor-pointer text-xs font-medium text-accent hover:text-highlight"
        >
          {expanded ? "Show less" : "View all"}
        </button>
      </CardHeader>
      <ul className="mt-4 flex flex-1 flex-col gap-1">
        {visible.map((activity) => {
          const Icon = icons[activity.icon];
          return (
            <li key={activity.id} className="flex items-start gap-3 rounded-xl px-1 py-2.5">
              <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tones[activity.icon]}`}>
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{activity.title}</span>
                <span className="mt-0.5 block text-xs text-muted">{activity.detail}</span>
              </span>
              <span className="shrink-0 text-xs text-muted">{activity.time}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
