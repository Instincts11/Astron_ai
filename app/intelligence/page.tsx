import type { Metadata } from "next";

import { IntelligenceView } from "@/components/views/intelligence-view";

export const metadata: Metadata = { title: "AI Intelligence" };

export default function IntelligencePage() {
  return <IntelligenceView />;
}
