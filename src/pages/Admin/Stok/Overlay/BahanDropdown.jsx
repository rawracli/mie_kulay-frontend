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
    <div className="max-md:absolute md:relative max-md:w-[200px] w-full" ref={dropdownRef}>
      <div
        onClick={() => {setOpen(!open)}}
        className="w-full max-md:h-[21px] mt-[7px] pl-[13px] flex items-center justify-between text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] cursor-pointer"
      >
        <span className="text-[12px] font-semibold">Pilih Bahan</span>
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`mr-4 ${open && "-rotate-180"} transition duration-200 max-md:h-2`}
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
        <div className="absolute left-0 z-50 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg top-full max-h-64">
          {/* Input nama + harga */}
          <div className="w-full p-2 space-y-2 border-b">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nama / Cari..."
                value={newNama}
                onChange={(e) => {
                  setNewNama(e.target.value);
                  setSearch(e.target.value); // jadi juga search bar
                }}
                className="px-2 placeholder:text-xs py-1 max-md:h-[21px] text-sm border rounded w-[85px] md:flex-1 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Harga"
                value={newHarga}
                onChange={(e) => setNewHarga(e.target.value)}
                className="w-[85px] placeholder:text-xs max-md:h-[21px] md:w-24 px-2 py-1 text-sm border rounded focus:outline-none"
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
          <div ref={listRef} className="overflow-y-auto max-h-30 md:max-h-40 divide-[#7E7E7E] divide-y-[0.5px]">
            {filtered.length > 0 ? (
              filtered.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    addBahan(b);
                    setOpen(false);
                  }}
                  className="px-3 py-1 text-sm cursor-pointer lg:py-2 hover:bg-gray-100"
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
