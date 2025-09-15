"use client";

const steps = [
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping Address" },
  { id: 3, title: "Payment Method" },
];

interface ItemsStepsProps {
  activeStep: number;
}

export default function ItemsSteps({ activeStep }: ItemsStepsProps) {
  return (
    <nav
      aria-label="Progress"
      className="flex flex-col lg:flex-row gap-4 items-center"
    >
      {steps.map((step) => {
        const isActive = activeStep === step.id;

        return (
          <div
            key={step.id}
            className={`flex items-center gap-3 border-b-2 pb-4 transition-colors duration-200
              ${
                isActive ? "border-gray-800" : "border-gray-200 text-gray-400"
              }`}
            aria-current={isActive ? "step" : undefined}
          >
            <span
              className={`flex justify-center items-center w-6 h-6 rounded-full font-medium transition-colors duration-200
                ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
            >
              {step.id}
            </span>
            <span
              className={`text-sm font-medium transition-colors duration-200
                ${isActive ? "text-gray-800" : "text-gray-400"}`}
            >
              {step.title}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
