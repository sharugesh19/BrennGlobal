import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, quantity = 1) => {
        const id = product.id ?? product.slug;
        const items = get().items;
        const existing = items.find((i) => i.id === id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + quantity } : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [
              ...items,
              {
                id,
                slug: product.slug,
                title: product.title,
                price: Number(product.price) || 0,
                currency: product.currency || "INR",
                image: product.images?.[0]?.url || "",
                quantity,
              },
            ],
            isOpen: true,
          });
        }
      },

      increase: (id) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }),

      decrease: (id) =>
        set({
          items: get()
            .items.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        }),

      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

      clearCart: () => set({ items: [] }),

      getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "brenn-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);