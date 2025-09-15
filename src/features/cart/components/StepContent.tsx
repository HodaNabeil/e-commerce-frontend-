import { CartItems } from "@/types/cart";
import ProductCard from "./ProductCard";
import { ShippingFormValues } from "@/validations/cart";
import { ShoppingBag, Truck } from "lucide-react";
import ShoppingForm from "./ShoppingForm";
import PaymentForm from "./PaymentForm";

interface StepContentProps {
  activeStep: number;
  cartItems: CartItems[];
  shippingForm: ShippingFormValues;
  setShippingForm: React.Dispatch<React.SetStateAction<ShippingFormValues>>;
}
export default function StepContent({
  activeStep,
  cartItems,
  shippingForm,
  setShippingForm,
}: StepContentProps) {
  if (activeStep === 1) {
    return cartItems.length === 0 ? (
      <EmptyCart />
    ) : (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Cart Items ({cartItems.length})
          </h3>
          <div className="text-sm text-gray-500">Step {activeStep} of 3</div>
        </div>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id + item.selectedSize + item.selectedColor}
              className="transform transition-all duration-300 hover:scale-[1.02]"
            >
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeStep === 2) {
    return (
      <div className="space-y-6">
        <StepTitle title="Shipping Information" step={activeStep} />
        <ShoppingForm setShippingForm={setShippingForm} />
      </div>
    );
  }

  if (activeStep === 3) {
    return shippingForm ? (
      <div className="space-y-6">
        <StepTitle title="Payment Details" step={activeStep} />
        <PaymentForm />
      </div>
    ) : (
      <MissingShippingForm />
    );
  }

  return null;
}

function EmptyCart() {
  return (
    <div className="text-center py-12">
      <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">
        Your cart is empty
      </h3>
      <p className="text-gray-500">Add some products to get started</p>
    </div>
  );
}

function StepTitle({ title, step }: { title: string; step: number }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="text-sm text-gray-500">Step {step} of 3</div>
    </div>
  );
}
function MissingShippingForm() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Truck className="w-8 h-8 text-amber-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-600 mb-2">
        Shipping Form Required
      </h3>
      <p className="text-gray-500">
        Please complete the shipping form first to proceed with payment
      </p>
    </div>
  );
}
