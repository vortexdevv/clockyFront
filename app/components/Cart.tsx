"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Watch from "../../public/watch.png";

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
          {/* {cartItems.map((item, index) => (
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
          ))} */}
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-around mx-auto border w-full rounded-md"
            >
              <div className="w-24">
                <Image
                  src={Watch}
                  alt="Jazzmaster"
                  className="w-[230px] h-[230px] object-contain mb-4"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-2xl font-medium text-[#2E2E2E]">
                  Jazzmaster
                </h3>
                <p className="text-[#D4AF37] text-lg">EGP 1050</p>
                <div className="flex items-center mt-4 space-x-4">
                  <button className="text-gray-700 text-lg">-</button>
                  <span className="text-gray-900">1</span>
                  <button className="text-gray-700 text-lg ">+</button>
                  <button className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="#D4AF37"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 6l-.8 12.013c-.071 1.052-.106 1.578-.333 1.977a2 2 0 01-.866.81c-.413.2-.94.2-1.995.2H9.994c-1.055 0-1.582 0-1.995-.2a2 2 0 01-.866-.81c-.227-.399-.262-.925-.332-1.977L6 6M4 6h16m-4 0l-.27-.812c-.263-.787-.394-1.18-.637-1.471a2 2 0 00-.803-.578C13.938 3 13.524 3 12.694 3h-1.388c-.829 0-1.244 0-1.596.139a2 2 0 00-.803.578c-.243.29-.374.684-.636 1.471L8 6"
                      ></path>
                    </svg>
                  </button>
                </div>
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
