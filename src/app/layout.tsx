import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "@/providers/AuthProvider";
import Header from "@/components/shared/header/header";
import Footer from "@/components/shared/footer/footer";

export const metadata = {
  title: "E-Commerce Store - Best Quality Products",
  description:
    "Premium e-commerce platform with high-quality products for all your needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <ToastContainer
            position="bottom-right"
            toastClassName="text-sm"
            className="text-sm"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
