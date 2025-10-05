import { Link } from "react-router-dom";
import type { Product } from "../types";
function ProductGrid({
  products,
  loading,
}: {
  products: Product[];
  loading: boolean;
}) {
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:col-span-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {loading
        ? skeletons.map((_, idx) => (
            <div key={idx} className="animate-pulse">
              <div className="aspect-square w-full rounded-lg bg-gray-300"></div>
              <div className="mt-4 h-4 w-3/4 rounded bg-gray-300"></div>
              <div className="mt-2 h-5 w-1/3 rounded bg-gray-300"></div>
            </div>
          ))
        : products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}/details`}
              className="group product-card focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              <img
                src={product.image}
                alt={product.title}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
              />
              <h3 className="mt-4 p-2.5 text-sm text-gray-700">
                {product.title}
              </h3>
              <p className="mt-1 p-2.5 product-price text-lg font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </Link>
          ))}
    </div>
  );
}
export default ProductGrid;
