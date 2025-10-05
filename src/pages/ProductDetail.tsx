import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../services/api";
import { cartStore } from "../store";
import type { Product } from "../types";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { classNames } from "../utils";
import Ratting from "../components/Ratting";
import CartIcon from "../components/icons/Cart";

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      <section
        className="py-20 px-4 sm:px-6 container mx-auto lg:px-0 max-w-7xl mx-auto"
        aria-busy="true"
        aria-label="Loading product details"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="animate-pulse mx-4 h-[25rem] bg-gray-300 rounded"></div>
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

  const handleAddToCart = async () => {
    if (isAdding) return;
    setIsAdding(true);
    setIsSuccess(false);

    await cartStore.addToCart({ ...product, qty: quantity });

    setTimeout(() => {
      setIsAdding(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 1000);
    }, 1000);
  };

  return (
    <>
      <p
        className="text-lg max-w-7xl px-6 mx-auto pt-8 capitalize font-medium text-indigo-600 mb-2"
        aria-label={`Category: ${product.category}`}
      >
        <Link
          to={`/?category=${product.category}`}
          className="hover:underline underline-offset-4"
        >
          {product.category || "General"}
        </Link>{" "}
        / {product.title}
      </p>

      <section
        className="relative py-5 container mx-auto px-4 pb-10 sm:px-6 lg:px-0 max-w-7xl mx-auto"
        aria-labelledby="product-title"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="img-box h-full truncate rounded-lg max-lg:mx-auto">
            <img
              src={product.image}
              alt={product.title}
              className="max-lg:mx-auto hover:scale-125 duration-300 lg:ml-auto h-full object-contain cursor-pointer rounded"
            />
          </div>

          <div className="flex flex-col px-4 justify-center">
            <Link
              to="/"
              className="text-indigo-600 mb-14 hover:underline"
              aria-label="Back to Home"
            >
              ← Back to Home
            </Link>

            <h2
              id="product-title"
              className="text-3xl font-bold text-gray-900 mb-4 capitalize"
            >
              {product.title}
            </h2>

            <div className="flex items-center gap-4 mb-4">
              <p
                className="text-2xl font-semibold text-gray-900"
                aria-label={`Price: $${product.price}`}
              >
                ${product.price}
              </p>
              <Ratting product={product} />
            </div>

            <p className="text-gray-500 mb-6" aria-label="Product description">
              {product.description}
            </p>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              aria-label="Quantity and Add to Cart section"
            >
              <div
                className="flex items-center w-full justify-between px-5 border border-gray-300 rounded-full"
                aria-label="Quantity selector"
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 rounded-full cart-decrement flex items-center cursor-pointer justify-center aspect-square bg-white hover:bg-gray-50 transition"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  aria-live="polite"
                  aria-label={`Quantity: ${quantity}`}
                  className="w-16 text-center focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 rounded-full cart-increment flex items-center cursor-pointer justify-center aspect-square bg-white hover:bg-gray-50 transition"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={classNames(
                  "relative flex items-center cursor-pointer justify-center px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-br from-indigo-600 to-indigo-800 shadow-md overflow-hidden transform transition-all duration-300",
                  isAdding ? "opacity-80 pointer-events-none" : "",
                  isSuccess
                    ? "bg-gradient-to-br from-green-500 to-green-700"
                    : "",
                  "hover:scale-105 hover:shadow-lg active:scale-95"
                )}
                aria-label="Add product to cart"
              >
                <span
                  className={classNames(
                    "absolute left-0 bottom-0 flex h-1 bg-white/70 transition-all",
                    isAdding ? "w-full duration-[1000ms]" : "w-0"
                  )}
                />
                <span
                  className={classNames(
                    "mx-2.5 transition-transform duration-300",
                    isSuccess ? "animate-[addedToCart_0.5s_ease-in-out]" : ""
                  )}
                  aria-hidden="true"
                >
                  <CartIcon />
                </span>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
