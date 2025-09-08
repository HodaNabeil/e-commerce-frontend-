import ResetForm from "@/features/auth/resetpassword/ResetForm";

export default function ResetPassword() {
  return (
    <div className="flex items-center justify-center p-8 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
          Forgot Password?
        </h2>
        <p className="text-gray-500 text-center ">
          Enter your email address and we&apos;ll send you a reset link
        </p>
        <ResetForm />
      </div>
    </div>
  );
}
