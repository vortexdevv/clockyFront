"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/search-alt-1-svgrepo-com.svg";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-transparent flex justify-between items-center p-5 fixed w-4/5 mx-auto left-[10%] z-10">
      <div>
        <h1 className="text-2xl">Clocky</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="md:flex md:gap-3 lg:gap-8 items-center text-[15px] hidden">
        <Link className="hover:text-[#D4AF37]" href="#Home">
          Home
        </Link>
        <Link className="hover:text-[#D4AF37]" href="#Gender">
          Gender
        </Link>
        <Link className="hover:text-[#D4AF37]" href="#Brands">
          Brands
        </Link>
        <Link className="hover:text-[#D4AF37]" href="#New arraival">
          New arrival
        </Link>
        <Link className="hover:text-[#D4AF37]" href="#Filter">
          Filter
        </Link>
        <Link className="hover:text-[#D4AF37]" href="/cart">
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

      {/* Desktop Search */}
      <div className="md:flex bg-white p-[5px] w-1/4 items-center hidden">
        <Image className="w-1/12" src={logo} alt="Search Logo" />
        <input
          className="w-1/2 text-black"
          type="search"
          placeholder="Search"
        />
      </div>

      {/* Burger Menu for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg
            className={`h-6 w-6 transform transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-full left-0 w-full bg-gray-800 transition-all duration-300 ease-in-out transform ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <Link
          className="block px-4 py-2 text-white hover:bg-gray-700"
          href="#Home"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          className="block px-4 py-2 text-white hover:bg-gray-700"
          href="#Gender"
          onClick={() => setIsOpen(false)}
        >
          Gender
        </Link>
        <Link
          className="block px-4 py-2 text-white hover:bg-gray-700"
          href="#Brands"
          onClick={() => setIsOpen(false)}
        >
          Brands
        </Link>
        <Link
          className="block px-4 py-2 text-white hover:bg-gray-700"
          href="#New arraival"
          onClick={() => setIsOpen(false)}
        >
          New arrival
        </Link>
        <Link
          className="block px-4 py-2 text-white hover:bg-gray-700"
          href="#Filter"
          onClick={() => setIsOpen(false)}
        >
          Filter
        </Link>
        <Link
          className="block px-4 py-2 text-white hover:bg-gray-700"
          href="/cart"
          onClick={() => setIsOpen(false)}
        >
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
    </div>
  );
};

export default Nav;
