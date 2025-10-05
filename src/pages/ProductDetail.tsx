import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../services/api";
import { cartStore } from "../store";
import type { Product } from "../types";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const loadProduct = async () => {
      const products = await fetchProducts();
      const prod = products.find((p) => Number(p.id) === Number(id));
      setProduct(prod || null);
    };
    loadProduct();
  }, [id]);

  if (!product)
    return (
      <section className="py-20 px-4 sm:px-6 container mx-auto lg:px-0 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="animate-pulse mx-4 h-[400px] bg-gray-300 rounded"></div>
          <div className="flex px-4 flex-col gap-4">
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
            <div className="h-8 w-48 bg-gray-300 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-12 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </section>
    );

  const handleAddToCart = () => {
    cartStore.addToCart({
      ...product,
      id: Number(product.id),
      title: product.title || "",
      image: product.image || "",
      qty: quantity,
    });
  };
  return (
    <section className="relative py-10 container mx-auto px-4 py-20 sm:px-6 lg:px-0 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="img-box h-full max-lg:mx-auto">
          <img
            src={product.image}
            alt={product.title}
            className="max-lg:mx-auto lg:ml-auto h-full object-cover rounded"
          />
        </div>

        <div className="flex flex-col px-4 justify-center">
          <Link to="/" className="text-indigo-600 mb-4 hover:underline">
            ← Back to Home
          </Link>

          <p className="text-lg font-medium text-indigo-600 mb-2">
            Category: {product.category || "General"}
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 capitalize">
            {product.title}
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <h6 className="text-2xl font-semibold text-gray-900">
              ${product.price}
            </h6>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="20"
                  height="20"
                  fill={
                    i < Math.round(product.rating.rate) ? "#FBBF24" : "#E5E7EB"
                  }
                  viewBox="0 0 20 20"
                >
                  <path d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 pl-2">
                {product.rating.count} reviews
              </span>
            </div>
          </div>

          <p className="text-gray-500 mb-6">{product.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center w-full justify-between px-5 border border-gray-300 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 rounded-full cart-decrement flex items-center cursor-pointer justify-center  aspect-square bg-white hover:bg-gray-50 transition"
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-16 text-center focus:outline-none"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 rounded-full cart-increment flex items-center cursor-pointer justify-center aspect-square bg-white hover:bg-gray-50 transition"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white cursor-pointer font-semibold py-3 rounded-full w-full hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
