/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { WatchFiltersComponent } from "@/components/watch-filters";
import { Button } from "@/components/ui/button";
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
type Filters = {
  selectedBrand: string;
  minPrice: number; // Ensure minPrice is a number here, as required.
  maxPrice: number;
  category: string;
  caseColor: string;
  dialColor: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [brands, setBrands] = useState<string[]>(["All"]);
  // const [categories, setCategories] = useState<string[]>(["All"]);
  // const [caseColors, setCaseColors] = useState<string[]>(["All"]);
  // const [dialColors, setDialColors] = useState<string[]>(["All"]);
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
  const onApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen pb-14 text-white flex flex-col  items-start w-full bg-white  text-center mx-auto xl:w-full">
      {/* Sidebar Toggle Button */}

      <div className="text-white pl-5 text-left backgroundd md:bg-right bg-main bg-contain bg-no-repeat bg-center w-full flex flex-col justify-end md:gap-12 h-[300px] ">
        <span className="mainFont text-two text-9xl shadow-lg w-full">
          Shop
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start items-center w-full px-5">
        <div className="w-1/5 mt-6">
          <WatchFiltersComponent onApplyFilters={onApplyFilters} />
        </div>
        {/* Product List */}
        <div
          className={`grid grid-cols-2 w-4/5 sm:grid-cols-3 lg:grid-cols-4 xl:w-3/4 gap-4 mx-auto${
            isSidebarOpen ? "mt-4" : ""
          }`}
        >
          {products.map((product, index) => (
            <div
              ref={products.length === index + 1 ? lastProductRef : null}
              key={index}
              className={` rounded-md overflow-hidden mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col shadow transition-transform duration-300 transform w-full flex-grow`}
            >
              <div className="flex w-full flex-col h-full">
                <div className="relative overflow-hidden border-b-2 drop-shadow flex-grow-[1]">
                  <img
                    src={product.img}
                    loading="lazy"
                    alt={product.name}
                    className="w-full object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                  {/* <div className="card-img-background bg-cover bg-main"></div> */}
                </div>
                <div className="flex flex-col justify-between flex-grow-[2] px-2 pt-2">
                  <div className="pb-2">
                    <h2 className="text-main text-[20px] font-bold truncate w-full text-lines-1">
                      {product.name}
                    </h2>
                    <p className="text-main text-lines-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex pb-3">
                    <p className="text-two text-[20px] font-bold">
                      {product.price} L.E
                      {/* <span className="text-[#595959] inline-flex text-[16px] ps-1 font-light line-through align-bottom">
                            {product.before} L.E
                          </span> */}
                    </p>
                    <p className="text-[#595959] ps-1 line-through self-end">
                      {product.before} L.E
                    </p>
                  </div>
                </div>
              </div>
              <div className="pb-2 px-2">
                <Button
                  onClick={() => addToCart(product)}
                  className="rounded-sm w-full bg-transparent text-main py-5 text-[16px] border border-main hover:font-bold hover:text-two hover:bg-main"
                >
                  ADD TO CARD
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
