import { products } from "@/app-data/products";
import { Product } from "@/types/product";

const sortProducts = (products: Product[], sort: string | null) => {
  switch (sort) {
    case "price-asc":
      return [...products].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...products].sort((a, b) => b.price - a.price);
    case "name-asc":
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return [...products].sort((a, b) => b.name.localeCompare(a.name));
    case "oldest":
      return [...products].sort((a, b) => a.id - b.id);
    case "newest":
      return [...products].sort((a, b) => b.id - a.id);
    default:
      return products;
  }
};

export function getFilteredProducts(searchParamsResolved?: {
  sort?: string;
  category?: string;
}): Product[] {
  const selectedCategory = searchParamsResolved?.category;
  const sortType = searchParamsResolved?.sort;

  const filtered =
    selectedCategory && selectedCategory !== "all"
      ? products.filter((p) => p.category === selectedCategory)
      : products;

  return sortProducts(filtered, sortType || null);
}
