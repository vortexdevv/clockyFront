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
    {
      _id: "4",
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
    {
      _id: "4",
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
    {
      _id: "4",
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
    {
      _id: "4",
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
    <div className=" text-white flex justify-center flex-col items-center w-full bg-[#FCFCFC] pt-10">
      <div className="border-t-2 border-two w-20 p-1 font-medium"></div>
      <h2 className="text-[#2E2E2E]">FEATURED</h2>
      <div className="grid sm:grid-cols-3 grid-cols-2 md:grid-cols-4 xl:grid-cols-5 md:gap-6 gap-2 media">
        {products.map((product, index) => (
          <div
            key={index}
            className="mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center justify-center md:p-8 xl:p-16 p-4 gap-2 relative shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <Link href={`/product/${product._id}`}>
              <span className="-rotate-90 bg-main py-2 px-2 absolute -left-[6px] md:top-2 top-[10px]">
                SALE
              </span>
              <Image
                src={Watch}
                width={100}
                alt={product.name}
                className="w-[100px]"
              />
              {/* <img
              src={Watch}
              alt={product.name}
              className="w-[140px] h-[215px]"
            /> */}
              <h1 className="text-[#2E2E2E] font-bold text-3xl">
                {product.name}
              </h1>
              <p className="text-[#595959] font-bold text-base line-through text-center">
                {product.before} L.E
              </p>
              <p className="text-two font-bold text-2xl text-center">
                {product.price} L.E
              </p>
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="relative px-6 py-3  bg-main text-white font-semibold border  rounded overflow-hidden group"
            >
              <div className="absolute  inset-0 bg-two w-full h-full transform translate-x-full group-hover:translate-x-0 transition-transform !duration-500 ease-in-out center">
                ADD TO CART
              </div>
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
