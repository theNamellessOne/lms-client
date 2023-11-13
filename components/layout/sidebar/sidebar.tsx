"use client";

import Image from "next/image";
import { BarChart, Compass, Home, Layout, List, LogIn } from "lucide-react";
import { SidebarItem } from "@/components/layout/sidebar/sidebar-item";
import { useAuth } from "@/providers/auth-provider";
import { ThemeSwitch } from "@/components/theme-switch";

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
    href: "/browse",
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
const teacherRoutes = [
  ...authRoutes,
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export function Sidebar() {
  const { isAuth, currentUser } = useAuth();

  let routes;

  routes = isAuth ? authRoutes : guestRoutes;
  routes = currentUser["isTeacher"] ? teacherRoutes : routes;

  return (
    <div className={"h-full border-r overflow-y-scroll flex flex-col"}>
      <div className={"p-6"}>
        <Image src={"/logo.svg"} alt={"logo"} width={130} height={130} />
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
      <div className={"p-4 h-full flex justify-start items-end"}>
        <ThemeSwitch />
      </div>
    </div>
  );
}
