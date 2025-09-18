import React from "react";
import background from "../../assets/Login/login.png";
import logo from "../../assets/Login/logo.png"; 
import Bglogin from "../../assets/Login/bglogin.png"; 

function Login() {
  return (
    <div className="flex max-md:flex-col h-screen">
      {/* Logo di kiri atas */}
      <div className="absolute top-6 left-6">
        <img src={logo} alt="Logo" className="w-[59px] h-[59px] mt-[0.10px]" />
      </div>

      {/* Kolom kiri: Form Login */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="shadow-[0px_0px_9px_-2px_rgba(0,0,0,0.75)] p-10 max-sm:p-0 rounded-md lg:w-[503px] lg:h-[547px] max-sm:w-[323px] max-sm:h-[405px] max-sm:mt-[107px] max-sm:ml-[33px] max-sm:mr-[33px] bg-white">
          <h2 className="text-[32px] max-sm:text-[24px] font-semibold text-center mb-6 mt-[2.50rem] max-sm:mt-[40px]">
            Login
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-light mt-[2.70rem] ml-[0.75rem] max-sm:ml-[23px] ">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email..."
              className=" w-[400px] max-sm:w-[275px] h-[50px] max-sm:h-[40.82px] border border-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFBA00] ml-[0.75rem] max-sm:ml-[23px]"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1 font-light mt-5 ml-[0.75rem] max-sm:ml-[23px]">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan kata sandi..."
              className="w-[400px] max-sm:w-[275px] h-[50px] max-sm:h-[40.82px] border border-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-[0.75rem] max-sm:ml-[23px]"
            />
          </div>

          {/* Tombol Login */}
          <button className="w-[400px] max-sm:w-[279px] h-[57px] max-sm:h-[40.82px] bg-[#FFBA00] text-black font-bold rounded-full hover:bg-yellow-500 transition mt-[2.65rem] max-sm:mt-[20px] ml-[0.70rem] max-sm:ml-[23px]">
            <h3 className="text-center-2xl font-semibold">Login</h3>
          </button>
        </div>
      </div>
      
      {/* Kolom kanan: Ilustrasi */}
      <div
      className="flex-1 flex items-center justify-center flex-col bg-cover bg-[#FBB800] max-sm:bg-transparent h-[716px] max-sm:w-[390px] max-sm:h-[330px]"
      style={{
      backgroundImage: `url(${Bglogin})`,
      }}
        >
        <img
          src={background}
          alt="Login Illustration"
          className="items-center w-[420px] max-sm:w-[257.08px] h-[339px] max-sm:h-[207.48px] ml-10"
        />
        <h3 className="text-white text-[20px] max-sm:text-[14px] font-semibold text-center mx-15 max-sm:mx-10 mt-12 max-sm:mt-[24px]">
          <i>
            “Cerita besar dimulai dari langkah kecil. Buat akunmu hari ini dan
            mulai perjalanan luar biasa.”
          </i>
        </h3>
      </div>
    </div>
  );
}

export default Login;
