"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Hero = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // This will only run in the browser
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div
      className={`text-white bg-[#414B43] bg-cover bg-bottom mx-auto flex flex-col items-center justify-center md:w-4/5 sm:full relative ${
        token ? "h-[500px]" : "h-[600px]"
      }`}
    >
      <div className="w-9/12 absolute top-[20%] m-auto">
        <h1
          style={{ textWrap: "pretty" }}
          className=" text-4xl md:text-5xl font-bold  text-left md:leading-[56px] sm:leading-[45px] my-2"
        >
          Welcome to <span className="text-[#D4AF37]"> CLOCKY</span> <br />
          the biggest online watches store in Egypt
        </h1>

        <p className="text-base font-normal text-left flex my-2">
          Here you will find everything that suits you from watches from <br />
          the latest modern and international <br /> brands for men and women
        </p>
        <div className="my-20">
          <Link
            href={"/login"}
            className={`px-3 py-6 bg-white text-black w-40 hover:bg-[#8b8b8b] ${
              token ? "hidden" : ""
            }`}
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
