import ContactForm from "./ContactForm";
import Content from "./Content";

export default function InfoSection() {
  return (
    <section className="w-full md:w-1/2 flex flex-col gap-6 relative bg-white/80 rounded-xl shadow p-8">
      <Content />
      <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
      <ContactForm />
    </section>
  );
}
