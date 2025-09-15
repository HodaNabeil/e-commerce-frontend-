import React from "react";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";

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
    <div className="space-y-4">
      {/* Product Title */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {product.name}
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Color: {selectedColor}</span>
          <span>•</span>
          <span>Size: {selectedSize.toUpperCase()}</span>
        </div>
      </div>

      {/* Product Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      {/* Price Section */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-sm text-muted-foreground line-through">
          ${(product.price * 1.2).toFixed(2)}
        </span>
      </div>

      {/* Availability (currently static) */}
      <Badge className="text-xs">In Stock</Badge>
    </div>
  );
}
