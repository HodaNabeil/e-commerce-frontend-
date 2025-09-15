import FilterCategories from "@/features/home/components/FilterCategories";
import Hero from "@/features/home/components/Hero";
import PageButtons from "@/features/home/components/PageButtons";
import ProductList from "@/features/home/components/ProductList";
import SortFilter from "@/features/home/components/SortFilter";
import { getFilteredProducts } from "@/features/home/components/SortProducts";

// ✅ Metadata
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return {
    title: page > 1 ? `Products - Page ${page}` : "Products",
    description: "Browse our products collection",
    alternates: {
      canonical: `/products${page > 1 ? `?page=${page}` : ""}`,
    },
  };
}

// ✅ Page Component
const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; category?: string; page?: string }>;
}) => {
  const params = await searchParams;
  const filteredProducts = getFilteredProducts(params);

  return (
    <>
      <Hero />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <div className="space-y-6 lg:space-y-8">
          <FilterCategories
            searchParamsResolved={{
              sort: params.sort ?? "",
              category: params.category ?? "",
            }}
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
              Featured Products
            </h3>
            <SortFilter />
          </div>

          <ProductList searchParams={params} />

          <PageButtons
            searchParams={params}
            filteredProducts={filteredProducts}
            currentPath="/products"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
