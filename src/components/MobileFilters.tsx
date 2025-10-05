import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "../utils";
function MobileFilters({
  open,
  setOpen,
  categories,
  categoryParam,
  updateQuery,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  categories: string[];
  categoryParam?: string;
  updateQuery: (key: string, value?: string) => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-[9999] lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />{" "}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen bg-white max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-auto">
                <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                  <DialogTitle className="text-lg font-medium text-gray-900">
                    Filters
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="p-2 text-gray-400 hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-label="Close filters"
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <form className="border-t border-gray-200 px-4 sm:px-6">
                  <fieldset>
                    <legend className="sr-only">Categories</legend>
                    <ul className="py-3 flex flex-col gap-2.5 text-gray-900 font-medium">
                      <li>
                        <button
                          type="button"
                          onClick={() => updateQuery("category")}
                          className={classNames(
                            !categoryParam ? "font-bold" : "",
                            "cursor-pointer p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                          )}
                        >
                          All
                        </button>
                      </li>
                      {categories.map((cat) => (
                        <li key={cat}>
                          <button
                            type="button"
                            onClick={() => updateQuery("category", cat)}
                            className={classNames(
                              categoryParam === cat ? "font-bold" : "",
                              "cursor-pointer p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            )}
                          >
                            {cat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </fieldset>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
export default MobileFilters;
