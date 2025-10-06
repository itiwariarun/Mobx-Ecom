import { useEffect, useState } from "react";
import { useCart } from "../store";
import { Link } from "react-router-dom";
import { CartItem } from "../types";

const OrderSuccess = () => {
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const { cart, total, clearCart } = useCart();
  const [finalTotal, setFinalTotal] = useState<string>('0');

  useEffect(() => {
    const items: CartItem[] = cart.map((p) => ({
      id: p.id,
      price: p.price || 0,
      name: p.title,
      image: p.image,
      title: p.title,
      qty: p.qty || 1,
    }));
    setOrderItems(items);
    setFinalTotal(total.toFixed(2));

    setTimeout(() => {
      clearCart();
    }, 0);
  }, []);

  return (
    <section
      className="py-24 container mx-auto relative"
      aria-labelledby="order-confirmation-heading"
    >
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto flex flex-col gap-8">
        <h2
          id="order-confirmation-heading"
          className="text-center text-black text-3xl font-bold font-manrope leading-normal"
        >
          Order Confirmation
        </h2>

        <div className="flex flex-col gap-3 text-center">
          <h4 className="text-black text-xl font-medium leading-8">
            Thank you for shopping!
          </h4>
          <h5 className="text-gray-500 text-lg font-normal leading-8">
            Your order has been confirmed and will be shipped within two days.
          </h5>
        </div>

        <div className="flex flex-col gap-6" aria-label="Order items">
          <div className="hidden md:grid grid-cols-2 p-4 bg-gray-50">
            <span className="text-gray-500 text-base font-normal">Product</span>
            <p className="flex items-center w-full justify-between">
              <span className="w-full text-center px-8 text-gray-500 text-base font-normal">
                Quantity
              </span>
              <span className="ml-auto text-center px-8 text-gray-500 text-base font-normal">
                Price
              </span>
              <span className="ml-auto text-center"></span>
            </p>
          </div>

          {orderItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 py-3 border-b border-gray-200"
            >
              <div className="flex flex-col md:flex-row items-center justify-start gap-4 w-full">
                <div className="min-w-[7.5rem] w-[7.5rem] truncate h-[7.5rem] bg-gray-50 rounded-xl flex items-center justify-center">
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="pro-data flex flex-col justify-start items-start gap-2">
                  <Link to={`/product/${item.id}/details`}>
                    <h4 className="text-black text-lg font-medium">
                      {item.title}
                    </h4>
                  </Link>
                  <h5 className="text-gray-500 text-base font-normal">
                    Product ID: {item.id}
                  </h5>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full">
                <div
                  className="w-7 flex items-center mx-auto justify-center h-7 text-center border border-gray-200 rounded-full"
                  aria-label={`Quantity of ${item.title}`}
                >
                  {item.qty}
                </div>
                <h5
                  className="text-left text-black text-lg font-medium px-10"
                  aria-label={`Price of ${item.title}`}
                >
                  ${`${(item.price * (item.qty || 1)).toFixed(2)}`}
                </h5>
              </div>
            </div>
          ))}
        </div>

        <div
          className="w-full p-5 rounded-xl border border-gray-200 flex flex-col gap-4"
          aria-label="Order summary"
        >
          <div className="flex justify-between">
            <h5 className="text-gray-600 text-lg font-normal">Subtotal:</h5>
            <h5
              className="text-gray-900 text-lg font-semibold"
              aria-live="polite"
            >
              ${finalTotal}
            </h5>
          </div>
          <div className="flex justify-between">
            <h5 className="text-gray-600 text-lg font-normal">Delivery:</h5>
            <h5 className="text-gray-900 text-lg font-semibold">Free</h5>
          </div>
          <div className="flex justify-between">
            <h5 className="text-gray-600 text-lg font-normal">Total:</h5>
            <h5
              className="text-gray-900 text-lg font-semibold"
              aria-live="polite"
            >
              ${finalTotal}
            </h5>
          </div>
        </div>
      </div>

      <hgroup className="p-6 max-w-7xl mx-auto flex flex-col gap-2.5 font-semibold">
        <h4 className="text-gray-800">Thank You For Shopping!</h4>
        <h5 className="text-indigo-600 hover:underline">
          <Link to="/" aria-label="Back to Shopping">
            Back to Shopping
          </Link>
        </h5>
      </hgroup>
    </section>
  );
};

export default OrderSuccess;
