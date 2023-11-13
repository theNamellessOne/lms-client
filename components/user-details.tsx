"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import Image from "next/image";

export function UserDetails() {
  // @ts-ignore
  const { isAuth, currentUser, logout } = useAuth();

  return (
    <>
      {isAuth && currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={"p-0 h-fit rounded-full overflow-hidden"}
            >
              {currentUser.avatarUrl ? (
                <Image
                  height={30}
                  width={30}
                  src={currentUser.avatarUrl}
                  alt={"url"}
                />
              ) : (
                <User />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-2">
            <DropdownMenuLabel>
              <p>
                {currentUser.lastName}
                {currentUser.firstName}
              </p>
              <p className={"text-gray-500 text-sm pt-2"}>
                {currentUser.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className={"cursor-pointer"}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  );
}
