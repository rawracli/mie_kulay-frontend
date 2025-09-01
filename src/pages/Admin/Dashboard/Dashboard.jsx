import React, { useState, useMemo } from "react";

function Dashboard() {
  // Dummy data transaksi
  const transactionsData = [
    { id: "#1001", tanggal: "2025-08-26", total: 105000, metode: "E-Wallet", status: "Selesai", },
    { id: "#1002", tanggal: "2025-08-26", total: 105000, metode: "Cash", status: "Belum selesai" },
    { id: "#1003", tanggal: "2025-08-27", total: 50000, metode: "Transfer Bank", status: "Selesai" },
    { id: "#1004", tanggal: "2025-08-28", total: 75000, metode: "E-Wallet", status: "Belum selesai" },
    { id: "#2007", tanggal: "2007-11-29", total: 120000, metode: "Cash", status: "Belum Selesai"},
  ];

  // State
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data
  const filteredData = useMemo(() => {
    return transactionsData.filter((t) => {
      if (tanggalAwal && new Date(t.tanggal) < new Date(tanggalAwal)) return false;
      if (tanggalAkhir && new Date(t.tanggal) > new Date(tanggalAkhir)) return false;
      if (search) {
        const keyword = search.toLowerCase();
        return (
          t.id.toLowerCase().includes(keyword) ||
          t.metode.toLowerCase().includes(keyword) ||
          t.status.toLowerCase().includes(keyword)
        );
      }
      return true;
    });
  }, [tanggalAwal, tanggalAkhir, search]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className=" bg-gray-200 h-[calc(100vh-92px)] w-full flex  justify-center">
      <div className="bg-white rounded-[10px] shadow-lg p-6 w-[1027px] h-[478px] mt-[16px]">
        
        {/* Filter */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 mt-[11px] -translate-x-[4.6px]">Tanggal Awal</label>
            <input
              type="date"
              value={tanggalAwal}
              onChange={(e) => { setTanggalAwal(e.target.value); setCurrentPage(1); }}
              className="w-[475px] h-[35px] bg-gray-200 border border-gray-300 rounded-[2px] px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 -translate-x-[4.6px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 mt-[11px] ml-[10px]">Tanggal Akhir</label>
            <input
              type="date"
              value={tanggalAkhir}
              onChange={(e) => { setTanggalAkhir(e.target.value); setCurrentPage(1); }}
              className="w-[475px] h-[35px] bg-gray-200 border border-gray-300 rounded-[2px] px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 translate-x-[10.5px] "
            />
          </div>
        </div>
        <button 
          onClick={() => setCurrentPage(1)} 
          className="w-[987px] h-[42px] bg-[#FFBA00] hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded-md mb-6 -translate-x-[4.6px]">
          Filter
        </button>

        {/* Search & entries per page */}
        <div className="flex items-center justify-between mb-[20px] mt-[10px]">
          <div>
            <select
              value={entriesPerPage}
              onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="border border-gray-300 rounded-[2px] px-2 py-1 w-[46px] h-[32]"
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="ml-2 text-sm">Entries per page</span>
          </div>
          <div>
            <label className="mr-2 text-sm">Search:</label>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="border border-gray-300 rounded-[2px] px-2 py-1 w-[159px] h-[31px]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -translate-x-[4.6px] ">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-[#FFBA00] text-left h-[33px]">
                <th className="border text-center h-[46px]">Tanggal</th>
                <th className="border text-center h-[56px]">Id</th>
                <th className="border text-center h-[46px]">Total Pembayaran</th>
                <th className="border text-center h-[46px]">Metode Pembayaran</th>
                <th className="border text-center h-[46px]">Status</th>
                <th className="border text-center h-[46px]">Aksi</th>
              </tr>
            </thead>
            <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((t) => (
                <tr 
                  key={t.id} 
                  className={`h-[33px] ${t.status === "Belum selesai" ? "bg-gray-200" : ""}`}
                >
                  <td className="border text-center h-[33px]">{t.tanggal}</td>
                  <td className="border text-center h-[33px]">{t.id}</td>
                  <td className="border text-center h-[33px]">Rp. {t.total.toLocaleString("id-ID")}</td>
                  <td className="border text-center h-[33px]">{t.metode}</td>
                  <td className="border text-center h-[33px]">
                    <span className={`${t.status === "Selesai" ? "bg-green-500" : "bg-red-500"} text-white text-xs px-2 py-[1px] rounded`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="border px-2 h-[33px]">
                    <button className="justify items-center bg-blue-500 text-white px-2 py-[1px] rounded hover:bg-blue-600 text-xs justify-center">
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3 text-gray-500 italic">Tidak ada data</td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <p>Page {currentPage} of {totalPages || 1} entries</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`px-3 py-1  ${n === currentPage ? "bg-[#ffffff]" : ""}`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
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
