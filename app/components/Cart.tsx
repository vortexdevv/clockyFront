"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Watch from "./watch.png";
import { watch } from "fs";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  countInStock: number;
  img: string;
  quantity: number;
};

// Utility function to get the cart from localStorage
const getCartFromLocalStorage = (): Product[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

// Utility function to save the cart to localStorage
const saveCartToLocalStorage = (cart: Product[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Function to update product quantity in the cart
const updateProductQuantity = (
  cart: Product[],
  productId: string,
  change: number
): Product[] => {
  const updatedCart = cart
    .map((item) => {
      if (item._id === productId) {
        const newQuantity = (item.quantity || 1) + change;
        if (newQuantity <= 0) {
          return null; // Indicate item should be removed
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    })
    .filter((item) => item !== null) as Product[]; // Filter out null values

  return updatedCart;
};

// Function to sync the cart with the server (for authenticated users)
const syncCartWithServer = async (products: Product[]) => {
  try {
    const userId = localStorage.getItem("userId");
    if (userId) {
      await axios.post(`http://localhost:5000/api/products/cart/${userId}`, {
        products,
      });
    }
  } catch (error) {
    console.error("Failed to sync cart with server", error);
  }
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    // Load cart items from localStorage
    const cartFromLocalStorage = getCartFromLocalStorage();
    setCartItems(cartFromLocalStorage);
  }, []);

  // Handle changing quantity
  const handleQuantityChange = async (productId: string, change: number) => {
    const updatedCart = updateProductQuantity(cartItems, productId, change);

    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);

    // Sync with the server
    if (localStorage.getItem("userId")) {
      await syncCartWithServer(updatedCart);
    }
  };

  if (cartItems.length <= 0) {
    return (
      <div className="text-center text-gray-800">
        <h2>Your cart is empty. Add some products to continue.</h2>
        <Link href="/">
          <div className="text-blue-500">Go to Shop</div>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-full md:w-3/4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full justify-items-center">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg w-60 flex flex-col justify-around rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <Image src={Watch} alt="" className="w-2/5 mx-auto w-1/2" />
            <div className="p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600 mb-4">Price: ${item.price}</p>
              <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleQuantityChange(item._id, 1)}
                  className="bg-[#5abd6e] text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  +
                </button>
                <button
                  onClick={() => handleQuantityChange(item._id, -1)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
