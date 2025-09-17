import React from "react";
import background from "../../assets/Login/login.png";
import logo from "../../assets/Login/logo.png"; 
import Bglogin from "../../assets/Login/bglogin.png"; 

function Login() {
  return (
    <div className="flex max-md:flex-col h-screen relative">
      {/* Logo di kiri atas */}
      <div className="absolute top-6 left-6">
        <img src={logo} alt="Logo" className="w-[59px] h-[59px] mt-[0.10px]" />
      </div>

      {/* Kolom kiri: Form Login */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="shadow-[0px_0px_9px_-2px_rgba(0,0,0,0.75)] p-10 rounded-md lg:w-[503px] lg:h-[547px] max-sm:w-[323px] max-sm:h-[405px] max-sm:mt-[107px] max-sm:ml-[33px] max-sm:mr-[33px]">
          <h2 className="text-4xl font-bold text-center mb-6 mt-[2.50rem] ml-[0.10rem]">
            Login
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium mt-[2.70rem] ml-[0.75rem]">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email..."
              className="justify justify-center w-[400px] h-[50px] border border-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFBA00] ml-[0.75rem]"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1 font-medium mt-5 ml-[0.75rem]">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan kata sandi..."
              className="w-[400px] h-[50px] border border-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-[0.75rem]"
            />
          </div>

          {/* Tombol Login */}
          <button className="w-[400px] h-[57px] bg-[#FFBA00] text-black font-bold py-4 rounded-full hover:bg-yellow-500 transition mt-[2.65rem] ml-[0.70rem]">
            <h3 className="text-center-2xl font-semibold">Login</h3>
          </button>
        </div>
      </div>

      {/* Kolom kanan: Ilustrasi */}
      <div
      className="flex-1 flex items-center justify-center flex-col bg-cover bg-center h-full lg:h-screen"
      style={{
      backgroundImage: `url(${Bglogin})`,
      }}
        >
        <img
          src={background}
          alt="Login Illustration"
          className="items-center w-[420px] h-[339px]"
        />
        <h3 className="text-white text-[20px] font-semibold text-center mx-15 mt-12">
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
