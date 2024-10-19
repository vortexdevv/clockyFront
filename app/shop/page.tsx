import React from "react";
import Products from "../components/Products";
import Nav from "../components/Nav";

const page = () => {
  return (
    <div className="bg-main h-[100dvh] center">
      <Nav />
      <Products />
    </div>
  );
};

export default page;
