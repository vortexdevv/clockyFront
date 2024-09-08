"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
// import Watch from "./watch.png";
// import Image from "next/image";
type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  countInStock: number;
  img: string;
  quantity?: number; // Add quantity field for cart
};

const Products2 = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  // const products: Product[] = [
  //   {
  //     _id: "1",
  //     name: "p1",
  //     price: 2222,
  //     description: "ddff",
  //     countInStock: 255,
  //     img: "fgdfgdg",
  //   },
  //   {
  //     _id: "2",
  //     name: "p1",
  //     price: 2222,
  //     description: "ddff",
  //     countInStock: 255,
  //     img: "fgdfgdg",
  //   },
  //   {
  //     _id: "3",
  //     name: "p1",
  //     price: 2222,
  //     description: "ddff",
  //     countInStock: 255,
  //     img: "fgdfgdg",
  //   },
  //   {
  //     _id: "4",
  //     name: "p1",
  //     price: 2222,
  //     description: "ddff",
  //     countInStock: 255,
  //     img: "fgdfgdg",
  //   },
  // ];
  const addToCart = (product: Product) => {
    // Get the current cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in the cart
    const existingProduct = cart.find(
      (item: Product) => item._id === product._id
    );

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
    <div className="mx-auto flex justify-center flex-col items-center md:w-4/5 sm:w-full bg-[#FCFCFC] p-5 gap-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <span className="border-t-2 border-[#D4AF37] w-20 px-1 font-medium"></span>
        <h1 className="text-xl font-medium text-[#2E2E2E]">PRODUCTS</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-3">
        {products.map((product: Product, index: number) => (
          <div
            key={index}
            className="border-solid border-2 shadow-2xl border-[#F0F0F0] flex flex-col items-center justify-center p-11 gap-4 md:w-56 transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-[155px] h-[155px]"
            />
            <h1 className="text-[#2E2E2E] text-3xl font-medium">
              {product.name}
            </h1>
            <h2 className="text-[#D4AF37] text-2xl font-black">
              ${product.price}
            </h2>
            <button
              onClick={() => addToCart(product)}
              className="bg-[#2B2B2B] p-4 relative md:top-11 md:left-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#FFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 11V6a3 3 0 116 0v4.967M10.4 21h3.2c2.24 0 3.36 0 4.216-.436a4 4 0 001.748-1.748C20 17.96 20 16.84 20 14.6v-2.4c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C18.48 9 17.92 9 16.8 9H7.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C4 10.52 4 11.08 4 12.2v2.4c0 2.24 0 3.36.436 4.216a4 4 0 001.748 1.748C7.04 21 8.16 21 10.4 21z"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products2;
