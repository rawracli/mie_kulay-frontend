import { Link } from "react-router-dom";
import Logo from "../assets/logoTransparantWhite.png";
import Phone from "../assets/User/phone.svg";
import Email from "../assets/User/mail.svg";
import Maps from "../assets/User/maps.svg";
import Grab from "../assets/User/grab.png";
import Gofood from "../assets/User/gofood.png";

function Footer() {
  return (
    <footer className="relative flex flex-col overflow-hidden min-h-[100svh] sm:min-h-140 lg:min-h-[359px] text-white bg-[#144999]">
      {/* Foreground */}
      <div
        className="relative flex w-full
  pl-[16px] sm:pl-[24px] md:pl-[32px] lg:pl-[80px] 
  pr-[20px] sm:pr-[40px] md:pr-[60px] lg:pr-[0px] xl:pr-[72px] 
  pt-[20px] sm:pt-[28px] lg:pt-[66px] 
  pb-[24px]"
      >
        <div className="flex flex-col lg:flex-row flex-1 pt-3.5">
          {/* Logo - hidden on mobile, show on lg+ */}
          <div className="hidden lg:block pt-[17px]">
            <img src={Logo} alt="logo" className="w-[175px]" />
          </div>

          <div className="flex flex-col lg:flex-row lg:pl-[100px] flex-1 gap-9 lg:gap-[133px]">
            {/* Logo Mobile */}
            <div className="lg:hidden pt-[24px]">
              <img src={Logo} alt="logo" className="w-45" />
            </div>

            {/* Navigasi Section */}
            <nav className="flex flex-col lg:flex-row justify-center flex-1 gap-9 lg:gap-[133px]">
              <div>
                <h2 className="font-boogaloo text-[36px] leading-7 mb-[22px]">
                  Navigasi
                </h2>
                <ul className="gap-[8px] flex flex-col text-nowrap font-baloo-2 text-[18px]">
                  <li>
                    <Link
                      to="/"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tentang"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      Tentang Kami
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/menu"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      Menu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/kontak"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      Kontak
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Informasi Section - Show on lg+ */}
              <div className="hidden lg:block w-[290px]">
                <h2 className="font-boogaloo text-[36px] leading-7 mb-[22px]">
                  Informasi
                </h2>
                <ul className="space-y-[20px] font-baloo-2 text-[18px] text-white">
                  <div className="flex gap-[19.5px]">
                    <img src={Phone} alt="Phone" className="w-[24px]" />
                    <p>0838 - 6993 - 1820</p>
                  </div>
                  <div className="flex gap-[19.5px]">
                    <img src={Email} alt="Email" className="w-[25px]" />
                    <p>ayuuaulia01@gmail.com</p>
                  </div>
                  <div className="flex gap-[19.5px] items-start">
                    <img src={Maps} alt="" className="pt-[5px]" />
                    <p>
                      3WHG+P4G, Jl. Masjid, Gunungparang, Kec. Cikole, Kota
                      Sukabumi, Jawa Barat 43111
                    </p>
                  </div>
                </ul>
              </div>
            </nav>

            {/* Informasi Section - Show on mobile/tablet */}
            <nav className="lg:hidden max-w-100">
              <div>
                <h2 className="font-boogaloo text-[36px] leading-7 mb-[22px]">
                  Informasi
                </h2>
                <ul className="space-y-[20px] font-baloo-2 text-[18px] text-white">
                  <div className="flex gap-[19.5px]">
                    <img src={Phone} alt="Phone" className="w-[24px]" />
                    <p>0838 - 6993 - 1820</p>
                  </div>
                  <div className="flex gap-[19.5px]">
                    <img src={Email} alt="Email" className="w-[25px]" />
                    <p>ayuuaulia01@gmail.com</p>
                  </div>
                  <div className="flex gap-[19.5px] items-start">
                    <img src={Maps} alt="" className="pt-[5px] translate-x-[2px]" />
                    <p className="text-left">
                      3WHG+P4G, Jl. Masjid, Gunungparang, Kec. Cikole, Kota
                      Sukabumi, Jawa Barat 43111
                    </p>
                  </div>
                </ul>
              </div>
            </nav> 
          </div>

          {/* Pemesanan Online & Copyright */}
          <div className="w-full mt-8 lg:w-fit lg:ml-15 lg:mt-0">
            <h2 className="font-boogaloo text-[36px] pb-[21px] leading-7">
              Pemesanan Online
            </h2>
            <div className="gap-[13px] flex lg:flex-col pl-[4px]">
              <a
                href=""
                className="bg-white transition-all duration-75 shadow-[2px_3px_0px_rgba(255,255,255,0.7)] active:shadow-[0px_0px_0px_rgba(255,255,255,0.7)] active:translate-x-[2px] active:translate-y-[3px] cursor-pointer rounded-[10px] flex items-center justify-center h-[49px] w-[125px]"
              >
                <img src={Gofood} alt="Gofood" className="w-[109px] h-[22px]" />
              </a>
              <a
                href=""
                className="bg-white transition-all duration-75 shadow-[2px_3px_0px_rgba(255,255,255,0.7)] active:shadow-[0px_0px_0px_rgba(255,255,255,0.7)] active:translate-x-[2px] active:translate-y-[3px] cursor-pointer rounded-[10px] flex items-center justify-center h-[49px] w-[125px]"
              >
                <img src={Grab} alt="Grab" className="w-[110px] h-[20px]" />
              </a>
            </div>
            <p className="font-baloo-2 pt-[37px] lg:pt-[12px] text-[18px] max-lg:text-center">
              © Copyright 2025 <span className="font-bold">Mie Kulay</span>. All
              Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;