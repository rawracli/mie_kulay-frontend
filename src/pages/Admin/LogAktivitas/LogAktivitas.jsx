import React, { useState, useMemo } from "react";

// Dummy data log aktivitas
const logsData = [
  { id: 1, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 2, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Pesanan berhasil diubah.", date: "2025-08-28T10:18:00" },
  { id: 3, user: "Owner", action: "Menambah pengeluaran [IDX1000009]", type: "Membuat", detail: "Pengeluaran dicatat keuangan.", date: "2025-08-27T13:00:00" },
  { id: 4, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  // 👉 tambahkan data lain biar bisa tes pagination
  { id: 5, user: "Owner", action: "Mengubah menu [ID#2]", type: "Mengubah", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 6, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 7, user: "Owner", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 8, user: "Staf 3", action: "Mengubah menu [ID#2]", type: "Mengubah", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 9, user: "Owner", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 10, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 11, user: "Staf 3", action: "Mengubah menu [ID#2]", type: "Mengubah", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 12, user: "Owner", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 13, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 14, user: "Staf 3", action: "Mengubah menu [ID#2]", type: "Mengubah", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 15, user: "Owner", action: "Mengubah menu [ID#2]", type: "Mengubah", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 16, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 17, user: "Owner", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
   { id: 1, user: "Staf 1", action: "Membuat pesanan [IDX1000009]", type: "Membuat", detail: "Pesanan baru berhasil dibuat.", date: "2025-08-28T10:20:00" },
  { id: 2, user: "Staf 2", action: "Mengubah pesanan [IDX1000009]", type: "Mengubah", detail: "Pesanan berhasil diubah.", date: "2025-08-28T10:18:00" },
  { id: 3, user: "Owner", action: "Menambah pengeluaran [IDX1000009]", type: "Membuat", detail: "Pengeluaran dicatat keuangan.", date: "2025-08-27T13:00:00" },
  { id: 4, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  // 👉 tambahkan data lain biar bisa tes pagination
  { id: 5, user: "Owner", action: "Mengubah menu [ID#2]", type: "Mengubah", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 6, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 7, user: "Owner", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 8, user: "Staf 3", action: "Mengubah menu [ID#2]", type: "Mengubah", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 9, user: "Owner", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 10, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 11, user: "Staf 3", action: "Mengubah menu [ID#2]", type: "Mengubah", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 12, user: "Owner", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 13, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 14, user: "Staf 3", action: "Mengubah menu [ID#2]", type: "Mengubah", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 15, user: "Owner", action: "Mengubah menu [ID#2]", type: "Mengubah", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 16, user: "Staf 3", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
  { id: 17, user: "Owner", action: "Menghapus menu [ID#2]", type: "Menghapus", detail: "Menu ID#2 dihapus dari daftar.", date: "2025-08-27T09:30:00" },
];

function LogAktivitas() {
  const [filterType, setFilterType] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Filter data
  const filteredLogs = useMemo(() => {
    return logsData.filter((log) => {
      const matchType = filterType === "All" || log.type === filterType;
      const matchDate =
        !filterDate || log.date.startsWith(filterDate.split("T")[0]);
      return matchType && matchDate;
    });
  }, [filterType, filterDate]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
        <div className="bg-gray-200 w-full min-h-full flex justify-center py-6">
      <div className="bg-white rounded-[10px] h-fit shadow-lg p-6 w-[1020px]">
        <h2 className="text-2xl font-bold mb-4">Agust 2025</h2>

        {/* Filter */}
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center gap-2">
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setPage(1); // reset ke page 1
              }}
              className="bg-gray-100 border border-gray-300 p-1 rounded-[2px] w-[47px] h-[32px]"
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>
            <span>Entries per page</span>
          </label>

          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setPage(1); // reset ke page 1
            }}
            className="bg-gray-100 border border-gray-300 p-1 rounded-[5px] w-[164px] h-[35px] ml-60 text font-semibold"
          >
            <option value="All">All</option>
            <option value="Membuat">Membuat</option>
            <option value="Mengubah">Mengubah</option>
            <option value="Menghapus">Menghapus</option>
          </select>
          
          <label className="text text-[18px] font-semibold">Filter logs by :</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => {
              setFilterDate(e.target.value);
              setPage(1); // reset ke page 1
            }}
            className="bg-gray-100 border border-gray-300 pl-5 pr-3 rounded-[2px] w-[234px] h-[32px] "
          />
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto text font-semibold">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-[#FFB300] text-center h-[47px]">
                <th className="p-2 border w-[180px]">User</th>
                <th className="p-2 border">Aksi</th>
                <th className="p-2 border">Aktivitas</th>
                <th className="p-2 border">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.length > 0 ? (
                paginatedLogs.map((log) => (
                  <tr key={log.id} className="odd:bg-gray-200 h-[33px]">
                    <td className="border text-center">{log.user}</td>
                    <td className="p-1 border text-sm">{log.action}</td>
                    <td className="border text-center ">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-[12px] cursor-pointer h-[25px]"
                        onClick={() => alert(log.detail)}
                      >
                        Lihat Keterangan
                      </button>
                    </td>

                    <td className="border text-center">
                      {new Date(log.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}{" "}
                      {new Date(log.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogAktivitas;
