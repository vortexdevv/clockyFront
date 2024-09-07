"use client";
import Image from "next/image";
import Watch from "../../public/watch.png";
import { useEffect, useState } from "react";
import axios from "axios";
type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  countInStock: number;
  pic: string;
};
const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

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
  const data: any = products;
  console.log(data);

  return (
    <div className="mx-auto flex justify-center flex-col items-center md:w-4/5 sm:w-full bg-[#FCFCFC] pt-10">
      <div className="border-t-2 border-[#D4AF37] w-20 p-1 font-medium"></div>
      <h2 className="text-[#2E2E2E]">FEATURED</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
        {data.map((card: any, index: number) => {
          return (
            <div
              key={index}
              className="mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center justify-center p-16 gap-5 relative shadow-xl"
            >
              <span className="-rotate-90 bg-[#414B43] py-2 px-5 absolute -left-4 top-12">
                SALE
              </span>
              <img src={card.img} alt="watch" className="w-[140px] h-[215px]" />
              <h1 className="text-[#2E2E2E] font-bold text-3xl">{card.name}</h1>
              <p className="text-[#D4AF37] font-bold text-2xl">{card.price}</p>
              <button className="py-5 px-8 bg-[#414B43]">ADD TO CARD</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Products;
