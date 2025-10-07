import React, { useState, useEffect } from "react";
import background from "../../assets/Login/login.png";
import logo from "../../assets/Login/logo.png";
import { loginUser } from "../../controllers/AuthController";
import Bglogin from "../../assets/Login/bglogin.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fungsi untuk user gagal login (memberikan email mereka)
  const [loginFailed, setLoginFailed] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  // Fungsi untuk reset password
  const [resetSent, setResetSent] = useState(false);
  const [token, setToken] = useState(""); // state token
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Ambil token & email dari URL jika ada
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");

    if (tokenFromUrl && emailFromUrl) {
      setResetSent(true);
      setToken(tokenFromUrl);
      setEmail(emailFromUrl);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({ email, password });
      window.location.href = "/admin";
    } catch (err) {
      setError(err.message);
      setLoginFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Masukkan email terlebih dahulu");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/api/password/forgot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setResetSent(true); // Tampilkan pesan berhasil
        setError("");
      } else {
        setError(data.message || "Gagal mengirim reset password");
      }
    } catch (err) {
      setError("Gagal mengirim reset password");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi ubah password
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) return alert("Password tidak cocok");

    const res = await fetch("http://127.0.0.1:8000/api/password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: newPassword,
        password_confirmation: confirmPassword,
        token,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.error(data.message); // Password berhasil direset
      window.location.href = "/login"; // FE yang handle redirect
    } else {
      console.error(data.message); // Token invalid / expired
    }
  };

  return (
    <div className="flex h-screen max-md:flex-col">
      {/* Logo di kiri atas */}
      <div className="absolute top-6 left-6">
        <img src={logo} alt="Logo" className="w-[59px] h-[59px] mt-[0.10px]" />
      </div>

      {/* Kolom kiri: Form Login */}
      <div className="flex items-center justify-center flex-1 bg-white max-sm:items-start">
        <form
          onSubmit={handleSubmit}
          className="shadow-[0px_0px_9px_-2px_rgba(0,0,0,0.75)] p-10 max-sm:p-0 rounded-md lg:w-[503px] lg:h-[547px] max-sm:w-[323px] max-sm:h-[405px] max-sm:mt-[107px] max-sm:ml-[33px] max-sm:mr-[33px] max-sm:z-10 max-md:z-10 bg-white"
        >
          <h2 className="text-[32px] max-sm:text-[24px] font-semibold text-center mb-6 mt-[2.50rem] max-sm:mt-[40px]">
            Login
          </h2>
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-light mt-[2.70rem] ml-[0.75rem] max-sm:ml-[23px] ">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email..."
              className=" w-[400px] max-sm:w-[275px] h-[50px] max-sm:h-[40.82px] border border-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFBA00] ml-[0.75rem] max-sm:ml-[23px]"
            />
          </div>

          {/* Password */}
          {!showForgotPassword && !resetSent && (
            <div className="mb-6">
              <label className="block mb-1 font-light mt-5 ml-[0.75rem] max-sm:ml-[23px]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-[400px] max-sm:w-[275px] h-[50px] max-sm:h-[40.82px] border border-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-[0.75rem] max-sm:ml-[23px]"
              />
            </div>
          )}
          {/* Password Baru & Konfirmasi */}
          {resetSent && (
            <div className="mb-6">
              <label className="block mb-1 font-light mt-5 ml-[0.75rem] max-sm:ml-[23px]">
                Password Baru
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan password baru..."
                className="w-[400px] max-sm:w-[275px] h-[50px] max-sm:h-[40.82px] border border-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-[0.75rem] max-sm:ml-[23px]"
              />

              <label className="block mb-1 font-light mt-5 ml-[0.75rem] max-sm:ml-[23px]">
                Konfirmasi Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Konfirmasi password baru..."
                className="w-[400px] max-sm:w-[275px] h-[50px] max-sm:h-[40.82px] border border-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-[0.75rem] max-sm:ml-[23px]"
              />
            </div>
          )}

          {showForgotPassword && (
            <div className="flex flex-row gap-1 justify-center">
              <button
                type="button"
                className="mt-4"
                onClick={() => setShowForgotPassword(false)}
              >
                Kembali ke
              </button>
              <button
                type="button"
                className="text-[#FFBA00] mt-4"
                onClick={() => setShowForgotPassword(false)}
              >
                Login
              </button>
            </div>
          )}

          {loginFailed && !showForgotPassword && (
            <div className="flex flex-row gap-1 justify-center">
              <p>Lupa kata sandi?</p>
              <button
                type="button"
                className="text-[#FFBA00]"
                onClick={() => setShowForgotPassword(true)}
              >
                Klik disini
              </button>
            </div>
          )}

          {/* Tombol Login */}
          <button
            className="w-[400px] max-sm:w-[279px] h-[57px] max-sm:h-[40.82px] bg-[#FFBA00] text-black font-bold rounded-full hover:bg-yellow-500 transition mt-3 max-sm:mt-[20px] ml-[0.70rem] max-sm:ml-[23px]"
            type={showForgotPassword ? "button" : "submit"}
            onClick={
              resetSent
                ? handleChangePassword
                : showForgotPassword
                ? handleForgotPassword
                : handleSubmit
            }
            disabled={loading}
          >
            <h3 className="font-semibold text-center-2xl">
              {resetSent
                ? "Ubah Password" // tampilkan ini jika link telah ditekan
                : showForgotPassword
                ? "Kirim Reset Password" // tampilkan ini jika lupa kata sandi ditekan
                : loading
                ? "Loading..."
                : "Login"}
            </h3>
          </button>
        </form>
      </div>

      {/* Kolom kanan: Ilustrasi */}
      <div
        className="max-sm:absolute flex-1 flex items-center justify-center flex-col bg-cover bg-[#FBB800] max-sm:bg-transparent max-md:bg-transparent w-full h-full  max-sm:h-[464px] max-sm:mt-[380px] max-md:mt-[250px] max-md:absolute"
        style={{
          backgroundImage: `url(${Bglogin})`,
        }}
      >
        <img
          src={background}
          alt="Login Illustration"
          className="items-center w-[420px] max-sm:w-[257.08px] h-[339px] max-sm:h-[207.48px] ml-8 max-sm:mt-[110px]"
        />
        <h3 className="text-white text-[20px] max-sm:text-[14px] font-semibold text-center mx-15 max-sm:mx-10 mt-12 max-sm:mt-[24px]">
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
