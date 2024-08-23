import Image from "next/image";
import Watch from "../../public/watch.png";
const Products = () => {
  const data: any = [
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
  ];
  return (
    <div className=" mx-auto flex justify-center flex-col items-center  w-4/5   bg-[#FCFCFC] p-24">
      <div className=" border-t-2 border-[#D4AF37] w-20 p-1 font-medium"></div>
      <h2 className="text-[#2E2E2E]">FEATURED</h2>
      <div className="flex flex-nowrap gap-8">
        {data.map((card: any, index: number) => {
          return (
            <div
              key={index}
              className="mt-20 border-solid border-2 border-[#F0F0F0] flex flex-col items-center justify-center p-20 gap-5 relative shadow-xl"
            >
              <span className=" -rotate-90  bg-[#414B43] py-2 px-5  absolute -left-4 top-12">
                SALE
              </span>
              <Image
                src={Watch}
                alt="watch"
                className=" w-[140px] h-[215px] "
              />
              <h1 className="text-[#2E2E2E] font-bold text-3xl">
                {card.title}
              </h1>
              <p className="text-[#D4AF37] font-bold text-2xl">{card.price}</p>
              <button className="py-5 px-8 bg-[#414B43]">ADD TO CARD</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Products;
