import Image from "next/image";
import Nav from "../app/components/Nav";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Recommended from "./components/Recomended";
// import Products2 from "./components/Products2";
// import One from "./components/One";
import Arrivals from "./components/Arrivals";
import Footer from "./components/Footer";
export default function Home() {
  const hosary: number = 0;
  return (
    <main className="h-auto bg-main">
      <Nav />
      <Hero />
      <Products />
      <Recommended />
      {/* <Products2 /> */}
      {/* <One /> */}
      <Arrivals />
      <Footer />
      {/* <Payment /> */}
    </main>
  );
}
