import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import { getFilteredProducts } from "./SortProducts";

export default function ProductList({
  searchParams,
}: {
  searchParams: { sort?: string; category?: string };
}) {
  const filteredProducts = getFilteredProducts(searchParams);

  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
