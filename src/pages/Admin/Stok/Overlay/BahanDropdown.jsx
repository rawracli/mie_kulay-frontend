import { useState, useRef, useEffect } from "react";

function BahanDropdown({ bahanList, addBahan }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newNama, setNewNama] = useState("");
  const [newHarga, setNewHarga] = useState("");
  const dropdownRef = useRef(null);
  const listRef = useRef(null); // ref untuk list scroll

  // tutup dropdown kalau klik luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // auto scroll ke bawah saat dropdown terbuka
  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open]);

  const filtered = bahanList.filter((b) =>
    b.nama_bahan.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCustom = () => {
    if (!newNama.trim() || !newHarga) return;
    addBahan({
      id: Date.now(),
      nama_bahan: newNama,
      harga: Number(newHarga),
    });
    setNewNama("");
    setNewHarga("");
    setSearch("");
    setOpen(false);
  };

  return (
    <div className="relative max-md:w-[200px] w-full max-md:pb-3" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className="w-full max-md:h-[21px] mt-[7px] pl-[13px] flex items-center justify-between text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] cursor-pointer"
      >
        <span className="text-[12px] font-semibold">Pilih Bahan</span>
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`mr-4 ${open && "-rotate-180"} transition duration-200`}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 10L16 1.55229L14.5324 0L8 6.8998L1.46964 0L0 1.55229L8 10Z"
            fill="black"
          />
        </svg>
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
          {/* Input nama + harga */}
          <div className="p-2 border-b space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nama / Cari..."
                value={newNama}
                onChange={(e) => {
                  setNewNama(e.target.value);
                  setSearch(e.target.value); // jadi juga search bar
                }}
                className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none"
              />
              <input
                type="number"
                placeholder="Harga"
                value={newHarga}
                onChange={(e) => setNewHarga(e.target.value)}
                className="w-24 px-2 py-1 text-sm border rounded focus:outline-none"
              />
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
          <div ref={listRef} className="max-h-40 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    addBahan(b);
                    setOpen(false);
                  }}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {b.nama_bahan} {b.harga ? `- Rp${b.harga}` : ""}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-400"></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BahanDropdown;
