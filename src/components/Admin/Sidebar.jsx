import React from "react";
import logoTransparant from "../../assets/logoTransparant.svg";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", to: "/dashboard", icon: "icon1" },
  { name: "Pemesanan", to: "/pemesanan", icon: "icon2" },
  { name: "Stok", to: "/stok", icon: "icon3" },
  { name: "Log Aktivitas", to: "/log-aktivitas", icon: "icon4" },
];

function Sidebar() {

  return (
    <div className="w-[14.375rem] h-svh">
      <div className="h-[92px] w-full bg-[#FFBA00] flex items-center justify-center">
        <img src={logoTransparant} alt="logo" className="mr-[11px] mb-[1px]" />
      </div>
      <div className="mt-[50px] px-[9px] w-full space-y-[18px]">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `w-full h-[44px] flex items-center rounded-[10px] ${
                isActive ? "bg-[#FFB300]" : "bg-none"
              }`
            }
          >
            <div className="w-[48px]">{item.icon}</div>
            <div className="flex-1 font-semibold">{item.name}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
