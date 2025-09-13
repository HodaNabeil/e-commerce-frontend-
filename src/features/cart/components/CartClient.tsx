"use client";

import { useCartAllStore } from "../hooks/useCartStore";
import OrderSummary from "./OrderSummary";
import Steps from "./Steps";

export default function CartClient({
  activeStep,
  searchParams,
}: {
  activeStep: number;
  searchParams: { step?: string };
}) {
  const { cart } = useCartAllStore();
  const hasItems = cart.length > 0;

  return (
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
            <OrderSummary activeStep={activeStep} searchParams={searchParams} />
          </div>
        </div>
      )}
    </div>
  );
}
