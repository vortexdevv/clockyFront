"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  brand: string;
  before: number;
  price: number;
  description: string;
  countInStock: number;
  img: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [category, setCategory] = useState<string>("All");
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const { toast } = useToast();

  // Infinite Scroll & Pagination State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer: any = useRef<IntersectionObserver | null>(null);

  const lastProductRef: any = useCallback(
    (node: Element) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://clockyexpress.vercel.app/api/products`,
          {
            params: {
              page,
              limit: 2,
              brand: selectedBrand !== "All" ? selectedBrand : undefined,
              category: category !== "All" ? category : undefined,
              minPrice: priceRange[0],
              maxPrice: priceRange[1],
            },
            withCredentials: true,
          }
        );
        const newProducts = response.data;

        // Check if there are no more products
        if (newProducts.length === 0) setHasMore(false);

        // Reset products if fetching the first page (after a filter change)
        setProducts((prevProducts) =>
          page === 1 ? newProducts : [...prevProducts, ...newProducts]
        );
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [page, selectedBrand, category, priceRange]);

  // Update filtered products whenever filters change
  useEffect(() => {
    setPage(1); // Reset page to 1 when filters change
    setHasMore(true); // Reset hasMore to allow loading more products
  }, [selectedBrand, category, priceRange]);

  const brands = ["All", "rolex", "casio", "Brand3"];
  const categories = ["All", "Category1", "Category2"];

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    setPriceRange([0, value]);
  };

  const addToCart = (product: Product) => {
    setActiveProductId(product._id);
    setTimeout(() => {
      setActiveProductId(null);
    }, 1000);

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
    <div className="h-[90%] pb-14 mt-20 text-white flex flex-col items-center w-full bg-white pt-10 p-2 text-center mx-auto xl:w-full">
      <div className="border-t-2 border-two w-20 p-1 font-medium"></div>
      <h2 className="text-[#2E2E2E] font-bold">ALL PRODUCTS</h2>

      {/* Filters */}
      <div className="my-4 flex flex-col gap-4">
        <div className="flex ">
          <div>
            <label htmlFor="brandFilter" className="mr-2 font-semibold">
              Filter by Brand:
            </label>
            <select
              id="brandFilter"
              value={selectedBrand}
              onChange={handleBrandChange}
              className="px-4 py-2 border border-gray-300 rounded text-black"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="categoryFilter" className="mr-2 font-semibold">
              Filter by Category:
            </label>
            <select
              id="categoryFilter"
              value={category}
              onChange={handleCategoryChange}
              className="px-4 py-2 border border-gray-300 rounded text-black"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <label htmlFor="priceRange" className="mr-2 font-semibold text-black">
            Price Range:
          </label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="100000"
            value={priceRange[1]}
            onChange={handlePriceRangeChange}
            className="border border-gray-300 rounded text-black"
          />
          <span className="ml-2 text-black">{priceRange[1]} L.E</span>
        </div>
      </div>

      <div className="grid gap-4 md:gap-16 xl:gap-20 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] place-items-center w-full md:w-4/5">
        {products.map((product, index) => (
          <div
            key={product._id}
            ref={index === products.length - 1 ? lastProductRef : null}
            className="mt-4 h-full justify-between md:mt-6 border-solid md:w-[225px] border-2 border-[#F0F0F0] flex flex-col items-center pb-8 gap-2 relative shadow-xl transition-transform duration-300 ease-in-out transform md:hover:scale-105"
          >
            <Link
              href={`/product/${product._id}`}
              className="flex flex-col gap-4 h-full"
            >
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
                <p className="text-two font-bold text-2xl">
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
    </div>
  );
};

export default Products;
