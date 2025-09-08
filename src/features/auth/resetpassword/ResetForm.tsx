"use client";
import { useState, type FormEvent } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { auth } from "@/lib/firebaseClient";

export default function ResetForm() {
  const [form, setForm] = useState({
    email: "",
    loading: false,
  });

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, loading: true }));

    try {
      await sendPasswordResetEmail(auth, form.email);
      toast.success(" A password reset link has been sent to your email");
      setForm({ email: "", loading: false });
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/user-not-found") {
          toast.error(" No user found with this email");
        } else if (err.code === "auth/too-many-requests") {
          toast.error(" Too many attempts. Please try again later.");
        } else {
          toast.error("⚠️ Error: " + err.message);
        }
      } else if (err instanceof Error) {
        toast.error("⚠️ Error: " + err.message);
      } else {
        toast.error("⚠️ An unexpected error occurred.");
      }
      setForm((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <form
      onSubmit={handleReset}
      className="space-y-4 w-full max-w-md mx-auto p-4 sm:p-6"
    >
      <input
        type="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            email: (e.target as HTMLInputElement).value,
          }))
        }
        required
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />

      <button
        type="submit"
        disabled={form.loading}
        className={`w-full text-white font-medium py-2 rounded-lg transition ${
          form.loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {form.loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
}
