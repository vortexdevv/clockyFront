import React from "react";
import Image from "next/image";
import Watch from "../../../public/watch.png";
import ProductById from "@/app/components/ProductById";
import Nav from "@/app/components/Nav";

const Page = () => {
  // return (
  //   <div className="min-h-screen bg-[#FCFCFC] flex justify-center items-center px-4">
  //     <div className="md:w-4/5 flex md:flex-row items-center justify-around w-full flex-col">
  //       <div className="mb-6 md:mb-0">
  //         <Image src={Watch} alt="watch" className="w-[250px] md:w-[350px]" />
  //       </div>
  //       <div>
  //         <div className="flex flex-col justify-center items-center p-6 gap-3 text-center">
  //           <h1 className="text-[#2E2E2E] text-2xl md:text-3xl font-medium">
  //             JAZZMASTER
  //           </h1>
  //           <p className="text-[#D4AF37B2] text-lg md:text-xl">EGP 1050</p>
  //         </div>
  //         <div className="flex flex-col p-6 gap-3">
  //           <input
  //             className="border-[1px] border-[#F0F0F0] text-[#2E2E2E] text-center w-full md:w-36 bg-[#F0F0F0] py-2"
  //             type="number"
  //             placeholder="1"
  //           />
  //           <button className="text-[#2E2E2E] px-4 py-3 w-full md:w-96 bg-gray-200">
  //             ADD TO CART
  //           </button>
  //           <button className="bg-main text-[#FFFFFF] px-4 py-3 w-full md:w-96">
  //             BUY NOW
  //           </button>
  //         </div>
  //         <div className="flex flex-col gap-3 p-6">
  //           <p className="text-lg font-normal text-[#2E2E2E]">ADD REVIEW</p>
  //           <input
  //             className="text-[#2E2E2E] px-4 py-6 border-[1px] border-[#F0F0F0] h-24 w-full"
  //             type="text"
  //             placeholder="Write your review here"
  //           />
  //           <div className="text-end">
  //             <button className="bg-main text-[#FFFFFF] w-24 py-2">ADD</button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="h-full">
      <Nav />
      <ProductById />
    </div>
  );
};

export default Page;
