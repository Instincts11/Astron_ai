"use client";

import { AiVisual } from "@/components/dashboard/ai-visual";
import { PageHeader } from "@/components/dashboard/page-header";
import { useSnapshot } from "@/components/dashboard/use-snapshot";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildInsights } from "@/lib/insights";

export function IntelligenceView() {
  const snapshot = useSnapshot();
  const { openAction } = useDashboard();
  const insights = buildInsights(snapshot);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="AI Intelligence"
        description="A live reading of the workspace, with the signals behind the numbers."
      >
        <Button onClick={() => openAction("ask")}>Ask AI</Button>
      </PageHeader>
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <AiVisual
          variant="stage"
          title="Intelligence, in motion."
          description="Orbital rings, a distorting core, and particles that follow the cursor."
        />
        <div className="flex flex-col gap-4">
          {insights.map((insight) => (
            <Card key={insight.title} className="p-5">
              <p className="text-xs font-medium tracking-[0.16em] text-accent uppercase">{insight.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{insight.body}</p>
            </Card>
          ))}
          <Card className="p-5">
            <h2 className="text-[15px] font-semibold">Ask from this range</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Questions use the revenue, audience, and conversion figures already on screen.
            </p>
            <Button className="mt-4" variant="secondary" onClick={() => openAction("ask")}>
              Open Ask AI
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
