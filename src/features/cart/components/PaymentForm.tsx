"use client";
import { useForm } from "react-hook-form";

import { paymentFormSchema, PaymentFormValues } from "@/validations/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
  });

  const handlePaymentForm = handleSubmit(async (data: PaymentFormValues) => {
    console.log("Payment data:", data);
    // TODO: Implement payment processing logic
  });

  return (
    <form onSubmit={handlePaymentForm} className="flex flex-col gap-2">
      <div>
        <label
          htmlFor="cardHolder"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Card Holder Name
        </label>
        <input
          type="text"
          id="cardHolder"
          placeholder="Enter card holder name"
          className="w-full px-4 py-2 border
             border-gray-300 rounded-md !outline-none focus:ring-gray-200
              focus:border-gray-200 placeholder-gray-400"
          {...register("cardHolder")}
        />
        {errors.cardHolder && (
          <p className="text-xs text-red-500 mt-1.5">
            {errors.cardHolder.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="cardNumber"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          placeholder="Enter card number (16 digits)"
          className="w-full px-4 py-2 border
             border-gray-300 rounded-md !outline-none focus:ring-gray-200
              focus:border-gray-200 placeholder-gray-400"
          maxLength={16}
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-xs text-red-500 mt-1.5">
            {errors.cardNumber.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="expirationDate"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Expiry Date
        </label>
        <input
          type="text"
          id="expirationDate"
          placeholder="MM/YY"
          className="w-full px-4 py-2 border
               border-gray-300 rounded-md !outline-none focus:ring-gray-200
                focus:border-gray-200 placeholder-gray-400"
          maxLength={5}
          {...register("expirationDate")}
        />
        {errors.expirationDate && (
          <p className="text-xs text-red-500 mt-1.5">
            {errors.expirationDate.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="cvv"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          placeholder="CVV"
          className="w-full px-4 py-2 border
               border-gray-300 rounded-md !outline-none focus:ring-gray-200
                focus:border-gray-200 placeholder-gray-400"
          maxLength={3}
          {...register("cvv")}
        />
        {errors.cvv && (
          <p className="text-xs text-red-500 mt-1.5">{errors.cvv.message}</p>
        )}
      </div>

      <div className="flex gap-4 items-center my-3">
        <Image
          src="/klarna.png"
          alt="klara"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src="/cards.png"
          alt="klara"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src="/stripe.png"
          alt="klara"
          width={50}
          height={25}
          className="rounded-md"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 border cursor-pointer 
         border-transparent rounded-md  text-sm font-medium text-white
          focus:outline-none 
           focus:ring-offset-2 
            disabled:cursor-not-allowed 
            transition-colors duration-200  bg-gray-900 hover:bg-gray-800  "
      >
        {isSubmitting ? (
          "Processing..."
        ) : (
          <div className="flex items-center justify-center">
            Continue
            <ShoppingCart className="w-3 h-3 ml-2 flex items-center " />
          </div>
        )}
      </button>
    </form>
  );
}
