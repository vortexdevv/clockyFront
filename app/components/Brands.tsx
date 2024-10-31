/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import rolex from "../../public/RolexLogo.png";
import casio from "../../public/casio.png";
import omega from "../../public/omega.png";
import Cartier from "../../public/Cartier.png";
import Seiko from "../../public/Seiko.png";
import Image from "next/image";
const brands = [
  {
    name: "Rolex",
    route: "/brands/rolex",
    logoUrl: rolex,
  },
  {
    name: "Casio",
    route: "/brands/casio",
    logoUrl: casio,
  },
  { name: "Omega", route: "/brands/omega", logoUrl: omega },
  {
    name: "Cartier",
    route: "/brands/cartier",
    logoUrl: Cartier,
  },
  { name: "Seiko", route: "/brands/seiko", logoUrl: Seiko },
  { name: "Seiko", route: "/brands/seiko", logoUrl: Seiko },
  // Add more brands here as needed
];

const Brands: React.FC = () => {
  return (
    <section className="bg-gray-100 py-10 mt-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl text-main font-bold text-center mb-8">
          OUR WATCH BRANDS
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link key={brand.name} href={brand.route} passHref>
              <div className=" cursor-pointer hover:shadow-lg transition transform hover:scale-105 flex justify-center items-center bg-white p-4 rounded-lg">
                <Image
                  src={brand.logoUrl}
                  alt={`${brand.name} logo`}
                  width={80}
                  height={48}
                  className="h-12 object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
