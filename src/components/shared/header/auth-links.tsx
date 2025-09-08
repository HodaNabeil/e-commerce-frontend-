import Link from "next/link";
import { buttonVariants } from "../../ui/button";

interface AuthLinksProps {
  className?: string;
}

export default function AuthLinks({ className = "" }: AuthLinksProps) {
  return (
    <div className={`hidden lg:flex items-center gap-6 ${className}`}>
      <Link
        href="/login"
        className={`${buttonVariants({
          variant: "link",
        })} !text-lg !font-medium hover:text-[#f8c33c]`}
      >
        Login
      </Link>
      <Link
        href="/register"
        className={`${buttonVariants({
          size: "lg",
        })} !font-bold !bg-[#f8c33c] hover:!bg-[#ffd774]`}
      >
        Join Now
      </Link>
    </div>
  );
}
