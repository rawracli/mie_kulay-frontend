import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Papan from "../../assets/User/papan.png";
import Mie from "../../assets/User/mie.png";
import Bumbu from "../../assets/User/bumbu.png";
import Pangsit from "../../assets/User/pangsit.png";
import Resto from "../../assets/Home/resto.png";
import Talk from "../../assets/Home/talk.png";
import SelamatDatang from "../../assets/Home/selamatDatang.png";
import Transition from "../../assets/Home/transition.png";
import Saus from "../../assets/Home/saus.png";
import Mie2 from "../../assets/Home/mie.png";
import Mie3 from "../../assets/Home/mieManis.png";
import Sosis from "../../assets/Home/sosis.png";
import Minum from "../../assets/Home/minum.png";
import allMenu from "../../assets/Home/allMenu.png";
import Menu from "./Section/Menu";

export default function HeroSection() {
  return (
    <>
      <div className="overflow-x-hidden">
        {/* HERO SECTION */}
        <div className="relative min-h-[600px] flex">
          <div className="z-10 flex flex-col justify-center ml-[70px] w-1/2 gap-[10px] -translate-y-5">
            <h1 className="font-boogaloo text-[70px]">MIE KULAY SUKABUMI</h1>
            <p className="font-baloo-2 text-[24px] leading-[35px]">
              Mie Kulay, ,<span className="font-semibold">rasanya</span> bikin
              susah <span className="font-semibold">move on!</span> Teksturnya
              kenyal, gurihnya pas, dan setiap suapan bikin{" "}
              <span className="font-semibold">nagih.</span> Mau makan bareng
              keluarga, nongkrong sama temen, atau lagi santai sendirian, Mie
              Kulay selalu siap nemenin momen kamu biar makin{" "}
              <span className="font-semibold">asik.</span>
            </p>
            <Link
              to="/menu"
              className="mt-2 active:shadow-[0px_0px_0px_#DDAB1E] active:translate-y-[6px] transition-all cursor-pointer bg-[#FFB300] w-[181px] h-[50px] rounded-full shadow-[0px_6px_0px_#DDAB1E] text-white font-chewy text-[22px] text-center content-center"
            >
              Lihat Menu
            </Link>
          </div>
          <img
            src={Papan}
            alt="Papan"
            className="absolute -right-[475px] -top-[60px] -rotate-[38.03deg]"
          />
          <img
            src={Pangsit}
            alt="Pangsit"
            className="absolute right-[27px] top-[31px]"
          />
          <img
            src={Mie}
            alt="Mie"
            className="absolute right-[23px] top-[90px]"
          />
          <img
            src={Bumbu}
            alt="Bumbu"
            className="absolute -right-[10px] top-[173.68px] rotate-[22.45deg]"
          />
        </div>

        {/* SELAMAT DATANG SECTION */}
        <div className="flex flex-col items-center pt-[70px] pb-[66px]">
          <img
            src={SelamatDatang}
            alt="Selamat Datang"
            className="w-[1016px] my-0"
          />
          <h2 className="font-chewy text-[80px] text-[#FFB300] -translate-y-10">
            DI MIE KULAY
          </h2>
        </div>

        {/* RASA YANG MENYATUKAN SETIAP MOMEN SECTION */}
        <div className="flex justify-between min-h-[490px]">
          <div className="flex-1 relative">
            <img
              src={Resto}
              alt="Restoran"
              className="absolute left-[70.72px] -rotate-[11.16deg] border-x-[24.9px] border-y-[27.2px] border-[#D72629]"
            />
            <img
              src={Talk}
              alt="Talk"
              className="absolute left-[208.71px] translate-y-[155px] -rotate-[6.96deg] border-x-[18.24px] border-y-[17.32px] border-[#1554B4]"
            />
          </div>
          <div className="z-10 flex flex-col justify-center w-[45%] gap-[30px] mb-10">
            <h2 className="font-boogaloo text-[60px] leading-[68px]">
              <span className="text-[#FFB300]">Rasa</span> yang Menyatukan{" "}
              <span className="text-[#DC3538]">Setiap Momen</span>
            </h2>
            <p className="font-baloo-2 text-[24px] leading-[35px] pr-2">
              Dari awal, kami selalu fokus nyajiin rasa autentik, bahan segar,
              dan pelayanan tulus. Buat kami, tiap hidangan itu spesial—diracik
              penuh perhatian biar setiap kunjungan jadi pengalaman istimewa.
            </p>
          </div>
        </div>

        {/* Transition & Saatnya Menjelajah Rasa section */}
        <div className="relative overflow-hidden">
          <img src={Transition} alt="" className="w-full h-[389px]" />
          <div className="bg-[#FFB300] relative flex items-center min-h-[calc(100svh-70px)]">
            <div className="z-10 flex flex-col justify-center ml-[79px] w-1/2 pb-10">
              <h2 className="font-boogaloo text-[60px] pb-[20px]">
                Saatnya Menjelajah Rasa
              </h2>
              <p className="font-baloo-2 text-[24px] leading-[35px] text-balance pb-[30px]">
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
                className="absolute right-0 bottom-0"
              />
              <img
                src={Mie2}
                alt="mie"
                className="absolute right-[10px] bottom-[182px] -rotate-[4.93deg]"
              />
              <img
                src={Minum}
                alt="minum"
                className="absolute right-[410px] bottom-[401px] -rotate-[8.87deg]"
              />
              <img
                src={Mie3}
                alt="mie"
                className="absolute right-[375px] bottom-[37px] rotate-[13.42deg]"
              />
              <img
                src={Sosis}
                alt="sosis"
                className="absolute right-[6.5px] bottom-[490px] rotate-[21.45deg]"
              />
            </>
          </div>
        </div>

        {/* BG MIE KULAY */}
        <div className="min-h-[1416px]">
          {/* ALL MENU CUMAN 5000 AJA */}
          <div className="min-h-[calc(1416px/2)] w-full gap-[127px] pt-[84px] flex flex-col justify-center items-center">
            <img
              src={allMenu}
              alt="ALL MENU CUMAN 5000 AJA !!"
              className="w-[1082px]"
            />
            <Menu />
          </div>
        </div>
      </div>
    </>
  );
}
