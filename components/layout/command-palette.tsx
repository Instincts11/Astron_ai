"use client";

import {
  BarChart3,
  CreditCard,
  FileText,
  FolderKanban,
  FolderPlus,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useDashboard, type ActionId } from "@/components/providers/dashboard-provider";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  group: string;
  label: string;
  hint: string;
  icon: typeof LayoutDashboard;
  href?: string;
  action?: ActionId;
};

export function CommandPalette({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const { paletteOpen, setPaletteOpen, openAction, projects } = useDashboard();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const commands = useMemo<Command[]>(() => {
    const navigate: Command[] = [
      { id: "overview", group: "Navigate", label: "Overview", hint: "Workspace home", icon: LayoutDashboard, href: "/" },
      { id: "analytics", group: "Navigate", label: "Analytics", hint: "Revenue and channels", icon: BarChart3, href: "/analytics" },
      { id: "workspace", group: "Navigate", label: "Workspace", hint: "Projects and team", icon: FolderKanban, href: "/workspace" },
      { id: "intelligence", group: "Navigate", label: "AI Intelligence", hint: "Signals and the 3D model", icon: Sparkles, href: "/intelligence" },
      { id: "settings", group: "Navigate", label: "Settings", hint: "Profile and preferences", icon: Settings, href: "/settings" },
      { id: "billing", group: "Navigate", label: "Billing", hint: "Plan and invoices", icon: CreditCard, href: "/billing" },
      { id: "help", group: "Navigate", label: "Help & Support", hint: "How AstraAI works", icon: LifeBuoy, href: "/help" },
    ];
    const actions: Command[] = [
      { id: "create", group: "Actions", label: "Create Project", hint: "Start a workspace", icon: FolderPlus, action: "project" },
      { id: "invite", group: "Actions", label: "Invite Member", hint: "Add a teammate", icon: UserPlus, action: "invite" },
      { id: "report", group: "Actions", label: "Generate Report", hint: "Download this range", icon: FileText, action: "report" },
      { id: "ask", group: "Actions", label: "Ask AI", hint: "Query workspace metrics", icon: Sparkles, action: "ask" },
    ];
    const projectCommands: Command[] = projects.map((project) => ({
      id: project.id,
      group: "Projects",
      label: project.name,
      hint: project.status,
      icon: FolderKanban,
      href: "/workspace",
    }));
    return [...navigate, ...actions, ...projectCommands];
  }, [projects]);

  const filtered = commands.filter((command) => {
    const haystack = `${command.label} ${command.hint} ${command.group}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });
  const activeIndex = Math.min(index, Math.max(filtered.length - 1, 0));
  const groups = [...new Set(filtered.map((command) => command.group))];

  function run(command: Command) {
    setPaletteOpen(false);
    setQuery("");
    setIndex(0);
    onNavigate?.();
    if (command.href) router.push(command.href);
    if (command.action) openAction(command.action);
  }

  return (
    <Dialog
      open={paletteOpen}
      onOpenChange={(open) => {
        setPaletteOpen(open);
        if (!open) {
          setQuery("");
          setIndex(0);
        }
      }}
    >
      <DialogContent showClose={false} className="overflow-hidden p-0" aria-describedby={undefined}>
        <DialogTitle className="sr-only">Search AstraAI</DialogTitle>
        <DialogDescription className="sr-only">
          Search pages, projects, and quick actions.
        </DialogDescription>
        <input
          autoFocus
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIndex(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setIndex((current) => Math.min(current + 1, filtered.length - 1));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setIndex((current) => Math.max(current - 1, 0));
            } else if (event.key === "Enter" && filtered[activeIndex]) {
              event.preventDefault();
              run(filtered[activeIndex]);
            }
          }}
          placeholder="Search anything..."
          className="h-14 w-full border-b border-border bg-transparent px-5 text-sm outline-none placeholder:text-muted"
        />
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted">No matches for that search.</p>
          ) : (
            groups.map((group) => (
              <div key={group} className="mb-2">
                <p className="px-3 py-1.5 text-[10px] font-medium tracking-[0.16em] text-muted uppercase">
                  {group}
                </p>
                {filtered
                  .filter((command) => command.group === group)
                  .map((command) => {
                    const commandIndex = filtered.indexOf(command);
                    const Icon = command.icon;
                    return (
                      <button
                        key={command.id}
                        type="button"
                        onMouseEnter={() => setIndex(commandIndex)}
                        onClick={() => run(command)}
                        className={cn(
                          "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left",
                          commandIndex === activeIndex ? "bg-secondary" : "hover:bg-secondary/70",
                        )}
                      >
                        <span className="grid size-8 place-items-center rounded-lg bg-accent/15 text-accent">
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">{command.label}</span>
                          <span className="block truncate text-xs text-muted">{command.hint}</span>
                        </span>
                      </button>
                    );
                  })}
              </div>
            ))
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-border px-4 py-2.5 text-[10px] text-muted">
          <span>↑↓ to move</span>
          <span>Enter to open</span>
          <span>Esc to close</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
