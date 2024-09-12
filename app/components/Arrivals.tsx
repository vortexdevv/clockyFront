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
    <div
      id="newarraival"
      className="text-white mx-auto flex justify-center flex-col items-center md:w-4/5 w-full bg-[#FCFCFC] md:p-16"
    >
      <div className="border-t-2 border-[#D4AF37] w-20 p-2 font-medium"></div>
      <h2 className="text-[#2E2E2E]">NEW ARRIVALS</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 md:gap-6 gap-2 mb-3">
        {data.map((card: any, index: number) => {
          return (
            <div
              key={index}
              className="group mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center justify-center md:p-16 p-2 gap-2 relative shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="bg-[#414B43] py-2 px-2 absolute top-0 right-0">
                NEW
              </span>
              <Image src={Watch} alt="watch" className="w-[100px]" />
              <h1 className="text-[#2E2E2E] font-bold text-3xl">
                {card.title}
              </h1>
              <p className="text-[#595959] font-bold text-base line-through text-center">
                1000 L.E
              </p>
              <p className="text-[#D4AF37] font-bold text-2xl">{card.price}</p>
              <button className="bg-[#414B43] block md:py-2 md:px-2 px-1 py-2 w-32  transition-opacity duration-300 ease-in-out ">
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
