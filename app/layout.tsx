import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Shell } from "@/components/layout/shell";
import { DashboardProvider } from "@/components/providers/dashboard-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeScript = `(function(){try{var t=localStorage.getItem("astra-theme");if(t==="light"){document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");}}catch(e){}})();`;

export const metadata: Metadata = {
  title: {
    default: "AstraAI",
    template: "%s · AstraAI",
  },
  description:
    "AstraAI is a premium workspace for revenue, audience intelligence, and the work your team ships next.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full overflow-hidden font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <DashboardProvider>
            <Shell>{children}</Shell>
          </DashboardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
