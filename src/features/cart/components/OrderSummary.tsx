"use client";

import { CartItems } from "@/types/cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import useCartStore from "@/features/cart/store/cart";

export default function OrderSummary({ activeStep }: { activeStep: number }) {
  const { cart } = useCartStore();
  const cartItems: CartItems[] = cart;
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (acc: number, item: CartItems) => acc + item.price * item.quantity,
    0
  );

  const shipping: number = 0;
  const discountRate: number = 0.08; // 8% discount
  const discountAmount: number = subtotal * discountRate;
  const total: number = subtotal + shipping - discountAmount;

  return (
    <Card className="w-full h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl md:text-2xl font-medium">
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Details */}
        <div className="space-y-3">
          {/* Subtotal */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          {/* Discount */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Discount (8%)</span>
            <span className="font-medium text-green-600">
              -${discountAmount.toFixed(2)}
            </span>
          </div>

          {/* Divider */}
          <hr className="border-border" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-foreground">Total</span>
            <span className="text-base font-semibold">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Continue Button */}
        {activeStep === 1 && cart.length > 0 && (
          <Button
            onClick={() => router.push("/cart?step=2", { scroll: false })}
            className="w-full"
            size="lg"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
