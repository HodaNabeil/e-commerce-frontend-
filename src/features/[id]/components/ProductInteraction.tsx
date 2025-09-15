"use client";

import useCartStore from "@/features/cart/store/cart";
import { Product } from "@/types/product";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ProductInteractionProps {
  selectedSize: string;
  selectedColor: string;
  product: Product;
}

export default function ProductInteraction({
  selectedSize,
  selectedColor,
  product,
}: ProductInteractionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const serachParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(serachParams.toString());
    params.set(type, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleChangeQuantity = (type: "decrease" | "increase") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    });
    toast.success("Product added to cart");
  };
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base font-semibold mb-3 block">Size</Label>
          <div className="flex gap-3">
            {product.sizes.map((size) => (
              <Button
                key={size}
                onClick={() => handleTypeChange("size", size)}
                variant={selectedSize === size ? "default" : "outline"}
                size="sm"
                className="w-[40px] h-[40px] rounded-md font-medium cursor-pointer"
                aria-pressed={selectedSize === size}
                aria-label={`Select size ${size}`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-base font-semibold mb-3 block">Color</Label>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <Button
                key={color}
                onClick={() => handleTypeChange("color", color)}
                variant="outline"
                size="sm"
                className={`w-[40px] h-[40px] rounded-md p-0 border-2 transition-all cursor-pointer ${
                  selectedColor === color
                    ? "ring-2 ring-primary ring-offset-2"
                    : ""
                }`}
                style={{ backgroundColor: color }}
                aria-pressed={selectedColor === color}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Quantity</Label>
        <div className="flex items-center border border-input rounded-md w-fit bg-background">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleChangeQuantity("decrease")}
            aria-label="Decrease quantity"
            className="h-10 w-10 cursor-pointer"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleChangeQuantity("increase")}
            aria-label="Increase quantity"
            className="h-10 w-10 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          onClick={handleAddToCart}
          className="w-full h-12 text-base font-semibold cursor-pointer"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 text-base font-semibold cursor-pointer"
          size="lg"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Buy Now
        </Button>
      </div>
    </div>
  );
}
