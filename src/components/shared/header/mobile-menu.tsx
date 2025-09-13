"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import BrandLogo from "../BrandLogo";
import Link from "next/link";

interface MobileMenuProps {
  links: Array<{
    id: string;
    title: string;
    href: string;
  }>;
}

export default function MobileMenu({ links }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 bg-background">
        <div className="flex h-full w-full flex-col p-4">
          <SheetHeader className="flex flex-row justify-between items-center">
            <BrandLogo
              className="w-8 h-8 md:w-10 md:h-10"
              width={40}
              height={40}
            />
            <SheetTitle className="sr-only">القائمة الرئيسية</SheetTitle>
            <SheetDescription className="sr-only">
              استخدم هذه القائمة للتنقل بين الصفحات
            </SheetDescription>
          </SheetHeader>
          <nav className="mt-8 flex-1">
            <ul className="space-y-4">
              {Array.isArray(links) &&
                links.map((link) => (
                  <li key={link.id}>
                    <Link href={link.href}>{link.title}</Link>
                  </li>
                ))}
            </ul>
          </nav>
          <div className="py-6 flex flex-col items-stretch gap-4 border-t border-border">
            <Link
              href="/login"
              className={buttonVariants({
                variant: "outline",
                className: "w-full justify-center",
              })}
            >
              دخول
            </Link>
            <Link
              href="/register"
              className={buttonVariants({
                className: "w-full justify-center",
              })}
            >
              انضم الان
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
