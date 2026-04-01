"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Phone,
  BookOpen,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/chat", label: "AI Coach", icon: MessageSquare },
  { href: "/dashboard/calls", label: "Call Library", icon: Phone },
  { href: "/dashboard/admin", label: "Admin Panel", icon: Settings },
  { href: "/dashboard/training", label: "Training", icon: BookOpen },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-navy flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-navy-300/50 border-r border-white/5 flex flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-300 flex items-center justify-center">
              <Brain className="w-6 h-6 text-navy" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">
                Boardroom Brain
              </span>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-gold-400">
                by Kent Clothier
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-gold/10 text-gold border border-gold/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-600 flex items-center justify-center text-navy font-bold text-sm">
              KC
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                Kent Clothier
              </div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
            <Link href="/" className="text-gray-500 hover:text-gold transition-colors">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
