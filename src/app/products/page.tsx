import ProductList from "@/features/home/components/ProductList";

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

      <ProductList searchParamsResolved={{ sort: "newest", category: "all" }} />
    </div>
  );
};

export default ProductsPage;
