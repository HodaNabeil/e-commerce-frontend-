import { Product } from "@/types/product";
import Script from "next/script";

export default function BreadcrumbsJsonLd({
  product,
  selectedColor,
  selectedSize,
}: {
  product: Product;
  selectedColor: string;
  selectedSize: string;
}) {
  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Products",
              item: "/products",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: product.category,
              item: `/products?category=${product.category}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: product.name,
              item: `/products/${product.id}?color=${selectedColor}&size=${selectedSize}`,
            },
          ],
        }),
      }}
    />
  );
}
