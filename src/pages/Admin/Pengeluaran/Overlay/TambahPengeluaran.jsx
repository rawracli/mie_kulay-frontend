import React, { useEffect, useMemo } from "react";
import Close from "../../../../assets/Admin/x.svg";
import { tambahPengeluaran, updatePengeluaran } from "../../../../controllers/Pengeluaran";

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
    const date = new Date(dateStr);
    if (isNaN(date)) return "";

    // Menggunakan local timezone, bukan UTC
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    console.log("currentItem:", currentItem);
  }, [currentItem]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      pengeluaran: parseInt(formData.get("jumlah")),
      tanggal: formData.get("tanggal"),
      catatan: formData.get("catatan"),
    };

    try {
      if (!editId) {
        const res = await tambahPengeluaran(payload);
        setDataPengeluaran((prevData) => [
          ...prevData,
          {
            id: res.data.id,
            pengeluaran: res.data.pengeluaran,
            catatan: res.data.catatan,
            created_at: res.data.created_at,
          },
        ]);
        setHighlightedRow(res.data.id);
        setIsAddOpen(false);
      } else {
      await updatePengeluaran(editId, parseInt(formData.get("jumlah")), formData.get("catatan"));
      setDataPengeluaran(prevData =>
       prevData.map(item =>
        item.id === editId
         ? {
          ...item,
          pengeluaran: parseInt(formData.get("jumlah")),
          catatan: formData.get("catatan"),
          tanggal: formData.get("tanggal"),
         }
          : item
         )
        );
        setHighlightedRow(editId);
        setEditId(null);
        setIsAddOpen(false);
       }
      } catch (err) {
      console.error(err);
      alert(err.message || "Gagal menambahkan pengeluaran");
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

        <form
          onSubmit={onSubmit}
          className="mt-[41px] h-full space-y-[12px] flex flex-col"
        >
          <div>
            <label htmlFor="Jumlah">Jumlah</label>
            <input
              type="number"
              name="jumlah"
              defaultValue={currentItem?.pengeluaran ?? ""}
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
              defaultValue={toInputDate(currentItem?.created_at ?? "")}
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
