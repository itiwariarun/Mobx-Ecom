import { classNames } from "../utils";

function Categories({
  categories,
  categoryParam,
  updateQuery,
}: {
  categories: string[];
  categoryParam?: string;
  updateQuery: (key: string, value?: string) => void;
}) {
  return (
    <nav
      aria-label="Categories"
      className="hidden lg:flex text-left flex-col gap-2.5 py-3 font-medium text-gray-900"
    >
      <button
        type="button"
        onClick={() => updateQuery("category")}
        className={classNames(
          !categoryParam ? "font-bold" : "",
          "cursor-pointer p-2.5 focus:outline-none text-left focus:ring-2 focus:ring-indigo-500 rounded"
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
            "cursor-pointer p-2.5 focus:outline-none text-left focus:ring-2 focus:ring-indigo-500 rounded"
          )}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
export default Categories;
