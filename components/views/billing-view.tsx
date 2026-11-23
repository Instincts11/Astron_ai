"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { PageHeader } from "@/components/dashboard/page-header";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { invoices, plans, type PlanId } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const usage = [
  { label: "Seats", value: 60, hint: "6 of 10" },
  { label: "AI credits", value: 72, hint: "72% used" },
  { label: "Storage", value: 41, hint: "41 GB of 100" },
];

export function BillingView() {
  const { plan, setPlan } = useDashboard();
  const [annual, setAnnual] = useState(false);
  const [note, setNote] = useState("");

  function choose(next: PlanId) {
    if (next === plan) return;
    setPlan(next);
    setNote(`${next} is active for this session. Nothing was billed.`);
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Billing"
        description="Preview plans for this workspace. Nothing is billed and no card is stored."
      >
        <div className="flex rounded-xl bg-card p-1 text-xs">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={cn(
              "cursor-pointer rounded-lg px-3 py-1.5 font-medium",
              annual ? "text-muted" : "bg-secondary text-foreground",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={cn(
              "cursor-pointer rounded-lg px-3 py-1.5 font-medium",
              annual ? "bg-secondary text-foreground" : "text-muted",
            )}
          >
            Yearly
          </button>
        </div>
      </PageHeader>

      {note ? <p className="text-sm text-positive">{note}</p> : null}

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {plans.map((item) => {
          const current = item.id === plan;
          return (
            <Card key={item.id} className={cn("flex flex-col p-5", current && "border-accent/50")}>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">{item.id}</h2>
                {current ? (
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent">
                    Current
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight">
                {annual ? item.yearly : item.monthly}
                <span className="ml-1 text-sm font-normal text-muted">{annual ? "/mo, yearly" : "/mo"}</span>
              </p>
              <p className="mt-2 text-sm text-muted">{item.note}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm">
                {item.features.map((feature) => (
                  <li key={feature} className="text-muted">
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-5"
                variant={current ? "secondary" : "default"}
                disabled={current}
                onClick={() => choose(item.id)}
              >
                {current ? "Current plan" : `Switch to ${item.id}`}
              </Button>
            </Card>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <h2 className="text-[15px] font-semibold">Usage</h2>
          <div className="mt-5 space-y-4">
            {usage.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-muted">{item.hint}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-highlight"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="px-5 pt-5 sm:px-6">
            <h2 className="text-[15px] font-semibold">Invoices</h2>
          </div>
          <table className="mt-2 w-full text-sm">
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-t border-border">
                  <td className="px-5 py-3 font-medium sm:px-6">{invoice.id}</td>
                  <td className="px-3 py-3 text-muted">{invoice.date}</td>
                  <td className="px-3 py-3">{invoice.amount}</td>
                  <td className="px-5 py-3 text-positive sm:px-6">{invoice.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
