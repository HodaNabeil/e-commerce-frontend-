"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PageButtonsProps {
  searchParams: { [key: string]: string | string[] | undefined };
  filteredProducts: Product[];
  currentPath: string;
}

export default function PageButtons({
  searchParams,
  filteredProducts,
}: PageButtonsProps) {
  const ITEMS_PER_PAGE = Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE) || 4;

  const currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE || 4);

  const router = useRouter();
  const pathname = usePathname();
  const searchParamsHook = useSearchParams();

  const updateUrl = (page: number) => {
    const params = new URLSearchParams(searchParamsHook.toString());

    params.delete("page");

    if (page > 1) {
      params.set("page", page.toString());
    }

    const queryString = params.toString();
    const newUrl = `${pathname}${queryString ? `?${queryString}` : ""}`;

    router.replace(newUrl); // بيغير الـ URL من غير ما يعمل navigation
  };

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          {/* Previous button */}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => updateUrl(currentPage - 1)}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                className="w-10 h-10"
                onClick={() => updateUrl(page)}
              >
                {page}
              </Button>
            );
          })}

          {/* Next button */}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => updateUrl(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
