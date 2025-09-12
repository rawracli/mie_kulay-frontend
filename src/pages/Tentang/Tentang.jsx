
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
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold mb-4">Sejarah & Latar Belakang</h3>
          <p className="text-gray-700 leading-relaxed">
            Selamat datang di Kedai Rasa Nusantara ☕✨ <br />
            Kami hadir untuk menghadirkan cita rasa rumahan dengan sentuhan khas
            nusantara. Berawal dari resep keluarga sederhana, kami percaya bahwa
            makanan bukan hanya soal rasa, tapi juga cerita dan kebersamaan.
          </p>
        </div>
        <div>
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
      </div>

      {/* Promo Harga */}
      <div className="bg-[#FFB300] text-center py-12">
        <p className="text-black font-bold text-xl max-w-3xl mx-auto">
          Nikmati mie enak dan berkualitas dengan harga hemat, cuma 5 ribuan
          saja. Murah meriah, rasa tetap juara!
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
