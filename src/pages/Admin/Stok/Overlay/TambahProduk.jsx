import React from "react";
import Close from "../../../../assets/Admin/x.svg";

function TambahProduk({
  setIsAddOpen,
  setStockTable,
  setHighlightedRow,
  stockData,
}) {
  const onSubmit = (formData) => {
    const index = `IDX${Math.floor(Math.random() * 100000)}`;
    setStockTable((prevData) => [
      ...prevData,
      {
        id: index,
        produk: formData.get("produk"),
        kategori: formData.get("kategori"),
        stok: Number(formData.get("stok")),
      },
    ]);
    setHighlightedRow(index);
    setTimeout(() => setHighlightedRow(null), 200);
    setIsAddOpen(false);
  };

  return (
    <div className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}>
      <div className="bg-white relative pb-[53px] pt-[32px] px-[30px] w-[415px] h-fit rounded-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
        <div
          onClick={() => {
            setIsAddOpen(false);
          }}
          className="absolute top-[18px] right-[22px] cursor-pointer"
        >
          <img src={Close} alt="X" />
        </div>
        <h2 className="font-semibold text-2xl">Tambah Produk</h2>
        <form
          action={onSubmit}
          className="mt-[41px] h-full space-y-[20px] flex flex-col"
        >
          <div>
            <label htmlFor="Produk">Produk</label>
            <input
              type="text"
              name="produk"
              required
              className="w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="Kategori">Kategori</label>
            <select name="kategori" id="" className="w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none" required>
              {stockData.map((item, idx) => (
                <option key={idx} value={item.nama}>
                  {item.nama.slice(0, 1).toUpperCase() + item.nama.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Stok">Stok</label>
            <input
              type="number"
              name="stok"
              min={1}
              required
              defaultValue={1}
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

export default TambahProduk;
