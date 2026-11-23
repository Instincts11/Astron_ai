"use client";

import { createContext, useContext, useMemo, useState } from "react";

import {
  initialNotices,
  initialProjects,
  initialTeam,
  type Notice,
  type PlanId,
  type Project,
  type Teammate,
} from "@/lib/dashboard-data";
import type { RangeId } from "@/lib/format";

export type ActionId = "project" | "invite" | "report" | "ask";

type DashboardContextValue = {
  range: RangeId;
  setRange: (range: RangeId) => void;
  projects: Project[];
  addProject: (input: { name: string; template: string }) => void;
  team: Teammate[];
  invite: (input: { email: string; role: string }) => string | null;
  notices: Notice[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  plan: PlanId;
  setPlan: (plan: PlanId) => void;
  action: ActionId | null;
  openAction: (action: ActionId) => void;
  closeAction: () => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<RangeId>("month");
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [team, setTeam] = useState<Teammate[]>(initialTeam);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [plan, setPlan] = useState<PlanId>("Pro");
  const [action, setAction] = useState<ActionId | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const value = useMemo<DashboardContextValue>(
    () => ({
      range,
      setRange,
      projects,
      addProject: ({ name, template }) => {
        setProjects((current) => [
          {
            id: crypto.randomUUID(),
            name,
            template,
            status: "Active",
            updated: "Just now",
            members: 1,
          },
          ...current,
        ]);
      },
      team,
      invite: ({ email, role }) => {
        const normalized = email.trim().toLowerCase();
        if (!normalized.includes("@") || !normalized.split("@")[1]?.includes(".")) {
          return "Enter a valid email address.";
        }
        if (team.some((person) => person.email.toLowerCase() === normalized)) {
          return "That person is already on the team.";
        }
        const name = normalized.split("@")[0] ?? normalized;
        setTeam((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            name,
            email: normalized,
            role,
          },
        ]);
        return null;
      },
      notices,
      unreadCount: notices.filter((notice) => notice.unread).length,
      markRead: (id) => {
        setNotices((current) =>
          current.map((notice) => (notice.id === id ? { ...notice, unread: false } : notice)),
        );
      },
      markAllRead: () => {
        setNotices((current) => current.map((notice) => ({ ...notice, unread: false })));
      },
      plan,
      setPlan,
      action,
      openAction: setAction,
      closeAction: () => setAction(null),
      paletteOpen,
      setPaletteOpen,
    }),
    [action, notices, paletteOpen, plan, projects, range, team],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const value = useContext(DashboardContext);
  if (!value) throw new Error("useDashboard must be used within DashboardProvider");
  return value;
}
