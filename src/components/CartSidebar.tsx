import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";
import { cartStore } from "../store";
import { useLocation, useNavigate } from "react-router-dom";
import BagIcon from "./icons/Bag";

const CartSide: FC = observer(() => {
  const nav = useNavigate();
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [prevCartCount, setPrevCartCount] = useState(cartStore.count);

  const onClickCheckout = (router: string) => {
    setCartOpen(false);
    nav(router);
  };
  const isProductDetails = /^\/product\/\d+\/details$/.test(location.pathname);

  useEffect(() => {
    if (cartStore.count > prevCartCount && isProductDetails) {
      const timeout = setTimeout(() => {
        setCartOpen(true);
      }, 1300);
      return () => clearTimeout(timeout);
    }
    setPrevCartCount(cartStore.count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartStore.count, prevCartCount, isProductDetails]);
  return (
    <>
      <button
        data-quantity={cartStore.count}
        onClick={() => setCartOpen(true)}
        className="relative btn-cart flex ml-auto items-center cursor-pointer justify-center w-12 h-12 rounded-lg bg-transparent border-none group"
      >
        <BagIcon />
        <span className="absolute top-1 mt-1 text-white text-base font-sans opacity-0 invisible transition-all duration-200 ease-linear group-hover:visible group-hover:opacity-100 group-hover:mt-0">
          {cartStore.count}
        </span>
      </button>

      <Dialog
        open={cartOpen}
        onClose={setCartOpen}
        className="relative z-[9999]"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setCartOpen(false)}
                          className="relative cursor-pointer -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cartStore.cart.length === 0 ? (
                            <li>Your cart is empty</li>
                          ) : (
                            cartStore.cart.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    alt={item.title}
                                    src={item.image}
                                    className="size-full object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex cursor-pointer justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <p
                                          onClick={() =>
                                            onClickCheckout(
                                              `/product/${item.id}/details`
                                            )
                                          }
                                        >
                                          {item.title}
                                        </p>
                                      </h3>
                                      <p className="ml-4">
                                        ${item.price.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {item.qty}
                                    </p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          cartStore.removeFromCart(item.id)
                                        }
                                        className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {cartStore.cart.length > 0 && (
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>${cartStore.total.toFixed(2)}</p>
                      </div>
                      <div className="mt-6">
                        <button
                          onClick={() => onClickCheckout("/cart")}
                          className="flex items-center justify-center w-full cursor-pointer rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                        >
                          Go To Cart
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <span
                            onClick={() => onClickCheckout("/")}
                            className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
});

export default CartSide;
