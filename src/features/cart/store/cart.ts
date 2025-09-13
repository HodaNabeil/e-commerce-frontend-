"use client";

import { CartActions, CartItems, CartState } from "@/types/cart";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<CartState & CartActions>()(
  persist(
    (set) => ({
      cart: [] as CartItems[],
      isOpen: false,
      hasHydrated: false,

      addToCart: (product: CartItems) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) =>
              item.id === product.id &&
              item.selectedSize === product.selectedSize &&
              item.selectedColor === product.selectedColor
          );

          if (existingIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingIndex].quantity += product.quantity || 1;
            return { cart: updatedCart };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity: product.quantity || 1,
                selectedColor: product.selectedColor,
                selectedSize: product.selectedSize,
              },
            ],
          };
        }),

      removeFromCart: (product: CartItems) =>
        set((state) => ({
          cart: state.cart.filter(
            (item: CartItems) =>
              !(
                item.id === product.id &&
                item.selectedColor === product.selectedColor &&
                item.selectedSize === product.selectedSize
              )
          ),
        })),

      updateQuantity: (product: CartItems, newQuantity: number) =>
        set((state) => ({
          cart: state.cart.map((item: CartItems) =>
            item.id === product.id &&
            item.selectedColor === product.selectedColor &&
            item.selectedSize === product.selectedSize
              ? { ...item, quantity: newQuantity }
              : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      resetCartStore: () => {
        set({ cart: [] });
        localStorage.removeItem("cart-storage");
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      setIsOpen: (isOpen: boolean) => {
        set({ isOpen });
      },
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

// ✅ Selectors to prevent unnecessary re-renders
export const useCartItems = () => useCartStore((state) => state.cart);
export const useCartIsOpen = () => useCartStore((state) => state.isOpen);
export const useAddToCart = () => useCartStore((state) => state.addToCart);
export const useRemoveFromCart = () =>
  useCartStore((state) => state.removeFromCart);
export const useUpdateQuantity = () =>
  useCartStore((state) => state.updateQuantity);
export const useClearCart = () => useCartStore((state) => state.clearCart);

export const useResetCartStore = () =>
  useCartStore((state) => state.resetCartStore);
export const useToggleCart = () => useCartStore((state) => state.toggleCart);
export const useSetIsOpen = () => useCartStore((state) => state.setIsOpen);
export const useHasHydrated = () => useCartStore((state) => state.hasHydrated);

// Computed selectors
export const useCartTotal = () =>
  useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  );
export const useCartItemsCount = () =>
  useCartStore((state) =>
    state.cart.reduce((count, item) => count + item.quantity, 0)
  );

export default useCartStore;
