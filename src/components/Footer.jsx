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
        className="relative flex w-full max-w-[1200px] 
  pl-[16px] sm:pl-[24px] md:pl-[32px] lg:pl-[90px] 
  pr-[20px] sm:pr-[40px] md:pr-[60px] lg:pr-[0px] xl:pr-[72px] 
  pt-[20px] sm:pt-[28px] lg:pt-[66px] 
  pb-[24px]"
      >
        <div className="flex flex-row flex-1 pt-3.5 items-center lg:items-start">
          <div className="hidden sm:block pt-[24px]">
            <img src={Logo} alt="logo" className="w-[153px]" />
          </div>

          <div className="flex flex-col sm:pl-19 flex-1 gap-9 lg:pl-[100px]">
            <div className="sm:w-49 sm:hidden pt-[24px]">
              <img src={Logo} alt="logo" className="w-45" />
            </div>
            <nav className="flex lg:justify-center flex-1 gap-[98px]">
              <div className="">
                <h2 className="font-boogaloo text-[36px] leading-7 mb-[18px]">
                  Navigasi
                </h2>
                <ul className="gap-1 flex flex-col text-nowrap text-[#DBDBDB] font-baloo-2 text-[24px]">
                  <li>
                    <Link
                      to="/"
                      className=""
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
                      className=""
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
                      className=""
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
                      className=""
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      Kontak
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="hidden lg:block w-[290px]">
                <h2 className="font-boogaloo text-[36px] leading-7 mb-[18px]">
                  Informasi
                </h2>
                <ul className="space-y-[27px] font-baloo-2 text-[18px] text-[#DBDBDB]">
                  <div className="flex gap-[19.5px]">
                    <img src={Phone} alt="Phone" className="w-[24px]" />
                    <p>0838 - 6993 - 1820</p>
                  </div>
                  <div className="flex gap-[19.5px]">
                    <img src={Email} alt="Email" className="w-[25px]" />
                    <p>ayuuaulia01@gmail.com</p>
                  </div>
                  <div className="flex gap-[19.5px] items-start">
                    <img src={Maps} alt="" className=" pt-[16.75px]" />
                    <p>
                      3WHG+P4G, Jl. Masjid, Gunungparang, Kec. Cikole, Kota
                      Sukabumi, Jawa Barat 43111
                    </p>
                  </div>
                  {/* Pemesanan online */}
                </ul>
              </div>
            </nav>
            <nav className="hidden md:block lg:hidden">
              <div className="">
                <h2 className="font-boogaloo text-[36px] leading-7 mb-2.5">
                  Informasi
                </h2>
              </div>
            </nav>
            <div className="md:hidden max-w-90 sm:w-50 lg:ml-10">
              <h2 className="font-bold text-[1.35rem] leading-7">Lokasi</h2>
              <address>
                <p className="text-base sm:text-[0.75rem] leading-5 sm:leading-[0.885rem] pt-3.5 text-[#DBDBDB]">
                  Perumahan Prima Mulia Residen (Blok B3, No 19) , Jalan Nagrak,
                  Lebak Muncang, Cikujang, Kec. Gunung Guruh, Kabupaten
                  Sukabumi, Jawa Barat 43156
                </p>
              </address>
            </div>
          </div>

          <div className="hidden md:block w-fit lg:ml-15">
            <h2 className="font-boogaloo text-[36px] pb-[21px] leading-7">
              Pemesanan Online
            </h2>
            <div className="gap-[13px] flex flex-col pl-[4px]">
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
            <p className="font-baloo-2 pt-[32px] leading-[19px] text-[14px]">
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
