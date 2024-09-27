"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/search-alt-1-svgrepo-com.svg";
import { MinimalistGenderDropdown } from "@/components/minimalist-gender-dropdown";
import { useToast } from "@/hooks/use-toast";
import DropdownMenu from "./DropdownMenu";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [storageValue, setStorageValue] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // This will run only on the client-side
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("token");
      setStorageValue(value);
    }
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClick = () => {
    localStorage.removeItem("token");
    setStorageValue(null);
    toast({
      title: "Logged Out successfully",
    });
  };
  return (
    <div
      className={`mainFont top-0 shadow-lg text-white fixed w-full  mx-auto  z-10 flex justify-between items-center p-5 transition-colors duration-300 ${
        isScrolled ? "bg-main  w-full" : "bg-tranmainFontsparent"
      }`}
    >
      <div>
        <Link href="/">
          <h1 className="text-2xl mainFont hover:text-two">Clocky</h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="md:flex md:gap-3 lg:gap-8 items-center text-[15px] hidden">
        <Link className="hover:text-two " href="#newarraival">
          NEW ARRIVAL
        </Link>
        <Link className="hover:text-two " href="/shop">
          SHOP
        </Link>
        <Link className="hover:text-two " href="/brands">
          BRANDS
        </Link>
        <div className="hover:text-two ">
          {/* <MinimalistGenderDropdown /> */}
          {/* <GenderSelect /> */}
          <DropdownMenu />
        </div>
        <Link className="hover:text-two " href="#contact-us">
          CONTACT US
        </Link>
        <Link className="hover:text-two " href="/policy">
          POLICY
        </Link>
        <Link
          className={`hover:text-two ${storageValue ? "hidden" : ""}`}
          href="/login"
        >
          LOGIN
        </Link>
        <Link
          className={`hover:text-two ${storageValue ? "" : "hidden"}`}
          onClick={handleClick}
          href="/"
        >
          LOGOUT
        </Link>
        <Link className="hover:text-two " href="/cart">
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

      {/* Search Icon for Desktop */}
      <div className="md:flex items-center hidden">
        <button onClick={toggleSearch} className="focus:outline-none">
          {/* <Image className="w-6 h-6" src={logo} alt="Search Icon" /> */}
        </button>
      </div>

      {/* Burger Menu for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
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
        className={`text-center p-5 ${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-full left-0 w-full bg-main transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0 flex flex-col gap-2"
            : "opacity-0 -translate-y-2"
        }`}
      >
        <Link
          className="block px-4 py-2 text-white hover:bg-gray-700 bg-[#0000004d]"
          href="#newarraival"
          onClick={() => setIsOpen(false)}
        >
          New arrival
        </Link>
        <Link
          className="block px-4 py-2 text-white hover:bg-gray-700 bg-[#0000004d]"
          href="#shop"
          onClick={() => setIsOpen(false)}
        >
          shop
        </Link>
        <Link
          className="block px-4 py-2 text-white hover:bg-gray-700 bg-[#0000004d]"
          href="/brands"
          onClick={() => setIsOpen(false)}
        >
          Brands
        </Link>
        <div
          className="block px-4 py-2 text-white hover:bg-two bg-[#0000004d]"
          // onClick={() => setIsOpen(false)}
        >
          <DropdownMenu />
        </div>

        <Link
          className="block px-4 py-2 text-white hover:bg-gray-700 bg-[#0000004d]"
          href="#contact-us"
          onClick={() => setIsOpen(false)}
        >
          Contact Us
        </Link>
        <Link
          className="block px-4 py-2 text-white hover:bg-gray-700 bg-[#0000004d]"
          href="/policy"
          onClick={() => setIsOpen(false)}
        >
          Policy
        </Link>

        <Link
          className="flex justify-center px-4 py-2 text-white hover:bg-gray-700 bg-[#0000004d]"
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
        <Link
          className={`hover:text-two bg-two py-2 ${
            storageValue ? "hidden" : ""
          }`}
          href="/login"
        >
          LOGIN
        </Link>
        <Link
          className={`hover:text-two bg-two py-2 ${
            storageValue ? "" : "hidden"
          }`}
          onClick={handleClick}
          href="/"
        >
          LOGOUT
        </Link>
        <button
          onClick={toggleSearch}
          className="focus:outline-none px-4 py-2 bg-[#0000004d] w-full flex justify-center"
        >
          <Image className="w-6 h-6" src={logo} alt="Search Icon" />
        </button>
      </div>

      {/* Search Popup */}
      {showSearch && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-4 rounded-lg shadow-lg w-4/5 md:w-1/3">
            <div className="flex items-center">
              <input
                className="w-full text-black p-2 border border-gray-300 rounded"
                type="search"
                placeholder="Search..."
                autoFocus
              />
              <button
                onClick={toggleSearch}
                className="ml-3 text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
