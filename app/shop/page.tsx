import React from "react";
import Products from "../components/Products";
import Nav from "../components/Nav";

const page = () => {
  return (
    <div className="bg-main  center">
      <Nav />
      <Products />
    </div>
  );
};

export default page;
