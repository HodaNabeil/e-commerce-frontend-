import { CartItems } from "@/types/cart";
import PaymentForm from "./PaymentForm";
import ProductCard from "./ProductCard";
import ShoppingForm from "./ShoppingForm";
import { useState } from "react";
import useCartStore from "@/features/cart/store/cart";
import { ShippingFormValues } from "@/validations/cart";
import { ShoppingBag, Truck, CreditCard, CheckCircle } from "lucide-react";

export default function Steps({ activeStep }: { activeStep: number }) {
  const [shippingForm, setShippingForm] = useState<ShippingFormValues>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const { cart } = useCartStore();
  const cartItems = cart;

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <ShoppingBag className="w-6 h-6" />;
      case 2:
        return <Truck className="w-6 h-6" />;
      case 3:
        return <CreditCard className="w-6 h-6" />;
      default:
        return <CheckCircle className="w-6 h-6" />;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Review Cart Items";
      case 2:
        return "Shipping Information";
      case 3:
        return "Payment Details";
      default:
        return "Order Complete";
    }
  };

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1:
        return "Review and modify your cart items before proceeding";
      case 2:
        return "Enter your shipping details for delivery";
      case 3:
        return "Complete your purchase with secure payment";
      default:
        return "Your order has been successfully placed";
    }
  };

  return (
    <div className="w-full bg-white shadow-xl border border-gray-100 rounded-2xl overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#f8c33c] to-[#bd4a31] px-8 py-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          {getStepIcon(activeStep)}
          <h2 className="text-2xl font-bold">{getStepTitle(activeStep)}</h2>
        </div>
        <p className="text-blue-100 text-sm">
          {getStepDescription(activeStep)}
        </p>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {activeStep === 1 ? (
          <div className="space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Cart Items ({cartItems.length})
                  </h3>
                  <div className="text-sm text-gray-500">
                    Step {activeStep} of 3
                  </div>
                </div>
                <div className="space-y-4">
                  {cartItems.map((item: CartItems) => (
                    <div
                      key={item.id + item.selectedSize + item.selectedColor}
                      className="transform transition-all duration-300 hover:scale-[1.02]"
                    >
                      <ProductCard item={item} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : activeStep === 2 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Shipping Information
              </h3>
              <div className="text-sm text-gray-500">
                Step {activeStep} of 3
              </div>
            </div>
            <ShoppingForm setShippingForm={setShippingForm} />
          </div>
        ) : activeStep === 3 && shippingForm ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Payment Details
              </h3>
              <div className="text-sm text-gray-500">
                Step {activeStep} of 3
              </div>
            </div>
            <PaymentForm />
          </div>
        ) : (
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
        )}
      </div>

      {/* Progress Indicator */}
      <div className="px-8 pb-6">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  step <= activeStep
                    ? "bg-[#f8c33c] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step < activeStep ? <CheckCircle className="w-4 h-4" /> : step}
              </div>
              {step < 3 && (
                <div
                  className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    step < activeStep ? "bg-[#f8c33c]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
