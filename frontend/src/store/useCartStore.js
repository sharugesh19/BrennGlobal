import { create } from "zustand";
import { persist } from "zustand/middleware";

const lineOf = (i) => i.lineId ?? i.id;

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, quantity = 1) => {
        const id = product.id ?? product.slug;
        const color = product.color || "";
        const lineId = color ? `${id}__${color}` : id;
        const items = get().items;
        const existing = items.find((i) => lineOf(i) === lineId);

        if (existing) {
          set({
            items: items.map((i) =>
              lineOf(i) === lineId ? { ...i, quantity: i.quantity + quantity } : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [
              ...items,
              {
                id,
                lineId,
                color,
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

      increase: (lineId) =>
        set({
          items: get().items.map((i) =>
            lineOf(i) === lineId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }),

      decrease: (lineId) =>
        set({
          items: get()
            .items.map((i) => (lineOf(i) === lineId ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        }),

      removeItem: (lineId) =>
        set({ items: get().items.filter((i) => lineOf(i) !== lineId) }),

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