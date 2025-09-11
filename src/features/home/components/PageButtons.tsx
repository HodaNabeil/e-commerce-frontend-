import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

interface PageButtonsProps {
  searchParams: { [key: string]: string | string[] | undefined };
  filteredProducts: Product[];
  currentPath: string;
}

export default function PageButtons({
  searchParams,
  filteredProducts,
  currentPath,
}: PageButtonsProps) {
  const ITEMS_PER_PAGE = 4;

  const currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "page" && value) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }
    });

    if (page > 1) {
      params.set("page", page.toString());
    }

    const queryString = params.toString();
    return `${currentPath}${queryString ? `?${queryString}` : ""}`;
  };

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
          asChild
        >
          <Link href={buildUrl(page)}>{page}</Link>
        </Button>
      );
    });
  };

  return (
    <div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          {/* Previous button */}
          {currentPage === 1 ? (
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 rounded-md"
              disabled
            >
              Previous
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 rounded-md"
              asChild
            >
              <Link href={buildUrl(currentPage - 1)}>Previous</Link>
            </Button>
          )}

          {renderPageButtons()}

          {/* Next button */}
          {currentPage === totalPages ? (
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 rounded-md"
              disabled
            >
              Next
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 rounded-md"
              asChild
            >
              <Link href={buildUrl(currentPage + 1)}>Next</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
