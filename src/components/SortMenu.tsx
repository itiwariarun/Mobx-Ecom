import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { classNames } from "../utils";
function SortMenu({
  options,
  updateQuery,
}: {
  options: { name: string; value: string; current: boolean }[];
  updateQuery: (key: string, value?: string) => void;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded">
        Sort
        <ChevronDownIcon
          className="ml-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        {options.map((option) => (
          <MenuItem key={option.name}>
            {({ active }) => (
              <button
                onClick={() => updateQuery("sort", option.value)}
                className={classNames(
                  option.current
                    ? "font-medium text-gray-900"
                    : "text-gray-500",
                  `sort-${option.value}`,
                  "block w-full px-4 py-2 text-left text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                )}
              >
                {option.name}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
export default SortMenu;
