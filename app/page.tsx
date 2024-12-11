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
const api = "https://clockyexpress.vercel.app/api";
export default async function Home() {
  const featured = await axios.get(`${api}/products/featured`, {
    withCredentials: true,
  });
  const { data } = await axios.get(`${api}/products/newArrival`, {
    withCredentials: true,
  });
  return (
    <main className="h-auto bg-[#FCFCFC]">
      {/* <Nav /> */}
      {/* <Hero /> */}
      {/* <ResponsiveSliderComponent /> */}
      <FullWidthCarousel />
      <Brands />
      <Featured featured={featured.data} />
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
