import React, { useEffect, useState, useRef } from "react";
import Close from "../../../../assets/Admin/x.svg";
import Login from "../../../../assets/Login/login.png";
import { createMenu } from "../../../../controllers/Menu";
import { getBahan, tambahBahan } from "../../../../controllers/Bahan";
import BahanDropdown from "./BahanDropdown";

function TambahMenu({ onClose, onAdd }) {
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [nama, setNama] = useState("");
  const [hargaBeli, setHargaBeli] = useState();
  const [selectedBahan, setSelectedBahan] = useState([]);
  const formRef = useRef(null);

  // buat preview ketika file dipilih
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFilePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const [bahanList, setBahanList] = useState([]);
  useEffect(() => {
    getBahan().then(setBahanList); // fetchBahan = API call
  }, []);

  // Fungsi untuk scroll ke bawah
  const scrollToBottom = () => {
    if (formRef.current) {
      setTimeout(() => {
        formRef.current.scrollTop = formRef.current.scrollHeight;
      }, 30);
    }
  };

  // Mengambil data bahan
  const addBahan = async (bahan, options = { isNew: false }) => {
    // kalau sudah dipilih sebelumnya maka tidak akan duplikat
    if (selectedBahan.find((b) => b.bahan_id === bahan.id)) return;

    try {
      if (options.isNew) {
        // kalau bahan baru maka simpan ke DB dulu
        const addedBahan = await tambahBahan({
          nama_bahan: (bahan.nama_bahan || bahan.nama).trim(),
          harga_beli: Number(bahan.harga || bahan.harga_beli || 0),
          tipe: bahan.tipe,
        });

        setSelectedBahan((prev) => [
          ...prev,
          {
            bahan_id: addedBahan.id,
            nama: addedBahan.nama_bahan,
            jumlah: 1,
          },
        ]);
        console.log("Bahan baru ditambahkan:", addedBahan);
      } else {
        // kalau bahan lama maka akan langsung masuk state, tanpa API
        setSelectedBahan((prev) => [
          ...prev,
          {
            bahan_id: bahan.id,
            nama: bahan.nama_bahan,
            jumlah: 1,
          },
        ]);
        console.log("Bahan lama dipilih:", bahan);
      }
    } catch (err) {
      console.error("Gagal menambahkan bahan:", err.message);
    }
  };

  const handleJumlahChange = (index, value) => {
    setSelectedBahan((prev) =>
      prev.map((b, i) => (i === index ? { ...b, jumlah: Number(value) } : b))
    );
  };

  const handleRemoveBahan = (index) => {
    setSelectedBahan((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_hidangan", nama.trim());
    formData.append("harga_jual", Number(hargaBeli));
    formData.append("stok", 0);
    formData.append("kategori_id", 1);
    if (file) formData.append("gambar", file);

    // bahan dengan jumlah (nested array format)
    selectedBahan.forEach((bahan, idx) => {
      formData.append(`bahan_ids[${idx}][bahan_id]`, bahan.bahan_id);
      formData.append(`bahan_ids[${idx}][jumlah]`, bahan.jumlah);
    });

    const menu = await createMenu(formData);
    onAdd(menu);
    onClose();
  };

  return (
    <div
      className={`fixed top-[33.3%] sm:top-[36%] md:top-1/2 md:-translate-y-[calc(50%-1rem)] translate-x-1/2 right-1/2 md:right-[calc(50%-13rem)] lg:right-[calc(50%-15rem)] flex md:h-[577px] z-50`}
    >
      <div className="bg-white max-md:border p-[11px] md:pl-[27px] md:pr-[32px] md:pb-[24px] md:pt-[28px] flex flex-col w-[317px] lg:w-[416px] rounded-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)] relative">
        <div
          onClick={onClose}
          className="absolute top-[18px] right-[22px] cursor-pointer"
        >
          <img src={Close} alt="X" />
        </div>
        <h2 className="font-semibold text-2xl">Tambah Menu</h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-[3px] md:mt-[41px] h-full md:space-y-[20px] flex flex-col overflow-y-auto"
        >
          <div>
            <label htmlFor="foto" className="max-md:text-[12.5px]">
              Foto
            </label>
            <div className="relative w-full h-[74px] md:h-[131px] md:mt-[7px] bg-[#D9D9D9] rounded-[4px] cursor-pointer overflow-hidden">
              {filePreview ? (
                <img
                  src={filePreview}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 max-md:h-[37.45px] -translate-y-1/2 pointer-events-none"
                  width="54"
                  height="63"
                  viewBox="0 0 54 63"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M53.2031 29.125V58.375C53.2031 59.5063 52.7537 60.5913 51.9538 61.3912C51.1538 62.1912 50.0688 62.6406 48.9375 62.6406H5.0625C3.93119 62.6406 2.84621 62.1912 2.04625 61.3912C1.24629 60.5913 0.796875 59.5063 0.796875 58.375V29.125C0.796875 27.9937 1.24629 26.9087 2.04625 26.1087C2.84621 25.3088 3.93119 24.8594 5.0625 24.8594H12.375C12.8598 24.8594 13.3248 25.052 13.6677 25.3948C14.0105 25.7376 14.2031 26.2026 14.2031 26.6875C14.2031 27.1723 14.0105 27.6373 13.6677 27.9802C13.3248 28.323 12.8598 28.5156 12.375 28.5156H5.0625C4.90088 28.5156 4.74589 28.5798 4.63161 28.6941C4.51733 28.8084 4.45312 28.9634 4.45312 29.125V58.375C4.45312 58.5366 4.51733 58.6916 4.63161 58.8059C4.74589 58.9202 4.90088 58.9844 5.0625 58.9844H48.9375C49.0991 58.9844 49.2541 58.9202 49.3684 58.8059C49.4827 58.6916 49.5469 58.5366 49.5469 58.375V29.125C49.5469 28.9634 49.4827 28.8084 49.3684 28.6941C49.2541 28.5798 49.0991 28.5156 48.9375 28.5156H41.625C41.1402 28.5156 40.6752 28.323 40.3323 27.9802C39.9895 27.6373 39.7969 27.1723 39.7969 26.6875C39.7969 26.2026 39.9895 25.7376 40.3323 25.3948C40.6752 25.052 41.1402 24.8594 41.625 24.8594H48.9375C50.0688 24.8594 51.1538 25.3088 51.9538 26.1087C52.7537 26.9087 53.2031 27.9937 53.2031 29.125ZM16.1044 15.7919L25.1719 6.7274V36.4375C25.1719 36.9223 25.3645 37.3873 25.7073 37.7302C26.0502 38.073 26.5152 38.2656 27 38.2656C27.4848 38.2656 27.9498 38.073 28.2927 37.7302C28.6355 37.3873 28.8281 36.9223 28.8281 36.4375V6.7274L37.8956 15.7919C38.063 15.9715 38.2648 16.1155 38.4891 16.2154C38.7133 16.3154 38.9554 16.3691 39.2009 16.3734C39.4463 16.3778 39.6901 16.3326 39.9178 16.2407C40.1454 16.1487 40.3522 16.0119 40.5258 15.8383C40.6994 15.6647 40.8362 15.4579 40.9282 15.2302C41.0201 15.0026 41.0653 14.7588 41.0609 14.5133C41.0566 14.2679 41.0029 14.0258 40.903 13.8015C40.803 13.5773 40.659 13.3755 40.4794 13.2081L28.2919 1.0206C27.9491 0.678255 27.4845 0.485962 27 0.485962C26.5155 0.485962 26.0509 0.678255 25.7081 1.0206L13.5206 13.2081C13.341 13.3755 13.197 13.5773 13.097 13.8015C12.9971 14.0258 12.9434 14.2679 12.9391 14.5133C12.9347 14.7588 12.9799 15.0026 13.0718 15.2302C13.1638 15.4579 13.3006 15.6647 13.4742 15.8383C13.6478 16.0119 13.8546 16.1487 14.0822 16.2407C14.3099 16.3326 14.5537 16.3778 14.7991 16.3734C15.0446 16.3691 15.2867 16.3154 15.5109 16.2154C15.7352 16.1155 15.937 15.9715 16.1044 15.7919Z"
                    fill="#999999"
                  />
                </svg>
              )}
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="max-md:mt-[8px]">
            <label htmlFor="Menu" className="max-md:text-[12.5px] text-nowrap">
              Nama Menu <span className="md:hidden">:</span>
            </label>
            <input
              type="text"
              name="nama_hidangan"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full mt-[5px] md:mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[38px] md:h-[50px] focus:outline-none"
            />
          </div>

          <div className="max-md:mt-[8px]">
            <label htmlFor="Harga" className="max-md:text-[12.5px] text-nowrap">
              Harga Jual
            </label>
            <input
              type="number"
              name="harga"
              min={1}
              required
              value={hargaBeli}
              onChange={(e) => setHargaBeli(e.target.value)}
              className="appearance-none w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] max-md:h-[38px] h-[50px] focus:outline-none"
            />
          </div>

          <div className="max-md:mt-[8px]">
            <div className="mb-3">
              <label className="max-md:text-[12.5px] text-nowrap">Bahan</label>
              <BahanDropdown
                bahanList={bahanList}
                addBahan={addBahan}
                onDropdownClick={scrollToBottom}
              />
            </div>
            <div className="overflow-y-auto max-h-48">
              {selectedBahan.map((b, idx) => (
                <div
                  key={b.bahan_id || b.id}
                  className="flex items-center justify-between p-2 mt-1 bg-white border border-gray-300 rounded-lg shadow-sm"
                >
                  <span className="font-medium text-gray-800">
                    {b.nama || b.nama_bahan}
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={b.jumlah}
                      onChange={(e) => handleJumlahChange(idx, e.target.value)}
                      className="w-20 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBahan(idx)}
                      className="px-3 py-1 text-sm text-white transition bg-red-500 rounded cursor-pointer hover:bg-red-600 active:bg-red-700"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="self-end w-[111px] h-[31px] bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501] text-white text-[15px] rounded-[5px] cursor-pointer leading-[31px]"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

export default TambahMenu;
