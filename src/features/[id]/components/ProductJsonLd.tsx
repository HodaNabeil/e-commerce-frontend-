import { Product } from "@/types/product";
import Script from "next/script";

export default function ProductJsonLd({
  product,
  selectedColor,
}: // selectedSize,
{
  product: Product;
  selectedColor: string;
  selectedSize: string;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id.toString(),
    category: product.category,
    image: product.images[selectedColor] ?? product.images[product.colors[0]],
    brand: {
      "@type": "Brand",
      name: "Your Brand Name",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      // url: `${process.env.NEXT_PUBLIC_APP_URL}/products/${product.id}?color=${selectedColor}&size=${selectedSize}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.numReviews,
    },
  };

  return (
    <Script
      id="product-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
