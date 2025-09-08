import { Product } from "@/types/product";
import Script from "next/script";

export default function ProductJsonLd({
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
      id="product-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image:
            product.images[selectedColor] ?? product.images[product.colors[0]],
          brand: {
            "@type": "Brand",
            name: "Your Brand Name",
          },
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `/products/${product.id}?color=${selectedColor}&size=${selectedSize}`,
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.numReviews,
          },
        }),
      }}
    />
  );
}
