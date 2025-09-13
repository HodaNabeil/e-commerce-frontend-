import CartClient from "@/features/cart/components/CartClient";
import Header from "@/features/cart/components/Header";
import ItemsSteps from "@/features/cart/components/ItemsSteps";

export default async function Cart({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const params = await searchParams;
  const activeStep = parseInt(params.step || "1");

  return (
    <div className="bg-background container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="min-h-screen">
        <Header />

        {/* Progress Steps */}
        <div className="mb-8 lg:mb-12">
          <ItemsSteps activeStep={activeStep} />
        </div>
        <CartClient activeStep={activeStep} searchParams={params} />
      </div>
    </div>
  );
}
