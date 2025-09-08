import React, { useState, useMemo, useEffect } from "react";

// Dummy data log aktivitas
const logsData = [
  { id: 1, user: "Staf 1", action: "Menambah pesanan [IDX1000009]", type: "Menambah", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 2, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 3, user: "Owner", action: "Menambah pengeluaran [IDX1000009]", type: "Membuat", detail: "Pengeluaran dicatat keuangan.", date: "2025-08-27T13:00:00" },
  { id: 4, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 5, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 6, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 7, user: "Owner", action: "Menambah pengeluaran [IDX1000009]", type: "Membuat", detail: "Pengeluaran dicatat keuangan.", date: "2025-08-27T13:00:00" },
  { id: 8, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 9, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 10, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 11, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 12, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 13, user: "Owner", action: "Menambah pengeluaran [IDX1000009]", type: "Membuat", detail: "Pengeluaran dicatat keuangan.", date: "2025-08-27T13:00:00" },
  { id: 14, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 15, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 16, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 17, user: "Owner", action: "Menambah pengeluaran [IDX1000009]", type: "Membuat", detail: "Pengeluaran dicatat keuangan.", date: "2025-08-27T13:00:00" },
  { id: 18, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 19, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 20, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 21, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 22, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 23, user: "Owner", action: "Menambah pengeluaran [IDX1000009]", type: "Membuat", detail: "Pengeluaran dicatat keuangan.", date: "2025-08-27T13:00:00" },
  { id: 24, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 25, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 26, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 27, user: "Owner", action: "Menambah pengeluaran [IDX1000009]", type: "Membuat", detail: "Pengeluaran dicatat keuangan.", date: "2025-08-27T13:00:00" },
  { id: 28, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 29, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 30, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 31, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 32, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 33, user: "Owner", action: "Menambah pengeluaran [IDX1000009]", type: "Membuat", detail: "Pengeluaran dicatat keuangan.", date: "2025-08-27T13:00:00" },
  { id: 34, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 35, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 36, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 37, user: "Owner", action: "Menambah pengeluaran [IDX1000009]", type: "Membuat", detail: "Pengeluaran dicatat keuangan.", date: "2025-08-27T13:00:00" },
  { id: 38, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 39, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 40, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 41, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 42, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 43, user: "Owner", action: "Menambah pengeluaran [IDX1000009]", type: "Membuat", detail: "Pengeluaran dicatat keuangan.", date: "2025-08-27T13:00:00" },
  { id: 44, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 45, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 46, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  { id: 47, user: "Owner", action: "Menambah pengeluaran [IDX1000009]", type: "Membuat", detail: "Pengeluaran dicatat keuangan.", date: "2025-08-27T13:00:00" },
  { id: 48, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 49, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 50, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Mie Pedas Manis 1 + Mie Pedas Gurih 1 + Bakso Sapi + Mojito Strawberry", date: "2025-08-27T13:00:00" },
  // ... data lainnya tetap
];

function LogAktivitas() {
  const [filterType, setFilterType] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [search, ] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [month, setMonth] = useState();

  // ✅ State modal
  const [selectedLog, setSelectedLog] = useState(null);
  // ✅ State highlight row terakhir
  const [highlightedRow, setHighlightedRow] = useState(null);

  // Filter + Search
  const filteredLogs = useMemo(() => {
    return logsData.filter((log) => {
      const matchType = filterType === "All" || log.type === filterType;
      const matchDate =
        !filterDate || log.date.startsWith(filterDate.split("T")[0]);
      const matchSearch =
        !search ||
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.detail.toLowerCase().includes(search.toLowerCase());
      return matchType && matchDate && matchSearch;
    });
  }, [filterType, filterDate, search]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(start, start + itemsPerPage);
  }, [filteredLogs, currentPage, itemsPerPage]);

  // Reset highlight otomatis setelah beberapa detik
  useEffect(() => {
    if (highlightedRow !== null) {
      const timer = setTimeout(() => {
        setHighlightedRow(null);
      }, 200); // 3 detik
      return () => clearTimeout(timer);
    }
  }, [highlightedRow]);

  // Close modal + tandai row
  const handleCloseModal = () => {
    if (selectedLog) {
      setHighlightedRow(selectedLog.id);
    }
    setSelectedLog(null);
  };

  // Generate halaman
  function getPages(totalPages, currentPage) {
    const delta = 2;
    const pages = [];
    const range = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          pages.push(l + 1);
        } else if (i - l !== 1) {
          pages.push("...");
        }
      }
      pages.push(i);
      l = i;
    }
    return pages;
  }

useEffect(() => {
  let date;

  if (filterDate === "") {
    date = new Date();
  } else {
    date = new Date(filterDate);
  }
  const formatted = date.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  setMonth(formatted);
}, [filterDate]);


  return (
    <div className="bg-gray-200 w-full min-h-full flex justify-center py-6">
      <div className="bg-white rounded-[10px] h-fit shadow-lg px-[18px] pt-[11px] pb-[38px] w-full mx-[9px]">
        <h2 className="text-[36px] font-semibold mb-4">{month}</h2>

        {/* Filter + Search */}
        <div className="flex justify-between items-center mb-4 gap-4">
          <label className="flex items-center gap-2">
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-gray-100 border border-gray-300 p-1 rounded-[2px] w-[47px] h-[32px]"
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>
            <span>Entries per page</span>
          </label>
          <div>
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gray-100 border border-gray-300 p-1 rounded-[5px] w-[164px] h-[35px] text font-semibold"
            >
              <option value="All">All</option>
              <option value="Membuat">Membuat</option>
              <option value="Mengubah">Mengubah</option>
              <option value="Menghapus">Menghapus</option>
              <option value="Menambah">Menambah</option>
            </select>
            
            <label className="text text-[18px] ml-[26px] font-semibold">Filter Logs by :</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gray-100 border border-gray-400 pl-5 pr-3 rounded-[2px] ml-[15px] w-[234px] h-[32px] "
            />
          </div>
        </div>


        {/* Tabel */}
        <div className="overflow-x-auto text font-semibold">
          <table className="w-full table-fixed border border-gray-400">
            <thead>
              <tr className="bg-[#FFB300] text-center h-[47px]">
                <th className="p-2 border border-gray-400 w-[17.77%]">User</th>
                <th className="p-2 border border-gray-400 w-[35.34%]">Aksi</th>
                <th className="p-2 border border-gray-400 w-[25.30%]">Aktivitas</th>
                <th className="p-2 border border-gray-400 w-[24.10%]">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.length > 0 ? (
                paginatedLogs.map((log) => (
                  <tr
                    key={log.id}
                    className={`h-[33px] transition ease-initial duration-300 ${
                      highlightedRow === log.id
                        ? "bg-[#AFCFFF]"
                        : "even:bg-gray-200"
                    }`}
                  >
                    <td className="border border-gray-400 text-center truncate">{log.user}</td>
                    <td className="p-1 border border-gray-400 text-sm truncate">{log.action}</td>
                    <td className="border border-gray-400 text-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-[12px] cursor-pointer h-[25px]"
                        onClick={() => setSelectedLog(log)}
                      >
                        Lihat Keterangan
                      </button>
                    </td>
                    <td className="border border-gray-400 text-center">
                      {new Date(log.date).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      <span className="text-blue-500 font-semibold">
                        {new Date(log.date).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-[33px]">
                  <td colSpan="4" className="text-center p-1 text-sm">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-5 text-sm">
          <p>
            Page {currentPage} of {totalPages || 1} entries
          </p>
          <div className="flex items-center space-x-[18px]">
            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`${currentPage === 1 ? "cursor-default" : "cursor-pointer"} text-yellow-300 py-1 rounded disabled:opacity-50`}
            >
              <svg
                width="11"
                height="14"
                viewBox="0 0 11 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.07608 14.0094L0.0429428 7.04744L8.00962 0.009545L10.0179 1.75003L4.0429 7.02845L10.0678 12.2499L8.07608 14.0094Z"
                  fill="black"
                />
              </svg>
            </button>

            {/* Halaman */}
            <div className="flex gap-[12px]">
              {getPages(totalPages, currentPage).map((n, index) =>
                n === "..." ? (
                  <span key={index} className="py-1">...</span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(n)}
                    className={`py-1 cursor-pointer ${n === currentPage ? "underline" : ""}`}
                  >
                    {n}
                  </button>
                )
              )}
            </div>

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`${currentPage === totalPages ? "cursor-default" : "cursor-pointer"} py-1 rounded disabled:opacity-50`}
            >
              <svg
                width="11"
                height="15"
                viewBox="0 0 11 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.00084 0.115846L10.1014 6.99927L2.20357 14.1144L0.178438 12.3935L6.10178 7.05719L0.0263892 1.89462L2.00084 0.115846Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>


        {/* Overlay Modal */}
        {selectedLog && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-[5px] w-[666px] h-[272px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#3578DC] relative text-2xl text-black flex justify-between items-center px-[31px] py-2 rounded-t-[5px] w-[666px] h-[103px]">
                <h3 className="font-bold">{selectedLog.user}</h3>
                <button
                  className="absolute top-[10px] right-[22px] hover:text-black cursor-pointer"
                  onClick={handleCloseModal}
                >
                  ✕
                </button>
              </div>
              <div className="p-[31px]">
                <p className="text-gray-800">{selectedLog.detail}</p>
                <p className="text-right text-black font-semibold mt-15 ">
                  {new Date(selectedLog.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}{" "}
                  {new Date(selectedLog.date).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogAktivitas;
