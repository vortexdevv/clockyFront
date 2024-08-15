const Hero = () => {
  return (
    <div className=" home bg-cover bg-bottom  mx-auto h-[720px] flex  flex-col items-center justify-center w-4/5">
      <div className="w-9/12">
        <h1 className=" text-5xl font-bold  text-left leading-[56px] my-2">
          Welcome to <span className="text-[#D4AF37]"> CLOCKY</span> <br />
          the biggest online watches store at Egypt
        </h1>

        <p className="text-base font-normal text-left flex my-2">
          Here you will find everything that suits you from watches from <br />
          the latest modern and international <br /> brands for men and women
        </p>
        <button>Discover</button>
        <button>Create account</button>
      </div>
    </div>
  );
};

export default Hero;
