import { Product } from "./product";

export type CartItems = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartItemsList = CartItems[];

export type CartState = {
  cart: CartItems[];
  hasHydrated: boolean;
  isOpen: boolean;
};

export type CartActions = CartState & {
  addToCart: (item: CartItems) => void;
  removeFromCart: (item: CartItems) => void;
  updateQuantity: (item: CartItems, quantity: number) => void;
  clearCart: () => void;
  resetCartStore: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
};
