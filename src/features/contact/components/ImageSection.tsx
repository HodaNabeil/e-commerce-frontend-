import Image from "next/image";
import React from "react";

export default function ImageSection() {
  return (
    <figure className="w-full md:w-1/2 flex-shrink-0">
      <Image
        src="/story_right.jpg"
        alt="Luxury Line Contact Page - customer support image"
        width={600}
        height={800}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        className="object-cover rounded-lg w-full h-[60vh] md:h-[80vh] shadow-lg border border-gray-200"
      />
    </figure>
  );
}
