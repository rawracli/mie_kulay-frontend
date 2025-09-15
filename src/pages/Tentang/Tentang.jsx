
import React, {  } from "react";
import Eskopi from "../../assets/Menu/es.png";
import Bg from "../../assets/Menu/bg.jpg";
import Hero from "../../components/Hero";
import Papan from "../../assets/User/papan.png";
import Mie from "../../assets/User/mie.png";
import Bumbu from "../../assets/User/bumbu.png";
import Pangsit from "../../assets/User/pangsit.png";


function Tentang() {

  return (
    <div className="w-full">
      <Hero text={"Tentang Kami"}/>
      {/* Sejarah & Latar Belakang */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-[65%_35%] gap-6 items-center ml-[40px]">
        <div>
          <h3 className="text-[45px] font-boogaloo mt-[80px]">Cerita Di Balik Kedai Mie Kullay</h3>
          <p className="text-black leading-relaxed text-[24px] mt-[34px] font-baloo-2">
            Mie Kulay lahir dari ide awal dengan merintis usaha ini 
            dilakukan dirumah dengan mencoba melalui penjualan aplikasi 
            online.  Sejak berdiri, Mie Kulay berkomitmen menghadirkan
            sajian yang berkualitas, bersih, halal, dan terjangkau, agar
            setiap orang bisa menikmati mie nikmat penuh kehangatan
            tanpa harus mahal.
            </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          {/* Kolom kedua bisa isi gambar / konten lain */}
          <p>Ini kolom kedua</p>
        </div>
      </div>


      {/* Promo Harga */}
      <div className="bg-[#FFB300] mt-[100px] text-left py-12 h-[404px]">
        <p className="text-black font-boogaloo text-[50px] max-w-3xl ml-[351px]">
          Nikmati <span className="text-red-600">mie enak</span> dan 
          <span className="text-blue-600"> berkualitas </span>
          dengan harga hemat, cuma <span className="text-red-600">5 ribuan</span> saja. 
          Murah meriah, rasa tetap juara!
        </p>

      </div>

      {/* Bersih & Terjamin */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img src={Eskopi} alt="Mie Kulay" className="rounded-lg shadow-lg" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Bersih & Terjamin</h3>
          <p className="text-gray-700 leading-relaxed">
            Semua sajian di Mie Kulay dibuat dari bahan pilihan yang segar dan
            berkualitas 🌟. Kami selalu menjaga kebersihan dan keamanan dalam
            setiap proses, jadi kamu bisa menikmati mie yang bukan hanya enak,
            tapi juga bikin hati tenang. Yuk, makan tanpa ragu, karena kualitas
            adalah komitmen kami!
          </p>
        </div>
      </div>

      {/* Keunggulan */}
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h3 className="text-2xl font-bold mb-10">
          Keunggulan <span className="text-[#FFB300]">Mie Kulay</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-yellow-400 p-6 rounded-lg text-white font-semibold">
            Harga Murah Meriah
            <p className="text-sm font-normal mt-2">
              Semua harga menu dimulai dari 5000, buat yang lagi kelaparan dan
              cuma punya uang pas, mampirlah ke Mie Kulay.
            </p>
          </div>
          <div className="bg-red-500 p-6 rounded-lg text-white font-semibold">
            Home Made
            <p className="text-sm font-normal mt-2">
              Semua menu dibuat dengan tangan sendiri, bukan mie instan.
            </p>
          </div>
          <div className="bg-blue-600 p-6 rounded-lg text-white font-semibold">
            Porsi Puas
            <p className="text-sm font-normal mt-2">
              Porsi pas bikin kenyang tanpa harus keluar biaya besar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tentang;
