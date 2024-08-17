import Image from "next/image";
import Nav from "../app/components/Nav";
import Hero from "./components/Hero";
import Products from "./components/Products";

export default function Home() {
  const hosary: number = 0;
  return (
    <main className="h-full bg-white">
      <Nav />
      <Hero />
      <Products />
    </main>
  );
}
