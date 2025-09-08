"use client";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "firebase/auth";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import Loader from "@/components/shared/Loader";
import { RegisterFormData, registerSchema } from "@/validations/register";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuthStore";

function RegisterForm() {
  const router = useRouter();

  const { signup } = useAuth();

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await signup(data);

      if (res.user) {
        await updateProfile(res.user, { displayName: data.name });
        toast.success("Account created successfully!");
        router.push("/");
        reset();
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const registerInputs = [
    {
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      name: "name",
      id: "name",
    },
    {
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      name: "email",
      id: "email",
    },
    {
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      name: "password",
      id: "password",
    },
    {
      type: "password",
      label: "Confirm Password",
      placeholder: "Re-enter your password",
      name: "confirmPassword",
      id: "confirmPassword",
    },
  ];

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" space-y-3 sm:space-y-4"
      >
        {registerInputs.map((input) => (
          <div key={input.id} className="relative">
            <label
              htmlFor={input.id}
              className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
            >
              {input.label}
            </label>
            <div className="relative">
              <input
                id={input.id}
                type={
                  input.type === "password"
                    ? showPassword[input.name as keyof typeof showPassword]
                      ? "text"
                      : "password"
                    : input.type
                }
                placeholder={input.placeholder}
                {...register(input.name as keyof RegisterFormData)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[#f8c33c]
              focus:border-[#f8c33c] pr-10"
              />

              {input.type === "password" && (
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      [input.name]: !prev[input.name as keyof typeof prev],
                    }))
                  }
                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword[input.name as keyof typeof showPassword] ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              )}
            </div>

            {errors[input.name as keyof RegisterFormData] && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {
                  errors[input.name as keyof RegisterFormData]
                    ?.message as string
                }
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer  w-full bg-[#f8c33c] text-white py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base font-medium rounded-md 
        hover:bg-[#f8c33cbd] focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-[#f8c33c]
        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center">
              <Loader
                size={24}
                thickness={3}
                color="#ffffff"
                speedSeconds={0.8}
              />
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#f8c33c] hover:text-[#f8c33cbd] cursor-pointer transition-colors "
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

export default RegisterForm;
