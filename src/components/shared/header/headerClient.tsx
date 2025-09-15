"use client";

import { Skeleton } from "@/components/ui/skeleton";
import AuthLinks from "./auth-links";
import ShoppingCart from "./shopping-cart";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
import Navbar from "./navbar";
import { UserMenu } from "./UserMenu";

export default function HeaderClient() {
  const { user, isLoading } = useAuth();
  return (
    <>
      <Navbar />
      <div className="flex items-center gap-4 lg:gap-6">
        <ShoppingCart />
        {isLoading ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : user ? (
          <UserMenu />
        ) : (
          <AuthLinks />
        )}
      </div>
    </>
  );
}
