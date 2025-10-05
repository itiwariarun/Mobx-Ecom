export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
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
  };
}

export interface CartItem {
  image: string;
  title: string | undefined;
  qty?: number;
  id: number;
  price: number;
  name?: string;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

export interface Order {
  id: number;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: Date;
}

export interface MobileFiltersProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  categories: string[];
  categoryParam?: string;
  updateQuery: (key: string, value?: string) => void;
}

export interface CategoriesProps {
  categories: string[];
  categoryParam?: string;
  loading?: boolean;
  updateQuery: (key: string, value?: string) => void;
}
