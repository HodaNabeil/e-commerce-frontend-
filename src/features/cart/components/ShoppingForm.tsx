"use client";

import { useForm } from "react-hook-form";

import { ShippingFormValues, shippingFSchema } from "@/validations/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
export default function ShoppingForm({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormValues) => void;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFSchema),
  });
  const handleShippingForm = handleSubmit(async (data: ShippingFormValues) => {
    setShippingForm(data);
    router.push("/cart?step=3", { scroll: false });
  });

  return (
    <form onSubmit={handleShippingForm} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="name"
          className="block mb-1  text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          className="w-full px-4 py-2 border
             border-gray-300 rounded-md !outline-none focus:ring-gray-200
              focus:border-gray-200 placeholder-gray-400"
          {...register("name")}
        />
        {errors.name && (
          <p className=" text-xs text-red-500 mt-1.5">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block  mb-1 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          className="w-full px-4 py-2 border
             border-gray-300 rounded-md  !outline-none focus:ring-gray-200
              focus:border-gray-200 placeholder-gray-400"
          {...register("email")}
        />
        {errors.email && (
          <p className=" text-xs text-red-500 mt-1.5">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          placeholder="Enter your phone number"
          className="w-full px-4 py-2 border
             border-gray-300 rounded-md  !outline-none focus:ring-gray-200
              focus:border-gray-200 placeholder-gray-400"
          {...register("phone")}
        />
        {errors.phone && (
          <p className=" text-xs text-red-500 mt-1.5">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="address"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          placeholder="Enter your address"
          className="w-full px-4 py-2 border
             border-gray-300 rounded-md !outline-none focus:ring-gray-200
              focus:border-gray-200 placeholder-gray-400"
          {...register("address")}
        />
        {errors.address && (
          <p className=" text-xs text-red-500 mt-1.5">
            {errors.address.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="city"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          City
        </label>
        <input
          type="text"
          id="city"
          placeholder="Enter your city"
          className="w-full px-4 py-2 border
             border-gray-300 rounded-md  !outline-none focus:ring-gray-200
              focus:border-gray-200 placeholder-gray-400"
          {...register("city")}
        />
        {errors.city && (
          <p className=" text-xs text-red-500 mt-1.5">{errors.city.message}</p>
        )}
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
            <ArrowRight className="w-3 h-3 ml-2 flex items-center " />
          </div>
        )}
      </button>
    </form>
  );
}
