/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Watch from "../../public/watch.png"; // Fallback image
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Mytable from "./Mytable";
import axiosInstance from "@/lib/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // Solid heart for favorite
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; // Outline heart for not favorite
import { faSpinner } from "@fortawesome/free-solid-svg-icons"; // Spinner for loading
import Loading from "./Loading";
import debounce from "lodash.debounce";

const ProductById = () => {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState<any>(null); // Store fetched product data
  const [loading, setLoading] = useState(true); // Manage loading state for product fetch
  const [quantity, setQuantity] = useState(1); // Manage product quantity
  const [isFavorite, setIsFavorite] = useState(false); // Track if the product is a favorite
  const [favoriteLoading, setFavoriteLoading] = useState(false); // Manage loading state for add to favorite
  const [userId, setUserId] = useState<string | null>(null); // Get the user
  const { toast } = useToast();

  // Get the userId from localStorage
  useEffect(() => {
    const userID = localStorage.getItem("userId");
    setUserId(userID);

    if (userID && id) {
      checkIfFavorite(userID); // Pass userId to checkIfFavorite function
    }
    fetchProduct();
  }, [id]);

  // Fetch product details
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://clockyexpress.vercel.app/api/products/${id}`
      );
      setProduct(res.data);
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  // Check if the product is in the user's favorite list
  const checkIfFavorite = async (userId: string) => {
    try {
      const res = await axios.post(
        `https://clockyexpress.vercel.app/api/products/isFavorite/${userId}`,
        {
          ProductId: id,
        }
      );
      setIsFavorite(res.data.isFavorite);
    } catch (error: any) {
      console.error("Error checking favorite:", error);
    }
  };

  // Add to Favorites functionality
  const handleAddToFavorites = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        await axiosInstance.delete(`/products/favorites/${userId}`, {
          data: { ProductId: product._id },
        });
        setIsFavorite(false);
        toast({
          title: "Removed from favorites",
        });
      } else {
        // Add to favorites
        await axiosInstance.post(`/products/favorites/${userId}`, {
          ProductId: product._id,
        });
        setIsFavorite(true);
        toast({
          title: "Added to favorites",
        });
      }
    } catch (error: any) {
      console.error("Error updating favorite status:", error);
      toast({
        title: "error",
        description: "You are not logged in please login and try again",
        variant: "destructive",
        action: <Link href="/login">Go to login page</Link>,
      });
      setFavoriteLoading(false);
    } finally {
      setFavoriteLoading(false);
    }
  };

  // Add to Cart functionality
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item: any) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast({
      title: "Added to cart",
      action: (
        <Link href="/cart" className="p-[10px]">
          Go to cart
        </Link>
      ),
    });
  };

  if (loading) {
    return (
      <div className="w-full h-full">
        <Loading />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  // suggestion
  const Search = () => {
    // const [query, setQuery] = useState("");
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
      handleSearch(product?.name);
    }, [product?.name]); // Re-run the search whenever the query changes

    const addToCart = (product: any) => {
      setActiveProductId(product._id);
      setTimeout(() => {
        setActiveProductId(null); // Clear the animation after 1 second
      }, 1000); // Match the transition duration (1000ms)

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingProduct = cart.find(
        (item: any) => item._id === product._id
      );

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
      <div className="w-[80%] mx-auto mt-5 py-10 text-base center flex-col">
        <h1 className="text-2xl font-bold text-center p-5">More Like this </h1>
        {results.length > 0 && (
          <div className="grid gap-4 md:gap-16 xl:gap-20 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] place-items-center w-full md:w-4/5">
            {results.map((product, index) => (
              <div
                key={index}
                className="mt-4 h-full justify-between md:mt-6 border-solid md:w-[225px]  border-2 bg-white flex flex-col items-center md:px-4 xl:px-4 p-4 gap-2 relative shadow-xl transition-transform duration-300 ease-in-out transform md:hover:scale-105"
              >
                <Link
                  href={`/product/${product._id}`}
                  className="flex flex-col gap-4 justify-around items-center h-full"
                >
                  {/* <span className="-rotate-90 bg-main text-white py-2 px-2 absolute font-bold -left-[6px] md:top-2 top-[10px]">
                    SALE
                  </span> */}
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
                  className="relative h-[10%] flex items-center justify-center whitespace-nowrap px-4 py-1 md:py-3 bg-main text-two font-semibold border overflow-hidden group"
                >
                  <div
                    className={`absolute inset-0 md:group-hover:translate-x-0 bg-two text-main w-full h-full transform translate-x-full transition-transform md:!duration-500 !duration-1000 ease-in-out center ${
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

        {results.length === 0 && (
          <p className="mt-8 text-gray-500">No products found</p>
        )}
      </div>
    );
  };
  // .............
  return (
    <div className="flex-col flex items-center h-full mt-20 w-full text-pretty">
      <div className="flex md:flex-row items-center justify-around w-full flex-col bg-white">
        <div className="mb-6 md:mb-0">
          <img
            src={product.img || Watch}
            alt={product.name || "watch"}
            className="w-[250px] md:w-[350px]"
          />
        </div>
        <div>
          <div className="flex flex-col justify-center items-center p-6 gap-3 text-center">
            <h1 className="text-[#2E2E2E] text-2xl md:text-3xl font-medium">
              {product.name}
            </h1>
            <p className="text-[#D4AF37B2] text-lg md:text-xl">
              EGP {product.price}
            </p>
            <p>Description: {product.description}</p>
          </div>
          <div className="flex flex-col p-6 gap-3">
            <input
              className="border-[1px] border-[#F0F0F0] text-[#2E2E2E] text-center w-full md:w-36 bg-[#F0F0F0] py-2"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              min="0"
              placeholder="0"
            />
            <button
              className="text-two px-4 py-3 w-full md:w-96 bg-main hover:bg-two hover:text-main"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
            <button
              className={`text-white px-4 py-3 w-full md:w-96 flex justify-center items-center ${
                isFavorite ? "bg-two text-main " : "bg-main"
              } hover:bg-two hover:text-main relative`}
              onClick={handleAddToFavorites}
              disabled={favoriteLoading}
            >
              {favoriteLoading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="animate-spin mr-2 hover:text-main"
                />
              ) : (
                <FontAwesomeIcon
                  icon={isFavorite ? solidHeart : regularHeart}
                  className={`mr-2 transition-all duration-300 transform hover:text-main ${
                    isFavorite ? "scale-125 text-red-500" : "text-gray-300"
                  }`}
                />
              )}
              {isFavorite ? "REMOVE FROM FAVORITES" : "ADD TO FAVORITES"}
            </button>
          </div>
        </div>
      </div>
      <Mytable product={product} />
      <Search />
    </div>
  );
};

export default ProductById;
