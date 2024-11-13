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
    <div className="w-[80%] center flex-col mx-auto mt-20 py-10 text-base">
      <div className="mb-6 w-full">
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
              className="mt-4 mx-auto md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center pb-8 gap-2 shadow-lg transition-transform duration-300 transform md:hover:scale-105 w-full md:w-[225px]"
            >
              <Link
                href={`/product/${product._id}`}
                className="flex w-full flex-col gap-2 justify-between h-full"
              >
                {/* <span className="rotate-90 text-white bg-main py-1 px-2 absolute font-bold -left-[6px] top-4 text-xs md:text-sm">
                  SALE
                </span> */}
                <img
                  src={product.img}
                  loading="lazy"
                  alt={product.name}
                  className="w-full object-cover h-40 md:h-64"
                />
                <div className="text-center">
                  <h1 className="text-main font-bold text-lg md:text-xl truncate w-full">
                    {product.name}
                  </h1>
                  <p className="text-[#595959] text-sm line-through">
                    {product.before} L.E
                  </p>
                  <p className="text-two font-bold text-xl md:text-2xl">
                    {product.price} L.E
                  </p>
                </div>
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="relative h-10 flex items-center justify-center px-4 py-2 bg-main text-white font-semibold border overflow-hidden group"
              >
                <div
                  className={`absolute center inset-0 group-hover:translate-x-0 bg-two w-full h-full transform translate-x-full transition-transform duration-500 ease-in-out ${
                    activeProductId === product._id ? "translate-x-0" : ""
                  }`}
                >
                  <span className="truncate center">ADD TO CART</span>
                </div>
                <span className="truncate">ADD TO CART</span>
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
