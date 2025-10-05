import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategoryParam, getSortOptions, getSortParam } from "../utils";
import { useProducts } from "../components/hooks/useProduct";
import MobileFilters from "../components/MobileFilters";
import Categories from "../components/Categories";
import SortMenu from "../components/SortMenu";
import ProductGrid from "../components/ProductGrid";
import { useCategories } from "../components/hooks/usecategory";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const categoryParam = getCategoryParam(location.search);
  const sortParam = getSortParam(location.search);

  const { categories, loading: catLoad } = useCategories();
  const { products, loading } = useProducts(categoryParam, sortParam);
  const sortOptions = getSortOptions(sortParam);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateQuery = (key: string, value?: string) => {
    const params = new URLSearchParams(location.search);
    if (!value || value === "") params.delete(key);
    else params.set(key, value);
    navigate({ pathname: "/", search: params.toString() });
  };

  return (
    <div className="bg-white container mx-auto min-h-screen">
      <MobileFilters
        open={mobileFiltersOpen}
        setOpen={setMobileFiltersOpen}
        categories={categories}
        categoryParam={categoryParam}
        updateQuery={updateQuery}
        aria-label="Mobile product filters"
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <div
          className="flex items-baseline justify-between border-b border-gray-200 pb-6"
          aria-labelledby="products-heading"
        >
          <h1
            id="products-heading"
            className="text-4xl font-bold tracking-tight text-gray-900"
          >
            Products
          </h1>

          <div className="flex items-center">
            <SortMenu
              options={sortOptions}
              updateQuery={updateQuery}
              aria-label="Sort products"
            />

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="ml-4 p-2 text-gray-400 hover:text-gray-500 lg:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
              aria-label="Open filters"
            >
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="grid grid-cols-1 py-10 gap-x-8 gap-y-10 lg:grid-cols-4"
          aria-label="Product list and categories"
        >
          <Categories
            loading={catLoad}
            categories={categories}
            categoryParam={categoryParam}
            updateQuery={updateQuery}
            aria-label="Product categories"
          />
          <ProductGrid
            products={products}
            loading={loading}
            aria-label="Product grid"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
