import Link from "next/link";
import { usePathname } from "next/navigation";

export const links = [
  {
    id: crypto.randomUUID(),
    title: "Home",
    href: "/",
  },
  {
    id: crypto.randomUUID(),
    title: "Products",
    href: "/products",
  },
  {
    id: crypto.randomUUID(),
    title: "Contact",
    href: "/contact",
  },

];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-primary font-medium "
                  : "text-muted-foreground"
              } hover:text-primary text-lg  transition-colors duration-200`}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
