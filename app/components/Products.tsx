/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
// import { FiFilter } from "react-icons/fi"; // Import an icon for the toggle button

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
  const [brands, setBrands] = useState<string[]>(["All"]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [caseColors, setCaseColors] = useState<string[]>(["All"]);
  const [dialColors, setDialColors] = useState<string[]>(["All"]);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    selectedBrand: "All",
    minPrice: 0,
    maxPrice: 100000,
    category: "All",
    caseColor: "All",
    dialColor: "All",
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const { toast } = useToast();

  const observer = useRef<IntersectionObserver | null>(null);
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
    setPage(1);
  }, [filters]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get(
          "https://clockyexpress.vercel.app/api/products/unique-filters"
        );
        const {
          brands: fetchedBrands,
          categories: fetchedCategories,
          caseColors: fetchedCaseColors,
          dialColors: fetchedDialColors,
        } = response.data;

        setBrands(["All", ...fetchedBrands]);
        setCategories(["All", ...fetchedCategories]);
        setCaseColors(["All", ...fetchedCaseColors]);
        setDialColors(["All", ...fetchedDialColors]);
      } catch (error) {
        console.error("Failed to fetch filters", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = {
          page,
          limit: 5,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          caseColor:
            filters.caseColor !== "All" ? filters.caseColor : undefined,
          dialColor:
            filters.dialColor !== "All" ? filters.dialColor : undefined,
          brand:
            filters.selectedBrand !== "All" ? filters.selectedBrand : undefined,
          category: filters.category !== "All" ? filters.category : undefined,
        };

        const response = await axios.get(
          "https://clockyexpress.vercel.app/api/products",
          {
            params: query,
            withCredentials: true,
          }
        );

        const newProducts = response.data;
        if (newProducts.length === 0) setHasMore(false);

        setProducts((prevProducts) =>
          page === 1 ? newProducts : [...prevProducts, ...newProducts]
        );
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    if (page === 1) {
      setProducts([]);
      setHasMore(true);
    }

    fetchProducts();
  }, [page, filters]);

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-[90%] pb-14 mt-20 text-white flex flex-col xl:flex-row items-start w-full bg-white pt-10 p-2 text-center mx-auto xl:w-full">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="mb-4 p-2 text-gray-800 xl:hidden flex items-center"
      >
        {/* <FiFilter className="mr-2" />{" "} */}
        <span>X</span>
        {isSidebarOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Collapsible Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } xl:block w-full xl:w-1/4 bg-gray-100 p-4 text-left`}
      >
        <h2 className="text-[#2E2E2E] font-bold mb-4">Filters</h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="caseColorFilter"
              className="font-semibold text-black"
            >
              Case Color:
            </label>
            <select
              id="caseColorFilter"
              name="caseColor"
              value={filters.caseColor}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded text-black"
            >
              {caseColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="dialColorFilter"
              className="font-semibold text-black"
            >
              Dial Color:
            </label>
            <select
              id="dialColorFilter"
              name="dialColor"
              value={filters.dialColor}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded text-black"
            >
              {dialColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="brandFilter" className="font-semibold text-black">
              Brand:
            </label>
            <select
              id="brandFilter"
              name="selectedBrand"
              value={filters.selectedBrand}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded text-black"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="categoryFilter"
              className="font-semibold text-black"
            >
              Category:
            </label>
            <select
              id="categoryFilter"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded text-black"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="minPrice" className="font-semibold text-black">
              Min Price:
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded text-black"
            />
            <label htmlFor="maxPrice" className="font-semibold text-black mt-2">
              Max Price:
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded text-black"
            />
          </div>
        </div>
      </aside>

      {/* Product List */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:w-3/4 gap-4 mx-auto${
          isSidebarOpen ? "mt-4" : ""
        }`}
      >
        {products.map((product, index) => (
          <div
            ref={products.length === index + 1 ? lastProductRef : null}
            key={index}
            className={` mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center pb-8 gap-2 shadow-lg transition-transform duration-300 transform md:hover:scale-105 w-full md:w-[225px]`}
          >
            <Link
              href={`/product/${product._id}`}
              className="flex w-full flex-col gap-2 justify-between h-full"
            >
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
    </div>
  );
};

export default Products;
