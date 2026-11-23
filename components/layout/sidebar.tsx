"use client";

import {
  BarChart3,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";

import { useDashboard } from "@/components/providers/dashboard-provider";
import { cn } from "@/lib/utils";

const primary = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/workspace", label: "Workspace", icon: FolderKanban },
  { href: "/intelligence", label: "AI Intelligence", icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/billing", label: "Billing", icon: CreditCard },
];

const help = { href: "/help", label: "Help & Support", icon: LifeBuoy };

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { plan } = useDashboard();
  const gradientId = useId().replace(/:/g, "");

  return (
    <aside className="flex h-full max-h-dvh w-[108px] shrink-0 flex-col overflow-hidden border-r border-border bg-sidebar">
      <Link
        href="/"
        onClick={onNavigate}
        className="flex flex-col items-center gap-2 px-3 pt-5 pb-4"
      >
        <svg viewBox="0 0 32 32" className="size-9" aria-hidden>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="10" fill={`url(#${gradientId})`} />
          <path
            d="M16 6.2 17.9 12.6 24.3 14.5 17.9 16.4 16 22.8 14.1 16.4 7.7 14.5 14.1 12.6 16 6.2Z"
            fill="white"
          />
        </svg>
        <span className="text-xs font-semibold tracking-tight">AstraAI</span>
      </Link>

      <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2.5 pb-3" aria-label="Primary">
        <div className="flex flex-col gap-1">
          {primary.map((item) => (
            <NavItem key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
          ))}
        </div>
        <div className="mt-auto flex flex-col items-center gap-1 pt-4">
          <div className="mb-2 h-px w-8 bg-border" />
          <NavItem item={help} pathname={pathname} onNavigate={onNavigate} />
        </div>
      </nav>

      <Link
        href="/settings"
        onClick={onNavigate}
        className="flex flex-col items-center gap-1.5 border-t border-border px-2 py-4 text-center transition hover:bg-secondary/60"
      >
        <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-highlight to-accent text-[11px] font-semibold text-white ring-2 ring-white/10">
          AH
        </span>
        <span className="text-[11px] leading-tight font-medium">Amal Hassan</span>
        <span className="text-[10px] text-muted">{plan} Plan</span>
      </Link>
    </aside>
  );
}

function NavItem({
  item,
  pathname,
  onNavigate,
}: {
  item: { href: string; label: string; icon: typeof LayoutDashboard };
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full flex-col items-center gap-1 rounded-2xl px-1.5 py-2.5 text-center text-[10px] leading-tight font-medium transition duration-200",
        active
          ? "bg-accent text-white shadow-[0_12px_30px_-14px_rgba(139,92,246,0.95)]"
          : "text-muted hover:bg-secondary hover:text-foreground",
      )}
    >
      <Icon className="size-[18px]" strokeWidth={1.75} />
      <span>{item.label}</span>
    </Link>
  );
}
