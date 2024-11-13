"use client";

import * as React from "react";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import axios from "axios";

// Mock data for filters
// const caseColors = ["Silver", "Gold", "Black", "Rose Gold"];
// const dialColors = ["White", "Black", "Blue", "Green"];
// const brands = ["Rolex", "Omega", "Seiko", "Casio"];
// const categories = ["Luxury", "Sport", "Dress", "Casual"];

type Filters = {
  caseColor: string;
  dialColor: string;
  selectedBrand: string;
  category: string;
  minPrice: number;
  maxPrice: number;
};

interface WatchFiltersComponentProps {
  onApplyFilters: (filters: Filters) => void; // Using Filters type here
}

export function WatchFiltersComponent({
  onApplyFilters,
}: WatchFiltersComponentProps) {
  const [filters, setFilters] = React.useState<Filters>({
    caseColor: "All",
    dialColor: "All",
    selectedBrand: "All",
    category: "All",
    minPrice: 0,
    maxPrice: 100000,
  });
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [caseColors, setCaseColors] = useState<string[]>(["All"]);
  const [brands, setBrands] = useState<string[]>(["All"]);
  const [dialColors, setDialColors] = useState<string[]>(["All"]);
  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
  };

  const resetFilters = () => {
    const resetValues: Filters = {
      caseColor: "All",
      dialColor: "All",
      selectedBrand: "All",
      category: "All",
      minPrice: 0,
      maxPrice: 100000,
    };
    setFilters(resetValues);
    onApplyFilters(resetValues);
  };
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

  const FiltersContent = () => (
    <div className="space-y-4 text-black">
      <div>
        <label
          htmlFor="caseColorFilter"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Case Color:
        </label>
        <Select
          onValueChange={(value) => handleFilterChange("caseColor", value)}
          value={filters.caseColor}
        >
          <SelectTrigger id="caseColorFilter">
            <SelectValue placeholder="Select case color" />
          </SelectTrigger>
          <SelectContent>
            {caseColors.map((color) => (
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label
          htmlFor="dialColorFilter"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Dial Color:
        </label>
        <Select
          onValueChange={(value) => handleFilterChange("dialColor", value)}
          value={filters.dialColor}
        >
          <SelectTrigger id="dialColorFilter">
            <SelectValue placeholder="Select dial color" />
          </SelectTrigger>
          <SelectContent>
            {dialColors.map((color) => (
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label
          htmlFor="brandFilter"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Brand:
        </label>
        <Select
          onValueChange={(value) => handleFilterChange("selectedBrand", value)}
          value={filters.selectedBrand}
        >
          <SelectTrigger id="brandFilter">
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label
          htmlFor="categoryFilter"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Category:
        </label>
        <Select
          onValueChange={(value) => handleFilterChange("category", value)}
          value={filters.category}
        >
          <SelectTrigger id="categoryFilter">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label
          htmlFor="minPrice"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Min Price:
        </label>
        <Input
          type="number"
          id="minPrice"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <label
          htmlFor="maxPrice"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Max Price:
        </label>
        <Input
          type="number"
          id="maxPrice"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="mb-4 text-black mt-5">
          <Filter className="mr-2 h-4 w-4 text-black" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Apply filters to refine your watch search.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <FiltersContent />
        </div>
        <div className="mt-4 flex justify-between">
          <Button onClick={applyFilters} className="mr-2">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
