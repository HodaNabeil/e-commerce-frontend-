import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const sortProducts = (products: Product[], sort: string | null) => {
  switch (sort) {
    case "price-asc":
      return [...products].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...products].sort((a, b) => b.price - a.price);
    case "name-asc":
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return [...products].sort((a, b) => b.name.localeCompare(b.name));
    case "oldest":
      return [...products].sort((a, b) => a.id - b.id);
    case "newest":
      return [...products].sort((a, b) => b.id - a.id);
    default:
      return products;
  }
};

export default function SortProducts() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const filteredProducts = useMemo(() => {
    const filtered = category
      ? products.filter((p) => p.category === category)
      : products;
    return sortProducts(filtered, sort);
  }, [category, sort]);
  return <div>SortProducts</div>;
}
