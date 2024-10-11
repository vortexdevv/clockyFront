import React from "react";
import ProductById from "@/app/components/ProductById";
import Nav from "@/app/components/Nav";
const Page = () => {
  return (
    <div className="h-full  justify-evenly   ">
      <Nav />
      <ProductById />
    </div>
  );
};

export default Page;
