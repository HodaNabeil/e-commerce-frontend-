"use client";

import BrandLogo from "@/components/shared/BrandLogo";
import LoginForm from "@/features/auth/Login/components/LoginFrom";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <BrandLogo className="w-8 h-8 md:w-10 md:h-10" width={45} height={45} />
        <div className="bg-white shadow-lg rounded-lg p-8">
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
