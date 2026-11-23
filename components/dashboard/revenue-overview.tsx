"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Snapshot } from "@/lib/dashboard-data";
import { formatAxisMoney, formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

export function RevenueOverview({ snapshot }: { snapshot: Snapshot }) {
  const [period, setPeriod] = useState<"current" | "previous">("current");
  const headline = period === "current" ? snapshot.currentRevenue : snapshot.previousRevenue;
  const change = period === "current" ? snapshot.currentChange : snapshot.previousChange;
  const positive = period === "current" ? snapshot.currentPositive : snapshot.previousPositive;
  const note = period === "current" ? snapshot.currentNote : snapshot.previousNote;
  const max = Math.max(...snapshot.revenue.flatMap((point) => [point.current, point.previous]));
  const domainMax = Math.ceil(max / 20000) * 20000 || 20000;

  return (
    <Card className="flex h-full flex-col p-5 sm:p-6">
      <CardHeader className="flex-wrap">
        <div>
          <CardTitle>Revenue Overview</CardTitle>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{formatMoney(headline)}</p>
          <p className="mt-1 text-xs">
            <span className={positive ? "text-positive" : "text-negative"}>{change}</span>{" "}
            <span className="text-muted">{note}</span>
          </p>
        </div>
        <div className="flex rounded-xl bg-secondary p-1" role="group" aria-label="Revenue comparison">
          {(["current", "previous"] as const).map((key, index) => (
            <button
              key={key}
              type="button"
              onClick={() => setPeriod(key)}
              className={cn(
                "cursor-pointer rounded-[10px] px-3 py-1.5 text-xs font-medium transition",
                period === key ? "bg-card text-foreground shadow-sm" : "text-muted hover:text-foreground",
              )}
            >
              {snapshot.periodLabels[index]}
            </button>
          ))}
        </div>
      </CardHeader>

      <div className="mt-4 h-[280px] min-w-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={snapshot.revenue} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.38} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--grid)" strokeDasharray="4 8" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={48}
              domain={[0, domainMax]}
              tickFormatter={formatAxisMoney}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ stroke: "rgba(192,132,252,0.45)", strokeWidth: 1 }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="rounded-xl border border-border bg-card/95 px-3 py-2 shadow-xl backdrop-blur-md">
                    <p className="text-xs text-muted">{label}</p>
                    <div className="mt-1 space-y-1">
                      {payload.map((entry) => (
                        <p key={String(entry.dataKey)} className="text-sm font-medium">
                          <span className="mr-2 text-muted">{entry.name}</span>
                          {formatMoney(Number(entry.value ?? 0))}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="previous"
              name={snapshot.periodLabels[1]}
              stroke="#9295AB"
              strokeWidth={period === "previous" ? 2.5 : 1.5}
              strokeDasharray="5 6"
              strokeOpacity={period === "previous" ? 1 : 0.55}
              fill="transparent"
              dot={false}
              activeDot={{ r: 4, fill: "#9295AB", stroke: "var(--card)", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="current"
              name={snapshot.periodLabels[0]}
              stroke="#8B5CF6"
              strokeWidth={period === "current" ? 2.75 : 1.75}
              strokeOpacity={period === "current" ? 1 : 0.35}
              fill="url(#revenue-fill)"
              fillOpacity={period === "current" ? 1 : 0.25}
              dot={false}
              activeDot={{ r: 5, fill: "#C084FC", stroke: "#ffffff", strokeWidth: 2 }}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex items-center gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-4 rounded-full bg-accent" />
          {snapshot.periodLabels[0]}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-4 rounded-full border-t border-dashed border-muted" />
          {snapshot.periodLabels[1]}
        </span>
      </div>
    </Card>
  );
}

