import React, { useState, useMemo } from "react";
import Icon from "../../../assets/Dashboard/icon.png";

function Dashboard() {
  // Dummy data transaksi
  const transactionsData = [
    { id: "#1001", tanggal: "20-08-2025", total: 105000, metode: "E-Wallet", status: "Selesai" },
    { id: "#1002", tanggal: "21-08-2025", total: 105000, metode: "Cash", status: "Belum selesai" },
    { id: "#1003", tanggal: "22-08-2025", total: 50000, metode: "Transfer Bank", status: "Selesai" },
    { id: "#1004", tanggal: "23-08-2025", total: 75000, metode: "E-Wallet", status: "Belum selesai" },
    { id: "#1005", tanggal: "24-08-2025", total: 50000, metode: "Transfer Bank", status: "Selesai" },
    { id: "#1006", tanggal: "25-08-2025", total: 75000, metode: "E-Wallet", status: "Belum selesai" },
    { id: "#1007", tanggal: "20-08-2025", total: 105000, metode: "E-Wallet", status: "Selesai" },
    { id: "#1008", tanggal: "21-08-2025", total: 105000, metode: "Cash", status: "Belum selesai" },
    { id: "#1009", tanggal: "22-08-2025", total: 50000, metode: "Transfer Bank", status: "Selesai" },
    { id: "#1010", tanggal: "23-08-2025", total: 75000, metode: "E-Wallet", status: "Belum selesai" },
    { id: "#1011", tanggal: "24-08-2025", total: 50000, metode: "Transfer Bank", status: "Selesai" },
    { id: "#1012", tanggal: "25-08-2025", total: 75000, metode: "E-Wallet", status: "Belum selesai" },
    { id: "#1013", tanggal: "20-08-2025", total: 105000, metode: "E-Wallet", status: "Selesai" },
    { id: "#1014", tanggal: "21-08-2025", total: 105000, metode: "Cash", status: "Belum selesai" },
    { id: "#1015", tanggal: "22-08-2025", total: 50000, metode: "Transfer Bank", status: "Selesai" },
    { id: "#1016", tanggal: "23-08-2025", total: 75000, metode: "E-Wallet", status: "Belum selesai" },
    { id: "#1017", tanggal: "24-08-2025", total: 50000, metode: "Transfer Bank", status: "Selesai" },
    { id: "#1018", tanggal: "25-08-2025", total: 75000, metode: "E-Wallet", status: "Belum selesai" },
  ];

  // State input (sementara)
  const [tanggalAwalInput, setTanggalAwalInput] = useState("");
  const [tanggalAkhirInput, setTanggalAkhirInput] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // State filter aktif
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [search, setSearch] = useState("");

  // 🔹 Tambahkan state pagination
  const [entriesPerPage, setEntriesPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
// Fungsi bantu untuk parsing tanggal dd-MM-yyyy → Date object
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
};

// Filter data
const filteredData = transactionsData.filter((item) => {
  const itemDate = parseDate(item.tanggal);

  const isDateInRange =
    (!tanggalAwal || itemDate >= new Date(tanggalAwal)) &&
    (!tanggalAkhir || itemDate <= new Date(tanggalAkhir));

  const isSearchMatch =
    !search ||
    item.id.toLowerCase().includes(search.toLowerCase()) ||
    item.metode.toLowerCase().includes(search.toLowerCase()) ||
    item.status.toLowerCase().includes(search.toLowerCase()) ||
    item.total.toString().includes(search);

  return isDateInRange && isSearchMatch;
});


  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  return (
  <div className="bg-gray-200 w-full flex justify-center py-6">
  <div className="bg-white rounded-[10px] shadow-lg p-6 w-[1020px]">
        {/* Filter */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-1xl font-medium mb-1 mt-[11px] -translate-x-[4.6px]">
              Tanggal Awal
            </label>
            <input
              type="date"
              value={tanggalAwalInput}
              onChange={(e) => setTanggalAwalInput(e.target.value)}
              className="w-[475px] h-[35px] bg-gray-100 border border-gray-300 rounded-[2px] px-5 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 -translate-x-[4.6px]"
            />
          </div>
          <div>
            <label className="block text-1xl font-medium mb-1 mt-[11px] ml-[10px]">
              Tanggal Akhir
            </label>
            <input
              type="date"
              value={tanggalAkhirInput}
              onChange={(e) => setTanggalAkhirInput(e.target.value)}
              className="w-[475px] h-[35px] bg-gray-100 border border-gray-300 rounded-[2px] px-5 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 translate-x-[10.5px]"
            />
          </div>
        </div>
        <button
          onClick={() => {
            setTanggalAwal(tanggalAwalInput);
            setTanggalAkhir(tanggalAkhirInput);
            setSearch(searchInput);
            setCurrentPage(1);
          }}
          className="w-[987px] h-[42px] bg-[#FFB300] hover:bg-yellow-500 text-white font-semibold px-6 rounded-md mb-6 -translate-x-[4.6px] flex items-center justify-center gap-2 cursor-pointer"
        >
          <img src={Icon} alt="Filter" className="w-4 h-4" />
          <span>Filter</span>
        </button>


        {/* Search & entries per page */}
        <div className="flex items-center justify-between mb-[20px] mt-[10px]">
          <div>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-gray-100 border border-gray-300 rounded-[2px] w-[46px] h-[32px] cursor-pointer"
            >
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span className="ml-2 text-sm">Entries per page</span>
          </div>
          <div>
            <label className="mr-2 text-sm">Search:</label>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-[2px] px-2 py-1 w-[159px] h-[31px]"
            />
          </div>
        </div>

        {/* Table wrapper */}
<div className="-translate-x-[3.6px]">
  <table className="w-full border-collapse border border-gray-700">
    <thead className="bg-[#FFB300] text-left h-[28px]">
      <tr>
        <th className="border border-gray-600 text-center font-semibold py-[6px]">Tanggal</th>
        <th className="border border-gray-600 text-center font-semibold py-[6px]">Id</th>
        <th className="border border-gray-600 text-center font-semibold py-[6px]">Total Pembayaran</th>
        <th className="border border-gray-600 text-center font-semibold py-[6px]">Metode Pembayaran</th>
        <th className="border border-gray-600 text-center font-semibold py-[6px]">Status</th>
        <th className="border border-gray-600 text-center font-semibold py-[6px]">Aksi</th>
      </tr>
    </thead>
    <tbody>
      {paginatedData.length > 0 ? (
        paginatedData.map((t, ind) => (
          <tr
            key={ind}
            className={`text-[14px] ${
              t.status.toLowerCase() === "belum selesai" ? "bg-gray-200" : "bg-white"
            }`}
          >
            <td className="border border-gray-600 text-center h-[33px]">{t.tanggal}</td>
            <td className="border border-gray-600 text-center h-[33px]">{t.id}</td>
            <td className="border border-gray-600 text-center h-[33px]">
              Rp. {t.total.toLocaleString("id-ID")}
            </td>
            <td className="border border-gray-600 text-center h-[33px]">{t.metode}</td>
            <td className="border border-gray-600 text-center h-[33px]">
              <span
                className={`${
                  t.status.toLowerCase() === "selesai"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                } text-xs px-2 py-[1px] rounded`}
              >
                {t.status}
              </span>
            </td>
            <td className="border border-gray-600 text-center h-[33px]">
              <button className="bg-blue-500 text-white px-2 py-[1px] rounded hover:bg-blue-600 text-xs cursor-pointer">
                Lihat Detail
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="text-center py-3 text-gray-500 italic">
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
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded disabled:opacity-50 cursor-pointer"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`px-3 py-1 cursor-pointer ${
                  n === currentPage ? " text-black rounded" : ""
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded disabled:opacity-50 cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
