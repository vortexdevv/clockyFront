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
const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://clockyexpress.vercel.app/api/products",
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
  // const products: Product[] = [
  //   {
  //     _id: "6",
  //     name: "p1",
  //     before: 1000,
  //     price: 2222,
  //     description: "ddff",
  //     countInStock: 255,
  //     img: "fgdfgdg",
  //   },
  //   {
  //     _id: "7",
  //     name: "p1",
  //     before: 1000,
  //     price: 2222,
  //     description: "ddff",
  //     countInStock: 255,
  //     img: "fgdfgdg",
  //   },
  //   {
  //     _id: "8",
  //     name: "p1",
  //     before: 1000,
  //     price: 2222,
  //     description: "ddff",
  //     countInStock: 255,
  //     img: "fgdfgdg",
  //   },
  //   {
  //     _id: "9",
  //     name: "p1",
  //     before: 1000,
  //     price: 2222,
  //     description: "ddff",
  //     countInStock: 255,
  //     img: "fgdfgdg",
  //   },
  //   // {
  //   //   _id: "5",
  //   //   name: "p1",
  //   //   before: 1000,
  //   //   price: 2222,
  //   //   description: "ddff",
  //   //   countInStock: 255,
  //   //   img: "fgdfgdg",
  //   // },
  // ];
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
    <div className="h-[90%] pb-14 mt-20 text-white flex  flex-col items-center w-full bg-white pt-10 p-2 text-center mx-auto xl:w-full">
      <div className="border-t-2 border-two w-20 p-1 font-medium"></div>
      <h2 className="text-[#2E2E2E] font-bold">ALL PRODUCTS</h2>
      <div className="grid gap-4 md:gap-16 xl:gap-20 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] place-items-center w-full md:w-4/5">
        {products.map((product, index) => (
          <div
            key={index}
            className="mt-4 h-full justify-between md:mt-6 border-solid md:w-[225px]  border-2 border-[#F0F0F0] flex flex-col items-center pb-8 gap-2 relative shadow-xl transition-transform duration-300 ease-in-out transform md:hover:scale-105"
          >
            <Link
              href={`/product/${product._id}`}
              className="flex flex-col gap-4  h-full"
            >
              {/* <span className="-rotate-90 bg-main py-2 px-2 absolute font-bold -left-[6px] md:top-2 top-[10px]">
                SALE
              </span> */}
              <img
                src={product.img}
                // width={100}
                loading="lazy"
                alt={product.name}
                className="w-full"
              />
              {/* <img
              src={Watch}
              alt={product.name}
              className="w-[140px] h-[215px]"
            /> */}
              <div>
                <h1 className="text-[#2E2E2E] font-bold text-3xl">
                  {product.name}
                </h1>
                <p className="text-[#595959] font-bold text-base line-through">
                  {product.before} L.E
                </p>
                <p className="text-two font-bold text-2xl ">
                  {product.price} L.E
                </p>
              </div>
            </Link>
            <button
              onClick={() => addToCart(product)} // Pass the product's id
              className="relative h-[10%] flex items-center justify-center whitespace-nowrap px-4 py-1 md:py-3 bg-main text-white font-semibold border overflow-hidden group"
            >
              <div
                className={`absolute inset-0 md:group-hover:translate-x-0 bg-two w-full h-full transform translate-x-full transition-transform md:!duration-500 !duration-1000 ease-in-out center ${
                  activeProductId === product._id
                    ? "group-hover:translate-x-0"
                    : ""
                }`}
              >
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
