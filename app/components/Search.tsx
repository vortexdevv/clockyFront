/* eslint-disable @next/next/no-img-element */
"use client";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce"; // Optional: Install lodash for debouncing
import Card from "./Card";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  // Debounced search function
  const handleSearch = debounce(async (searchTerm: string) => {
    try {
      if (searchTerm.trim()) {
        const response = await axios.get(
          `https://clockyexpress.vercel.app/api/products/search?keyword=${searchTerm}`
        );
        setResults(response.data);
      } else {
        setResults([]); // Clear results if the search term is empty
      }
    } catch (error) {
      console.error("Error searching products", error);
    }
  }, 300); // 300ms debounce time to limit API calls

  // Trigger search when query changes
  useEffect(() => {
    handleSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]); // Re-run the search whenever the query changes

  const addToCart = (product: any) => {
    setActiveProductId(product._id);
    setTimeout(() => {
      setActiveProductId(null); // Clear the animation after 1 second
    }, 1000); // Match the transition duration (1000ms)

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item: any) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast({
      title: product.name,
      description: "added to cart",
      action: (
        <Link href="/cart" className="p-[10px]">
          Go to cart
        </Link>
      ),
    });
  };

  return (
    <div className="center flex-col mx-auto text-base">
      <div className="text-white md:pl-5 md:text-left backgroundd md:bg-right bg-main bg-contain bg-no-repeat bg-center w-full flex flex-col justify-end md:gap-12 h-[300px] ">
        <span className="mainFont text-two text-8xl shadow-lg w-full">
          Search
        </span>
      </div>
      <div className="mb-6 px-5 md:px-20 w-full mt-5">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md w-full text-two bg-main"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update the query on every keystroke
        />
      </div>
      {results.length > 0 && (
        <div className="grid px-5 md:px-20 sm:grid-cols-3 mb-12 grid-cols-2 md:grid-cols-4 xl:grid-cols-5 md:gap-6 gap-2 media">
          {results.map((product, index) => (
            <Card product={product} key={product._id} />
          ))}
        </div>
      )}

      {results.length === 0 && query && (
        <p className="mt-8 text-gray-500">No products found</p>
      )}
    </div>
  );
};

export default Search;
