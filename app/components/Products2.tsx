import Image from "next/image";
import abc from "../../public/abc.png";
const Products2 = () => {
  const data: any = [
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
    { title: "product", price: 1276, image: "" },
  ];
  return (
    <div className=" mx-auto flex justify-center flex-col items-center  md:w-4/5 sm:w-full bg-[#FCFCFC] p-5 gap-4 ">
      <div className=" flex flex-col justify-center items-center gap-4">
        <span className=" border-t-2 border-[#D4AF37] w-20 px-1 font-medium"></span>
        <h1 className="text-xl font-medium text-[#2E2E2E]">PRODUCTS</h1>
      </div>
      <div className="md:grid md:grid-cols-3 sm:grid sm:grid-cols-2 gap-6">
        {data.map((card: any, index: number) => {
          return (
            <div
              key={index}
              className="border-solid border-2  border-[#F0F0F0] flex flex-col items-center justify-center p-11 gap-4 md:w-56 "
            >
              <Image src={abc} alt="watch" width={155} height={155} />
              <h1 className="text-[#2E2E2E] text-3xl font-medium">
                {card.title}
              </h1>
              <h2 className="text-[#D4AF37] text-2xl font-black">
                {card.price}
              </h2>
              <button className=" bg-[#2B2B2B] p-4 relative md:top-11 md:left-20 ">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10.9673M10.4 21H13.6C15.8402 21 16.9603 21 17.816 20.564C18.5686 20.1805 19.1805 19.5686 19.564 18.816C20 17.9603 20 16.8402 20 14.6V12.2C20 11.0799 20 10.5198 19.782 10.092C19.5903 9.71569 19.2843 9.40973 18.908 9.21799C18.4802 9 17.9201 9 16.8 9H7.2C6.0799 9 5.51984 9 5.09202 9.21799C4.71569 9.40973 4.40973 9.71569 4.21799 10.092C4 10.5198 4 11.0799 4 12.2V14.6C4 16.8402 4 17.9603 4.43597 18.816C4.81947 19.5686 5.43139 20.1805 6.18404 20.564C7.03968 21 8.15979 21 10.4 21Z"
                    stroke="#FFFFFF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Products2;
