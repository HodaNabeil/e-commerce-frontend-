import ImageSection from "@/features/contact/components/ImageSection";
import InfoSection from "@/features/contact/components/InfoSection";

export default function Contact() {
  return (
    <main className="bg-gradient-to-br from-white to-gray-100 py-16">
      <div className="container mx-auto flex flex-col md:flex-row-reverse items-center gap-5 px-4">
        <ImageSection />
        <InfoSection />
      </div>
    </main>
  );
}
