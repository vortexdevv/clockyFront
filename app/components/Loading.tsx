import React from "react";

const Loading = () => {
  return (
    <div className="pendulum relative w-56 h-44 bg-two rounded-[5%] border-t-[15px] border-t-[#eee7d5] flex items-center justify-center">
      <div className="pendulum_box flex pl-2.5 pt-32">
        <div className="ball first w-10 h-10 rounded-full bg-white relative"></div>
        <div className="ball w-10 h-10 rounded-full bg-white relative"></div>
        <div className="ball w-10 h-10 rounded-full bg-white relative"></div>
        <div className="ball w-10 h-10 rounded-full bg-white relative"></div>
        <div className="ball last w-10 h-10 rounded-full bg-white relative"></div>
      </div>
    </div>
  );
};

export default Loading;
