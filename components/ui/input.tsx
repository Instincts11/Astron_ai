import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-border bg-secondary/70 px-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent/50 focus:ring-2 focus:ring-accent/25",
        className,
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full resize-none rounded-xl border border-border bg-secondary/70 px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent/50 focus:ring-2 focus:ring-accent/25",
        className,
      )}
      {...props}
    />
  );
}

function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-xl border border-border bg-secondary/70 px-3 text-sm text-foreground outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/25",
        className,
      )}
      {...props}
    />
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

export { Field, Input, Select, Textarea };
