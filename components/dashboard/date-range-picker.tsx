"use client";

import { CalendarRange, Check } from "lucide-react";

import { useDashboard } from "@/components/providers/dashboard-provider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { rangeCaption, rangeOptions } from "@/lib/format";
import { cn } from "@/lib/utils";

export function DateRangePicker() {
  const { range, setRange } = useDashboard();
  const now = new Date();

  return (
    <Popover>
      <PopoverTrigger
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-3 text-sm text-foreground shadow-[var(--shadow)] transition hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/50"
        suppressHydrationWarning
      >
        <CalendarRange className="size-4 text-muted" />
        <span suppressHydrationWarning>{rangeCaption(range, now)}</span>
      </PopoverTrigger>
      <PopoverContent>
        <p className="px-2 py-1.5 text-[10px] font-medium tracking-[0.16em] text-muted uppercase">
          Date range
        </p>
        {rangeOptions.map((option) => {
          const selected = option.id === range;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setRange(option.id)}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-left text-sm",
                selected ? "bg-secondary" : "hover:bg-secondary/70",
              )}
            >
              <span>
                <span className="block font-medium">{option.label}</span>
                <span className="block text-xs text-muted" suppressHydrationWarning>
                  {rangeCaption(option.id, now)}
                </span>
              </span>
              {selected ? <Check className="size-4 text-accent" /> : null}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
