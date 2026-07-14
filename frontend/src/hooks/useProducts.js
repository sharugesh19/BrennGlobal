import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore.js";

const useProducts = () => {
  const { products, loading, error, fetchProducts, getFeatured, getPublished, getComingSoon } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    featured: getFeatured(),
    published: getPublished(),
    comingSoon: getComingSoon(),
  };
};

export default useProducts;
