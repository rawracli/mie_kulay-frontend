
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
    <div className="w-full max-sm:w-full">
      <Hero text={"Tentang Kami"}/>
      {/* Container utama */}
    <div className="max-w-6xl mx-auto flex flex-row max-xmd:flex-col-reverse px-6 py-12 gap-6 relative mt-[10px]">
      {/* Kolom 1 (Teks) */}
      <div className="flex-1  relative max-xmd:mt-[400px] max-md:mt-20 max-sm:mt-0" data-aos="fade-up" data-aos-duration="2000">
        <h3 className="text-[49px] font-boogaloo relative z-10  max-sm:text-[40px] max-xmd:text-[60px] mt-[43px] max-xmd:text-center">
          Cerita di Balik Kedai Mie Kulay
        </h3>
        <p className="text-black leading-relaxed text-[24px] max-sm:text-[16px] max-xmd:text-[24px] max-lg:text-[24px] max-xmd:text-center mt-[34px] font-baloo-2">
          Mie Kulay lahir dari ide awal dengan merintis usaha ini dilakukan
          dirumah dengan mencoba melalui penjualan aplikasi online. Sejak
          berdiri, Mie Kulay berkomitmen menghadirkan sajian yang berkualitas,
          bersih, halal, dan terjangkau, agar setiap orang bisa menikmati mie
          nikmat penuh kehangatan tanpa harus mahal.
        </p>
      </div>

      {/* Kolom 2 (Gambar menumpuk) */}
      <div className="flex-1 relative h-[500px] items-center justify-center max-xmd:ml-[80px] max-lg:ml-[100px]  max-sm:ml-[0px] ">
        {/* Gambar 1 */}
        <img
          src={Toko}
          alt="Kedai Atas"
          className="rounded-lg object-cover w-[501px] max-sm:w-[266px] max-lg:w-[481px] h-[356px] max-sm:h-[188px] max-lg:h-[341px] md:absolute left-25  top-0 max-xmd:bottom-0 right-0 max-xmd:left-25 shadow-lg max-sm:ml-15"
          data-aos="fade-up" data-aos-duration="2000" data-aos-delay="300"
        />
        {/* Gambar 2 */}
        <img
          src={Toko1}
          alt="Kedai Bawah"
          className="rounded-lg object-cover w-[372px] max-sm:w-[216px] max-lg:w-[390px] h-[217px] max-sm:h-[105px] max-lg:h-[190px] bottom-0 left-0 max-xmd:top-60 max-sm:top-30 max-xmd:right-0 max-sm:left-5 absolute shadow-lg z-10"
          data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500"
        />
      </div>
    </div>




      
      <div className="bg-[#FFB300] mt-[10px] h-[404px] max-sm:h-[163px] max-xmd:h-[323px] relative flex items-center px-10 overflow-visible">
      {/* Foto sebelah kiri */}
      <div className="absolute left-0 mt-32 -translate-x-1/5 ml-23 max-sm:ml-7 max-xmd:ml-7 max-sm:mt-0 max-xmd:mt-0">
        <img
          src={Miesumpit}
          alt="Promo Mie"
          className="h-[1142px] max-sm:h-[350px] max-xmd:h-[690px] object-contain" 
          data-aos="fade-up-right" data-aos-duration="2000"
        />
      </div>

      {/* Teks sebelah kanan */}
      <div className="ml-[351px] max-sm:ml-[50px] max-xmd:ml-[205px] max-w-3xl">
          <p className="text-black font-boogaloo text-[50px] max-sm:text-[20px] max-xmd:text-[40px] max-md-text-[20px] text-left" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="200">
            Nikmati <span className="text-red-600">mie enak</span> dan
            <span className="text-blue-600"> berkualitas </span>
            dengan harga hemat, cuma <span className="text-red-600">5 ribuan</span> saja.
            Murah meriah, rasa tetap juara!
          </p>
        </div>
      </div>


      {/* Bersih & Terjamin */}
      
      <div className="max-w-6xl mx-auto px-6 py-12  gap-8 items-center ml-[534px] max-sm:ml-[0px] max-xmd:ml-0 max-sm:mt-[30px] max-xmd:mt-[90px] max-xmd:text-center">
        <div data-aos="fade-up" data-aos-duration="2000">
          <h3 className="text-[60px] max-sm:text-[40px] max-xmd:text-[60px] max-sm:text-center font-boogaloo mb-4">Bersih & Terjamin</h3>
          <p className="text-gray-700 leading-relaxed text-[24px] max-sm:text-[15px]  max-xmd:text-[34px] font-baloo-2 mr-[126px] max-sm:mr-0 max-xmd:mr-0 max-sm:text-center">
            Semua sajian di Mie Kulay dibuat dari bahan pilihan yang segar dan
            berkualitas 🌟. Kami selalu menjaga kebersihan dan keamanan dalam
            setiap proses, jadi kamu bisa menikmati mie yang bukan hanya enak,
            tapi juga bikin hati tenang. Yuk, makan tanpa ragu, karena kualitas
            adalah komitmen kami!
          </p>
        </div>
      </div>

      {/* Keunggulan */}
      <div className="relative max-w-6xl mx-auto px-[51px] py-12 max-sm:py-0 max-xmd:py-0 text-center ml-[170px] max-sm:ml-0 max-xmd:ml-0  mr-[130px] max-sm:mr-0 max-xmd:mr-0 ">
        <h3 className="text-[60px] max-sm:text-[35px] max-xmd:text-[60px] font-boogaloo mb-10 max-sm:mb-[50px] max-sm:xmd-[50px]" data-aos="fade-up" data-aos-duration="2000">
          Keunggulan <span className="text-[#FFB300]">Mie Kulay</span>
        </h3>
        {/* Background logo */}
        <div
          className="absolute inset-0 z-0 flex items-center justify-center w-full bg-cover opacity-5"
        >
          <img src={Logotr} className="w-[717px] max-sm:w-[352px]" alt="" data-aos="fade-in" data-aos-duration="1500"/>
        </div>


          {/* Card wrapper */}
          <div className="relative z-10 flex gap-6 mb-[50px] max-sm:flex-col max-xmd:flex-col max-sm:items-center max-xmd:items-center">
            {/* Card 1 */}
            <div className="bg-[#FFB300] p-6 rounded-lg w-[268px] h-[330px] text-center flex flex-col items-center" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
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
            <div className="bg-[#D72629] p-6 rounded-lg w-[268px] h-[330px] text-center flex flex-col items-center" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="200">
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
            <div className="bg-[#1554B4] p-6 rounded-lg w-[268px] h-[330px] text-center flex flex-col items-center" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
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
