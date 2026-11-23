"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CommandPalette } from "@/components/layout/command-palette";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { ActionDialogs } from "@/components/dashboard/action-dialogs";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setPaletteOpen } = useDashboard();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPaletteOpen]);

  return (
    <div className="relative flex h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-20 size-[420px] rounded-full bg-accent/15 blur-[130px]" />
        <div className="absolute right-[-8%] bottom-[-18%] size-[460px] rounded-full bg-[#6366f1]/12 blur-[150px]" />
      </div>

      <div className="relative hidden h-full shrink-0 md:block">
        <Sidebar />
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="relative flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main id="main" className="min-h-0 flex-1 overflow-y-auto px-4 pt-1 pb-8 sm:px-6 lg:px-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="mx-auto w-full max-w-[1520px]"
          >
            {children}
          </motion.div>
        </main>
      </div>

      <CommandPalette onNavigate={() => setMobileOpen(false)} />
      <ActionDialogs />
    </div>
  );
}
