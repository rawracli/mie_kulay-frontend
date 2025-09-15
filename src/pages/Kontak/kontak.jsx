import React from "react";
import { useState } from "react";


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


  return (
    <div className="w-full min-h-screen bg-white">

      {/* Content */}
       <div className="max-w mx-auto mt-10 p-6 flex flex-col md:flex-row gap-6 h-[436px] ">
        {/* Form (lebih sempit) */}
           <div className="flex-2 py-[27px] rounded-md h-[436px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)] ml-[34px] mr-[22px]">
      <h2 className="text-2xl font-bold mb-4 font-boogaloo ml-[47px] mr-[45px]">
        Kirimkan Pertanyaan Mu
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 ml-[47px] mr-[45px]"
      >
        <div>
          <label className="block text-sm font-semibold mb-1 py-1">Nama</label>
          <input
            type="text"
            placeholder="Masukkan Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full rounded-md px-3 py-2 focus:outline-none border border-[#7E7E7E]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 py-1">Pesan</label>
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
          className="bg-[#FFB300] hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded-md self-end w-34 h-12"
        >
          Kirim
        </button>
      </form>
    </div>


        {/* Info Kontak (lebih lebar) */}
        <div className="flex-[1.5] h-[436px] rounded-md shadow-[0px_2px_6px_rgba(156,156,156,0.25)] mr-[57px] py-[27px]">
          <h2 className="text-2xl font-bold mb-2  font-boogaloo ml-[38px] mr-[159px]">Informasi Kontak</h2>
          <p className="text-gray-600 mb-4 ml-[38px]">
            Berikut ini adalah kontak kami yang bisa dihubungi
          </p>
          <hr className="mx-[30px]"></hr>
          <ul className="space-y-4 ml-[43px] mr-[31px] py-5">
            <li className="flex items-center gap-3 font-bold">
             <span>0838 - 6993 - 1820</span>
            </li>
            <li className="flex items-center gap-3 font-bold">
              <span>ayuuualia01@gmail.com</span>
            </li>
            <li className="flex items-center gap-3 font-bold ">
              
              <span>
                3WHG+P4G, Jl. Masjid, Gunungparang, Kec. Cikole, Kota Sukabumi,
                Jawa Barat 43111
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w mx-auto mt-10 p-6 md:flex-row gap-6 h-full">

        {/* Form (lebih sempit) */}
          <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7483069258947!2d106.92046307900273!3d-6.920663449868827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e684900058502c9%3A0xf601489b114677c5!2sKULAY!5e0!3m2!1sid!2sid!4v1757152455741!5m2!1sid!2sid"
          width="93%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg shadow-[0px_2px_6px_rgba(156,156,156,0.25)] h-[388px] ml-[34px] mr-[22px]"
        ></iframe>
      </div>

        
    </div>
  );
}


export default Kontak