const Hero = () => {
  return (
    <div className=" home bg-cover bg-bottom  mx-auto h-[720px] flex  flex-col items-center justify-center md:w-4/5 sm:full relative">
      <div className="w-9/12 absolute top-[20%] m-auto">
        <h1 className=" text-5xl font-bold  text-left md:leading-[56px] sm:leading-[45px] my-2">
          Welcome to <span className="text-[#D4AF37]"> CLOCKY</span> <br />
          the biggest online watches store at Egypt
        </h1>

        <p className="text-base font-normal text-left flex my-2">
          Here you will find everything that suits you from watches from <br />
          the latest modern and international <br /> brands for men and women
        </p>
        <div className="my-20">
          <button className=" px-3 py-4 bg-[#FFFFFFE5] text-black w-28 ">
            Discover
          </button>
          <button className="px-3 py-6 bg-[#414B43] w-40">
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
