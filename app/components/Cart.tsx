"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Watch from "./watch.png";

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
    .filter((item) => item !== null) as Product[];

  return updatedCart;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>(""); // Track selected payment method
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  }); // Track shipping address

  useEffect(() => {
    const cartFromLocalStorage = getCartFromLocalStorage();
    setCartItems(cartFromLocalStorage);
    updateTotalPrice(cartFromLocalStorage);
  }, []);

  // Update total price
  const updateTotalPrice = (cart: Product[]) => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotalPrice(total);
  };

  // Handle changing quantity
  const handleQuantityChange = async (productId: string, change: number) => {
    const updatedCart = updateProductQuantity(cartItems, productId, change);
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
    updateTotalPrice(updatedCart);
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  // Handle changes in shipping address
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  // Handle checkout submission
  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (
      !shippingAddress.fullName ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country ||
      !shippingAddress.phone
    ) {
      alert("Please fill in all shipping address fields.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

      if (!userId) {
        alert("Please log in to proceed with the checkout.");
        return;
      }

      // Create the checkout payload
      const checkoutPayload = {
        userId,
        products: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
        })),
        totalPrice,
        paymentMethod,
        shippingAddress,
      };
      console.log(checkoutPayload);

      // Send the data to the backend
      const response = await axios.post(
        `https://clockyexpress.vercel.app/api/products/checkout`,
        checkoutPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming a token is stored
          },
        }
      );

      if (response.status === 201) {
        alert(`Checkout successful with ${paymentMethod}`);
        setCartItems([]); // Clear cart on successful checkout
        saveCartToLocalStorage([]);
        updateTotalPrice([]);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
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
    <div className="flex flex-col-reverse md:flex-row justify-center w-full h-full">
      {/* Product List Section */}
      <div className="w-full md:w-2/3 p-4">
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg w-60 max-h-full flex flex-col justify-around rounded-lg overflow-hidden transition-transform transform md:hover:scale-105 hover:shadow-2xl"
            >
              <Image src={Watch} alt="" className="mx-auto w-1/2" />
              <div className="p-6 flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.name}
                </h2>
                <p className="text-gray-600 mb-4">Price: ${item.price}</p>
                <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    className="bg-main text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    className="bg-[#c81111] text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Section */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-lg flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Checkout Summary
        </h2>
        <div className="mb-4">
          <p className="text-lg text-gray-700">
            Total Price:{" "}
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </p>
        </div>

        {/* Shipping Address */}
        <div className="mb-4">
          <h3 className="text-lg text-gray-800">Shipping Address</h3>
          {Object.keys(shippingAddress).map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={(shippingAddress as any)[field]}
              onChange={handleAddressChange}
              placeholder={field}
              className="mb-2 p-2 border rounded-md w-full"
            />
          ))}
        </div>

        {/* Payment Method Selection */}
        <div className="mb-4">
          <h3 className="text-lg text-gray-800">Payment Method</h3>
          <div className="flex flex-col">
            <label className="mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                onChange={() => handlePaymentMethodChange("Cash on Delivery")}
                className="mr-2"
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Pay with Card"
                onChange={() => handlePaymentMethodChange("Pay with Card")}
                className="mr-2"
              />
              Pay with Card
            </label>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-main text-white py-3 rounded-md mt-4 hover:bg-[#5abd6e] transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
