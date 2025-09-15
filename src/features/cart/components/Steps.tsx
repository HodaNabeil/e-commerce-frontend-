"use client";

import { JSX, useState } from "react";

import { ShippingFormValues } from "@/validations/cart";
import { ShoppingBag, Truck, CreditCard, CheckCircle } from "lucide-react";
import { useCartAllStore } from "../hooks/useCartStore";
import StepHeader from "./StepHeader";
import StepContent from "./StepContent";
import StepProgress from "./StepProgress";

const stepsInfo: Record<
  number,
  { icon: JSX.Element; title: string; desc: string }
> = {
  1: {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: "Review Cart Items",
    desc: "Review and modify your cart items before proceeding",
  },
  2: {
    icon: <Truck className="w-6 h-6" />,
    title: "Shipping Information",
    desc: "Enter your shipping details for delivery",
  },
  3: {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Payment Details",
    desc: "Complete your purchase with secure payment",
  },
};

interface StepsProps {
  activeStep: number;
}

export default function Steps({ activeStep }: StepsProps) {
  const [shippingForm, setShippingForm] = useState<ShippingFormValues>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const { cart: cartItems } = useCartAllStore();

  const { icon, title, desc } = stepsInfo[activeStep] || {
    icon: <CheckCircle />,
    title: "Order Complete",
    desc: "Your order has been successfully placed",
  };

  return (
    <div className="w-full bg-white shadow-xl border border-gray-100 rounded-2xl overflow-hidden">
      <StepHeader icon={icon} title={title} description={desc} />
      <div className="p-8">
        <StepContent
          activeStep={activeStep}
          cartItems={cartItems}
          shippingForm={shippingForm}
          setShippingForm={setShippingForm}
        />
      </div>
      <div className="px-8 pb-6">
        <StepProgress activeStep={activeStep} />
      </div>
    </div>
  );
}
