import { FC } from "react";
import { CategoriesProps } from "../types";
import { classNames } from "../utils";

const Categories: FC<CategoriesProps> = ({
  categories,
  categoryParam,
  updateQuery,
  loading,
}) => {
  return (
    <nav
      aria-label="Categories"
      className="hidden lg:flex text-left flex-col gap-2.5 py-3 font-medium text-gray-900"
    >
      {loading ? (
        Array(5)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="h-5 my-2 w-full rounded bg-gray-300 animate-pulse"
            ></div>
          ))
      ) : (
        <>
          <button
            type="button"
            onClick={() => updateQuery("category")}
            className={classNames(
              !categoryParam ? "font-bold" : "",
              "cursor-pointer p-2.5 focus:outline-none text-left hover:bg-gray-50 duration-300 focus:ring-2 focus:ring-indigo-500 rounded"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateQuery("category", cat)}
              className={classNames(
                categoryParam === cat ? "font-bold" : "",
                "cursor-pointer capitalize p-2.5 hover:bg-gray-50 duration-300 focus:outline-none text-left focus:ring-2 focus:ring-indigo-500 rounded"
              )}
            >
              {cat}
            </button>
          ))}
        </>
      )}
    </nav>
  );
};

export default Categories;
