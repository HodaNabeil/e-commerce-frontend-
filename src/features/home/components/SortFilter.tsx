"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function SortFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const currentSort = searchParams.get("sort") || "newest";

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);

    router.push(`${pathName}?${params.toString()}`, {
      scroll: false,
    });
  };

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A → Z" },
    { value: "name-desc", label: "Name: Z → A" },
  ];

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="sort"
        className="text-sm font-medium text-muted-foreground hidden sm:block"
      >
        Sort by:
      </label>
      <div className="relative">
        <select
          name="sort"
          id="sort"
          value={currentSort}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="appearance-none bg-background border border-border rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-foreground 
                   hover:bg-accent hover:border-accent-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring 
                   focus:ring-offset-2 transition-all duration-200 cursor-pointer min-w-[160px] sm:min-w-[180px]"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-background text-foreground"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}
