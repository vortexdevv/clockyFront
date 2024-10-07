"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Watch from "../../public/watch.png"; // Keep this as a fallback image
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Loading from "./Loading";

const ProductById = () => {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState<any>(null); // Store fetched product data
  const [loading, setLoading] = useState(true); // Manage loading state
  const [quantity, setQuantity] = useState(1); // Manage product quantity
  const { toast } = useToast();

  useEffect(() => {
    // Fetch product details if id is available
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(
            `https://clockyexpress.vercel.app/api/products/${id}`
          );
          const data = await res.json();
          setProduct(data); // Store product data in state
          setLoading(false); // Turn off loading
        } catch (error) {
          console.error("Error fetching product:", error);
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  // Add to Cart functionality
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item: any) => item._id === product._id);

    if (existingProduct) {
      // If the product already exists in the cart, update the quantity
      existingProduct.quantity += quantity;
    } else {
      // If it's a new product, add it to the cart
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
    // alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="w-full h-full center">
        <Loading />
      </div>
    ); // Show loading state while fetching data
  }

  if (!product) {
    return <div>Product not found</div>; // Handle case where product isn't found
  }

  return (
    <div className="min-h-screen  md:min-h-[70vh]  bg-main flex justify-center items-center px-4 h-full mt-6 text-pretty">
      <div className="md:w-4/5 flex md:flex-row items-center justify-around w-full flex-col bg-white h-[85%]">
        <div className="mb-6 md:mb-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.img || Watch} // Use fetched image or fallback image
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
          </div>
          {/* <div className="flex flex-col gap-3 p-6">
            <p className="text-lg font-normal text-[#2E2E2E]">ADD REVIEW</p>
            <input
              className="text-[#2E2E2E] px-4 py-6 border-[1px] border-[#F0F0F0] h-24 w-full"
              type="text"
              placeholder="Write your review here"
            />
            <div className="text-end">
              <button className="bg-main text-[#FFFFFF] w-24 py-2">ADD</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductById;
