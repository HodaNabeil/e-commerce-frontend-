import { ShoppingCartIcon, Trash2, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";
import { useMemo } from "react";
import { CartItems } from "@/types/cart";
import { useCartAllStore } from "@/features/cart/hooks/useCartStore";

function ShoppingCart() {
  const router = useRouter();

  const { cart, clearCart, setIsOpen, isOpen, removeFromCart } =
    useCartAllStore();

  // ✅ totalPrice
  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (sum: number, item: CartItems) =>
          sum + (item.price * item.quantity || 0),
        0
      ),
    [cart]
  );

  // ✅ totalItems
  const totalItems = useMemo(
    () => cart.reduce((sum: number, item: CartItems) => sum + item.quantity, 0),
    [cart]
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-primary">
          <ShoppingCartIcon className="h-6 w-6" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0  text-white flex items-center justify-center text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-96 max-h-[600px] overflow-y-auto border-none rounded-md  mr-40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Shopping Cart</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCartIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button
                variant="link"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/products");
                }}
              >
                Add some products to get started!
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-4">
                {cart.map((item: CartItems) => (
                  <div
                    key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Image
                      src={
                        item.images[item.selectedColor] ||
                        Object.values(item.images)[0]
                      }
                      alt={item.name}
                      width={96}
                      height={56}
                      className="w-24 h-14 object-cover bg-gray-50 rounded-md flex-shrink-0 aspect-[10/6]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-1">
                        Color: {item.selectedColor} | Size: {item.selectedSize}
                      </p>
                      <p className="text-xs text-gray-500 mb-1">
                        Quantity: {item.quantity}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-base text-blue-600 font-bold">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Items:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button
                    variant="default"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/cart");
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={cart.length === 0}
                  >
                    Checkout Now
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="w-full text-gray-600 hover:bg-gray-100"
                    disabled={cart.length === 0}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ShoppingCart;
