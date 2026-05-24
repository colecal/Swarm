"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const navItems = [
  { href: "/", label: "Dashboard", icon: "⬡" },
  { href: "/goals", label: "Goals", icon: "◎" },
  { href: "/agents", label: "Agents", icon: "◈" },
  { href: "/runs", label: "Runs", icon: "▸" },
  { href: "/results", label: "Results", icon: "◆" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col border-r border-neutral-800/60 bg-surface-0">
      <div className="flex h-16 items-center gap-3 border-b border-neutral-800/60 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent font-mono text-sm font-bold">
          A
        </div>
        <div>
          <div className="text-sm font-semibold text-neutral-100 font-display tracking-tight">
            Command Center
          </div>
          <div className="text-[10px] text-neutral-600 font-mono">v0.1.0</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-neutral-500 hover:bg-surface-3 hover:text-neutral-300"
              )}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-800/60 p-4">
        <div className="text-[10px] text-neutral-700 font-mono">Claude Max · 15 runs/day</div>
      </div>
    </aside>
  );
}
