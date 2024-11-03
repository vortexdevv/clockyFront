"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import rolex from "../../public/RolexLogo.png";
import casio from "../../public/casio.png";
import omega from "../../public/omega.png";
import Cartier from "../../public/Cartier.png";
import Seiko from "../../public/Seiko.png";
import Image from "next/image";

const brands = [
  { name: "Rolex", route: "/brands/rolex", logoUrl: rolex },
  { name: "Casio", route: "/brands/casio", logoUrl: casio },
  { name: "Omega", route: "/brands/omega", logoUrl: omega },
  { name: "Cartier", route: "/brands/cartier", logoUrl: Cartier },
  { name: "Seiko", route: "/brands/seiko", logoUrl: Seiko },
  // Add more brands here as needed
];

const Brands: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-100 py-10 mt-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl text-main font-bold text-center mb-8">
          OUR WATCH BRANDS
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link key={brand.name} href={brand.route} passHref>
              <div
                className={`cursor-pointer hover:shadow-lg transition transform hover:scale-105 flex justify-center items-center bg-white p-4 rounded-lg ${
                  isInView
                    ? "motion-scale-in-[0.5] motion-translate-x-in-[-25%] motion-translate-y-in-[25%] motion-opacity-in-[0%] motion-rotate-in-[-10deg] motion-blur-in-[5px] motion-duration-[0.45s] motion-duration-[0.68s]/scale motion-duration-[0.68s]/translate motion-duration-[0.81s]/rotate motion-ease-spring-bouncier"
                    : ""
                }`}
              >
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