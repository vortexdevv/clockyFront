"use client";
import Image from "next/image";
import Watch from "../../public/watch.png";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  before: number; // Original price
  price: number;
  description: string;
  countInStock: number;
  img: string;
};

const Arrivals = () => {
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  const data: any = [
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
  ];
  const addToCart = (product: Product) => {
    setActiveProductId(product._id);
    setTimeout(() => {
      setActiveProductId(null); // Clear the animation after 1 second
    }, 1000); // Match the transition duration (1000ms)

    // Set the active product id
    // Get the current cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in the cart
    const existingProduct = cart.find((item: any) => item._id === product._id);

    if (existingProduct) {
      // If the product exists, increment its quantity
      existingProduct.quantity += 1;
    } else {
      // Otherwise, add the product with an initial quantity of 1
      cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log(`${product.name} added to cart`);

    toast({
      title: product.name,
      description: "added to cart",
      action: <Link href="/cart">Go to cart</Link>,
    });
  };
  return (
    <div
      id="newarraival"
      className="text-white mx-auto flex justify-center flex-col items-center w-full bg-[#FCFCFC] md:p-16"
    >
      <div className="border-t-2 border-two w-20 p-2 font-medium"></div>
      <h2 className="text-[#2E2E2E]">NEW ARRIVALS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5  md:gap-6 gap-2 mb-3 media">
        {data.map((card: any, index: number) => {
          return (
            <div
              key={index}
              className="mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center justify-center md:p-8 p-4 gap-2 relative shadow-xl transition-transform duration-300 ease-in-out transform md:hover:scale-105"
            >
              <span className="bg-main py-2 px-2 absolute top-0 right-0">
                NEW
              </span>
              <Image src={Watch} alt="watch" className="w-[100px]" />
              <h1 className="text-[#2E2E2E] font-bold text-3xl">
                {card.title}
              </h1>
              <p className="text-[#595959] font-bold text-base line-through text-center">
                1000 L.E
              </p>
              <p className="text-two font-bold text-2xl">{card.price}</p>
              <button
                onClick={() => addToCart(card)} // Pass the product's id
                className="relative px-4 py-1 md:py-2 bg-main text-white font-semibold border rounded overflow-hidden group"
              >
                <div
                  className={`absolute inset-0 md:group-hover:translate-x-0 bg-two w-full h-full transform translate-x-full transition-transform md:!duration-500 !duration-1000 ease-in-out center ${
                    activeProductId === card._id
                      ? "group-hover:translate-x-0"
                      : ""
                  }`}
                >
                  ADD TO CART
                </div>
                ADD TO CART
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Arrivals;
