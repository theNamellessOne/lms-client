import { UserDetails } from "@/components/user-details";
import { ThemeSwitch } from "@/components/theme-switch";
import { SidebarMobile } from "@/components/layout/sidebar/sidebar-mobile";

export function Navbar() {
  return (
    <nav
      className={
        "w-full flex items-center h-[74px] border-b px-2 shadow-sm dark:shadow-gray-900 z-40"
      }
    >
      <div className={"lg:hidden"}>
        <SidebarMobile />
      </div>
      <div className={"ml-auto"}>
        <UserDetails /> <ThemeSwitch />
      </div>
    </nav>
  );
}
