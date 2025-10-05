import { useEffect, useState } from "react";
import { Product } from "../../types";
import { fetchProducts } from "../../services/api";

export const useProducts = (category?: string, sort?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      let prods = await fetchProducts(category && category !== "all" ? category : undefined);

      prods = prods.map((p) => ({ ...p, price: Number(p.price) || 0 }));

      if (sort === "asc") prods.sort((a, b) => a.price - b.price);
      else if (sort === "desc") prods.sort((a, b) => b.price - a.price);

      setProducts(prods);
      setLoading(false);
    };
    loadProducts();
  }, [category, sort]);

  return { products, loading };
};
