import React from "react";
import Close from "../../../../assets/Admin/x.svg";

function EditProduk({
  stockTable,
  editId,
  setHighlightedRow,
  setEditId,
  setStockTable,
}) {
  const defaultValue = stockTable.filter((val) => editId === val.id);

  const onSubmit = (formData) => {
    setStockTable((prevData) =>
      prevData.map((item) =>
        item.id === defaultValue[0].id
          ? {
              ...item,
              produk: formData.get("produk"),
              stok: formData.get("stok"),
              kategori: formData.get("kategori"),
            }
          : item
      )
    );
    setHighlightedRow(defaultValue[0].id);
    setTimeout(() => setHighlightedRow(null), 200);
    setEditId(null);
  };


  console.log(defaultValue);
  return (
    <div className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}>
      <div className="bg-white relative pb-[53px] pt-[32px] px-[30px] w-[415px] h-fit rounded-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
        <div
          onClick={() => {
            setEditId(null);
          }}
          className="absolute top-[18px] right-[22px] cursor-pointer"
        >
          <img src={Close} alt="X" />
        </div>
        <h2 className="font-semibold text-2xl">Edit Produk</h2>
        <form
          action={onSubmit}
          className="mt-[41px] h-full space-y-[20px] flex flex-col"
        >
          <div>
            <label htmlFor="Id">Id</label>
            <input
              type="text"
              name="Id"
              defaultValue={defaultValue[0].id}
              readOnly
              className="cursor-default caret-transparent text-[#575757] bg-[#E8E8E8] w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="Produk">Produk</label>
            <input
              type="text"
              name="produk"
              defaultValue={defaultValue[0].produk}
              required
              className="w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="Kategori">Kategori</label>
            <input
              type="text"
              name="kategori"
              defaultValue={defaultValue[0].kategori}
              required
              className="w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="Stok">Stok</label>
            <input
              type="number"
              min={1}
              name="stok"
              defaultValue={defaultValue[0].stok}
              required
              className="appearance-none w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
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

export default EditProduk;
