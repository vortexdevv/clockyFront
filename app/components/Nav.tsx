"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/search-alt-1-svgrepo-com.svg";
const Nav = () => {
  return (
    <div className="bg-transparent flex justify-between items-center p-5 fixed w-4/5 mx-auto left-[10%]">
      <div>
        <h1 className="text-2xl">Clocky</h1>
      </div>
      <div className="flex gap-7 items-center text-[15px]">
        <Link className=" hover:text-[#D4AF37]" href="#Home">
          Home
        </Link>
        <Link className=" hover:text-[#D4AF37]" href="#Gender">
          Gender
        </Link>
        <Link className=" hover:text-[#D4AF37]" href="#Brands">
          Brands
        </Link>
        <Link className=" hover:text-[#D4AF37]" href="#New arraival">
          New arraival
        </Link>
        <Link className=" hover:text-[#D4AF37]" href="#Filter">
          Filter
        </Link>
        <Link className=" hover:text-[#D4AF37]" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 11V6a3 3 0 116 0v4.967M10.4 21h3.2c2.24 0 3.36 0 4.216-.436a4 4 0 001.748-1.748C20 17.96 20 16.84 20 14.6v-2.4c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C18.48 9 17.92 9 16.8 9H7.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C4 10.52 4 11.08 4 12.2v2.4c0 2.24 0 3.36.436 4.216a4 4 0 001.748 1.748C7.04 21 8.16 21 10.4 21z"
            ></path>
          </svg>
        </Link>
      </div>
      <div className="flex bg-white p-[7px] px-3 w-1/3  gap-2 items-center">
        <Image src={logo} alt="" width={20} height={20} />
        <input className=" text-black" type="search" placeholder="search" />
      </div>
    </div>
  );
};

export default Nav;
