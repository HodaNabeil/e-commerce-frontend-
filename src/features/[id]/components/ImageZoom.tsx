"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";

export default function ImageZoom({
  product,
  selectedColor,
}: {
  product: Product;
  selectedColor: string;
}) {
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-md cursor-zoom-in"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setLensPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      onMouseLeave={() => setLensPos(null)}
    >
      {/* الصورة الأساسية */}
      <Image
        src={product.images[selectedColor] ?? product.images[product.colors[0]]}
        alt={product.name}
        fill
        className="object-contain rounded-md select-none"
      />

      {/* العدسة المكبرة */}
      {lensPos && (
        <div
          className="absolute w-40 h-40 rounded-full border border-gray-300 shadow-lg pointer-events-none transition-all duration-200 ease-out"
          style={{
            top: `${lensPos.y}%`,
            left: `${lensPos.x}%`,
            transform: "translate(-50%, -50%) scale(1)",
            backgroundImage: `url(${
              product.images[selectedColor] ?? product.images[product.colors[0]]
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "300% 300%",
            backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
          }}
        />
      )}
    </div>
  );
}
