
import React, {  } from "react";
import Eskopi from "../../assets/Menu/es.png";
import Bg from "../../assets/Menu/bg.jpg";
import Hero from "../../components/Hero";
import Papan from "../../assets/User/papan.png";
import Mie from "../../assets/User/mie.png";
import Bumbu from "../../assets/User/bumbu.png";
import Pangsit from "../../assets/User/pangsit.png";
import Miesumpit from "../../assets/User/miesumpit1.png";
import Vector from "../../assets/User/Vector.png";
import Rolling from "../../assets/User/rolling.png";
import Smile from "../../assets/User/smile.png";
import Toko from "../../assets/User/toko.png";
import Toko1 from "../../assets/User/toko1.png";
import Logotr from "../../assets/User/logotr.png";


function Tentang() {

  return (
    <div className="w-full">
      <Hero text={"Tentang Kami"}/>
      {/* Container utama */}
      <div className="max-w-6xl mx-auto flex px-6 py-12 gap-6 relat mt-[10px]">
        {/* Kolom 1 (Teks) */}
        <div className="flex-1 relative">
          <h3 className="text-[49px] font-boogaloo relative z-10 mt-0.5">
            Cerita di Balik Kedai Mie Kulay
          </h3>
          <p className="text-black leading-relaxed text-[24px] mt-[34px] font-baloo-2">
            Mie Kulay lahir dari ide awal den7gan merintis usaha ini dilakukan
            dirumah dengan mencoba melalui penjualan aplikasi online. Sejak
            berdiri, Mie Kulay berkomitmen menghadirkan sajian yang berkualitas,
            bersih, halal, dan terjangkau, agar setiap orang bisa menikmati mie
            nikmat penuh kehangatan tanpa harus mahal.
          </p>
        </div>

    {/* Kolom 2 (Gambar menumpuk) */}
    <div className="flex-1 relative h-[500px]">
        {/* Gambar 1 */}
        <img
          src={Toko}
          alt="Kedai Atas"
          className="rounded-lg object-cover w-[501px] h-[356px] absolute top-0 right-0 shadow-lg"
        />
        {/* Gambar 2 */}
        <img
          src={Toko1}
          alt="Kedai Bawah"
          className="rounded-lg object-cover w-[372px] h-[217px] absolute -bottom-0 left-0 shadow-lg z-20 "
        />
      </div>
    </div>



      
      <div className="bg-[#FFB300] mt-[10px] h-[404px] relative flex items-center px-10 overflow-visible">
      {/* Foto sebelah kiri */}
      <div className="absolute left-0 -translate-x-1/5 ml-23 mt-32">
        <img
          src={Miesumpit}
          alt="Promo Mie"
          className="h-[1142px] object-contain"
        />
      </div>

      {/* Teks sebelah kanan */}
      <div className="ml-[351px] max-w-3xl">
          <p className="text-black font-boogaloo text-[50px] text-left">
            Nikmati <span className="text-red-600">mie enak</span> dan
            <span className="text-blue-600"> berkualitas </span>
            dengan harga hemat, cuma <span className="text-red-600">5 ribuan</span> saja.
            Murah meriah, rasa tetap juara!
          </p>
        </div>
      </div>


      {/* Bersih & Terjamin */}
      
      <div className="max-w-6xl mx-auto px-6 py-12  gap-8 items-center ml-[534px]">
        <div>
          <h3 className="text-[60px] font-boogaloo mb-4">Bersih & Terjamin</h3>
          <p className="text-gray-700 leading-relaxed text-[24px] font-baloo-2 mr-[126px]">
            Semua sajian di Mie Kulay dibuat dari bahan pilihan yang segar dan
            berkualitas 🌟. Kami selalu menjaga kebersihan dan keamanan dalam
            setiap proses, jadi kamu bisa menikmati mie yang bukan hanya enak,
            tapi juga bikin hati tenang. Yuk, makan tanpa ragu, karena kualitas
            adalah komitmen kami!
          </p>
        </div>
      </div>

      {/* Keunggulan */}
      <div className="max-w-6xl mx-auto px-[51px] py-12 text-center ml-[170px] mr-[130px] ">
        <h3 className="text-[60px] font-boogaloo mb-10">
          Keunggulan <span className="text-[#FFB300]">Mie Kulay</span>
        </h3>
        {/* Background logo */}
        <div
          className="absolute inset-0 bg-cover w-[717px] h-[717px] mt-[1432px] ml-[270px] opacity-5 z-0"
          style={{ backgroundImage: `url(${Logotr})` }}
        ></div>

        {/* Card wrapper */}
        <div className="relative z-10 flex gap-6 mb-[50px]">
          {/* Card 1 */}
          <div className="bg-[#FFB300] p-6 rounded-lg w-[268px] h-[330px] text-center flex flex-col items-center">
            <img src={Vector} alt="Harga Murah" className="w-[102px] h-[100px] mb-4" />
            <h3 className="text-white font-boogaloo text-[30px] mb-3 mt-6">
              Harga Murah Meriah
            </h3>
            <span className="font-bold">
              <p className="text-white text-[15px] font-baloo-2">
                Dompet tipis bukan halangan, <br />
                <span className="text-[#DC3538] text-[15px] font-baloo-2">dengan 5.000</span> kamu udah bisa <br />
                kenyang di Mie Kulay.
              </p>
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-[#D72629] p-6 rounded-lg w-[268px] h-[330px] text-center flex flex-col items-center">
            <img src={Rolling} alt="Home Made" className="w-[109px] h-[109px] mb-4" />
            <h3 className="text-white font-boogaloo text-[30px] mb-3 mt-4">Home Made</h3>
            <span className="font-bold">
              <p className="text-white text-[14px] font-baloo-2">
                Setiap <span className="text-[#FFBA00] text-[14px] font-baloo-2">Menu</span> di Mie Kulay kami buat
                dengan tangan sendiri dan <br />
                <span className="text-[#FFBA00] text-[14px] font-baloo-2">bukan menggunakan mie instan!</span>
              </p>
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1554B4] p-6 rounded-lg w-[268px] h-[330px] text-center flex flex-col items-center">
            <img src={Smile} alt="Porsi Puas" className="w-[103px] h-[103px] mb-4" />
            <h3 className="text-white font-boogaloo text-[30px] mb-3 mt-5">Porsi Puas</h3>
            <p className="text-white text-[14px] font-baloo-2">
              <span className="font-bold">
                Harga ramah kantong, semangkuk <br />
                Mie Kulay <span className="text-[#FFBA00] text-[14px] font-baloo-2">porsinya pas</span>, bikin <br />
                kenyang tanpa bikin <span className="text-[#FFBA00] text-[14px] font-baloo-2">dompet tipis.</span>
              </span>
            </p>
          </div>
        </div>
      </div>
      </div>
  );
}

export default Tentang;
