import React, { useState } from "react";
import background from "../../assets/Login/login.png";
import logo from "../../assets/Login/logo.png";
import { loginUser } from "../../controllers/AuthController";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({ email, password });
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen relative">
      {/* Logo di kiri atas */}
      <div className="absolute top-6 left-6">
        <img src={logo} alt="Logo" className="w-[59px] h-[59px] mt-[0.10px]" />
      </div>

      {/* Kolom kiri: Form Login */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <form onSubmit={handleSubmit}>
          <div className="shadow-[0px_0px_9px_-2px_rgba(0,0,0,0.75)] p-10 rounded-md w-[503px] h-[547px] ">
            <h2 className="text-4xl font-bold text-center mb-6 mt-[2.50rem] ml-[0.10rem]">
              Login
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 font-medium mt-[2.70rem] ml-[0.75rem]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-[400px] h-[50px] border border-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-[0.75rem]"
              />
            </div>

            {/* Tombol Login */}
            <button
              className="w-[400px] h-[57px] bg-[#FFBA00] text-black font-bold py-4 rounded-full hover:bg-yellow-500 transition mt-[2.65rem] ml-[0.70rem]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>

      {/* Kolom kanan: Ilustrasi */}
      <div className="flex-1 bg-[#FFBA00] flex items-center justify-center flex-col">
        <img
          src={background}
          alt="Login Illustration"
          className="items-center w-[420px] h-[339px]"
        />
        <h3 className="text-white text-[20px] font-semibold text-center mx-15 mt-12">
          <i>
            “Cerita besar dimulai dari langkah kecil. Buat kinerja hari ini dan
            mulai perjalanan luar biasa.”
          </i>
        </h3>
      </div>
    </div>
  );
}

export default Login;
