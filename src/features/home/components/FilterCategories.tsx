"use client";

import { categories } from "@/app-data/categories";
import { usePathname, useRouter } from "next/navigation";

export default function FilterCategories({
  searchParamsResolved,
}: {
  searchParamsResolved: { sort: string; category: string };
}) {
  const router = useRouter();
  const pathName = usePathname();

  const selectedCategory = searchParamsResolved.category || "all";

  const handleChangeCategory = (categorySlug: string) => {
    const params = new URLSearchParams();

    if (searchParamsResolved.sort) {
      params.set("sort", searchParamsResolved.sort);
    }

    if (categorySlug !== "all") {
      params.set("category", categorySlug);
    }

    router.push(`${pathName}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="w-full py-8">
      <div className="text-center space-y-2 my-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Shop by Category
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Browse through our carefully curated collection of premium products
        </p>
      </div>

      {/* Desktop and Tablet Grid */}
      <div className="hidden sm:grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 lg:gap-4">
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleChangeCategory(category.slug)}
            className={`group relative flex flex-col items-center gap-2 p-4 lg:p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 ${
              selectedCategory === category.slug
                ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                : "bg-card hover:bg-accent border-border hover:border-accent-foreground/20"
            }`}
          >
            <div
              className={`p-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === category.slug
                  ? "bg-primary-foreground/20"
                  : "bg-accent group-hover:bg-accent-foreground/10"
              }`}
            >
              {category.icon}
            </div>
            <span className="text-xs lg:text-sm font-medium text-center leading-tight">
              {category.name}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="sm:hidden overflow-x-auto pb-2">
        <div className="flex gap-3 px-1">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleChangeCategory(category.slug)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 border-2 whitespace-nowrap ${
                selectedCategory === category.slug
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-foreground border-border hover:bg-accent"
              }`}
            >
              {category.icon}
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
