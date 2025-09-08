import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Product } from "@/types/product";

export default function BreadcrumbsNav({ product }: { product: Product }) {
  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link
            href="/"
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
        </li>
        <ChevronRight className="w-4 h-4" />
        <li>
          <Link
            href="/products"
            className="hover:text-foreground transition-colors"
          >
            Products
          </Link>
        </li>
        <ChevronRight className="w-4 h-4" />
        <li>
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-foreground transition-colors"
          >
            {product.category}
          </Link>
        </li>
        <ChevronRight className="w-4 h-4" />
        <li className="text-foreground font-medium">{product.name}</li>
      </ol>
    </nav>
  );
}
