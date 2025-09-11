"use client";

import Header from "@/features/cart/components/Header";
import ItemsSteps from "@/features/cart/components/ItemsSteps";
import OrderSummary from "@/features/cart/components/OrderSummary";
import Steps from "@/features/cart/components/Steps";
import useCartStore from "@/features/cart/store/cart";
import { useSearchParams } from "next/navigation";

export default function Cart() {
  const searchParams = useSearchParams();
  const activeStep = parseInt(searchParams.get("step") || "1");
  const { cart } = useCartStore();
  const hasItems = cart.length > 0;
  return (
    <div className="bg-background container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="min-h-screen">
        {/* Header */}
        <Header />

        {/* Progress Steps */}
        <div className="mb-8 lg:mb-12">
          <ItemsSteps activeStep={activeStep} />
        </div>

        {/* Main Content */}
        <div
          className={`grid grid-cols-1 ${
            hasItems ? "lg:grid-cols-3" : "lg:grid-cols-1"
          } gap-8 lg:gap-12`}
        >
          {/* Cart Steps - Left Column */}
          <div className={hasItems ? "lg:col-span-2" : "lg:col-span-1"}>
            <Steps activeStep={activeStep} />
          </div>

          {/* Order Summary - Right Column */}

          {hasItems && (
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary activeStep={activeStep} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
