"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { PageHeader } from "@/components/dashboard/page-header";
import { RevenueOverview } from "@/components/dashboard/revenue-overview";
import { useSnapshot } from "@/components/dashboard/use-snapshot";
import { UserDistribution } from "@/components/dashboard/user-distribution";
import { Card, CardTitle } from "@/components/ui/card";
import { channels, topPages } from "@/lib/dashboard-data";
import { formatAxisMoney } from "@/lib/format";

export function AnalyticsView() {
  const snapshot = useSnapshot();

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Analytics"
        description="Revenue, acquisition, and the pages people actually use."
      >
        <DateRangePicker />
      </PageHeader>
      <KpiGrid items={snapshot.kpis} />
      <RevenueOverview snapshot={snapshot} />
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <CardTitle>Acquisition channels</CardTitle>
          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channels} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--grid)" strokeDasharray="4 8" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} width={40} tickFormatter={formatAxisMoney} tick={{ fill: "var(--muted)", fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: "rgba(139,92,246,0.08)" }}
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--foreground)",
                  }}
                />
                <Bar dataKey="value" name="Visits" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <UserDistribution slices={snapshot.slices} audienceLabel={snapshot.audienceLabel} />
      </section>
      <Card className="overflow-hidden">
        <div className="px-5 pt-5 sm:px-6">
          <CardTitle>Top pages</CardTitle>
        </div>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="text-left text-xs text-muted">
                <th className="px-5 py-3 font-medium sm:px-6">Path</th>
                <th className="px-3 py-3 font-medium">Views</th>
                <th className="px-5 py-3 font-medium sm:px-6">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page) => (
                <tr key={page.path} className="border-t border-border">
                  <td className="px-5 py-3 font-medium sm:px-6">{page.path}</td>
                  <td className="px-3 py-3 text-muted">{page.views}</td>
                  <td className="px-5 py-3 sm:px-6">{page.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
