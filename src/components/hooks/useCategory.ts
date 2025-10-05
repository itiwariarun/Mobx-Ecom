import { useEffect, useState } from "react";
import { fetchCategories } from "../../services/api";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // added loading state

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  return { categories, loading };
};
