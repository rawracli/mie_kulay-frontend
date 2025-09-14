import React, { useState } from "react";
import Alert from "../../assets/Admin/alert.png";

function ConfirmDelete({ deleteId, setSkipConfirm, setDeleteId, onDelete }) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [loading, setLoading] = useState(false);

  // menghapus data dari database
  const handleDelete = async () => {
    if (!deleteId || !onDelete) return;

    if (dontShowAgain && setSkipConfirm) {
      setSkipConfirm(true);
    }

    setLoading(true);
    try {
      await onDelete(deleteId); // panggil fungsi hapus dari parent
      setDeleteId(null);
    } catch (err) {
      console.error("Gagal hapus data:", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // menghapus data tanpa database
  const handleDeleteNoDB = () => {
    console.log("Delete clicked for id:", deleteId);
    if (dontShowAgain && setSkipConfirm) {
      setSkipConfirm(true);
    }

    if (onDelete) {
      onDelete(deleteId);
    }

    setDeleteId(null);
  };

  const onCancel = () => {
    setDeleteId(null);
  };

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <div className="bg-white relative flex flex-col items-center pb-[24px] pt-[15px] px-[30px] w-[415px] h-fit rounded-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
        <img src={Alert} alt="" />
        <h2 className="font-semibold text-[1.5rem] mt-[16px]">
          Yakin Hapus Data Ini ?
        </h2>
        <div className="flex-row-reverse flex items-center [&>*]:cursor-pointer mt-[12px] mb-[23px]">
          <label
            htmlFor="CheckBox"
            className="text-[0.75rem] pl-[9px] text-[#484848] select-none font-sans"
          >
            Jangan Tampilkan Lagi
          </label>
          <input
            type="checkbox"
            id="CheckBox"
            className="size-[18.5px] rounded-full"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
          />
        </div>
        <div className="flex gap-[11px] text-white font-semibold">
          <button
            onClick={() => {
              handleDelete();
              handleDeleteNoDB();
            }}
            className="bg-[#44962D] w-[89px] h-[32px] rounded-[5px] cursor-pointer"
          >
            {loading ? "Menghapus..." : "Hapus"}
          </button>
          <button
            onClick={onCancel}
            className="bg-[#DC3538] w-[89px] h-[32px] rounded-[5px] cursor-pointer"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
