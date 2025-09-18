import React from 'react'
import Line from "../assets/Menu/line.png";

function Hero({text}) {
    return (
      <div className="relative bg-[#FFB300] py-8 flex items-center justify-center overflow-hidden h-[129px]">
        <img
          src={Line}
          alt="garis melengkung"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[100%] h-auto"
        />
        <img
          src={Line}
          alt="garis melengkung"
          className="absolute top-[45PX] left-1/2 -translate-x-1/2 -translate-y-1/3 w-[100%] h-auto"
        />
        <div className="relative z-10 bg-red-600 text-white px-10 py-2 rounded-full text-[35px] font-bold shadow-md w-[381PX] h-[72px] text-center pt-2">
          {text}
        </div>
      </div>
    )
}

export default Hero
