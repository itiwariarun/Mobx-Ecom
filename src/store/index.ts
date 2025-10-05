import { makeAutoObservable } from "mobx";
import { Product } from "../types";


class CartStore {
  cart: Product[] = JSON.parse(sessionStorage.getItem("cart") || "[]");

  constructor() {
    makeAutoObservable(this);
  }

  addToCart(product: Product) {
    const exists = this.cart.find((p) => p.id === product.id);
    if (exists) {
      exists.qty = (exists.qty || 1) + 1;
    } else {
      this.cart.push({ ...product });
    }
    this.saveCart();
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter((p) => p.id !== id);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    sessionStorage.removeItem("cart");
  }

  updateQuantity(id: number, delta: number) {
    const item = this.cart.find((p) => p.id === id);
    if (item) {
      item.qty = (item.qty || 1) + delta;
      if (item.qty < 1) item.qty = 1;
      this.saveCart();
    }
  }

  get total() {
    return this.cart.reduce((acc, p) => acc + (p.price * (p.qty || 1)), 0);
  }

  get count() {
    return this.cart.reduce((acc, p) => acc + (p.qty || 0), 0);
  }

  private saveCart() {
    sessionStorage.setItem("cart", JSON.stringify(this.cart));
  }
}

export const cartStore = new CartStore();
