"use client";

import { UserDetails } from "@/components/user-details";
import { SidebarMobile } from "@/components/layout/sidebar/sidebar-mobile";
import { useAuth } from "@/providers/auth-provider";

export function Navbar() {
  const { currentUser } = useAuth();

  return (
    <nav
      className={
        "w-full flex items-center h-[74px] border-b px-4 shadow-sm dark:shadow-gray-900 z-40"
      }
    >
      <div className={"lg:hidden"}>
        <SidebarMobile />
      </div>
      <div className={"ml-auto flex items-center"}>
        <UserDetails />
      </div>
    </nav>
  );
}
