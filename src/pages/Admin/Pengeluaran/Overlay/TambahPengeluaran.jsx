import React from "react";
import Close from "../../../../assets/Admin/x.svg";

function TambahPengeluaran({ setIsAddOpen, dataPengeluaran, setDataPengeluaran }) {

  const onSubmit = (formData) => {
    const index = `IDX${Math.floor(Math.random() * 100000)}`;
    setDataPengeluaran((prevData) => [
      ...prevData,
      {
        id: index,
        judul: formData.get("judul"),
        jumlah: formData.get("jumlah"),
        tanggal: formData.get("tanggal"),
        catatan: formData.get("catatan"),
      },
    ]);
    setIsAddOpen(false);
};
console.log(dataPengeluaran);
  return (
    <div className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}>
      <div className="bg-white relative pb-[53px] pt-[32px] px-[30px] w-[415px] h-fit rounded-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
        <div
          onClick={() => setIsAddOpen(false)}
          className="absolute top-[18px] right-[22px] cursor-pointer"
        >
          <img src={Close} alt="X" />
        </div>
        <h2 className="font-semibold text-2xl">Tambah Pengeluaran</h2>
        <form
          action={onSubmit}
          className="mt-[41px] h-full space-y-[12px] flex flex-col"
        >
          <div>
            <label htmlFor="Judul">Judul</label>
            <input
              type="text"
              name="judul"
              required
              className="w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="Jumlah">Jumlah</label>
            <input
              type="number"
              name="jumlah"
              required
              className="appearance-none w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="tanggal">Date</label>
            <input
              type="date"
              name="tanggal"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
              className="w-full mt-[7px] pl-[13px] pr-[15px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="Catatan">Catatan</label>
            <textarea
              name="catatan"
              required
              className="w-full mt-[7px] px-[13px] pt-[10px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[121px] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="self-end w-[111px] h-[31px] bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501] text-white text-[15px] rounded-[5px] cursor-pointer"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

export default TambahPengeluaran;
