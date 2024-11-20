import React from "react";
import Nav from "../components/Nav";
import PrivacyPolicy from "./PrivacyPolicy";

const page = () => {
  return (
    <div className="container mx-auto min-h-screen bg-main md:p-8 flex flex-col items-center text-pretty">
      {/* <Nav /> */}
      <PrivacyPolicy />
    </div>
  );
};

export default page;
