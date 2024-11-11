/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from ShadCN UI

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { toast } = useToast();
  const [isInView, setIsInView] = useState(false);

  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://clockyexpress.vercel.app/api/products/newArrival",
          {
            withCredentials: true,
          }
        );
        console.log(response.data);

        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setActiveProductId(product._id);
    setTimeout(() => {
      setActiveProductId(null); // Clear the animation after 1 second
    }, 1000); // Match the transition duration (1000ms)
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item: any) => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toast({
      title: product.name,
      description: "added to cart",
      action: <Link href="/cart">Go to cart</Link>,
    });
  };

  return (
    <div
      id="newarraival"
      className={
        products.length > 0
          ? "flex flex-col items-center w-full bg-[#FCFCFC] p-6 px-6 md:px-14 mx-auto xl:w-3/4"
          : "hidden"
      }
    >
      <div className="border-t-2 border-two w-20 p-1 font-medium"></div>
      <h2 className="text-[#2E2E2E] font-bold">NEW ARRIVALS</h2>
      <div className="grid gap-4 md:gap-16 xl:gap-20 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] place-items-center w-full md:w-4/5">
        {loading
          ? // Display skeletons when loading
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[350px] w-full md:w-[225px] bg-gray-200 rounded-lg"
              />
            ))
          : products.map((product, index) => (
              <div
                key={index}
                className={`${
                  isInView
                    ? "motion-scale-in-[0.5] motion-translate-x-in-[-199%] motion-translate-y-in-[-17%] motion-opacity-in-[0%] motion-rotate-in-[-10deg] motion-blur-in-[5px] motion-duration-[0.00s] motion-duration-[0.70s]/translate"
                    : ""
                } mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center pb-8 gap-2 shadow-lg transition-transform duration-300 transform md:hover:scale-105 w-full md:w-[225px]`}
              >
                <Link
                  href={`/product/${product._id}`}
                  className="flex w-full flex-col gap-2 justify-between h-full"
                >
                  <img
                    src={product.img}
                    loading="lazy"
                    alt={product.name}
                    className="w-full object-cover h-40 md:h-64"
                  />
                  <div className="text-center">
                    <h1 className="text-main font-bold text-lg md:text-xl truncate w-full">
                      {product.name}
                    </h1>
                    <p className="text-[#595959] text-sm line-through">
                      {product.before} L.E
                    </p>
                    <p className="text-two font-bold text-xl md:text-2xl">
                      {product.price} L.E
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="relative h-10 flex items-center justify-center px-4 py-2 bg-main text-white font-semibold border overflow-hidden group"
                >
                  <div
                    className={`absolute center inset-0 group-hover:translate-x-0 bg-two w-full h-full transform translate-x-full transition-transform duration-500 ease-in-out ${
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

export default Arrivals;
