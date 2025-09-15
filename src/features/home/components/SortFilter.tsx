"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useMemo } from "react";

// ✅ Define sort options with type
type SortOption = {
  value: string;
  label: string;
};

const SORT_OPTIONS: SortOption[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A → Z" },
  { value: "name-desc", label: "Name: Z → A" },
];

export default function SortFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  // ✅ Current sort value
  const currentSort = useMemo(
    () => searchParams.get("sort") || "newest",
    [searchParams]
  );

  // ✅ Handle changes
  const handleFilterChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === "newest") {
        params.delete("sort"); // clean URL if default
      } else {
        params.set("sort", value);
      }

      router.push(`${pathName}?${params.toString()}`, {
        scroll: false,
      });
    },
    [pathName, router, searchParams]
  );

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="sort"
        className="hidden text-sm font-medium text-muted-foreground sm:block"
      >
        Sort by:
      </label>

      {/* ✅ Shadcn Select */}
      <Select value={currentSort} onValueChange={handleFilterChange}>
        <SelectTrigger
          id="sort"
          className="min-w-[160px] sm:min-w-[180px] rounded-lg"
        >
          <SelectValue placeholder="Select sort option" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
