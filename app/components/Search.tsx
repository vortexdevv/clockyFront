/* eslint-disable @next/next/no-img-element */
"use client";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce"; // Optional: Install lodash for debouncing

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
    <div className="w-[80%] mx-auto mt-20 py-10 text-base">
      <div className="mb-6">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md w-full text-black"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update the query on every keystroke
        />
      </div>

      {results.length > 0 && (
        <div className="grid gap-4 md:gap-16 xl:gap-20 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] place-items-center w-full md:w-4/5">
          {results.map((product, index) => (
            <div
              key={index}
              className="mt-4 h-full justify-between md:mt-6 border-solid md:w-[225px]  border-2 bg-white flex flex-col items-center md:px-4 xl:px-4 p-4 gap-2 relative shadow-xl transition-transform duration-300 ease-in-out transform md:hover:scale-105"
            >
              <Link
                href={`/product/${product._id}`}
                className="flex flex-col gap-4 justify-around h-full"
              >
                <span className="-rotate-90 bg-main py-2 px-2 absolute font-bold -left-[6px] md:top-2 top-[10px]">
                  SALE
                </span>
                <img
                  src={product.img}
                  loading="lazy"
                  alt={product.name}
                  className="w-full"
                />
                <div>
                  <h1 className="text-[#2E2E2E] font-bold text-3xl">
                    {product.name}
                  </h1>
                  <p className="text-[#595959] font-bold text-base line-through">
                    {product.before} L.E
                  </p>
                  <p className="text-two font-bold text-2xl ">
                    {product.price} L.E
                  </p>
                </div>
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="relative h-[10%] flex items-center justify-center whitespace-nowrap px-4 py-1 md:py-3 bg-main text-white font-semibold border overflow-hidden group"
              >
                <div
                  className={`absolute inset-0 md:group-hover:translate-x-0 bg-two w-full h-full transform translate-x-full transition-transform md:!duration-500 !duration-1000 ease-in-out center ${
                    activeProductId === product._id
                      ? "group-hover:translate-x-0"
                      : ""
                  }`}
                >
                  ADD TO CART
                </div>
                ADD TO CART
              </button>
            </div>
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
