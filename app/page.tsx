import Image from "next/image";
import Nav from "../app/components/Nav";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Recomended from "./components/Recomended";

export default function Home() {
  const hosary: number = 0;
  return (
    <main className="h-auto bg-white">
      <Nav />
      <Hero />
      <Products />
      <Recomended />
    </main>
  );
}
