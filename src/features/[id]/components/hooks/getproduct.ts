import { products } from "@/app-data/products";
import { Product } from "@/types/product";

export const getProductById = async (
  id: number
): Promise<Product | undefined> => {
  // مستقبلاً: fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
  return products.find((p) => p.id === id);
};
