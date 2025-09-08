import React from "react";
import { Product } from "@/types/product";

export default function ProfileProduct({
  product,
  selectedColor,
  selectedSize,
}: {
  product: Product;
  selectedColor: string;
  selectedSize: string;
}) {
  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Color: {selectedColor}</span>
          <span>•</span>
          <span>Size: {selectedSize.toUpperCase()}</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed m-2">
        {product.description}
      </p>
      <div className="text-3xl font-bold text-gray-900 m-2">
        ${product.price.toFixed(2)}
      </div>
      {/* Product Availability */}
      <div className="flex items-center gap-2 text-sm text-green-600 m-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span>In Stock</span>
      </div>
    </div>
  );
}
