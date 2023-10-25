"use client";

import Image from "next/image";
import { Compass, Home, Layout, LogIn } from "lucide-react";
import { SidebarItem } from "@/components/layout/sidebar/sidebar-item";
import { useAuth } from "@/providers/auth-provider";

const baseRoutes = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const guestRoutes = [
  ...baseRoutes,
  {
    icon: LogIn,
    label: "Sign In",
    href: "/auth",
  },
];

const authRoutes = [...baseRoutes];

export function Sidebar() {
  const { isAuth } = useAuth();

  const routes = isAuth ? authRoutes : guestRoutes;

  return (
    <div className={"h-full border-r flex flex-col"}>
      <div className={"p-6"}>
        <Image src={"./logo.svg"} alt={"logo"} width={130} height={130} />
      </div>
      <div className={"flex flex-col gap-y-1 w-full"}>
        {routes.map((route, idx) => {
          return (
            <SidebarItem
              key={idx}
              icon={route.icon}
              href={route.href}
              label={route.label}
            />
          );
        })}
      </div>
    </div>
  );
}
