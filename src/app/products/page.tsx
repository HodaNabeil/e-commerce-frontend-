import ProductList from "@/features/home/components/ProductList";
import React, { Suspense } from "react";

const ProductsPage = async () => {
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

      <Suspense fallback={<div>Loading...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
