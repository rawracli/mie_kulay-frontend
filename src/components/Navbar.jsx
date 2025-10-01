import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import useScrollBehaviour from "../hooks/useScrollBehaviour";

const navItems = [
  { name: "Home", to: "/" },
  { name: "Tentang", to: "/tentang" },
  { name: "Menu", to: "/menu" },
  { name: "Kontak", to: "/kontak" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isVisible, isOnTop } = useScrollBehaviour();

    // Tutup navbar saat user scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <>
      <nav className="relative w-full font-chewy">
        <div
          className={`z-40 fixed w-full h-[62px] flex items-center justify-center transition-all font-semibold ${
            isVisible ? "translate-y-0" : "-translate-y-[110%]"
          } ${
            isOpen
              ? "bg-white sm:h-20 md:h-[104px] shadow-[0px_2px_18.8px_0px_rgba(255,211,88,0.75)] shadow-gray-200"
              : "bg-white sm:h-20 md:h-[104px] shadow-[0px_2px_18.8px_0px_rgba(255,211,88,0.75)] shadow-[#FFD358]"
          }`}
        >
          <div className="flex items-center w-full ml-[25px] mr-[17px] sm:ml-[30px] sm:mr-[22px] md:ml-[47px] md:mr-[30.7px] lg:ml-[70px] lg:mr-[111px]">
            <div className="items-center w-full h-full">
              <Link className="flex items-center w-fit sm:ml- md:ml-0" to="/">
                <img
                  src={Logo}
                  alt="Logo"
                  className="size-[42px] sm:size-[45px] sm-m md:size-[81px]"
                />
              </Link>
            </div>
            <div className="flex items-center md:hidden">
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
                <div className="flex flex-col items-center justify-center w-6 h-6 cursor-pointer">
                  <span
                    className={`block h-[3px] w-6 bg-current rounded-full transform transition-all duration-200 ease-in-out ${
                      isOpen ? "rotate-45 translate-y-2.5" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-[3px] w-6 bg-current rounded-full transform transition-all duration-200 ease-in-out my-1 ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-[3px] w-6 bg-current rounded-full transform transition-all duration-200 ease-in-out ${
                      isOpen ? "-rotate-45 -translate-y-1" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
            <div className="hidden md:flex w-full h-full gap-[54px] text-[1.375rem] items-center justify-end">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive }) =>
                    `text-[22px] font-chewy ${
                      !isActive &&
                      "text-[#FFB300] hover:text-[#FFD358] focus:text-[#FFB300]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`fixed z-30 top-[62px] sm:top-[68px] left-0 w-full bg-white shadow-lg px-6 py-9 md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          {["", "tentang", "menu", "kontak"].map((value, index) => (
            <NavLink
              key={index}
              to={`/${value}`}
              className="block text-gray-800 hover:text-[#FFB300] text-xl py-2 pt-4 border-b border-gray-200 transform transition-all duration-200 hover:translate-x-1"
              onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              <p className="pl-2">
                {["Home", "Tentang", "Menu", "Kontak"][index]}
              </p>
            </NavLink>
          ))}
          <div className="pt-4">
            <a
              href="https://wa.me/6281333330073"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501] text-white transition-all py-3 px-5 rounded-lg transform hover:scale-105 duration-200"
              onClick={() => setIsOpen(false)}
            >
              Pesan Sekarang
            </a>
          </div>
        </div>
        {/* Overlay Background */}
        {isOpen && (
          <div
            className="fixed top-0 left-0 z-20 w-full h-full bg-black/40 md:hidden"
            onClick={() => setIsOpen(false)}
            onTouchStart={() => setIsOpen(false)}
          ></div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
