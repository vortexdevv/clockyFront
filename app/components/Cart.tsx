"use client";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  countInStock: number;
  img: string;
  quantity: number; // New field to track the quantity
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    // Get cart items from local storage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="text-white mx-auto h-4/5 flex flex-col items-center w-4/5 bg-[#FCFCFC] p-10 overflow-scroll">
      <h2 className="text-[#2E2E2E] text-3xl mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border-2 border-[#F0F0F0] flex flex-col items-center p-4 gap-5 shadow-lg bg-white transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-[120px] h-[180px] rounded-lg"
              />
              <div className="text-center">
                <h1 className="text-[#2E2E2E] font-bold text-2xl">
                  {item.name}
                </h1>
                <p className="text-[#D4AF37] font-bold text-xl">
                  ${item.price}
                </p>
                <p className="text-[#2E2E2E]">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="mt-6 text-center">
          <h3 className="text-[#2E2E2E] font-bold text-2xl">
            Total: ${totalPrice}
          </h3>
          <button className="mt-4 py-3 px-8 bg-[#414B43] text-white rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
