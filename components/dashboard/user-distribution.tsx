"use client";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Card, CardTitle } from "@/components/ui/card";
import type { Slice } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export function UserDistribution({
  slices,
  audienceLabel,
}: {
  slices: Slice[];
  audienceLabel: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const hovered = active === null ? null : slices[active];

  return (
    <Card className="flex h-full flex-col p-5 sm:p-6">
      <CardTitle>User Distribution</CardTitle>
      <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-6 sm:flex-row">
        <div className="relative h-[220px] w-[220px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="value"
                nameKey="name"
                innerRadius={68}
                outerRadius={92}
                paddingAngle={4}
                cornerRadius={8}
                stroke="none"
                startAngle={90}
                endAngle={-270}
                onMouseEnter={(_, index) => setActive(index)}
                onMouseLeave={() => setActive(null)}
              >
                {slices.map((slice, index) => (
                  <Cell
                    key={slice.name}
                    fill={slice.color}
                    opacity={active === null || active === index ? 1 : 0.35}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="text-2xl font-semibold tracking-tight">
                {hovered ? `${hovered.value}%` : audienceLabel}
              </p>
              <p className="text-xs text-muted">{hovered ? hovered.name : "Users"}</p>
            </div>
          </div>
        </div>
        <ul className="w-full flex-1 space-y-3">
          {slices.map((slice, index) => (
            <li key={slice.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-left transition",
                  active === index ? "bg-secondary" : "hover:bg-secondary/70",
                )}
              >
                <span className="size-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
                <span className="flex-1 text-sm text-muted">{slice.name}</span>
                <span className="text-sm font-medium">{slice.value}%</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
