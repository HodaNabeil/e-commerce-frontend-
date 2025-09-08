import useCartStore from "@/features/cart/store/cart";
import { CartItems } from "@/types/cart";
import { Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ item }: { item: CartItems }) {
  const { removeFromCart, updateQuantity } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item, newQuantity);
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300 border-gray-200">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Image Section */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.images[item.selectedColor]}
              alt={item.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg line-clamp-2">
                {item.name}
              </h3>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  Size: {item.selectedSize}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Color: {item.selectedColor}
                </Badge>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <p className="text-lg font-bold text-green-600">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex flex-col gap-2 self-start sm:self-center">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeFromCart(item)}
              className="h-9 w-9 p-0 hover:scale-105 transition-transform"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
