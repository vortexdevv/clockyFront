/* eslint-disable @next/next/no-img-element */
// Cart.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  countInStock: number;
  img: string;
  quantity: number;
};

const getCartFromLocalStorage = (): Product[] =>
  JSON.parse(localStorage.getItem("cart") || "[]");

const saveCartToLocalStorage = (cart: Product[]) =>
  localStorage.setItem("cart", JSON.stringify(cart));

const updateProductQuantity = (
  cart: Product[],
  productId: string,
  change: number
): Product[] => {
  return cart
    .map((item) => {
      if (item._id === productId) {
        const newQuantity = (item.quantity || 1) + change;
        if (newQuantity <= 0) return null;
        return { ...item, quantity: newQuantity };
      }
      return item;
    })
    .filter((item) => item !== null) as Product[];
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const cartFromLocalStorage = getCartFromLocalStorage();
    setCartItems(cartFromLocalStorage);
    updateTotalPrice(cartFromLocalStorage);
  }, []);

  const updateTotalPrice = (cart: Product[]) => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotalPrice(total);
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const updatedCart = updateProductQuantity(cartItems, productId, change);
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
    updateTotalPrice(updatedCart);
  };

  const navigateToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col-reverse md:flex-row justify-center w-full h-full gap-8">
      {/* Product List Section */}
      <div className="w-full md:w-2/3 p-4">
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-2 flex flex-col items-center"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md mb-2"
                />
                <h2 className="text-sm font-medium text-main mb-1">
                  {item.name}
                </h2>
                <p className="text-xs text-main">
                  Price: ${item.price.toFixed(2)}
                </p>
                <p className="text-xs text-main">Quantity: {item.quantity}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    className="text-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    className="text-red-600"
                  >
                    -
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-main w-full">
              <p>Your cart is empty. Add some products to continue.</p>
              <Link href="/" className="text-main underline">
                Go to Shop
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Summary Section */}
      {cartItems.length > 0 ? (
        <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-main mb-4">
            Checkout Summary
          </h2>
          <p className="text-main mb-2">
            Total Price:{" "}
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </p>
          <p className="text-main mb-2">
            Total Products:{" "}
            <span className="font-bold">{cartItems?.length}</span>
          </p>
          <button
            onClick={navigateToCheckout}
            className="w-full bg-main text-two py-2 rounded-md hover:bg-two hover:text-main"
          >
            Proceed to Checkout
          </button>
          <div className="bg-white p-3 rounded-lg shadow-md mb-4 mt-5">
            <h3 className="text-lg font-semibold text-main mb-2">Receipt</h3>
            <ul className="text-sm text-main">
              {cartItems.map((item) => (
                <li key={item._id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="text-left mt-2 font-semibold text-two">
              <span className="text-main">Total:</span> ${totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
