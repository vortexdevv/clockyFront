import Recommended from "./components/Recomended";
import Arrivals from "./components/Arrivals";
import Featured from "./components/Featured";
import Brands from "./components/Brands";
import FullWidthCarousel from "@/components/full-width-carousel";
import axios from "axios";
type Product = {
  data: {
    _id: string;
    name: string;
    before: number; // Original price
    price: number;
    description: string;
    countInStock: number;
    img: string;
  };
};
export default async function Home() {
  const { data } = await axios.get(
    "https://clockyexpress.vercel.app/api/products/newArrival",
    {
      withCredentials: true,
    }
  );
  return (
    <main className="h-auto bg-[#FCFCFC]">
      {/* <Nav /> */}
      {/* <Hero /> */}
      {/* <ResponsiveSliderComponent /> */}
      <FullWidthCarousel />
      <Brands />
      <Featured />
      {/* <Products /> */}
      <Recommended />
      {/* <Products2 /> */}
      {/* <One /> */}
      <Arrivals data={data} />
      {/* <Footer /> */}
      {/* <AppSidebar /> */}
      {/* <Payment /> */}
    </main>
  );
}
