import React from "react";
import Close from "../../../../assets/Admin/x.svg";
import { updateBahan } from "../../../../controllers/Bahan";

function EditProduk({
  stockTable,
  editId,
  setHighlightedRow,
  setEditId,
  setStockTable,
}) {
  const defaultValue = stockTable.find((val) => editId === val.id);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      nama_bahan: formData.get("produk"),
      harga_beli: parseInt(formData.get("harga_beli")),
      tipe: formData.get("tipe"),
    };

    const result = await updateBahan(defaultValue.id, payload);

    if (result.errors) {
      alert(result.errors[Object.keys(result.errors)[0]][0]);
      return;
    }

    setStockTable((prevData) =>
      prevData.map((item) =>
        item.id === defaultValue.id
          ? {
              ...item,
              produk: payload.nama_bahan,
              harga_beli: payload.harga_beli,
              tipe: payload.tipe,
            }
          : item
      )
    );

    setHighlightedRow(defaultValue.id);
    setTimeout(() => setHighlightedRow(null), 200);

    setEditId(null);
  };

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <div className="bg-white relative pb-[53px] pt-[32px] px-[30px] w-[415px] rounded-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
        <div
          onClick={() => setEditId(null)}
          className="absolute top-[18px] right-[22px] cursor-pointer"
        >
          <img src={Close} alt="X" />
        </div>
        <h2 className="font-semibold text-2xl">Edit Bahan</h2>

        <form
          onSubmit={onSubmit}
          className="mt-[41px] space-y-[20px] flex flex-col"
        >
          <div>
            <label>Id</label>
            <input
              type="text"
              defaultValue={defaultValue.id}
              readOnly
              className="cursor-default text-[#575757] bg-[#E8E8E8] w-full mt-[7px] pl-[13px] border border-[#7E7E7E] rounded-[4px] h-[50px]"
            />
          </div>

          <div>
            <label>Bahan Mentah</label>
            <input
              type="text"
              name="produk"
              defaultValue={defaultValue.produk}
              required
              className="w-full mt-[7px] pl-[13px] border border-[#7E7E7E] rounded-[4px] h-[50px]"
            />
          </div>

          <div>
            <label>Harga Beli</label>
            <input
              type="number"
              name="harga_beli"
              defaultValue={defaultValue.harga_beli}
              required
              className="w-full mt-[7px] pl-[13px] border border-[#7E7E7E] rounded-[4px] h-[50px]"
            />
          </div>

          <div>
            <label>Pilih tipe bahan</label>
            <select
              name="tipe"
              defaultValue={defaultValue.tipe}
              required
              className="w-full mt-[7px] pl-[13px] border border-[#7E7E7E] rounded-[4px] h-[50px]"
            >
              <option value="">-- Pilih Tipe --</option>
              <option value="bahan_mentah">Bahan Mentah</option>
              <option value="bahan_baku">Bahan Baku</option>
              <option value="bahan_lengkap">Bahan Lengkap</option>
            </select>
          </div>
          <button
            type="submit"
            className="self-end w-[111px] h-[31px] bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501] text-white text-[15px] rounded-[5px]"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduk;
