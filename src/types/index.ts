export type User = {
  id: string;
  name: string;
  email: string;
};

export type Product = {
  qty: number;
  image: string;
  title: string;
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  }
};

export type CartItem = {
  image: string;
  title: string | undefined;
  qty?: number;
  id: number;
  price: number;
  name?: string;
};

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

export type Order = {
  id: number;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: Date;
};