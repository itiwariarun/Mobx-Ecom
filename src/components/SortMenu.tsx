import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { classNames } from "../utils";
import { FC } from "react";

const SortMenu: FC<{
  options: { name: string; value: string; current: boolean }[];
  updateQuery: (key: string, value?: string) => void;
}> = ({ options, updateQuery }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className="inline-flex px-2 py-1 cursor-pointer justify-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded"
        aria-haspopup="true"
        aria-expanded="false"
        aria-label="Sort products"
      >
        Sort
        <ChevronDownIcon
          className="ml-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>

      <MenuItems
        className="absolute right-0 rounded mt-2 p-2 w-48 origin-top-right bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        aria-label="Sort options"
      >
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
                  "block w-full px-4 py-2 text-left capitalize hover:bg-gray-50 duration-300 cursor-pointer text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                )}
                aria-current={option.current ? "true" : undefined}
              >
                {option.name}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default SortMenu;
