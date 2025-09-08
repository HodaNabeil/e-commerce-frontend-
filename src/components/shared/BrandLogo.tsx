"use client";

import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  className?: string;
  width: number;
  height: number;
  nameClass?: string;
  text?: string;
  wrapperClass?: string;
};

export default function BrandLogo({
  className,
  width,
  height,
  nameClass,
  text,
  wrapperClass,
}: BrandLogoProps) {
  return (
    <div className={wrapperClass || "text-center mb-6"}>
      <Link
        href="/"
        className="flex justify-center items-center group"
        aria-label="Go to homepage"
      >
        <Image
          src="/logo.png"
          alt="Online Shopping Logo"
          width={width}
          height={height}
          sizes="(max-width: 768px) 32px, 40px"
          priority
          className={`${className} transition-transform duration-200 group-hover:scale-105`}
        />
        <span className={nameClass}>{text || "Online Shopping"}</span>
      </Link>
    </div>
  );
}

BrandLogo.defaultProps = {
  className: "w-8 h-8 md:w-10 md:h-10",
  nameClass:
    "text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent",
  wrapperClass: "text-center mb-6",
  text: "Online Shopping",
};
