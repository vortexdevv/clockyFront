"use client";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Traje from "../../public/traje.png";

type Product = {
  _id: string;
  name: string;
  before: number;
  price: number;
  description: string;
  countInStock: number;
  img: string;
};

export const Recommended = () => {
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const { toast } = useToast();

  const recommendedProduct: Product = {
    _id: "recommended_1",
    name: "Inspirational Watch",
    before: 5000,
    price: 4500,
    description: "The latest and modern watches of this year.",
    countInStock: 10,
    img: "/traje.png", // Assuming you use Traje image for the recommended product
  };

  const addToCart = (product: Product) => {
    setActiveProductId(product._id);
    setTimeout(() => {
      setActiveProductId(null);
    }, 1000);

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
      action: (
        <Link href="/cart" className="p-[10px]">
          Go to cart
        </Link>
      ),
    });
  };

  return (
    <div className="text-white mx-auto md:flex md:flex-row-reverse md:justify-evenly md:items-center md:w-4/5 bg-[#FCFCFC] p-12 md:p-8 md:py-24 gap-5 md:gap-20 flex flex-col sm:justify-center items-center w-full">
      <div className="flex flex-col gap-6 text-left md:items-start items-center">
        <span className="border-t-2 border-two w-20 px-1 font-medium"></span>
        <h3 className="text-[#2E2E2E] font-medium text-xl mainFont">
          Recommended
        </h3>
        <div className="flex flex-col gap-6 text-left">
          <h1 className="mainFont text-4xl text-[#2E2E2E] font-medium">
            Inspirational Watch of <br /> this year
          </h1>
          <p className="text-[#595959] text-base font-normal">
            The latest and modern watches of this year are available in various
            presentations in this store. Discover them now.
          </p>
          <button
            onClick={() => addToCart(recommendedProduct)}
            className="py-4 w-40 px-6 shadow-xl relative md:py-3 bg-main text-white font-semibold border overflow-hidden group"
          >
            Order now
            <div
              className={`group-hover:translate-x-0 absolute inset-0 md:group-hover:translate-x-0 bg-two w-full h-full transform translate-x-full transition-transform md:!duration-500 !duration-1000 ease-in-out center ${
                activeProductId === recommendedProduct._id
                  ? "group-hover:translate-x-0"
                  : ""
              }`}
            >
              Order now
            </div>
          </button>
        </div>
      </div>
      <div className="mt-5">
        <Image
          src={Traje}
          alt="Inspirational Watch"
          className="w-[300px] md:w-[400px] md:h-[400px] shadow-4xl md:shadow-3xl"
        />
      </div>
    </div>
  );
};

export default Recommended;
