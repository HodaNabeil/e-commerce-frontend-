import {
  useAddToCart,
  useCartIsOpen,
  useCartItems,
  useRemoveFromCart,
  useUpdateQuantity,
  useClearCart,
  useResetCartStore,
  useToggleCart,
  useSetIsOpen,
  useHasHydrated,
  useCartTotal,
  useCartItemsCount,
} from "../store/cart";

export function useCartAllStore() {
  const cart = useCartItems();
  const isOpen = useCartIsOpen();
  const hasHydrated = useHasHydrated();
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const updateQuantity = useUpdateQuantity();
  const clearCart = useClearCart();
  const resetCartStore = useResetCartStore();
  const toggleCart = useToggleCart();
  const setIsOpen = useSetIsOpen();
  const cartTotal = useCartTotal();
  const cartItemsCount = useCartItemsCount();

  return {
    // State
    cart,
    isOpen,
    hasHydrated,

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    resetCartStore,
    toggleCart,
    setIsOpen,

    // Computed values
    cartTotal,
    cartItemsCount,
  };
}
