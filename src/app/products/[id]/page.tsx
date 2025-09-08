import ProductInteration from "@/features/[id]/components/ProductInteration";
import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import ImageZoom from "@/features/[id]/components/ImageZoom";
// import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductJsonLd from "@/features/[id]/components/ProductJsonLd";
import BreadcrumbsJsonLd from "@/features/[id]/components/BreadcrumbsJsonLd";
import BreadcrumbsNav from "@/features/[id]/components/BreadcrumbsNav";
import PaymentBadges from "@/components/shared/PaymentBadges";
import { products } from "@/app-data/products";
import ProfileProduct from "@/features/[id]/components/ProfileProduct";
import ProductFooter from "@/features/[id]/components/ProductFooter";

const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};

// export const generateMetadata = async ({
//   params,
//   searchParams,
// }: {
//   params: { id: string };
//   searchParams: { color?: string; size?: string };
// }): Promise<Metadata> => {
//   const { id } = params;
//   const searchParamsResolved = searchParams;
//   const productId = parseInt(id, 10);
//   const product = getProductById(productId);

//   if (!product) {
//     return {
//       title: "Product Not Found",
//       description: "The requested product could not be found.",
//     };
//   }

//   const selectedColor = searchParamsResolved.color ?? product.colors[0];
//   const selectedSize = searchParamsResolved.size ?? product.sizes[0];

//   const title = `${
//     product.name
//   } - ${selectedColor} - Size ${selectedSize.toUpperCase()}`;
//   const description = `${
//     product.description
//   } Available in ${product.colors.join(
//     ", "
//   )} colors and sizes ${product.sizes.join(", ")}.`;

//   return {
//     title,
//     description,
//     keywords: [
//       product.name,
//       product.category,
//       selectedColor,
//       selectedSize,
//       "fashion",
//       "clothing",
//       "online store",
//     ].join(", "),
//     openGraph: {
//       title,
//       description,
//       images: [
//         {
//           url:
//             product.images[selectedColor] ?? product.images[product.colors[0]],
//           alt: `${product.name} in ${selectedColor} color`,
//           width: 800,
//           height: 600,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [
//         product.images[selectedColor] ?? product.images[product.colors[0]],
//       ],
//     },
//     alternates: {
//       canonical: `/products/${product.id}?color=${selectedColor}&size=${selectedSize}`,
//     },
//     other: {
//       "product:price:amount": product.price.toString(),
//       "product:price:currency": "USD",
//       "product:availability": "in stock",
//       "product:condition": "new",
//     },
//   };
// };

const ProductDetails = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color?: string; size?: string }>;
}) => {
  const { id } = await params;
  const searchParamsResolved = await searchParams;
  const productId = parseInt(id, 10);
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  // Validate and set default values for color and size
  const selectedColor =
    searchParamsResolved.color &&
    product.colors.includes(searchParamsResolved.color)
      ? searchParamsResolved.color
      : product.colors[0];

  const selectedSize =
    searchParamsResolved.size &&
    product.sizes.includes(searchParamsResolved.size)
      ? searchParamsResolved.size
      : product.sizes[0];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Structured Data for SEO */}
      <ProductJsonLd
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbsJsonLd
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />

      {/* Breadcrumb Navigation */}
      <BreadcrumbsNav product={product} />

      <div className="flex flex-col justify-center gap-4 lg:flex-row">
        <Card className="w-full lg:w-5/12 overflow-hidden">
          <CardContent className="relative p-4 aspect-[2/3]">
            <ImageZoom product={product} selectedColor={selectedColor} />
          </CardContent>
        </Card>

        <Card className="w-full lg:w-7/12">
          <CardContent className="flex flex-col gap-4 p-4">
            <ProfileProduct
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
            />
            <ProductInteration
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
            />

            <PaymentBadges />
            <ProductFooter />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
