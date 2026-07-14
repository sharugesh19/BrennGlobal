import { create } from "zustand";
import { listProducts } from "../lib/api/products.js";

// Centralized product state so any page (Home, Product listing, Product
// detail) can share the same fetched data without duplicate network calls.
export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  fetched: false,

  fetchProducts: async (force = false) => {
    if (get().fetched && !force) return;
    set({ loading: true, error: null });
    try {
      const products = await listProducts();
      set({ products, loading: false, fetched: true });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  getFeatured: () => get().products.find((p) => p.isFeatured && p.status === "published"),
  getPublished: () => get().products.filter((p) => p.status === "published"),
  getComingSoon: () => get().products.filter((p) => p.status === "coming-soon"),
}));
