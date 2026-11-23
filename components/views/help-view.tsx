"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { faqs } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export function HelpView() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(faqs[0]?.question ?? null);
  const visible = useMemo(
    () =>
      faqs.filter((item) =>
        `${item.question} ${item.answer}`.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Help & Support"
        description="How the dashboard, reports, and AI answers behave in this workspace."
      />
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search help"
        className="max-w-md"
      />
      {visible.length === 0 ? (
        <Card className="p-8 text-center text-sm text-muted">Nothing in help matches that search.</Card>
      ) : (
        <div className="space-y-3">
          {visible.map((item) => {
            const expanded = open === item.question;
            return (
              <Card key={item.question} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : item.question)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={expanded}
                >
                  <span className="text-sm font-medium">{item.question}</span>
                  <span className={cn("text-muted transition", expanded && "rotate-45")}>+</span>
                </button>
                {expanded ? <p className="px-5 pb-5 text-sm leading-6 text-muted">{item.answer}</p> : null}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
