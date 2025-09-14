import React, { useEffect, useState } from "react";
import Close from "../../../../assets/Admin/x.svg";
import { tambahBahan } from "../../../../controllers/Bahan";
import { getCategories } from "../../../../controllers/Category";

function TambahProduk({ setIsAddOpen, setStockTable }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCategories();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const dataToSend = {
      nama_bahan: formData.get("nama_bahan"),
      harga_beli: Number(formData.get("harga_beli")),
      kategori_id: formData.get("kategori_id"),
      stok: Number(formData.get("stok")),
    };

    try {
      const result = await tambahBahan(dataToSend);
      console.log("Bahan berhasil ditambahkan:", result);

      setStockTable((prev) => [
        ...prev,
        {
          id: result.id,
          produk: result.nama_bahan,
          harga_beli: result.harga_beli,
          kategori:
            categories.find((c) => c.id == result.kategori_id)
              ?.jenis_hidangan || "Unknown",
          stok: result.stok,
        },
      ]);

      setIsAddOpen(false);
    } catch (error) {
      alert(error.message || "Terjadi kesalahan saat menambahkan bahan.");
    }
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
        <h2 className="font-semibold text-2xl">Tambah Bahan Mentah</h2>
        <form
          onSubmit={onSubmit}
          className="mt-[41px] h-full space-y-[20px] flex flex-col"
        >
          <div>
            <label htmlFor="nama_bahan">Nama Bahan</label>
            <input
              type="text"
              name="nama_bahan"
              required
              className="w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="nama_bahan">Harga satuan</label>
            <input
              type="number"
              name="harga_beli"
              required
              className="w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="Kategori">Kategori</label>
            <select
              name="kategori_id"
              className="w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
              required
            >
              <option value="">-- Pilih Jenis Hidangan --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.jenis_hidangan.charAt(0).toUpperCase() +
                    cat.jenis_hidangan.slice(1)}
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
