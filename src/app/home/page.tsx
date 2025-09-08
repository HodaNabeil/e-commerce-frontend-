import Categories from "@/features/home/components/Categories";
import Filter from "@/features/home/components/Filter";
import Hero from "@/features/home/components/Hero";
import ProductList from "@/features/home/components/ProductList";
import { Suspense } from "react";

const Homepage = () => {
  return (
    <div className="min-h-screen  container m-auto">
      <Hero />

      {/* Categories and Products Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <div className="space-y-6 lg:space-y-8">
          {/* Section Header */}

          <Suspense fallback={<div>Loading...</div>}>
            <Categories />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                Featured Products
              </h3>
              <Filter />
            </div>
            <ProductList />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
