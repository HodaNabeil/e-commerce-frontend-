"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // // هنا ممكن ترسل البيانات عبر API
    // console.log("Form submitted", formData);

    // // feedback
    // toast.success("Message sent successfully!");

    // // مسح الحقول
    // setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form className="space-y-4 mt-2 relative" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-gray-700 font-medium capitalize">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="border border-orange-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-gray-700 font-medium capitalize">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="border border-orange-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-gray-700 font-medium capitalize"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="border border-orange-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

      <button
        type="submit"
        className="mt-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded px-6 py-2 transition"
      >
        Send
      </button>
    </form>
  );
}
