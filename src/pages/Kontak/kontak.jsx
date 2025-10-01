import React from "react";
import "animate.css";
import { useState } from "react";
import Hero from "../../components/Hero";

function Kontak() {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // nomor tujuan (gunakan format internasional tanpa +)
    const nomorWA = "6288219612691";

    // format pesan
    const text = `Halo, saya ${nama}.%0A${pesan}`;

    // arahkan ke WhatsApp
    window.open(`https://wa.me/${nomorWA}?text=${text}`, "_blank");
  };

  // Konstanta untuk styling yang berulang
  const cardStyle = "rounded-[10px] shadow-[0px_2px_6px_rgba(156,156,156,0.7)]";
  const sectionPadding = "px-[34px] max-md:py-[49px] md:py-[29px]";
  const cardPadding = "px-[22px] sm:px-[45px] py-[27px]";
  const contactItemStyle = "flex items-center gap-3 font-bold";

  return (
    <>
      <Hero text="Kontak Kami" />
      <div className={`w-full min-h-screen bg-white ${sectionPadding}`}>
        {/* Main Content Container */}
        <div className="max-w mx-auto flex flex-col md:flex-row gap-[22px]">
          {/* Form Section */}
          <div
            className={`animate__animated animate__slideInLeft flex-2 ${cardStyle} ${cardPadding} h-[436px]`}
          >
            <h2 className="text-[26px] sm:text-[32px] font-bold mb-4 font-boogaloo md:text-nowrap">
              Kirimkan Pertanyaan Mu
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block py-1 mb-1 text-sm font-semibold">
                  Nama
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full rounded-md px-3 py-2 focus:outline-none border border-[#7E7E7E]"
                />
              </div>

              <div>
                <label className="block py-1 mb-1 text-sm font-semibold">
                  Pesan
                </label>
                <textarea
                  placeholder="Kirim pesan"
                  rows="4"
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  className="w-full rounded-md px-3 py-2 focus:outline-none border border-[#7E7E7E] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="animate__animated animate__fadeInUp text-[20px] cursor-pointer font-boogaloo bg-[#FFB300] hover:bg-yellow-500 text-white font-semibold sm:py-2 px-6 rounded-md self-end w-28 h-8 sm:w-34 sm:h-12"
              >
                Kirim
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div
            className={`animate__animated animate__slideInRight flex-[1.5] ${cardStyle} pt-[26px] h-[436px]`}
          >
            <div className="px-[28px] sm:px-[38px]">
              <h2 className="text-[26px] sm:text-[32px] font-bold mb-2 font-boogaloo">
                Informasi Kontak
              </h2>
              <p className="text-[#737373] font-baloo-2 mb-4">
                Berikut ini adalah kontak kami yang bisa dihubungi
              </p>
            </div>

            <hr className="mx-[28px] sm:mx-[30px]" />

            <ul className="space-y-9 py-5 px-[38px] sm:px-[43px] max-sm:[&>li]:text-[15px] [&>li]:font-baloo-2">
              <li className={`${contactItemStyle} pt-7`}>
                <PhoneIcon />
                <span>0838 - 6993 - 1820</span>
              </li>
              <li className={contactItemStyle}>
                <EmailIcon />
                <span>ayuuualia01@gmail.com</span>
              </li>
              <li className={contactItemStyle}>
                <LocationIcon />
                <span>
                  3WHG+P4G, Jl. Masjid, Gunungparang, Kec. Cikole, Kota
                  Sukabumi, Jawa Barat 43111
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w mx-auto mt-[16px] h-full animate_animated animate_FadeIn">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7483069258947!2d106.92046307900273!3d-6.920663449868827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e684900058502c9%3A0xf601489b114677c5!2sKULAY!5e0!3m2!1sid!2sid!4v1757152455741!5m2!1sid!2sid"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={`rounded-lg shadow-[0px_2px_6px_rgba(156,156,156,0.25)] w-full h-[388px]`}
          ></iframe>
        </div>
      </div>
    </>
  );
}

// Komponen ikon yang dipisah untuk readability
const PhoneIcon = () => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.82821 1.22546C3.09067 0.963394 3.40583 0.760098 3.7528 0.629045C4.09977 0.497993 4.47064 0.442177 4.84082 0.465295C5.21099 0.488413 5.57203 0.589938 5.9 0.763143C6.22797 0.936347 6.51539 1.17727 6.74321 1.46996L9.43571 4.92896C9.92921 5.56346 10.1032 6.38996 9.90821 7.16996L9.08771 10.455C9.04558 10.6251 9.04802 10.8033 9.09479 10.9722C9.14156 11.1411 9.23107 11.2952 9.35471 11.4195L13.0402 15.105C13.1646 15.2288 13.3189 15.3185 13.4882 15.3653C13.6574 15.4121 13.8358 15.4144 14.0062 15.372L17.2897 14.5515C17.6747 14.4558 18.0763 14.4486 18.4645 14.5304C18.8526 14.6123 19.2171 14.781 19.5307 15.024L22.9897 17.715C24.2332 18.6825 24.3472 20.52 23.2342 21.6315L21.6832 23.1825C20.5732 24.2925 18.9142 24.78 17.3677 24.2355C13.4087 22.8443 9.81452 20.5781 6.85271 17.6055C3.88026 14.6441 1.61403 11.0504 0.222706 7.09196C-0.320294 5.54696 0.167206 3.88646 1.27721 2.77646L2.82821 1.22546Z"
      fill="black"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="26"
    height="20"
    
    className="w-[27.5px] min-w-[27.5px]"
    viewBox="0 0 26 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23 0H3C1.625 0 0.5125 1.125 0.5125 2.5L0.5 17.5C0.5 18.875 1.625 20 3 20H23C24.375 20 25.5 18.875 25.5 17.5V2.5C25.5 1.125 24.375 0 23 0ZM23 5L13 11.25L3 5V2.5L13 8.75L23 2.5V5Z"
      fill="black"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    className="w-[27.5px] min-w-[27.5px]"
    width="21"
    height="28"
    viewBox="0 0 21 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 13.2715C9.58832 13.2715 8.71398 12.9093 8.06932 12.2647C7.42466 11.62 7.0625 10.7457 7.0625 9.83398C7.0625 8.9223 7.42466 8.04796 8.06932 7.40331C8.71398 6.75865 9.58832 6.39648 10.5 6.39648C11.4117 6.39648 12.286 6.75865 12.9307 7.40331C13.5753 8.04796 13.9375 8.9223 13.9375 9.83398C13.9375 10.2854 13.8486 10.7324 13.6758 11.1495C13.5031 11.5665 13.2499 11.9455 12.9307 12.2647C12.6115 12.5839 12.2325 12.8371 11.8155 13.0098C11.3984 13.1826 10.9514 13.2715 10.5 13.2715ZM10.5 0.208984C7.94729 0.208984 5.49913 1.22304 3.6941 3.02808C1.88906 4.83312 0.875 7.28128 0.875 9.83398C0.875 17.0527 10.5 27.709 10.5 27.709C10.5 27.709 20.125 17.0527 20.125 9.83398C20.125 7.28128 19.1109 4.83312 17.3059 3.02808C15.5009 1.22304 13.0527 0.208984 10.5 0.208984Z"
      fill="black"
    />
  </svg>
);

export default Kontak;
