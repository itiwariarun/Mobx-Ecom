import  { createContext, useState, useContext, useEffect, ReactNode, FC } from "react";
import { Product } from "../types";

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, delta: number) => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: FC<{children:ReactNode}> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>(() => {
    return JSON.parse(sessionStorage.getItem("cart") || "[]");
  });

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((p) => p.id === product.id);
      if (exists) {
        // Increase qty immutably
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, qty: (p.qty ?? 1) + (product.qty ?? 1) } : p
        );
      } else {
        return [...prevCart, { ...product, qty: product.qty ?? 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem("cart");
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((p) => {
        if (p.id === id) {
          const newQty = (p.qty ?? 1) + delta;
          return { ...p, qty: newQty < 1 ? 1 : newQty };
        }
        return p;
      })
    );
  };
  
  const total = cart.reduce((acc, p) => acc + (p.price * (p.qty || 1)), 0);

  const count = cart.reduce((acc, p) => acc + (p.qty || 0), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
};
