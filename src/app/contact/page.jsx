import Image from "next/image";
import ContactForm from "@/features/contact/components/ContactForm";
import Content from "../../features/contact/components/Content";

function Contact() {
  return (
    <div className=" bg-gradient-to-br from-white to-gray-100 py-16 ">
      {/* Main container */}
      
      <div className="container mx-auto flex flex-col md:flex-row-reverse items-center gap-5 px-4">
        {/* Image section */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <Image
            className="object-cover rounded-lg w-full h-[60vh] md:h-[80vh] shadow-lg border border-gray-200"
            src="/story_right.jpg"
            alt="Contact Luxury Line"
            width={600}
            height={800}
            priority
          />
        </div>

        {/* Info & Form section */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 relative bg-white/80 rounded-xl shadow p-8">
          <Content />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Contact;
