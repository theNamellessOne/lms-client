"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <button
      onClick={() => router.push(href)}
      className={cn(
        "flex items-center transition-colors pl-6 py-5 gap-x-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-foreground hover:bg-primary/10 dark:hover:bg-primary-foreground/10",
        isActive &&
          "text-primary dark:text-primary-foreground bg-primary/10 dark:bg-primary-foreground/10 relative",
      )}
    >
      <Icon size={22} />
      {label}
      {isActive ? (
        <span
          className={
            "absolute block h-[64px] rounded-full w-1 bg-primary right-0 top-0"
          }
        ></span>
      ) : null}
    </button>
  );
}
