import { ReactNode } from "react";
export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>; // key = اللون , value = رابط الصورة
  category: string; // Add category field for filtering
  createdAt: Date;
  numReviews: number; // Add numReviews field for displaying number of reviews
  rating: number;
}

export type Products = Product[];

export interface Category {
  name: string;
  icon: ReactNode;
  slug: string;
}
