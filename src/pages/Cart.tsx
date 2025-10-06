import { useCart } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

const Cart: FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const handleIncrement = (id: number) => updateQuantity(id, 1);
  const handleDecrement = (id: number) => updateQuantity(id, -1);
  const handleCheckout = () => navigate("/order-success");

  return (
    <section
      className="py-24 container mx-auto relative"
      aria-labelledby="shopping-cart-heading"
    >
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        <h2
          id="shopping-cart-heading"
          className="text-4xl font-bold mb-8 text-center text-black"
        >
          Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl cart-item border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
                aria-label={`Cart item: ${item.title}`}
              >
                <div className="col-span-12 lg:col-span-2 img box">
                  <img
                    src={item.image || "https://via.placeholder.com/180"}
                    alt={item.title}
                    className="max-lg:w-full lg:w-[11.25rem] rounded-lg object-cover"
                  />
                </div>

                <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                  <div className="flex items-start gap-4 justify-between w-full mb-4">
                    <h5 className="text-2xl cart-item-title cursor-pointer font-bold text-gray-900">
                      <Link to={`/product/${item.id}/details`}>
                        {item.title}
                      </Link>
                    </h5>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-10 rounded-full cart-remove cursor-pointer flex items-center justify-center group hover:border-red-600 duration-300 aspect-square border border-gray-200 bg-white hover:bg-gray-50 transition"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <TrashIcon className="h-6 w-6 text-gray-400 group-hover:text-red-600 transition" />
                    </button>
                  </div>

                  <p className="text-gray-500 mb-6">
                    {item.description || "No description available."}
                  </p>

                  <div className="flex justify-between items-center">
                    <div
                      className="flex items-center cart-item-qty gap-4"
                      aria-label={`Quantity controls for ${item.title}`}
                    >
                      <button
                        onClick={() => handleDecrement(item.id)}
                        disabled={(item.qty || 1) <= 1}
                        className="w-10 rounded-full cart-decrement flex items-center cursor-pointer justify-center aspect-square border border-gray-200 bg-white hover:bg-gray-50 transition"
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={item.qty}
                        className="border cart-qty border-gray-200 aspect-square rounded-full w-10 text-center bg-gray-100"
                        aria-label={`Quantity of ${item.title}`}
                      />
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="w-10 rounded-full cart-increment flex items-center cursor-pointer justify-center border aspect-square border-gray-200 bg-white hover:bg-gray-50 transition"
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <h6
                      className="text-indigo-600 cart-item-price font-bold text-2xl"
                      aria-label={`Price of ${item.title}`}
                    >
                      ${(item.price * (item.qty || 1)).toFixed(2)}
                    </h6>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="flex flex-col cart-total md:flex-row items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto"
              aria-label="Cart summary"
            >
              <h5 className="text-gray-900 font-semibold text-2xl w-full max-md:text-center max-md:mb-4">
                Subtotal
              </h5>
              <div className="flex items-center justify-between gap-5">
                <h6
                  className="font-bold text-3xl text-indigo-600"
                  aria-live="polite"
                >
                  ${total.toFixed(2)}
                </h6>
              </div>
            </div>

            <div className="max-lg:max-w-lg max-lg:mx-auto mt-6">
              <p className="text-gray-500 text-center mb-5">
                Shipping taxes, and discounts calculated at checkout
              </p>
              <button
                onClick={handleCheckout}
                className="w-full cart-checkout rounded-full py-4 px-6 bg-indigo-600 cursor-pointer text-white font-semibold text-lg hover:bg-indigo-700 transition"
                aria-label="Proceed to checkout"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
