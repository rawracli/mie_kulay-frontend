import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import useScrollBehaviour from "../hooks/useScrollBehaviour";

const navItems = [
  { name: "Home", to: "/" },
  { name: "Tentang", to: "/tentang-kami" },
  { name: "Menu", to: "/menu" },
  { name: "Kontak", to: "/kontak" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isVisible, isOnTop } = useScrollBehaviour();

  return (
    <>
      <nav className="relative w-full font-chewy">
        <div
          className={`z-40 fixed w-full flex items-center justify-center transition-all duration-300 font-semibold ${
            isVisible ? "translate-y-0" : "-translate-y-[110%]"
          } ${
            isOnTop
              ? "bg-white h-17 md:h-[104px] shadow-[0px_2px_18.8px_0px_rgba(255,211,88,0.75)] shadow-[#FFD358]"
              : "bg-white h-17 md:h-[104px] shadow-[0px_2px_18.8px_0px_rgba(255,211,88,0.75)] shadow-[#FFD358]"
          }`}
        >
          <div className="flex items-center justify-center w-full mx-[78px]">
            <div className="w-full h-full  items-center">
              <Link className="flex items-center w-fit" to="/">
                <img src={Logo} alt="Logo" className="sm:size-[45px] md:size-[81px]" />
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`focus:outline-none ${
                  isOnTop
                    ? isOpen
                      ? "text-black"
                      : "text-black"
                    : "text-black"
                } relative`}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center cursor-pointer">
                  <span
                    className={`block h-1 w-6 bg-current rounded-full transform transition-all duration-200 ease-in-out ${
                      isOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-1 w-6 bg-current rounded-full transform transition-all duration-200 ease-in-out my-1 ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-1 w-6 bg-current rounded-full transform transition-all duration-200 ease-in-out ${
                      isOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
            <div className="hidden md:flex w-full h-full gap-[54px] text-[1.375rem] items-center ml-11 justify-end">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive }) => `hover:text-[#FFD358] focus:text-[#FFB300] ${isActive && "text-[#FFB300]"}`}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed z-20">
            <div className="fixed top-[68px] left-0 w-full bg-white shadow-lg z-20 px-6 py-4 animate-slide-down md:hidden">
              {["", "tentang-kami", "layanan", "kontak", "dokumentasi"].map(
                (value, index) => (
                  <NavLink
                    key={index}
                    to={`/${value}`}
                    className="block text-gray-800 hover:text-[#A42619] py-2 pt-4 border-b border-gray-200 transform transition-all duration-200 hover:translate-x-1"
                    onClick={() => {
                      setIsOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {["Home", "Tentang", "Menu", "Kontak", "Moments"][index]}
                  </NavLink>
                )
              )}
              <div className="pt-4">
                <a
                  href="https://wa.me/6281333330073"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#A30F00] text-white hover:bg-[#730B00] transition-all py-3 px-5 rounded-lg active:bg-[#600000] transform hover:scale-105 duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Pesan Sekarang
                </a>
              </div>
            </div>
            <div
              className="fixed z-10 bg-black/40 h-full w-full"
              onClick={() => {
                setIsOpen(false);
              }}
            ></div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
