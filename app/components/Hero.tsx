"use client";
import Image from "next/image";
import Watch from "./watch.png";
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
      className={`text-white backgroundd bg-cover bg-center w-full flex items-center justify-around ${
        token ? "h-[500px]" : "h-[600px]"
      }`}
    >
      <div className=" w-[35%] md:w-1/2 ">
        <h1
          style={{ textWrap: "pretty" }}
          className=" text-3xl md:text-5xl  text-left  my-2"
        >
          Welcome to <span className="text-[#bc975b]"> CLOCKY</span> <br />
          the biggest online watches store in Egypt
        </h1>

        <p
          style={{ textWrap: "pretty" }}
          className="text-base font-normal text-left flex my-2"
        >
          Here you will find everything that suits you from watches from <br />
          the latest modern and international <br /> brands for men and women
        </p>

        {/* <div className="my-20">
          <Link
            href={"/login"}
            className={`px-3 py-6 bg-white text-black w-40 hover:bg-[#8b8b8b] ${
              token ? "hidden" : ""
            }`}
          >
            Create account
          </Link>
        </div> */}
      </div>
      <div>
        <Image src={Watch} alt="Watch" className="w-60 " />
      </div>
    </div>
  );
};

export default Hero;
