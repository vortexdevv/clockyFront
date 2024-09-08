import Image from "next/image";
import Traje from "../../public/traje.png";
export const Recomended = () => {
  return (
    <div className=" text-white mx-auto md:flex md:flex-row-reverse md:justify-evenly  md:items-center  md:w-4/5   bg-[#FCFCFC] p-12 md:p-8 md:py-24 gap-20 sm:flex sm:flex-col sm:justify-center sm:items-center sm:w-full">
      <div className=" flex flex-col gap-6 text-left md:items-start sm:items-center">
        <span className=" border-t-2 border-[#D4AF37] w-20 px-1 font-medium "></span>
        <h3 className="text-[#2E2E2E] font-medium text-xl ">Recommended</h3>
        <div className="flex flex-col gap-6 text-left ">
          <h1 className=" text-4xl text-[#2E2E2E] font-medium">
            Inspirational Watch of <br /> this year
          </h1>
          <p className="text-[#595959] text-base font-normal">
            The latest and modern watches of this year, is <br /> available in
            various presentations in this store,
            <br /> discover them now.
          </p>
          <button className="py-4 w-28  px-6 bg-[rgb(65,75,67)] shadow-xl">
            Discover
          </button>
        </div>
      </div>
      <div className="mt-5">
        <Image
          src={Traje}
          alt=""
          className=" w-[300px] md:w-[400px] md:h-[400px] shadow-4xl md:shadow-3xl"
        />
      </div>
    </div>
  );
};
export default Recomended;
