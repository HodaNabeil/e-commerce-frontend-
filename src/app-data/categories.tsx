import { Category } from "@/types/product";
import {
  ShoppingBasket,
  Shirt,
  Footprints,
  Glasses,
  Briefcase,
  Venus,
  Hand,
} from "lucide-react";

export const categories: Category[] = [
  {
    name: "All",
    icon: <ShoppingBasket className="w-4 h-4 sm:w-5 sm:h-5" />,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: <Shirt className="w-4 h-4 sm:w-5 sm:h-5" />,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: <Footprints className="w-4 h-4 sm:w-5 sm:h-5" />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Glasses className="w-4 h-4 sm:w-5 sm:h-5" />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: <Venus className="w-4 h-4 sm:w-5 sm:h-5" />,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: <Shirt className="w-4 h-4 sm:w-5 sm:h-5" />,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: <Hand className="w-4 h-4 sm:w-5 sm:h-5" />,
    slug: "gloves",
  },
];
