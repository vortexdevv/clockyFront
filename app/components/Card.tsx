/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/hooks/use-toast";
import Link from "next/link";
import React, { useState } from "react";
type Product = {
  _id: string;
  name: string;
  before: number; // Original price
  price: number;
  description: string;
  countInStock: number;
  img: string;
};
const Card = ({ product }: any) => {
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

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
      // onClick={()}
      className={`
                  rounded-md overflow-hidden mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col shadow transition-transform duration-300 transform w-full flex-grow`}
    >
      <div className="flex w-full flex-col h-full">
        <div className="relative overflow-hidden border-b-2 drop-shadow flex-grow-[1]">
          <img
            src={product.img}
            loading="lazy"
            alt={product.name}
            className="w-full object-cover transform transition-transform duration-300 hover:scale-110"
          />
          {/* <div className="card-img-background bg-cover bg-main"></div> */}
        </div>
        <div className="flex flex-col justify-between flex-grow-[2] px-2 pt-2">
          <div className="pb-2">
            <h2 className="text-main text-[20px] font-bold truncate w-full text-lines-1">
              {product.name}
            </h2>
            <p className="text-main text-lines-2">{product.description}</p>
          </div>
          <div className="flex pb-3">
            <p className="text-two text-[20px] font-bold">
              {product.price} L.E
              {/* <span className="text-[#595959] inline-flex text-[16px] ps-1 font-light line-through align-bottom">
                            {product.before} L.E
                          </span> */}
            </p>
            <p className="text-[#595959] ps-1 line-through self-end">
              {product.before} L.E
            </p>
          </div>
        </div>
      </div>
      <div className="pb-2 px-2">
        <Button
          onClick={() => addToCart(product)}
          className="rounded-sm w-full bg-transparent text-main py-5 text-[16px] border border-main hover:font-bold hover:text-two hover:bg-main"
        >
          ADD TO CARD
        </Button>
      </div>
    </div>
  );
};

export default Card;
