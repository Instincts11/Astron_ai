"use client";

import { motion } from "framer-motion";
import { DollarSign, Target, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useId } from "react";

import { Card } from "@/components/ui/card";
import type { Kpi } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const icons = {
  revenue: DollarSign,
  users: Users,
  conversion: Target,
  growth: TrendingUp,
};

export function KpiGrid({ items }: { items: Kpi[] }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <KpiCard key={item.id} item={item} index={index} />
      ))}
    </section>
  );
}

function KpiCard({ item, index }: { item: Kpi; index: number }) {
  const Icon = icons[item.id];
  const Trend = item.positive ? TrendingUp : TrendingDown;
  const gradientId = useId().replace(/:/g, "");
  const points = item.series.map((value, pointIndex) => ({ pointIndex, value }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Card className="h-full p-5 transition duration-300 hover:border-accent/30">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted">{item.title}</p>
            <p className="mt-2 text-[28px] leading-none font-semibold tracking-tight">{item.value}</p>
          </div>
          <span
            className="grid size-10 shrink-0 place-items-center rounded-xl"
            style={{ backgroundColor: `${item.color}22`, color: item.color }}
          >
            <Icon className="size-[18px]" strokeWidth={1.75} />
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-1 font-medium",
              item.positive ? "text-positive" : "text-negative",
            )}
          >
            <Trend className="size-3.5" />
            {item.change}
          </span>
          <span className="text-muted">{item.comparison}</span>
        </div>
        <div className="mt-3 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={points} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={item.color} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={item.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={item.color}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                dot={false}
                isAnimationActive
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
