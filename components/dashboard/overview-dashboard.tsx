"use client";

import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { AiVisual } from "@/components/dashboard/ai-visual";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { RevenueOverview } from "@/components/dashboard/revenue-overview";
import { useSnapshot } from "@/components/dashboard/use-snapshot";
import { UserDistribution } from "@/components/dashboard/user-distribution";
import { formatLongDate, greetingFor } from "@/lib/format";

export function OverviewDashboard() {
  const snapshot = useSnapshot();
  const now = new Date();

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase" suppressHydrationWarning>
            {formatLongDate(now)}
          </p>
          <h1 className="mt-2 text-[28px] font-semibold tracking-tight sm:text-[32px]" suppressHydrationWarning>
            {greetingFor(now)}, Amal <span aria-hidden>👋</span>
          </h1>
          <p className="mt-1 text-sm text-muted">
            Here’s what’s happening with your workspace today.
          </p>
        </div>
        <DateRangePicker />
      </header>

      <KpiGrid items={snapshot.kpis} />

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <RevenueOverview snapshot={snapshot} />
        </div>
        <UserDistribution slices={snapshot.slices} audienceLabel={snapshot.audienceLabel} />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="min-w-0">
          <RecentActivity />
        </div>
        <div className="min-w-0">
          <QuickActions />
        </div>
        <div className="min-w-0 lg:col-span-2 xl:col-span-1">
          <AiVisual />
        </div>
      </section>
    </div>
  );
}
