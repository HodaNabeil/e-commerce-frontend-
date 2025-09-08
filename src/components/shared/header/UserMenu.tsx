"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, HelpCircle } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuthStore";
import Link from "next/link";
import RemoteImage from "../RemoteImage";
import { useCartAllStore } from "@/features/cart/hooks/useCartStore";
import { useRouter } from "next/navigation";

export function UserMenu({ align }: { align?: "start" | "end" | "center" }) {
  const { user, logout } = useAuth();
  const { resetCartStore } = useCartAllStore();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logout();
      router.push("/login");
      resetCartStore();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    user && (
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                {user?.photoURL ? (
                  <RemoteImage
                    prefix="static"
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="!h-10 !w-10 object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-primary text-white">
                    {user.displayName?.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 border-border"
            align={align || "end"}
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {`${user.displayName}`}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href="/settings"
                className="cursor-pointer flex items-center gap-2"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/" className="cursor-pointer flex items-center gap-2">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  );
}
