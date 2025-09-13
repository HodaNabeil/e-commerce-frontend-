"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation"; // ✅ أضفت useSearchParams
import { toast } from "react-toastify";
import Link from "next/link";
import { LoginFormInputs, loginSchema } from "@/validations/login";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Loader from "@/components/shared/Loader";
import { useAuth } from "../../hooks/useAuthStore";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ جبت الـ params
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const user = await login(data);

      if (user) {
        toast.success("Login successful!");

        const redirect = searchParams.get("redirect");
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const loginInputs = [
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
  ];

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" space-y-3 sm:space-y-4"
      >
        {loginInputs.map((input) => (
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
                    ? showPassword
                      ? "text"
                      : "password"
                    : input.type
                }
                placeholder={input.placeholder}
                {...register(input.name as keyof LoginFormInputs)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f8c33c] focus:border-[#f8c33c] pr-10 transition-colors"
              />

              {input.type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className=" cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>

            {errors[input.name as keyof LoginFormInputs] && (
              <p className="text-red-500 text-xs sm:text-sm mt-2">
                {errors[input.name as keyof LoginFormInputs]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer w-full bg-[#f8c33c] text-white py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base font-medium rounded-md hover:bg-[#f8c33c]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f8c33c] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
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
            "Login"
          )}
        </button>
      </form>
      <Link
        href="/forgotpassword"
        className="hover:underline text-[#f8c33c] hover:text-[#f8c33c]/90 transition-colors cursor-pointer"
      >
        Forgot your password?
      </Link>
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-[#f8c33c] hover:text-[#f8c33c]/90 transition-colors cursor-pointer"
          >
            Create a new account
          </Link>
        </p>
      </div>
    </>
  );
}

export default LoginForm;
