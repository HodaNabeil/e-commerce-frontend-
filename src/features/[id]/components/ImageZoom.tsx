"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function ImageZoom({
  product,
  selectedColor,
  zoomLevel = 300,
}: {
  product: Product;
  selectedColor: string;
  zoomLevel?: number;
}) {
  const lensRef = useRef<HTMLDivElement>(null);
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (lensRef.current) {
      lensRef.current.style.top = `${y}%`;
      lensRef.current.style.left = `${x}%`;
      lensRef.current.style.backgroundPosition = `${x}% ${y}%`;
    }
  };

  const imageSrc =
    product.images[selectedColor] ?? product.images[product.colors[0]];

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-md cursor-zoom-in"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsZooming(true)}
      onMouseLeave={() => setIsZooming(false)}
    >
      <Image
        src={imageSrc}
        alt={product.name}
        fill
        className="object-contain rounded-md select-none"
      />

      {isZooming && (
        <div
          ref={lensRef}
          className="absolute w-40 h-40 rounded-full border border-gray-300 shadow-lg pointer-events-none transition-transform duration-150 ease-out"
          style={{
            transform: "translate(-50%, -50%)",
            backgroundImage: `url(${imageSrc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${zoomLevel}% ${zoomLevel}%`,
          }}
        />
      )}
    </div>
  );
}
