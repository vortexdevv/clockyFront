"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import logo from "../../public/search-alt-1-svgrepo-com.svg";
import DropdownMenu from "./DropdownMenu";
import { AccessibleDropdown } from "@/components/accessible-dropdown";

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
      className={`mainFont top-0 shadow-lg text-two fixed w-full  mx-auto  z-10 flex justify-between items-center p-5 transition-colors duration-300 ${
        isScrolled ? "bg-main w-full" : "bg-transparent"
      }`}
    >
      <div>
        <Link href="/">
          <h1 className="text-2xl mainFont hover:text-white">Clocky</h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="md:flex md:gap-3 lg:gap-8 items-center text-[15px] hidden">
        <Link className="hover:text-white" href="#newarraival">
          NEW ARRIVAL
        </Link>
        <Link className="hover:text-white" href="/shop">
          SHOP
        </Link>
        <div className="hover:text-white">
          <AccessibleDropdown />
        </div>
        <Link className="hover:text-white" href="#contactus">
          CONTACT US
        </Link>
        <Link className="hover:text-white" href="/policy">
          POLICY
        </Link>
        <Link
          className={`hover:text-white ${storageValue ? "hidden" : ""}`}
          href="/login"
        >
          LOGIN
        </Link>
        <Link
          className={`hover:text-white ${storageValue ? "" : "hidden"}`}
          onClick={handleClick}
          href="/"
        >
          LOGOUT
        </Link>

        {/* Favorites Link with Heart Icon */}
        <Link className="hover:text-white flex items-center" href="/favorites">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#e3c578"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 21c-1.105-.008-9.303-6.918-9.303-11.252 0-2.88 2.305-5.205 5.157-5.205 1.647 0 3.26.881 4.146 2.285 0.887-1.404 2.5-2.285 4.146-2.285 2.852 0 5.157 2.324 5.157 5.205C21.303 14.082 13.105 20.992 12 21z"
            ></path>
          </svg>
        </Link>

        <Link className="hover:text-white" href="/cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#e3c578"
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
        <Link href={"/search"}>
          <Image className="w-6 h-6" src={logo} alt="Search Icon" />
        </Link>
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
          className="block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d]"
          href="#newarraival"
          onClick={() => setIsOpen(false)}
        >
          NEW ARRIVAL
        </Link>
        <Link
          className="block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d]"
          href="/shop"
          onClick={() => setIsOpen(false)}
        >
          SHOP
        </Link>
        <div className="block px-4 py-2 text-two hover:bg-two  bg-[#0000004d]">
          <AccessibleDropdown />
        </div>

        <Link
          className="block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d]"
          href="/support"
          onClick={() => setIsOpen(false)}
        >
          CONTACT US
        </Link>
        <Link
          className="block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d]"
          href="/policy"
          onClick={() => setIsOpen(false)}
        >
          POLICY
        </Link>
        <Link
          className={`block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d] ${
            storageValue ? "hidden" : ""
          }`}
          href="/login"
          onClick={() => setIsOpen(false)}
        >
          LOGIN
        </Link>
        <Link
          className={`block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d] ${
            storageValue ? "" : "hidden"
          }`}
          href="/"
          onClick={() => {
            handleClick();
            setIsOpen(false);
          }}
        >
          LOGOUT
        </Link>
        <Link
          className="block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d]"
          href="/favorites"
          onClick={() => setIsOpen(false)}
        >
          FAVORITE
        </Link>
        <Link
          className="block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d]"
          href="/cart"
          onClick={() => setIsOpen(false)}
        >
          CART
        </Link>
      </div>
    </div>
  );
};

export default Nav;
