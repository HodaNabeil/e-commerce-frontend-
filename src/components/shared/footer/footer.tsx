"use client";

import Link from "next/link";
import BrandLogo from "../BrandLogo";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

interface LinkItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function Footer() {
  const quickLinks: LinkItem[] = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/cart", label: "Shopping Cart" },
    { href: "/about", label: "About Us" },
  ];

  const customerServiceLinks: LinkItem[] = [
    { href: "/help", label: "Help Center" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Return Policy" },
    { href: "/contact", label: "Contact Us" },
  ];

  const companyLinks: LinkItem[] = [
    { href: "/about", label: "About Company" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  const socialLinks: LinkItem[] = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Instagram, label: "Instagram" },
  ];

  const bottomLinks: LinkItem[] = [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <BrandLogo
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
              height={48}
              width={48}
              nameClass="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              wrapperClass="text-left space-y-2"
            />
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Premium e-commerce platform offering high-quality products with
              exceptional customer service and fast delivery.
            </p>

            {/* Contact Info */}
            <address className="space-y-2 not-italic">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>support@ecommerce.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>123 E-commerce St, City, Country</span>
              </div>
            </address>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-800"
                  aria-label={link.label}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {customerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} E-Commerce Store. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              {bottomLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
