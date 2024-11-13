"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosConfig";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const getCartFromLocalStorage = (): Product[] =>
  JSON.parse(localStorage.getItem("cart") || "[]");

const saveCartToLocalStorage = (cart: Product[]) =>
  localStorage.setItem("cart", JSON.stringify(cart));

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    governorate: "",
    address: "",
    city: "",
    country: "Egypt",
    phoneNumber: "",
    paymentMethod: "",
  });
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) {
      alert("Please log in to proceed with checkout.");
      router.push("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const checkoutPayload = {
        userId,
        products: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity || 1,
          price: item.price * (item.quantity || 1),
          name: item.name,
        })),
        totalPrice,
        paymentMethod: userInfo.paymentMethod,
        shippingAddress: {
          fullName: userInfo.fullName,
          governorate: userInfo.governorate,
          address: userInfo.address,
          country: userInfo.country,
          city: userInfo.city,
          phone: userInfo.phoneNumber,
        },
      };

      const response = await axiosInstance.post(
        `/products/checkout`,
        checkoutPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        alert("Checkout completed successfully!");
        setCartItems([]);
        saveCartToLocalStorage([]);

        localStorage.setItem("orderDetails", JSON.stringify(checkoutPayload));
        router.push("/order-confirmation");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg text-main">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={userInfo.fullName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Governorate
          </label>
          <select
            name="governorate"
            value={userInfo.governorate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Governorate</option>
            <option value="Cairo">Cairo</option>
            <option value="Alexandria">Alexandria</option>
            {/* Add other Egyptian governorates as options here */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">City</label>
          <input
            type="text"
            name="city"
            value={userInfo.city}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={userInfo.country}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={userInfo.paymentMethod}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="Pay with Card">Credit Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            {/* Add other payment methods as needed */}
          </select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Total Price: ${totalPrice.toFixed(2)}
          </h3>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-main text-two font-semibold rounded hover:bg-two hover:text-main"
        >
          Proceed to Checkout
        </button>
      </form>
    </div>
  );
};

export default Checkout;
