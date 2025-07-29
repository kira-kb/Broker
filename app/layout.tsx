import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Components
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/components/theme-provider";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "Broker Dashboard",
  description: "Property & Car Broker system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset className="flex flex-col h-screen">
              {/* Top Nav */}
              <div className="sticky top-0 z-50 bg-white border-b">
                <Navbar />
                <div className="flex items-center gap-2 px-4 bg-white dark:bg-zinc-950">
                  <SidebarTrigger className="-ml-1 text-zinc-900 dark:text-zinc-100" />

                  <Separator
                    orientation="vertical"
                    className="h-5 mr-2 bg-zinc-200 dark:bg-zinc-700"
                  />

                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink
                          href="#"
                          className="text-zinc-500 hover:text-primary dark:text-zinc-400 dark:hover:text-white"
                        >
                          Dashboard
                        </BreadcrumbLink>
                      </BreadcrumbItem>

                      <BreadcrumbSeparator className="hidden md:block dark:text-zinc-600" />

                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-zinc-900 dark:text-white">
                          Overview
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>

              {/* Scrollable Content */}
              <main className="flex-1 overflow-y-auto p-4 bg-muted/40">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
