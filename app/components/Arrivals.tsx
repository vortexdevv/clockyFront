import Image from "next/image";
import Watch from "../../public/watch.png";
const Arrivals = () => {
  const data: any = [
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
  ];
  return (
    <div className=" mx-auto flex justify-center flex-col items-center  w-4/5   bg-[#FCFCFC] p-16">
      <div className=" border-t-2 border-[#D4AF37] w-20 p-1 font-medium"></div>
      <h2 className="text-[#2E2E2E]">NEW ARRIVALS</h2>
      <div className="flex flex-nowrap gap-4">
        {data.map((card: any, index: number) => {
          return (
            <div
              key={index}
              className="group mt-20 border-solid border-2 border-[#F0F0F0] flex flex-col items-center justify-center p-14 gap-5 relative shadow-2xl"
            >
              <span className="   bg-[#414B43] py-2 px-5  absolute top-3 right-6 ">
                NEW
              </span>
              <Image src={Watch} alt="watch" className=" w-[140px] h-[215px]" />
              <h1 className="text-[#2E2E2E] font-bold text-3xl">
                {card.title}
              </h1>
              <p className="text-[#D4AF37] font-bold text-2xl ">{card.price}</p>
              <button className="py-3 px-1 bg-[#414B43] hidden group-hover:block ">
                ADD TO CARD
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Arrivals;
