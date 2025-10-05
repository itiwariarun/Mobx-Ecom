import { useEffect, useState } from "react";
import { fetchCategories } from "../../services/api";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  return categories;
};