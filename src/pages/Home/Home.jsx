import React, { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Papan from "../../assets/User/papan.png";
import Mie from "../../assets/User/mie.png";
import Bumbu from "../../assets/User/bumbu.png";
import Pangsit from "../../assets/User/pangsit.png";
import Resto from "../../assets/Home/resto.png";
import RestoLebar from "../../assets/Home/restoLebar.png";
import Talk from "../../assets/Home/talk.png";
import SelamatDatang from "../../assets/Home/selamatDatang.png";
import Transition from "../../assets/Home/transition.png";
import TransitionSmall from "../../assets/Home/transitionSmall.png";
import Saus from "../../assets/Home/saus.png";
import Mie2 from "../../assets/Home/mie.png";
import Cabe from "../../assets/Home/cabe.png";
import Mie3 from "../../assets/Home/mieManis.png";
import Sosis from "../../assets/Home/sosis.png";
import Minum from "../../assets/Home/minum.png";
import allMenu from "../../assets/Home/allMenu.png";
import MieKulay from "../../assets/Home/mieKulayMelengkung.png";
import MieKulay2 from "../../assets/Home/mieKulayMelengkung2.png";
import Tangan from "../../assets/Home/tanganNunjuk.png";
import logo from "../../assets/logoTransparant.svg";
import Menu from "./Section/Menu";
import img1 from "../../assets/Home/img1.png";
import img2 from "../../assets/Home/img2.png";
import bubuk from "../../assets/Home/bubuk_cabe.png";
import { Carousel } from "react-responsive-3d-carousel";
import "react-responsive-3d-carousel/dist/styles.css";
import { useMediaQuery } from "react-responsive";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      type: "youtube",
      src: "https://www.youtube.com/embed/mnHhVOZiCpw?si=L_uhf6-FnrEwZEAg",
    },
    { type: "image", src: img1, link: "https://vt.tiktok.com/ZSDBbymHr/" },
    { type: "image", src: img2, link: "https://vt.tiktok.com/ZSDBgj1GM/" },
  ];
  const items = slides.map((item, index) => (
    <div
      key={index}
      className="relative w-full h-full cursor-pointer"
      onClick={() => {
        if (currentIndex === index && item.type === "image") {
          window.open(item.link, "_blank");
        }
      }}
    >
      {item.type === "youtube" ? (
        <iframe
          width="100%"
          height="100%"
          src={item.src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-[20px] border-white border-4"
        ></iframe>
      ) : (
        <img
          src={item.src}
          alt=""
          className="rounded-[20px] border-white border-4 w-full h-full object-cover"
        />
      )}

      {/* Overlay untuk image saja */}
      {item.type === "image" && (
        <>
          <div
            className={`absolute z-10 inset-0 rounded-[20px] transition duration-300 ${
              currentIndex !== index ? "bg-black/50" : "bg-black/0"
            }`}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[98px] h-[96px] bg-black/43 rounded-full flex items-center justify-center">
            <svg
              width="36"
              height="43"
              className="ml-2"
              viewBox="0 0 36 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.33398 1.75L34.2507 21.5L1.33398 41.25V1.75Z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  ));
  const isDesktopBig = useMediaQuery({ query: "(max-width: 1280px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1195px)" });
  const isTabletSmall = useMediaQuery({ query: "(max-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  return (
    <>
      <div className="overflow-x-hidden">
        {/* HERO SECTION */}
        <div className="relative max-sm:min-h-[702px] max-xmd:min-h-[1080px] xmd:min-h-[600px] flex max-xmd:flex-col">
          <div className="z-10 max-xmd:mt-[100px] flex flex-col justify-center max-xmd:items-center mx-auto xmd:ml-[70px] max-sm:w-full max-xmd:w-4/5 xmd:w-1/2 gap-[10px] -translate-y-5" data-aos="fade-up" data-aos-duration="2000">
            <h1 className="font-boogaloo text-[35px] sm:text-[50px] md:text-[62px] xmd:text-[70px] text-center xmd:text-left">
              MIE KULAY SUKABUMI
            </h1>
            <p className="font-baloo-2 text-[16px] sm:text-[18px] max-sm:px-[5px] max-md:px-[10px] max-xmd:px-[84px] text-balance md:text-[22px] xmd:text-[24px] leading-[22px] sm:leading-[30px] md:leading-[34px] xmd:leading-[35px] text-center xmd:text-left">
              Mie Kulay, <span className="font-semibold">rasanya</span> bikin
              susah <span className="font-semibold">move on!</span> Teksturnya{" "}
              <span className="font-semibold">kenyal</span>, gurihnya pas, dan
              setiap suapan bikin <span className="font-semibold">nagih.</span>{" "}
              Mau makan bareng keluarga, nongkrong sama temen, atau lagi santai
              sendirian, Mie Kulay selalu siap nemenin momen kamu biar makin{" "}
              <span className="font-semibold">asik.</span>
            </p>
            <Link
              to="/menu"
              className="mt-2 active:shadow-[0px_0px_0px_#DDAB1E] xmd:active:translate-y-[6px] transition-all cursor-pointer bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501] w-[152.78px] md:w-[181px] h-[44px] md:h-[50px] rounded-[10.07px] xmd:rounded-full xmd:shadow-[0px_6px_0px_#DDAB1E] text-white font-chewy text-[22px] max-sm:text-[18px] text-center content-center"
            >
              Lihat Menu
            </Link>
          </div>
          <div className="max-md:translate-x-8 max-xmd:translate-x-12">
            <img
              src={Papan}
              alt="Papan"
              className="absolute max-sm:size-[243px] max-xmd:max-w-[379.39px] max-xmd:h-[382.31px] max-xmd:-translate-x-1/2 max-xmd:left-[46%] xmd:-right-[475px] max-sm:mt-[100px] max-xmd:mt-[160px] xmd:-top-[60px] -rotate-[137.9deg] xmd:-rotate-[38.03deg]"
              data-aos="zoom-in-up" data-aos-duration="1300" data-aos-delay="50"
            />
            <img
              src={Pangsit}
              alt="Pangsit"
              className="absolute max-sm:size-[68px] max-xmd:-translate-x-1/2 max-xmd:left-[calc(50%-13.7rem)] max-sm:left-[calc(50%-9.4rem)] max-sm:mt-[90px] max-xmd:mt-[127px] max-xmd:z-10 max-xmd:size-[100px] xmd:right-[27px] xmd:top-[31px]"
              data-aos="zoom-in-up" data-aos-duration="2000" data-aos-delay="600"
            />
            <img
              src={Mie}
              alt="Mie"
              className="absolute max-sm:max-w-[300px] max-xmd:max-w-[470px] xmd:right-[23px] xmd:top-[90px] max-xmd:-translate-x-1/2 max-xmd:left-[47.5%] max-sm:mt-[80px] max-xmd:mt-[130px] "
              data-aos="zoom-in-up" data-aos-duration="2000" data-aos-delay="400"
            />
            <img
              src={Bumbu}
              alt="Bumbu"
              className="max-xmd:scale-x-[-1] absolute max-xmd:-translate-x-1/2 max-sm:left-[calc(50%+5.8rem)] max-xmd:left-[calc(50%+7.6rem)] max-sm:mt-[50px] max-xmd:mt-[63px] xmd:-right-[10px] xmd:top-[173.68px] rotate-[313.61deg] max-sm:w-[50.07px] max-xmd:w-[81.96px] xmd:rotate-[22.45deg]"
              data-aos="zoom-in-up" data-aos-duration="2000" data-aos-delay="800"
            />
          </div>
          <img
            src={bubuk}
            alt="bubuk"
            className="absolute left-1/2 -translate-x-1/2 bottom-45 sm:bottom-85 md:bottom-70 -z-10 xmd:hidden object-center max-xmd:w-full max-sm:min-w-[500px] max-sm:max-w-[500px] max-md:min-w-[758.27px] max-xmd:max-w-[800.27px]  max-w-none"
          />
        </div>

        {/* SELAMAT DATANG SECTION */}
        <div className="flex flex-col items-center pt-[70px] pb-[66px]">
          <img
            src={SelamatDatang}
            alt="Selamat Datang"
            className="w-[1016px] my-0 px-2 md:px-10"
            data-aos="fade-up" data-aos-duration="2000"
          />
          <h2 className="font-chewy text-[clamp(0px,8vw,80px)] text-[#FFB300] -translate-y-4 sm:-translate-y-6 md:-translate-y-8 xmd:-translate-y-10" data-aos="fade-up" data-aos-duration="2000">
            DI MIE KULAY
          </h2>
        </div>

        {/* RASA YANG MENYATUKAN SETIAP MOMEN SECTION */}
        <div className="flex max-xmd:flex-col-reverse justify-between max-xmd:items-center max-xmd:text-center min-h-[490px]">
          <div className="relative flex-1 max-sm:min-h-[200px] max-md:min-h-[400px] max-xmd:min-h-[470px] w-full">
            <div className="w-full max-xs:left-[220px] max-md:-translate-x-[60%] max-xmd:-translate-x-[67%] max-xmd:left-1/2 max-xmd:relative">
              <img
                src={isTablet ? RestoLebar : Resto}
                alt="Restoran"
                className="absolute right-0 xmd:left-[70.72px] max-sm:h-[150.28px] max-md:h-[220px] rotate-[3.07deg] xmd:-rotate-[11.16deg] border-x-[10.9px] border-y-[10.2px] sm:border-x-[20.9px] sm:border-y-[21.2px] md:border-x-[24.9px] md:border-y-[27.2px] border-[#D72629]"
                data-aos="fade-up" data-aos-duration="2000"
              />
              <img
                src={Talk}
                alt="Talk"
                className="absolute right-35 sm:right-50 md:right-60 xmd:left-[208.71px] max-sm:h-[160.28px] max-md:h-[230px] translate-y-[70px] sm:translate-y-[109px] md:translate-y-[155px] -rotate-[5.46deg] xmd:-rotate-[6.96deg] border-x-[10.9px] border-y-[10.2px] sm:border-x-[18.24px] sm:border-y-[17.32px] border-[#1554B4]"
                data-aos="fade-up" data-aos-duration="2000" data-aos-delay="200"
              />
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="2000" className="z-10 flex flex-col justify-center w-[98%] sm:w-[86%] lg:w-[45%] xmd:w-[45%] gap-[30px] mb-[67px] xmd:mb-10">
            <h2 className="font-boogaloo max-sm:text-[40px] lg:text-nowrap sm:text-[50px] md:text-[65.15px] xmd:text-[60px] leading-[50px] sm:leading-[60px] md:leading-[80px] xmd:leading-[68px]">
              <span className="text-[#FFB300]">Rasa</span> yang Menyatukan{" "}
              <span className="text-[#DC3538] block">Setiap Momen</span>
            </h2>
            <p className="font-baloo-2 text-[16px] md:text-[24px] leading-[28px] md:leading-[35px] max-sm:px-2 xmd:pr-2">
              Dari awal, kami selalu fokus nyajiin rasa autentik, bahan segar,
              dan pelayanan tulus. Buat kami, tiap hidangan itu spesial—diracik
              penuh perhatian biar setiap kunjungan jadi pengalaman istimewa.
            </p>
          </div>
        </div>

        {/* Transition & Saatnya Menjelajah Rasa section */}
        <div className="relative overflow-hidden">
          <div className="flex justify-center">
            {/* Container untuk pusatkan gambar */}
            <img
              src={isTablet ? TransitionSmall : Transition}
              alt=""
              className="h-[389px] w-full min-w-[600px]"
            />
          </div>
          <div className="bg-[#FFB300] relative max-xmd:flex-col flex items-center max-sm:max-h-[650px] max-sm:min-h-[650px] max-md:max-h-[700px] max-md:min-h-[700px] md:min-h-[800px] md:max-h-[800px] xmd:max-h-[634px] xmd:min-h-[634px]">
            <div data-aos="fade-up" data-aos-duration="2000" className="z-10 flex flex-col max-xmd:text-center justify-center xmd:ml-[79px] max-xmd:px-5 xmd:w-1/2 pt-10">
              <h2 className="font-boogaloo text-[40px] md:text-[60px] pb-[20px] max-md:leading-10 pt-5">
                Saatnya Menjelajah Rasa
              </h2>
              <p className="font-baloo-2 md:text-[24px] leading-[23.2px] md:leading-[35px] text-balance pb-[30px]">
                Setiap hidangan kami diracik dengan penuh perhatian,
                menghadirkan cita rasa yang istimewa di setiap suapan. Dari
                pilihan menu favorit hingga sajian andalan, semua dibuat untuk
                menemani momen hangat bersama keluarga dan teman.
              </p>
            </div>
            <>
              <img
                src={Saus}
                alt="saus"
                className="absolute max-sm:w-[400px] max-sm:h-[332px] max-md:w-[580px] max-sm:min-w-[200px] max-md:h-[442px] max-xmd:w-[642.11px] max-xmd:h-[532.95px] max-sm:-bottom-6 max-xmd:-bottom-10 -bottom-5 right-0 max-xmd:-rotate-[5.51deg]"
                data-aos="fade-up-left" data-aos-duration="1400"
              />
              <img
                src={Mie2}
                alt="mie"
                className="absolute max-sm:w-[230.82px] max-md:w-[300.82px] max-xmd:w-[350.11px] max-sm:right-[21.97px] max-xmd:right-[50px] right-[10px] max-sm:bottom-[111px] bottom-[182px] -rotate-[4.93deg]"
                data-aos="fade-up" data-aos-duration="2000" data-aos-delay="50" data-aos-anchor-placement="top-bottom"
              />
              <img
                src={Minum}
                alt="minum"
                className="absolute max-sm:w-[101.21px] max-md:w-[130px] max-xmd:w-[132.29px] max-sm:right-[253.89px] max-md:right-[350px] max-md:-rotate-[14.46deg] max-sm:bottom-[183.13px] max-xmd:bottom-[260px] max-xmd:right-[474.82px] right-[410px] bottom-[401px] -rotate-[8.87deg]"
              />
              <img
                src={Mie3}
                alt="mie"
                className="absolute max-sm:w-[97.47px] max-xmd:w-[120.29px] max-md:right-[60px] max-sm:right-[29px] max-xmd:right-[80px] right-[375px] max-sm:bottom-[14px] bottom-[37px] rotate-[13.42deg]"
              />
              <img
                src={Sosis}
                alt="sosis"
                className="absolute max-sm:w-[111.97px] max-xmd:w-[148.85px] max-sm:right-[230.74px] max-sm:bottom-[24.28px] max-md:right-[230px] max-xmd:bottom-[70px] max-xmd:right-[513.29px] right-[6.5px] bottom-[490px] rotate-[21.45deg]"
              />
              <img
                src={Cabe}
                alt="cabe"
                className="absolute max-sm:w-[195.38px] max-md:w-[230.38px] max-md:-rotate-[12.46deg] max-md:-right-[50px] -right-[125px] bottom-[107.44px] sm:bottom-[180px] -rotate-[21.34deg]"
              />
            </>
          </div>
        </div>

        {/* BG MIE KULAY */}
        <div className="relative lg:min-h-[1416px]">
          {/* BACKGROUND */}
          <div className="absolute top-[249px] left-1/2 -translate-x-1/2">
            <img src={logo} alt="" className="w-[860px] max-w-none opacity-3" />
          </div>
          {/* ALL MENU CUMAN 5000 AJA */}
          <div className="relative lg:min-h-[calc(1416px/2)] w-full gap-[70px] md:gap-[127px] pt-[50px] md:pt-[60px] lg:pt-[84px] flex flex-col lg:justify-center items-center">
            <img
              src={allMenu}
              alt="ALL MENU CUMAN 5000 AJA !!"
              className="w-[1082px] max-md:px-1"
              data-aos="fade-up" data-aos-duration="2000"
            />
            <Menu />
          </div>
          {/* MAP SECTION */}
          <div className="relative min-h-1/2">
            <div className="flex items-center justify-center pt-[70px] md:pt-[125px] flex-wrap" data-aos="fade-up" data-aos-duration="2000">
              <h2 className="font-boogaloo text-center text-[40px] md:text-[60px] md:text-nowrap max-sm:leading-none">
                Apa Kata Mereka tentang
              </h2>
              <img
                src={MieKulay}
                alt="Mie Kulay"
                className="ml-[27px] w-[200px] max-md:pt-4 md:w-[264px] h-full"
              />
            </div>
            <div className="flex justify-end items-center gap-[56px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d990.1870655086115!2d106.9242074722138!3d-6.920668799999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e684900058502c9%3A0xf601489b114677c5!2sKULAY!5e0!3m2!1sid!2sid!4v1757919657434!5m2!1sid!2sid"
                width="729"
                height="407"
                style={{ border: 0 }}
                className="mx-[12px] md:mx-auto max-xmd:my-4 xl:mt-6"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-aos="fade-up" data-aos-duration="2000" data-aos-delay="50"
              ></iframe>
              <img src={Tangan} alt="" className="max-xmd:hidden xl:hidden" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="100"/>
            </div>
          </div>
        </div>
        {/* CAROUSEL VIDEO */}
        <div className="relative flex min-h-[730px] md:min-h-[760px] max-h-[800px]">
          <div className="flex-1 bg-[#FFB300]">
            <h2 className="text-[40px] md:text-[60px] font-boogaloo text-end mr-[12px] pt-[57px]" data-aos="fade-up" data-aos-duration="2000">
              Seputar
            </h2>
          </div>
          <div className="flex-1 bg-[#D72629]">
            <img
              src={MieKulay2}
              alt="Mie Kulay"
              className="w-[140px] md:w-[200px] ml-[9px] md:ml-[12px] mt-[15px] md:mt-[20px] pt-[57px]"
              data-aos="fade-up" data-aos-duration="2000" data-aos-delay="50"
            />
          </div>
          <div className="flex justify-center absolute w-[1112px] bottom-[50px] py-3 xmd:bottom-[100px] right-1/2 translate-x-1/2" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="100">
            <Carousel
              items={items}
              containerWidth={
                isTablet
                  ? isMobile ? "420px" : "700px"
                  : "100%"
              }
              indicators={{ translate: ["0px", "17px"] }}
              boxShadow={""}
              width={
                isTablet
                  ? "320px"
                  : "687px"
              }
              height={
                isTablet
                  ? "510px"
                  : "406px"
              }
              transformDuration={300}
              sizeDuration={300}
              autoPlay={false}
              showArrows={true}
              showStatus={false}
              showIndicators={isTablet ? true : false}
              startIndex={0}
              onChange={(index) => setCurrentIndex(index)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
