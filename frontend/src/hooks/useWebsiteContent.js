import { useEffect } from "react";
import { useWebsiteStore } from "../store/useWebsiteStore.js";

const useWebsiteContent = () => {
  const { content, loading, fetchContent } = useWebsiteStore();

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, loading };
};

export default useWebsiteContent;
