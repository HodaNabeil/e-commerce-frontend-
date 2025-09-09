"use client";

import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, Heart, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useCartStore from "@/features/cart/store/cart";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCartStore();
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (product: Product) => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });
    toast.success("Product added to cart", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Removed from favorites" : "Added to favorites",
      {
        position: "bottom-right",
        autoClose: 2000,
      }
    );
  };

  const handleProductTypeChange = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <Card className="group    h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-border/50 hover:border-border bg-card/50 backdrop-blur-sm">
      {/* Image Section */}
      <CardHeader className="p-0 relative">
        <Link
          href={`/products/${product.id}?color=${encodeURIComponent(
            productTypes.color
          )}&size=${encodeURIComponent(productTypes.size)}`}
          className="block"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={product.images[productTypes.color]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              className="object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quick View Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-foreground shadow-lg">
                Quick View
              </div>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-sm">
              <span>{product.rating.toFixed(1)}</span>
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            </div>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleFavorite();
              }}
              className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <Heart
                className={`w-4 h-4 transition-all duration-200 ${
                  isFavorite
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-muted-foreground hover:text-red-500"
                }`}
              />
            </button>

            {/* Discount Badge */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
              -20%
            </div>
          </div>
        </Link>
      </CardHeader>

      {/* Product Details */}
      <CardContent className="flex-1 flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6">
        <div className="space-y-1 sm:space-y-2">
          <h3 className="font-semibold text-base sm:text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Product Options */}
        <div className="space-y-3 sm:space-y-4">
          {/* Size Selection */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-2">
              <span>Size</span>
              <span className="text-xs text-muted-foreground/70">
                ({productTypes.size})
              </span>
            </label>
            <select
              name="size"
              id="size"
              className="w-full cursor-pointer px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-input bg-background rounded-md 
                       ring-offset-background focus-visible:outline-none focus-visible:ring-2 
                       focus-visible:ring-ring focus-visible:ring-offset-2 
                       transition-all duration-200 hover:border-ring/50"
              value={productTypes.size}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleProductTypeChange({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option value={size} key={size} className="text-foreground">
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-2">
              <span>Color</span>
              <span className="text-xs text-muted-foreground/70 capitalize">
                ({productTypes.color})
              </span>
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() =>
                    handleProductTypeChange({ type: "color", value: color })
                  }
                  className={`relative w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all 
                            duration-200 hover:scale-110 focus:outline-none focus:ring-2
                            focus:ring-ring focus:ring-offset-2 shadow-sm cursor-pointer ${
                              productTypes.color === color
                                ? `border-foreground ring-2 ring-ring ring-offset-2`
                                : "border-border hover:border-ring/50"
                            }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                >
                  {productTypes.color === color && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-sm" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Price and Add to Cart */}
      <CardFooter className="p-3 sm:p-4 lg:p-6 pt-0">
        <div className="w-full flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
          </div>

          {
            // <div className="flex items-center gap-2">
            //   <span className="text-sm text-gray-600">Quantity:</span>
            //   <div className="flex items-center border rounded-md">
            //     <Button
            //       variant="ghost"
            //       size="sm"
            //       onClick={() => handleQuantityChange(item.quantity - 1)}
            //       className="h-8 w-8 p-0 hover:bg-gray-100"
            //       disabled={item.quantity <= 1}
            //     >
            //       <Minus className="h-3 w-3" />
            //     </Button>
            //     <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
            //     {}
            //     </span>
            //     <Button
            //       variant="ghost"
            //       size="sm"
            //       onClick={() => handleQuantityChange(item.quantity + 1)}
            //       className="h-8 w-8 p-0 hover:bg-gray-100"
            //     >
            //       <Plus className="h-3 w-3" />
            //     </Button>
            //   </div>
            // </div>
          }

          <Button
            onClick={() => handleAddToCart(product)}
            className="flex items-center gap-2 min-w-[100px] sm:min-w-[120px] lg:min-w-[140px] shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            size="sm"
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline text-xs sm:text-sm">
              Add to Cart
            </span>
            <span className="sm:hidden text-xs">Add</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
