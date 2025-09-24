import React from "react";
import Line from "../assets/Menu/line.png";

function Hero({ text }) {
  return (
    <div className="relative bg-[#FFB300] py-8 flex items-center justify-center overflow-hidden h-[65px] md:h-[151px]">
      <img
        src={Line}
        alt="garis melengkung"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[100%] h-auto"
      />
      <img
        src={Line}
        alt="garis melengkung"
        className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/3 w-[100%] h-auto"
      />
      <div className="relative flex items-center justify-center z-10 bg-[#D72629] text-white rounded-full w-[148px] h-[28px] md:w-[381px] md:h-[72px] text-center">
        <h2 className="md:text-[64px] font-boogaloo font-bold pb-1">{text}</h2>
      </div>
    </div>
  );
}

export default Hero;
