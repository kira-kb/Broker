// components/ui/Layout.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // If you're using ShadCN's utility class helper
// import { Sidebar } from "@/components/Sidebar";
// import { Navbar } from "@/components/Navbar";

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1">
        {/* <Navbar /> */}
        <main className={cn("p-4 md:p-6", className)}>{children}</main>
      </div>
    </div>
  );
}
