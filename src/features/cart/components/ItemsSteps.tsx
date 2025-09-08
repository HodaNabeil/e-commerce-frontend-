"use client";
const steps = [
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping address" },
  { id: 3, title: "Payment Method" },
];
export default function ItemsSteps({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row  items-center">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex gap-3 font-medium items-center
                border-b-2 pb-4
               ${
                 activeStep === step.id
                   ? " border-gray-800"
                   : "border-gray-200 text-gray-400"
               }`}
        >
          <p
            className={`w-6 h-6 rounded-full flex justify-center items-center p-4
                 ${
                   activeStep === step.id
                     ? "bg-gray-800 text-white"
                     : "bg-gray-200 text-gray-400"
                 }`}
          >
            {step.id}
          </p>
          <p
            className={` font-medium text-sm
                 ${activeStep === step.id ? " text-white" : " text-gray-400"}`}
          >
            {step.title}
          </p>
        </div>
      ))}
    </div>
  );
}
