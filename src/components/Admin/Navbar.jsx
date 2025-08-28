import React from "react";
import Profile from "../../assets/Admin/profile.svg";
import Arrow from "../../assets/Admin/arrow.svg";

function Navbar() {
  return (
    <div className="h-[92px] flex justify-between items-center shadow-[0px_5px_10.8px_rgba(168,168,168,0.25)]">
      <div className="pb-[6px] px-[42px] font-semibold text-2xl">
        Selamat Datang, Rin 👋
      </div>
      <div className="flex gap-[18px] px-[31.92px] items-center">
        <p>Rin</p>
        <img src={Profile} alt="profile" className="mb-[5px]" />
        <img src={Arrow} alt="arrow" />
      </div>
    </div>
  );
}

export default Navbar;
