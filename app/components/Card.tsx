/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel"; // Import shadcn/ui Carousel
import { toast, useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosConfig";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // Solid heart for favorite
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; // Outline heart for not favorite
import { CarouselDApiDemo } from "@/components/imagesSlider";

type Product = {
  _id: string;
  name: string;
  before: number; // Original price
  price: number;
  description: string;
  countInStock: number;
  img: string;
  otherImages?: string[];
};
const Card = ({ product }: { product: Product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const router = useRouter();
  const addToCart = (product: Product) => {
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
      action: <Link href="/cart">Go to cart</Link>,
    });
  };
  // add to favorite
  // Get the userId from localStorage
  useEffect(() => {
    const userID = localStorage.getItem("userId");
    setUserId(userID);

    if (userID && product._id) {
      checkIfFavorite(userID); // Pass userId to checkIfFavorite function
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product._id]);
  // Check if the product is in the user's favorite list
  const checkIfFavorite = async (userId: string) => {
    try {
      const res = await axios.post(
        `https://clockyexpress.vercel.app/api/products/isFavorite/${userId}`,
        {
          ProductId: product._id,
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
  const images = [product.img, ...(product.otherImages || [])]; // Fallback if `otherImages` is undefined or empty
  return (
    <div
      className={`
                  rounded-md z-0 relative overflow-hidden mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col shadow transition-transform duration-300 transform w-full flex-grow`}
    >
      <button
        className={`text-white p-2 rounded-md absolute z-20   center ${
          isFavorite ? " text-main " : ""
        }  hover:text-main `}
        onClick={handleAddToFavorites}
        disabled={favoriteLoading}
      >
        {favoriteLoading ? (
          <FontAwesomeIcon icon={faSpinner} className="animate-spin  " />
        ) : (
          <FontAwesomeIcon
            icon={isFavorite ? solidHeart : regularHeart}
            className={` transition-all duration-300 transform  ${
              isFavorite ? "scale-125 text-two" : "text-main"
            }`}
          />
        )}
      </button>
      <div
        onClick={() => {
          router.push(`product/${product._id}`);
        }}
        className="flex w-full flex-col h-full cursor-pointer"
      >
        <div className="relative overflow-hidden border-b-2 drop-shadow flex-grow-[1]">
          {/* Carousel Component */}
          <CarouselDApiDemo images={images} />
          {/* <div className="card-img-background bg-cover bg-main"></div> */}
        </div>
        <div className="flex flex-col justify-between flex-grow-[2] px-2 pt-2">
          <div className="pb-2">
            <h2 className="text-main text-[20px] font-bold truncate w-full text-lines-1">
              {product.name}
            </h2>
            <p className="text-main text-lines-2">{product.description}</p>
          </div>
          <div className="flex pb-3">
            <p className="text-two text-[16px] md:text-[20px] font-bold">
              {product.price} L.E
              {/* <span className="text-[#595959] inline-flex text-[16px] ps-1 font-light line-through align-bottom">
                            {product.before} L.E
                          </span> */}
            </p>
            <p
              className={`text-[#595959] text-[14px] md:text-[16px] ps-1 line-through self-end ${
                product.before === null || product.before === undefined
                  ? "hidden"
                  : ""
              }`}
            >
              {product.before} L.E
            </p>
          </div>
        </div>
      </div>
      <div className="pb-2 px-2">
        <Button
          onClick={() => addToCart(product)}
          className="rounded-sm relative z-50 w-full bg-transparent text-main py-4 md:py-5 md:text-[14px] border border-main hover:font-bold hover:text-two hover:bg-main"
        >
          ADD TO CARD
        </Button>
      </div>
    </div>
  );
};

export default Card;
