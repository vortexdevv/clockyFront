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

const ProductById = () => {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState<any>(null); // Store fetched product data
  const [loading, setLoading] = useState(true); // Manage loading state for product fetch
  const [quantity, setQuantity] = useState(1); // Manage product quantity
  const [isFavorite, setIsFavorite] = useState(false); // Track if the product is a favorite
  const [favoriteLoading, setFavoriteLoading] = useState(false); // Manage loading state for add to favorite
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProduct();
      checkIfFavorite();
    }
  }, [id]);

  // Fetch product details
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://clockyexpress.vercel.app/api/products/${id}`
      );
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  // Check if the product is in the user's favorite list
  const checkIfFavorite = async () => {
    try {
      const res = await axiosInstance.post(`/products/isFavorite/${id}`, {
        ProductId: id,
      });
      setIsFavorite(res.data.isFavorite);
    } catch (error) {
      console.error("Error checking favorite:", error);
    }
  };

  // Add to Favorites functionality
  const handleAddToFavorites = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        await axiosInstance.delete(`/products/favorites/${id}`, {
          data: { ProductId: product._id },
        });
        setIsFavorite(false);
        toast({
          title: "Removed from favorites",
        });
      } else {
        // Add to favorites
        await axiosInstance.post(`/products/favorites/${id}`, {
          ProductId: product._id,
        });
        setIsFavorite(true);
        toast({
          title: "Added to favorites",
        });
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
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
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-center text-pretty">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

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
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              min="1"
              placeholder="1"
            />
            <button
              className="text-white px-4 py-3 w-full md:w-96 bg-main hover:bg-two"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
            <button
              className={`text-white px-4 py-3 w-full md:w-96 flex justify-center items-center ${
                isFavorite ? "bg-two" : "bg-main"
              } hover:bg-two relative`}
              onClick={handleAddToFavorites}
              disabled={favoriteLoading}
            >
              {favoriteLoading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="animate-spin mr-2"
                />
              ) : (
                <FontAwesomeIcon
                  icon={isFavorite ? solidHeart : regularHeart}
                  className={`mr-2 transition-all duration-300 transform ${
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
    </div>
  );
};

export default ProductById;
