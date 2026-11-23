"use client";

import { useState } from "react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SettingsView() {
  const [name, setName] = useState("Amal Hassan");
  const [email, setEmail] = useState("amal@astra.ai");
  const [role, setRole] = useState("Product lead");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [saved, setSaved] = useState(false);
  const [productEmail, setProductEmail] = useState(true);
  const [weekly, setWeekly] = useState(true);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Settings"
        description="Profile details and the notes AstraAI is allowed to send."
      />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-5 sm:p-6">
          <h2 className="text-[15px] font-semibold">Profile</h2>
          <form
            className="mt-5 grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              setSaved(true);
            }}
          >
            <Field label="Name">
              <Input value={name} onChange={(event) => setName(event.target.value)} />
            </Field>
            <Field label="Email">
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </Field>
            <Field label="Role">
              <Input value={role} onChange={(event) => setRole(event.target.value)} />
            </Field>
            <Field label="Timezone">
              <Select value={timezone} onChange={(event) => setTimezone(event.target.value)}>
                <option>Asia/Kolkata</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
                <option>Asia/Singapore</option>
              </Select>
            </Field>
            <div className="flex items-center gap-3 sm:col-span-2">
              <Button type="submit">Save profile</Button>
              {saved ? <p className="text-sm text-positive">Saved for this session.</p> : null}
            </div>
          </form>
        </Card>
        <Card className="p-5 sm:p-6">
          <h2 className="text-[15px] font-semibold">Preferences</h2>
          <div className="mt-5 space-y-4">
            <Toggle
              label="Product email"
              description="Project updates and billing receipts."
              checked={productEmail}
              onChange={setProductEmail}
            />
            <Toggle
              label="Weekly digest"
              description="A Monday summary of revenue and active users."
              checked={weekly}
              onChange={setWeekly}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-1 text-xs text-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition",
          checked ? "bg-accent" : "bg-secondary",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white transition",
            checked ? "left-5" : "left-0.5",
          )}
        />
        <span className="sr-only">{label}</span>
      </button>
    </div>
  );
}
