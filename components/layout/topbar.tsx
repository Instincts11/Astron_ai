"use client";

import { Bell, CheckCheck, Menu, Moon, Search, Sun, UserRound } from "lucide-react";
import Link from "next/link";

import { useDashboard } from "@/components/providers/dashboard-provider";
import { useTheme } from "@/components/providers/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { setPaletteOpen, notices, unreadCount, markAllRead, markRead, plan } = useDashboard();
  const { toggleTheme } = useTheme();

  return (
    <header className="z-20 flex items-center gap-2 px-4 py-4 sm:gap-3 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenu}
        className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl border border-border bg-card text-foreground md:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </button>

      <div className="flex min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="mx-auto flex h-11 w-full max-w-xl cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 text-sm text-muted shadow-[var(--shadow)] backdrop-blur transition hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          <Search className="size-4 shrink-0" />
          <span className="truncate text-left">Search anything...</span>
          <kbd className="ml-auto hidden shrink-0 rounded-lg border border-border bg-secondary px-2 py-1 text-[10px] font-medium tracking-wide sm:inline-flex">
            Ctrl K
          </kbd>
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="relative grid size-10 cursor-pointer place-items-center rounded-xl border border-border bg-card text-foreground outline-none transition hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-label={unreadCount ? `${unreadCount} unread notifications` : "Notifications"}
          >
            <Bell className="size-4" />
            {unreadCount > 0 ? (
              <span className="absolute top-2 right-2 size-2 rounded-full bg-highlight ring-2 ring-card" />
            ) : null}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-2.5 py-2">
              <p className="text-sm font-medium">Notifications</p>
              <button
                type="button"
                onClick={markAllRead}
                className="inline-flex cursor-pointer items-center gap-1 text-xs text-muted hover:text-foreground"
              >
                <CheckCheck className="size-3.5" />
                Mark all read
              </button>
            </div>
            <DropdownMenuSeparator />
            {notices.map((notice) => (
              <DropdownMenuItem key={notice.id} onSelect={() => markRead(notice.id)}>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-medium">{notice.title}</span>
                    {notice.unread ? <span className="size-1.5 shrink-0 rounded-full bg-accent" /> : null}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted">{notice.body}</span>
                </span>
                <span className="shrink-0 text-[10px] text-muted">{notice.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          type="button"
          onClick={toggleTheme}
          className="grid size-10 cursor-pointer place-items-center rounded-xl border border-border bg-card text-foreground transition hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/50"
          aria-label="Toggle color theme"
        >
          <Sun className="hidden size-4 dark:block" />
          <Moon className="size-4 dark:hidden" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="grid size-10 cursor-pointer place-items-center overflow-hidden rounded-full bg-gradient-to-br from-highlight to-accent text-[11px] font-semibold text-white ring-2 ring-white/10 outline-none focus-visible:ring-accent/60"
            aria-label="Open profile menu"
          >
            AH
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel>
              <span className="block font-medium">Amal Hassan</span>
              <span className="mt-0.5 block text-xs text-muted">amal@astra.ai · {plan} plan</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <UserRound className="size-4 text-muted" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/billing">
                <span className="size-4 text-center text-xs text-muted">$</span>
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/help">
                <span className="size-4 text-center text-xs text-muted">?</span>
                Help
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
