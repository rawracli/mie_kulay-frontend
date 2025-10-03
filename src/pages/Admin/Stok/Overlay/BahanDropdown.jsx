import { useState, useRef, useEffect } from "react";

function BahanDropdown({ bahanList, addBahan, onDropdownClick, onNewBahan }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newNama, setNewNama] = useState("");
  const [newHarga, setNewHarga] = useState("");
  const [newOpsi, setNewOpsi] = useState("");
  const dropdownRef = useRef(null);

  const opsiList = [
    { id: 1, nama: "Bahan Mentah" },
    { id: 2, nama: "Bahan Baku" },
    { id: 3, nama: "Bahan Lengkap" },
  ];

  //! Gabungan bahanList & dummy (hapus)
  const combinedBahanList = bahanList && bahanList.length > 0 ? bahanList : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //! ubah combinedList jadi bahanList pas udah ada API
  const filtered = combinedBahanList.filter((b) =>
    b.nama_bahan.toLowerCase().includes(search.toLowerCase())
  );

  //! Tambahin category & opsi
  const handleAddCustom = () => {
    if (!newNama.trim() || !newHarga || !newOpsi) return;
    const newBahan = {
      id: Date.now(),
      nama_bahan: newNama,
      harga_beli: Number(newHarga),
      tipe: newOpsi.replace(/\s+/g, "_").toLowerCase(),
      isNew: true, // <-- properti biasa
    };

    addBahan(newBahan, { isNew: true });
    if (onNewBahan) onNewBahan(newBahan);

    setNewNama("");
    setNewHarga("");
    setSearch("");
    setOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => {
          setOpen(!open);
          onDropdownClick && onDropdownClick();
        }}
        className="w-full max-md:h-[38px] mt-[7px] pl-[13px] flex items-center justify-between text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] cursor-pointer"
      >
        <span className="text-[12px] font-semibold">Pilih Bahan</span>
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`mr-4 ${
            open && "-rotate-180"
          } transition duration-200 max-md:h-2`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 10L16 1.55229L14.5324 0L8 6.8998L1.46964 0L0 1.55229L8 10Z"
            fill="black"
          />
        </svg>
      </div>

      {open && (
        <div className="absolute left-0 z-50 w-full mt-1 overflow-y-auto bg-[#F5F5F5] border border-gray-300 rounded-md shadow-lg top-full max-h-64">
          {/* Input tambah bahan baru */}
          <div className="w-full p-2 space-y-2 border-b">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nama / Cari..."
                value={newNama}
                onChange={(e) => {
                  setNewNama(e.target.value);
                  setSearch(e.target.value);
                }}
                className="px-2 placeholder:text-xs py-1 max-md:h-[22.5px] text-xs sm:text-sm border rounded flex-1 w-full focus:outline-none"
              />
              <input
                type="number"
                placeholder="Harga bahan"
                value={newHarga}
                onChange={(e) => setNewHarga(e.target.value)}
                className="px-2 placeholder:text-xs py-1 max-md:h-[22.5px] text-xs sm:text-sm border rounded flex-1 w-full focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={newOpsi}
                onChange={(e) => setNewOpsi(e.target.value)}
                className="cursor-pointer px-2 sm:text-sm text-xs max-md:h-[22.5px] h-[29px] border rounded flex-1 w-full focus:outline-none"
              >
                <option value="">Pilih Opsi</option>
                {opsiList.map((opsi) => (
                  <option
                    key={opsi.id}
                    value={opsi.nama.replace(/\s+/g, "_").toLowerCase()}
                  >
                    {opsi.nama}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={handleAddCustom}
              className="w-full bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501] cursor-pointer text-white text-sm py-1 rounded"
            >
              Tambah Bahan
            </button>
          </div>

          {/* List bahan */}
          <div className="overflow-y-auto max-h-30 md:max-h-40 divide-[#7E7E7E] divide-y-[0.5px]">
            {filtered.length > 0 &&
              filtered.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    addBahan(b);
                    setOpen(false);
                  }}
                  className="px-3 py-1 flex flex-wrap justify-between text-sm cursor-pointer lg:py-2 hover:bg-gray-100"
                >
                  <h5>{b.nama_bahan}</h5>
                  <h5>
                    {b.harga ? `Rp${b.harga.toLocaleString("id-ID")}` : ""}
                  </h5>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BahanDropdown;
