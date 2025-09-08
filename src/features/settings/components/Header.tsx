import { ArrowLeft, Settings } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-white shadow-sm border-b  container m-auto">
      <div className="max-w-4xl px-4 sm:px-6 lg:px-8 py-4 mt-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl sm:text-xl font-bold text-gray-900">
              Settings
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
