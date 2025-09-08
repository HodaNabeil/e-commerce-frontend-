import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface MobileMenuProps {
  links: Array<{
    id: string;
    title: string;
    href: string;
  }>;
}

export default function MobileMenu({ links }: MobileMenuProps) {
  // const location = useLocation();

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
            <SheetClose className="p-2 hover:bg-accent rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </SheetClose>
            logogo
          </SheetHeader>
          <nav className="mt-8 flex-1">
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    // className={`block py-2 px-4 rounded-lg transition-colors text-right ${
                    //   location.pathname === link.href
                    //     ? "bg-primary/10 text-primary"
                    //     : "hover:bg-accent text-foreground"
                    // }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="py-6 flex flex-col items-stretch gap-4 border-t border-border">
            <Link
              href="/auth/signin"
              className={buttonVariants({
                variant: "outline",
                className: "w-full justify-center",
              })}
            >
              دخول
            </Link>
            <Link
              href="/auth/signup"
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
