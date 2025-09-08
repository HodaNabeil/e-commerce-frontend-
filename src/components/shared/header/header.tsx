"use client";

import { UserMenu } from "./UserMenu";
import AuthLinks from "./auth-links";
import MobileMenu from "./mobile-menu";
import ShoppingCart from "./shopping-cart";
import { Skeleton } from "@/components/ui/skeleton";

import { useAuth } from "@/features/auth/hooks/useAuthStore";
import Navbar, { links } from "@/components/shared/header/navbar";
import BrandLogo from "../BrandLogo";

export default function Header() {
  const { user, isLoading } = useAuth();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm backdrop-blur  ">
        <div className="container m-auto">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center flex-1 justify-between lg:justify-start gap-4 lg:gap-10">
              <BrandLogo
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10"
                nameClass="hidden sm:block text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                wrapperClass="flex items-center"
              />
              <MobileMenu links={links} />
              <Navbar />
            </div>
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
          </div>
        </div>
      </header>

      <div className="h-20"></div>
    </>
  );
}
