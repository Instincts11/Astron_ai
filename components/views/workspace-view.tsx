"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/dashboard/page-header";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ProjectStatus } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const filters: Array<"All" | ProjectStatus> = ["All", "Active", "In review", "Planning"];

const statusTone: Record<ProjectStatus, string> = {
  Active: "bg-positive/15 text-positive",
  "In review": "bg-amber-400/15 text-amber-400",
  Planning: "bg-accent/15 text-accent",
};

export function WorkspaceView() {
  const { projects, team, openAction } = useDashboard();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(
    () =>
      projects.filter((project) => {
        const matchesFilter = filter === "All" || project.status === filter;
        const matchesQuery = project.name.toLowerCase().includes(query.trim().toLowerCase());
        return matchesFilter && matchesQuery;
      }),
    [filter, projects, query],
  );

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Workspace"
        description="Projects in motion, and the people building them."
      >
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => openAction("invite")}>
            Invite member
          </Button>
          <Button onClick={() => openAction("project")}>Create project</Button>
        </div>
      </PageHeader>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={cn(
                "cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition",
                filter === item ? "bg-accent text-white" : "bg-card text-muted hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter projects"
          className="sm:max-w-xs"
        />
      </div>

      {visible.length === 0 ? (
        <Card className="p-8 text-center text-sm text-muted">No projects match that filter.</Card>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visible.map((project) => (
            <Card key={project.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold">{project.name}</h2>
                  <p className="mt-1 text-xs text-muted">{project.template}</p>
                </div>
                <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", statusTone[project.status])}>
                  {project.status}
                </span>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-muted">Updated</dt>
                  <dd className="mt-1 font-medium">{project.updated}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Members</dt>
                  <dd className="mt-1 font-medium">{project.members}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </section>
      )}

      <Card className="p-5 sm:p-6">
        <h2 className="text-[15px] font-semibold">Team</h2>
        <ul className="mt-4 divide-y divide-border">
          {team.map((person) => (
            <li key={person.id} className="flex items-center gap-3 py-3">
              <span className="grid size-9 place-items-center rounded-full bg-accent/15 text-xs font-semibold text-accent">
                {person.name.slice(0, 1).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{person.name}</span>
                <span className="block truncate text-xs text-muted">{person.email}</span>
              </span>
              <span className="text-xs text-muted">{person.role}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
