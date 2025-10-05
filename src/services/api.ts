import type { Product } from "../types";

const API_BASE = "https://fakestoreapi.com";

export const fetchProducts = async (category?: string): Promise<Product[]> => {
  try {
    const url = category ? `${API_BASE}/products/category/${category}` : `${API_BASE}/products`;
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE}/products/categories`);
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};