"use client";

import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

const AiOrb = dynamic(() => import("@/components/dashboard/ai-orb").then((mod) => mod.AiOrb), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export function AiVisual({
  variant = "panel",
  title = "Build. Innovate. Grow.",
  description = "Your AI-powered workspace, beautifully organized.",
}: {
  variant?: "panel" | "stage";
  title?: string;
  description?: string;
}) {
  const reduce = useReducedMotion();
  const stage = variant === "stage";

  return (
    <section
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#10111F] text-white shadow-[var(--shadow)]",
        stage ? "min-h-[520px]" : "min-h-[280px]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(139,92,246,0.32),transparent_62%)]" />
      <div className={cn("relative", stage ? "h-[380px]" : "h-[210px]")} aria-hidden>
        {reduce ? <StaticOrb /> : <AiOrb />}
      </div>
      <div className="relative px-5 pb-5 sm:px-6">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 max-w-xs text-sm leading-6 text-[#9295AB]">{description}</p>
      </div>
    </section>
  );
}

function StaticOrb() {
  return (
    <div className="grid h-full place-items-center">
      <div className="relative">
        <div className="absolute inset-0 scale-150 rounded-full bg-accent/30 blur-3xl" />
        <div className="size-28 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f3e8ff,#8b5cf6_46%,#312e81)] shadow-[0_0_70px_rgba(139,92,246,0.55)]" />
      </div>
    </div>
  );
}
