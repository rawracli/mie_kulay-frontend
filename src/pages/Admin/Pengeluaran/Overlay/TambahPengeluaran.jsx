import React, { useEffect, useMemo } from "react";
import Close from "../../../../assets/Admin/x.svg";

function TambahPengeluaran({
  setIsAddOpen,
  dataPengeluaran,
  setDataPengeluaran,
  editId,
  setEditId,
  setHighlightedRow,
}) {

  const currentItem = useMemo(() => {
    if (!editId) return null;
    return dataPengeluaran.find((v) => v.id === editId) || null;
  }, [editId, dataPengeluaran]);

  const toInputDate = (dateStr) => {
    if (!dateStr) return "";
    return String(dateStr).split("T")[0]
  };

  useEffect(() => {
    console.log("currentItem:", currentItem);
  }, [currentItem]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      judul: formData.get("judul"),
      jumlah: formData.get("jumlah"),
      tanggal: formData.get("tanggal"),
      catatan: formData.get("catatan"),
    };

    if (!editId) {
      // Tambah
      const index = `IDX${Math.floor(Math.random() * 100000)}`;
      setDataPengeluaran((prevData) => [
        ...prevData,
        {
          id: index,
          ...payload,
        },
      ]);
      setIsAddOpen(false);
    } else {
      // Edit
      setDataPengeluaran((prevData) =>
        prevData.map((item) =>
          item.id === editId
            ? {
                ...item,
                ...payload,
              }
            : item
        )
      );
      setHighlightedRow(editId);
      setEditId(null);
      setIsAddOpen(false);
    }
  };

  return (
    <div className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}>
      <div className="bg-white relative pb-[53px] pt-[32px] px-[30px] w-[415px] h-fit rounded-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
        <div
          onClick={() => {
            setIsAddOpen(false);
            setEditId(null);
          }}
          className="absolute top-[18px] right-[22px] cursor-pointer"
        >
          <img src={Close} alt="X" />
        </div>
        <h2 className="font-semibold text-2xl">
          {editId === null ? "Tambah" : "Edit"} Pengeluaran
        </h2>

        <form onSubmit={onSubmit} className="mt-[41px] h-full space-y-[12px] flex flex-col">
          <div>
            <label htmlFor="Judul">Judul</label>
            <input
              type="text"
              name="judul"
              defaultValue={currentItem?.judul ?? ""}
              required
              className="w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="Jumlah">Jumlah</label>
            <input
              type="number"
              name="jumlah"
              defaultValue={currentItem?.jumlah ?? ""}
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
              defaultValue={toInputDate(currentItem?.tanggal)}
              className="w-full mt-[7px] pl-[13px] pr-[15px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="Catatan">Catatan</label>
            <textarea
              name="catatan"
              required
              defaultValue={currentItem?.catatan ?? ""}
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
