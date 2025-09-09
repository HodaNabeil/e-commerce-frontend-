import Categories from "@/features/home/components/Categories";
import Filter from "@/features/home/components/Filter";
import Hero from "@/features/home/components/Hero";
import ProductList from "@/features/home/components/ProductList";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ sort: string; category: string }>;
}) => {
  const searchParamsResolved = await searchParams;
  return (
    <div className=" ">
      <Hero />

      {/* Debug data>
      {/* Categories and Products Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <div className="space-y-6 lg:space-y-8">
          {/* Section Header */}
          <Categories />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
              Featured Products
            </h3>
            <Filter />
          </div>
          <ProductList searchParamsResolved={searchParamsResolved} />
        </div>
      </section>
    </div>
  );
};

export default Home;
