"use client";

import { useMemo } from "react";

import { useDashboard } from "@/components/providers/dashboard-provider";
import { getSnapshot } from "@/lib/dashboard-data";

export function useSnapshot() {
  const { range } = useDashboard();
  return useMemo(() => getSnapshot(range), [range]);
}
