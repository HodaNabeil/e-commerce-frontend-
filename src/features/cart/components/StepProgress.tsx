import { ShoppingBag, Truck, CreditCard, CheckCircle } from "lucide-react";
import { JSX } from "react";

interface StepInfo {
  icon: JSX.Element;
  title: string;
  desc: string;
}

const stepsInfo: Record<number, StepInfo> = {
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

const stepsArray = Object.keys(stepsInfo).map((key) => parseInt(key));

interface StepProgressProps {
  activeStep: number;
}

export default function StepProgress({ activeStep }: StepProgressProps) {
  const totalSteps = stepsArray.length;

  return (
    <div className="flex items-center justify-between w-full">
      {stepsArray.map((step, idx) => {
        const isCompleted = step < activeStep;
        const isActive = step === activeStep;

        return (
          <div key={step} className="flex items-center w-full">
            {/* Circle */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 ${
                isCompleted
                  ? "bg-yellow-400 text-white"
                  : isActive
                  ? "bg-yellow-200 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {isCompleted ? <CheckCircle className="w-4 h-4" /> : step}
            </div>

            {/* Connector */}
            {idx < totalSteps - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                  isCompleted ? "bg-yellow-400" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
