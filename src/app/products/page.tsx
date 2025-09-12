import FilterCategories from "@/features/home/components/FilterCategories";
import PageButtons from "@/features/home/components/PageButtons";
import ProductList from "@/features/home/components/ProductList";
import SortFilter from "@/features/home/components/SortFilter";
import { getFilteredProducts } from "@/features/home/components/SortProducts";

const ProductsPage = ({
  searchParams,
}: {
  searchParams?: { sort?: string; category?: string; page?: string };
}) => {
  const filteredProducts = getFilteredProducts(searchParams ?? {});

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Our Products
        </h1>
        <p className="text-muted-foreground">
          Discover our amazing collection of products
        </p>
      </div>

      <FilterCategories
        searchParamsResolved={{
          sort: searchParams?.sort ?? "",
          category: searchParams?.category ?? "",
        }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
          Featured Products
        </h3>
        <SortFilter />
      </div>

      <ProductList searchParams={searchParams ?? {}} />

      <PageButtons
        searchParams={searchParams ?? {}}
        filteredProducts={filteredProducts}
        currentPath="/products"
      />
    </div>
  );
};

export default ProductsPage;
