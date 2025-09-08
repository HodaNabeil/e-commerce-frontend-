"use client";

import React, { useState, useMemo, useCallback } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products } from "../../../app-data/products";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

const ITEMS_PER_PAGE = 4;

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

export default function ProductList() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const filtered = category
      ? products.filter((p) => p.category === category)
      : products;
    return sortProducts(filtered, sort);
  }, [category, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center space-y-3">
          <h3 className="text-xl font-semibold text-foreground">
            No products found
          </h3>
          <p className="text-muted-foreground max-w-md">
            We couldn&apos;t find any products matching your criteria. Try
            adjusting your filters or browse all categories.
          </p>
          <Button asChild className="mt-4">
            <Link href="/">Browse All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, i) => {
      const page = i + 1;
      return (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          className="w-10 h-10 flex items-center justify-center rounded-md" 
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      );
    });
  };

  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {paginatedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            className="h-10 px-4 rounded-md"
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {renderPageButtons()}

          <Button
            variant="outline"
            size="sm"
            className="h-10 px-4 rounded-md"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
