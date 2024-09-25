import Image from "next/image";
import Traje from "../../public/traje.png";
export const Recommended = () => {
  return (
    <div className=" text-white mx-auto md:flex md:flex-row-reverse md:justify-evenly  md:items-center  md:w-4/5   bg-[#FCFCFC] p-12 md:p-8 md:py-24 gap-5 md:gap-20 flex flex-col sm:justify-center items-center w-full">
      <div className=" flex flex-col gap-6 text-left md:items-start items-center">
        <span className=" border-t-2 border-two w-20 px-1 font-medium "></span>
        <h3 className="text-[#2E2E2E] font-medium text-xl mainFont">
          Recommended
        </h3>
        <div className="flex flex-col gap-6 text-left ">
          <h1 className="mainFont text-4xl text-[#2E2E2E] font-medium">
            Inspirational Watch of <br /> this year
          </h1>
          <p className="text-[#595959] text-base font-normal">
            The latest and modern watches of this year, is <br /> available in
            various presentations in this store,
            <br /> discover them now.
          </p>
          <button className="py-4 w-40  px-6 shadow-xl -- relative  md:py-3 bg-main text-white font-semibold border  overflow-hidden group">
            Order now
            <div
              className={`group-hover:translate-x-0 absolute inset-0 md:group-hover:translate-x-0 bg-two w-full h-full transform translate-x-full transition-transform md:!duration-500 !duration-1000 ease-in-out center`}
            >
              Order now
            </div>
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
export default Recommended;
