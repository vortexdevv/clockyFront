import React from "react";
import Image from "next/image";
import Watch from "../../../public/watch.png";
const page = () => {
  return (
    <div className="h-full bg-[#FCFCFC] flex justify-center items-center">
      <div className=" md:w-4/5 flex md:flex-row items-center justify-around w-full flex-col ">
        <div>
          <Image src={Watch} alt="watch" className=" w-[350px] " />
        </div>
        <div>
          <div className="flex flex-col justify-center items-center p-6 gap-3">
            <h1 className="text-[#2E2E2E] text-3xl font-medium">JAZZMASTER</h1>
            <p className="text-[#D4AF37B2] text-xl">EGP 1050</p>
          </div>
          <div className=" flex flex-col p-6 gap-3">
            <input
              className="border-[1px] border-[#F0F0F0] text-[#2E2E2E] text-center md:w-36 bg-[#F0F0F0]"
              type="number"
              placeholder="1"
            />
            <button className="text-[#2E2E2E] px-8 py-3 w-96">
              ADD TO CHART
            </button>
            <button className="bg-[#414B43] text-[#FFFFFF] px-8 py-3 w-96">
              BYE NOW
            </button>
          </div>
          <div className="flex flex-col gap-3 p-6">
            <p className="text-lg font-normal text-[#2E2E2E]">ADD REVIEW</p>
            <input
              className="text-[#2E2E2E] px-8 py-6 border-[1px] border-[#F0F0F0] h-24"
              type="text"
              name="ADD "
            />
            <div className="text-end">
              <button className="bg-[#414B43] text-[#FFFFFF] w-24">ADD</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
