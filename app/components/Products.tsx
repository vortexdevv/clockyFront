"use client";
import Image from "next/image";
import Watch from "./watch.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
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

const Products = () => {
  // const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  // useEffect(() => {
  //   // Fetch products from the backend
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/products");
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch products", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);
  const products: Product[] = [
    {
      _id: "1",
      name: "p1",
      before: 1000,
      price: 2222,
      description: "ddff",
      countInStock: 255,
      img: "fgdfgdg",
    },
    {
      _id: "2",
      name: "p1",
      before: 1000,
      price: 2222,
      description: "ddff",
      countInStock: 255,
      img: "fgdfgdg",
    },
    {
      _id: "3",
      name: "p1",
      before: 1000,
      price: 2222,
      description: "ddff",
      countInStock: 255,
      img: "fgdfgdg",
    },
    {
      _id: "4",
      name: "p1",
      before: 1000,
      price: 2222,
      description: "ddff",
      countInStock: 255,
      img: "fgdfgdg",
    },
  ];
  const addToCart = (product: Product) => {
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
    <div className="mx-auto text-white flex justify-center flex-col items-center md:w-4/5 sm:w-full bg-[#FCFCFC] pt-10">
      <div className="border-t-2 border-[#D4AF37] w-20 p-1 font-medium"></div>
      <h2 className="text-[#2E2E2E]">FEATURED</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center justify-center p-16 gap-5 relative shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <span className="-rotate-90 bg-[#414B43] py-2 px-5 absolute -left-4 top-12">
              SALE
            </span>
            <Image
              src={Watch}
              width={140}
              height={215}
              alt={product.name}
              className="w-[155px] h-[155px]"
            />
            {/* <img
              src={Watch}
              alt={product.name}
              className="w-[140px] h-[215px]"
            /> */}
            <h1 className="text-[#2E2E2E] font-bold text-3xl">
              {product.name}
            </h1>
            <p className="text-[#595959] font-bold text-base line-through">
              {product.before} L.E
            </p>
            <p className="text-[#D4AF37] font-bold text-2xl ">
              {product.price} L.E
            </p>
            <button
              onClick={() => addToCart(product)}
              className="py-5 px-8 bg-[#414B43]"
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
