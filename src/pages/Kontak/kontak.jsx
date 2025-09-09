import React from "react";

function Kontak() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#FFA500] relative">
        <div className="w-full flex justify-center">
          <div className="bg-red-500 px-8 py-3 rounded-full my-5">
            <h1 className="text-white text-xl font-bold">Kontak Kami</h1>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-10 flex items-center">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            
          </svg>
        </div>
      </div>

      {/* Content */}
       <div className="max-w mx-auto mt-10 p-6 flex flex-col md:flex-row gap-6 h-[436px]">
        {/* Form (lebih sempit) */}
        <div className="flex-2 border border-gray-200 p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-bold mb-4">Kirimkan Pertanyaan Mu</h2>
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nama</label>
              <input
                type="text"
                placeholder="Masukkan Nama"
                className="w-full border rounded-md px-3 py-2 focus:outline-none border-gray-500 "
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Pesan</label>
              <textarea
                placeholder="Kirim pesan"
                rows="4"
                className="w-full border rounded-md px-3 py-2 focus:outline-none border-gray-500"
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
        <div className="flex-[1.5] border border-gray-200 p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-bold mb-2">Informasi Kontak</h2>
          <p className="text-gray-600 mb-4">
            Berikut ini adalah kontak kami yang bisa dihubungi
          </p>
          <hr className="my-5"></hr>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 font-bold">
             <span>0838 - 6993 - 1820</span>
            </li>
            <li className="flex items-center gap-3 font-bold">
              <span>ayuuualia01@gmail.com</span>
            </li>
            <li className="flex items-center gap-3 font-bold">
              
              <span>
                3WHG+P4G, Jl. Masjid, Gunungparang, Kec. Cikole, Kota Sukabumi,
                Jawa Barat 43111
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w mx-auto mt-10 p-6 flex flex-col md:flex-row gap-6 h-full">

        {/* Form (lebih sempit) */}
        <div className="flex-2 border border-gray-200 p-6 rounded-md shadow-sm">
          <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7483069258947!2d106.92046307900273!3d-6.920663449868827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e684900058502c9%3A0xf601489b114677c5!2sKULAY!5e0!3m2!1sid!2sid!4v1757152455741!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg shadow h-[350px] w-full"
        ></iframe>
        </div>

        {/* Info Kontak (lebih lebar) */}
        <div className="flex-[1.5] border border-gray-200 p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-bold mb-2">Informasi Kedai</h2>
          <p className="text-gray-600 mb-4">
            Berikut ini adalah kontak kami yang bisa dihubungi
          </p>
          <hr className="my-5"></hr>
          <div className="grid grid-cols-2 mx-7">
            <div className="">
                <h1 className="font-bold">Senin - Jumat</h1>
                <p className="font-semibold text-[#FFB300]">09.00 am - 08.00 pm</p>
            </div>
            <div className="">
                <h1 className="font-bold">Sabtu</h1>
                <p className="font-semibold text-[#FFB300]">09.00 am - 08.00 pm</p>
            </div>
            <div className=" my-3">
                <h1 className="font-bold">Minggu</h1>
                <p className="font-semibold text-[#FFB300]">09.00 am - 08.00 pm</p>
            </div>

          </div>
        </div>
      </div>

        
    </div>
  );
}


export default Kontak