import FilterCategories from "@/features/home/components/FilterCategories";
import PageButtons from "@/features/home/components/PageButtons";
import ProductList from "@/features/home/components/ProductList";
import SortFilter from "@/features/home/components/SortFilter";
import { getFilteredProducts } from "@/features/home/components/SortProducts";

export async function generateMetadata() {
  return {
    title: "Our Products | Shop",
    description: "Browse our wide collection of amazing products",
    alternates: { canonical: "/products" },
  };
}

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; category?: string; page?: string }>;
}) => {
  const params = await searchParams;
  const resolvedParams = params ?? {};

  const filteredProducts = await getFilteredProducts(resolvedParams);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Our Products
        </h1>
        <p className="text-muted-foreground">
          Discover our amazing collection of products
        </p>
      </div>

      {/* Filters */}
      <FilterCategories
        searchParamsResolved={{
          sort: resolvedParams.sort ?? "",
          category: resolvedParams.category ?? "",
        }}
      />

      {/* Title + Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
          Featured Products
        </h3>
        <SortFilter />
      </div>

      {/* Products List */}
      {filteredProducts.length > 0 ? (
        <ProductList searchParams={resolvedParams} />
      ) : (
        <div className="text-center text-muted-foreground py-12">
          No products found matching your criteria.
        </div>
      )}

      {/* Pagination */}
      <PageButtons
        searchParams={resolvedParams}
        filteredProducts={filteredProducts}
        currentPath="/products"
      />
    </div>
  );
};

export default ProductsPage;
