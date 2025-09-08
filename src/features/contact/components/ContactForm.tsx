export default function ContactForm() {
  return (
    <form className="space-y-4 mt-2 relative">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-gray-700 font-medium capitalize">
          Name
        </label>
        <input
          type="text"
          id="name"
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
          rows={4}
          className="border border-orange-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

      <button
        type="submit"
        className=" top-full mt-2 bg-orange-600
               hover:bg-orange-700 text-white font-semibold rounded px-6 py-2 transition"
      >
        Send
      </button>
    </form>
  );
}
