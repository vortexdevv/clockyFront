import React from "react";
import Image from "next/image";
import xx from "../../public/quote-svgrepo-com.svg";
import Big from "../../public/big.png";
import Delmondo from "../../public/delmondo.jpeg";
export const One = () => {
  return (
    <div className=" w-4/5 flex justify-around items-center mx-auto p-20">
      <div className="">
        <div className="flex flex-col gap-10">
          <svg
            className=" shadow-2xl"
            fill="#D4AF37"
            width="40px"
            height="40px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>quote</title>{" "}
              <path d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 0-1.156 0.844-2.875 3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 0-1.156 0.875-2.875 3.875-5.344z" />{" "}
            </g>
          </svg>
          <p className="font-normal text-base text-left text-[#595959]">
            They are the best watches that one acquires, <br /> also they are
            always with the latest news and <br /> trends, with a very
            comfortable price and <br />
            especially with the attention you receive, they <br /> are always
            attentive to your questions.
          </p>
          <h1 className=" font-medium text-[#2E2E2E] text-base">
            {" "}
            March 27. 2023{" "}
          </h1>
        </div>
        <div className=" flex items-center my-9">
          <Image
            src={Delmondo}
            alt="watch"
            className="w-[60px] h-[60px] rounded-full "
          />
          <div className=" text-[#2E2E2E]">
            <h1 className=" font-medium  text-base">Ahmed Hassan</h1>
            <p className="font-normal ] text-sm">Ahmedhassan@gmail.com</p>
          </div>
        </div>
        <div className="flex gap-20">
          <button className=" shadow-2xl">
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#D4AF37"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
                  fill="#D4AF37"
                />{" "}
              </g>
            </svg>
          </button>
          <button className=" shadow-2xl">
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#D4AF37"
              transform="rotate(180)"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
                  fill="#D4AF37"
                />{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div>
        <Image
          src={Big}
          alt="watch"
          className=" w-[342px] h-[456px]  rounded-full"
        />
      </div>
    </div>
  );
};
export default One;
