import { Link } from "react-router-dom";
import type { Product } from "../types";
import { skeletons } from "../utils/constants";
import { FC } from "react";
import Ratting from "./Ratting";

const ProductGrid: FC<{ products: Product[]; loading: boolean }> = ({
  products,
  loading,
}) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:col-span-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {loading
        ? skeletons.map((_, idx) => (
            <div key={idx} className="animate-pulse" aria-busy="true">
              <div className="aspect-square w-full rounded-lg bg-gray-300"></div>
              <div className="mt-4 h-4 w-3/4 rounded bg-gray-300"></div>
              <div className="mt-2 h-5 w-1/3 rounded bg-gray-300"></div>
            </div>
          ))
        : products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}/details`}
              className="group product-card grid h-fit content-between focus:outline-none hover:outline duration-300 hover:outline-indigo-500 focus:ring-2 focus:ring-indigo-500 rounded-lg"
              aria-label={`View details for ${
                product.title
              }, price $${product.price.toFixed(2)}`}
            >
              <div className="aspect-square w-full truncate overflow-hidden rounded-lg group-hover:rounded-b-none bg-gray-200 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full rounded-lg bg-gray-200 object-contain group-hover:scale-110 group-hover:rounded-b-none duration-300 group-hover:opacity-75"
                />
              </div>
              <div className="mt-2 p-2.5">
                <Ratting product={product} />
              </div>
              <h3 className="p-2.5 mt-2 pt-0 text-sm text-gray-700">
                {product.title}
              </h3>
              <p className="p-2.5 pt-0 product-price text-lg font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </Link>
          ))}
    </div>
  );
};

export default ProductGrid;
