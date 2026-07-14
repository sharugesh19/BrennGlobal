import { create } from "zustand";
import { getWebsiteContent } from "../lib/api/websiteContent.js";

export const useWebsiteStore = create((set, get) => ({
  content: null,
  loading: false,
  fetched: false,

  fetchContent: async (force = false) => {
    if (get().fetched && !force) return;
    set({ loading: true });
    try {
      const content = await getWebsiteContent();
      set({ content, loading: false, fetched: true });
    } catch (err) {
      set({ loading: false });
    }
  },
}));
