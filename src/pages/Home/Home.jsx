import React from "react";
import "./home.css";

export default function HeroSection() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between px-10 min-h-[calc(100svh-104px)] bg-white">
        {/* Bagian Kiri - Teks */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            MIE KULAY SUKABUMI
          </h1>
          <p className="text-gray-700 leading-relaxed">
            Mie Kulay hadir dengan cita rasa khas yang melekat di hati. Dengan
            tekstur mie yang kenyal dan bumbu racikan yang pas, setiap suapan
            menghadirkan kehangatan yang cocok dinikmati kapan saja. Baik makan
            santai bersama keluarga maupun hangout bareng teman, Mie Kulay
            selalu jadi pilihan tepat.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-md shadow-md transition duration-200">
            Lihat Menu
          </button>
        </div>

        {/* Bagian Kanan - Gambar */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <img
            src="/mie.png"
            alt="Mie Kulay"
            className="max-w-sm rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-10 py-10 bg-white">
        {/* Teks melengkung */}
        <div className="font-bold text-center font-chewy tracking-widest">
          <svg
            width="800"
            height="300"
            viewBox="0 0 800 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Jalur kurva (landai) */}
            <path
              id="curve"
              d="M 100 200 Q 400 80 700 200"
              fill="transparent"
            />

            {/* Teks */}
            <text
              fill="black"
              fontSize="90"
              fontWeight="bold"
              textAnchor="middle"
              letterSpacing="5"
            >
              <textPath href="#curve" startOffset="50%">
                SELAMAT DATANG
              </textPath>
            </text>
          </svg>
        </div>

        {/* Teks lurus */}
        <h1 className="font-bold text-center font-chewy text-[90px] text-[#FFB300]">
          DI MIE KULAY
        </h1>
      </div>
<div className="flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-white">
      {/* Bagian Kiri - Gambar */}
      <div className="flex flex-col md:flex-row gap-6 md:w-1/2 justify-center">
        {/* Gambar 1 */}
        <div className="transform rotate-[-5deg] border-[15px] border-red-600">
          <img
            src="/img1.jpg"
            alt="Suasana Makan"
            className="w-72 h-56 object-cover"
          />
        </div>

        {/* Gambar 2 */}
        <div className="transform rotate-[5deg] border-[15px] border-blue-600 mt-6 md:mt-12">
          <img
            src="/img2.jpg"
            alt="Makan Bersama"
            className="w-72 h-56 object-cover"
          />
        </div>
      </div>

      {/* Bagian Kanan - Teks */}
      <div className="md:w-1/2 mt-10 md:mt-0 md:pl-10">
        <h2 className="text-3xl md:text-4xl font-extrabold font-chewy text-gray-900 mb-6">
          Rasa yang Menyatukan <br /> Setiap Momen
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Sejak awal, kami berkomitmen menyajikan pengalaman kuliner terbaik
          melalui cita rasa autentik, bahan segar pilihan, dan pelayanan yang
          tulus. Bagi kami, setiap hidangan adalah karya yang diracik dengan
          penuh perhatian, agar setiap kunjungan Anda menjadi pengalaman yang
          istimewa.
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-6 py-3 rounded-md shadow-md transition duration-200">
          Read More..
        </button>
      </div>
    </div>

    </>
  );
}
