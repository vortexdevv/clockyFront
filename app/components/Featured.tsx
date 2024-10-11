/* eslint-disable @next/next/no-img-element */
"use client";
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
const Featured = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://clockyexpress.vercel.app/api/products/featured",
          {
            withCredentials: true,
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

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

    toast({
      title: product.name,
      description: "added to cart",
      action: (
        <Link href="/cart" className="p-[10px]">
          Go to cart
        </Link>
      ),
    });
  };

  return (
    <div className="flex flex-col items-center w-full bg-[#FCFCFC] pt-10 p-2 mx-auto xl:w-3/4">
      <div className="border-t-2 border-two w-20 p-1 font-medium"></div>
      <h2 className="text-[#2E2E2E] font-bold text-xl md:text-2xl">FEATURED</h2>
      <div className="grid gap-4 md:gap-8 xl:gap-12 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] place-items-center w-full md:w-4/5">
        {products.map((product, index) => (
          <div
            key={index}
            className="mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center p-4 gap-2 shadow-lg transition-transform duration-300 transform md:hover:scale-105 w-full md:w-[225px]"
          >
            <Link
              href={`/product/${product._id}`}
              className="flex flex-col gap-2 justify-between h-full"
            >
              <span className="rotate-90 text-white bg-main py-1 px-2 absolute font-bold -left-[6px] top-4 text-xs md:text-sm">
                SALE
              </span>
              <img
                src={product.img}
                loading="lazy"
                alt={product.name}
                className="w-full object-cover h-40 md:h-64"
              />
              <div className="text-center">
                <h1 className="text-[#2E2E2E] font-bold text-lg md:text-xl truncate w-full">
                  {product.name}
                </h1>
                <p className="text-[#595959] font-bold text-sm line-through">
                  {product.before} L.E
                </p>
                <p className="text-two font-bold text-lg md:text-2xl">
                  {product.price} L.E
                </p>
              </div>
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="relative h-10 flex items-center justify-center px-4 py-2 bg-main text-white font-semibold border overflow-hidden group"
            >
              <div
                className={`absolute inset-0 group-hover:translate-x-0 bg-two w-full h-full transform translate-x-full transition-transform duration-500 ease-in-out ${
                  activeProductId === product._id ? "translate-x-0" : ""
                }`}
              >
                <span className="truncate center">ADD TO CART</span>
              </div>
              <span className="truncate">ADD TO CART</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
