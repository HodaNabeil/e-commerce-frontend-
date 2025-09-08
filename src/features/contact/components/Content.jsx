import { FeatherIcon, Twitch } from "lucide-react";

export default function Content() {
  return (
    <>
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Contact The <span className="text-orange-600">Online Shopping</span>
      </h2>
      {/* Contact Info */}
      <div className=" text-gray-700 text-base">
        <div>
          <span className="font-semibold text-orange-600 mr-2">Email:</span>
          Shopping 123@gmail.com
        </div>
        <div>
          <span className="font-semibold text-orange-600 mr-2">Phone:</span>
          985-456-1234
        </div>
        <div>
          <span className="font-semibold text-orange-600 mr-2">Address:</span>
          55 ST, City EGYPT
        </div>
      </div>
      {/* Shopping Button */}
      <button className="w-32 py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors duration-200 self-center">
        Shopping
      </button>
      {/* Social Icons */}
      <div className="flex justify-center gap-4 my-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-md cursor-pointer shadow-sm hover:shadow-md transition duration-300 ease-in-out bg-gray-100 text-orange-600">
          <FeatherIcon name="facebook" className="text-lg" />
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-md cursor-pointer shadow-sm hover:shadow-md transition duration-300 ease-in-out bg-gray-100 text-orange-600">
          <Twitch className="text-lg" />
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-md cursor-pointer shadow-sm hover:shadow-md transition duration-300 ease-in-out bg-gray-100 text-orange-600">
          <FeatherIcon name="twitter" className="text-lg" />
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-md cursor-pointer shadow-sm hover:shadow-md transition duration-300 ease-in-out bg-gray-100 text-orange-600">
          <Twitch className="text-lg" />
        </div>
      </div>
    </>
  );
}
