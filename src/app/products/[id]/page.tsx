import { notFound } from "next/navigation";
import ProductJsonLd from "@/features/[id]/components/ProductJsonLd";
import BreadcrumbsJsonLd from "@/features/[id]/components/BreadcrumbsJsonLd";
import BreadcrumbsNav from "@/features/[id]/components/BreadcrumbsNav";
import ImageZoom from "@/features/[id]/components/ImageZoom";
import ProfileProduct from "@/features/[id]/components/ProfileProduct";
import PaymentBadges from "@/components/shared/PaymentBadges";
import ProductFooter from "@/features/[id]/components/ProductFooter";
import { Card, CardContent } from "@/components/ui/card";
import { getProductById } from "@/features/[id]/components/hooks/getproduct";
import ProductInteraction from "@/features/[id]/components/ProductInteraction";

const getValidOption = (value: string | undefined, options: string[]) => {
  return value && options.includes(value) ? value : options[0];
};

const ProductDetails = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color?: string; size?: string }>;
}) => {
  const { id } = await params;
  const { color, size } = await searchParams;
  const productId = parseInt(id, 10);
  const product = await getProductById(productId);

  if (!product) return notFound();

  const selectedColor = getValidOption(color, product.colors);
  const selectedSize = getValidOption(size, product.sizes);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductJsonLd
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
      <BreadcrumbsJsonLd
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
      <BreadcrumbsNav product={product} />

      <div className="flex flex-col justify-center gap-4 lg:flex-row">
        <Card className="w-full lg:w-5/12 overflow-hidden">
          <CardContent className="relative p-4 aspect-[2/3]">
            <ImageZoom
              product={product}
              selectedColor={selectedColor}
              zoomLevel={300}
            />
          </CardContent>
        </Card>

        <Card className="w-full lg:w-7/12">
          <CardContent className="flex flex-col space-y-4 p-4">
            <ProfileProduct
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
            />
            <ProductInteraction
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
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
