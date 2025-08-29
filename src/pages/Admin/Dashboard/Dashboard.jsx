import React from "react";
function Dashboard() {
  return (
    <div className=" bg-gray-200 h-[calc(100vh-92px)] w-full flex  justify-center">
      <div className="bg-white rounded-[10px] shadow-lg p-6 w-[1027px] h-[478px] mt-[16px]">
        {/* Filter */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 mt-[11px] -translate-x-[4.6px]">Tanggal Awal</label>
            <input
              type="date"
              className="w-[475px] h-[35px] bg-gray-200 border border-gray-300 rounded-[2px] px-3 py-1 focus:outline-none focus:ring-20 focus:ring-yellow-400 -translate-x-[4.6px] "
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 mt-[11px] ml-[10px]">Tanggal Akhir</label>
            <input
              type="date"
              className="w-[475px] h-[35px] bg-gray-200 border border-gray-300 rounded-[2px] px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 translate-x-[10.5px] "
            />
          </div>
        </div>
        <button className="w-[987px] h-[42px] bg-[#FFBA00] hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded-md mb-6 -translate-x-[4.6px]">
          Filter
        </button>

        {/* Search & entries per page */}
        <div className="flex items-center justify-between mb-[20px] mt-[10px]">
          <div>
            <select className="border border-gray-300 rounded-[2px] px-2 py-1 w-[46px] h-[32]">
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
              <tr className="bg-gray-50 h-[33px]">
                <td className="border text-center h-[33px]">26/08/2025</td>
                <td className="border text-center h-[33px]">#1001</td>
                <td className="border text-center h-[33px]">Rp. 105,000</td>
                <td className="border text-center h-[33px]">E-Wallet</td>
                <td className="border text-center h-[33px]">
                  <span className="bg-green-500 text-white text-xs px-2 py-[1px] rounded">
                    Selesai
                  </span>
                </td>
                <td className="border px-2 h-[33px]">
                  <button className="justify items-center bg-blue-500 text-white px-2 py-[1px] rounded hover:bg-blue-600 text-xs  justify-center">
                    Lihat Detail
                  </button>
                </td>
              </tr>
              <tr className="h-[33px]">
                <td className="border text-center h-[33px]">26/08/2025</td>
                <td className="border text-center h-[33px]">#1002</td>
                <td className="border text-center h-[33px]">Rp. 105,000</td>
                <td className="border text-center h-[33px]">Cash</td>
                <td className="border text-center h-[33px]">
                  <span className="bg-red-500 text-white text-xs px-2 py-[1px] rounded">
                    Belum selesai
                  </span>
                </td>
                <td className="border px-2 h-[33px]">
                  <button className="justify items-center bg-blue-500 text-white px-2 py-[1px] rounded hover:bg-blue-600 text-xs">
                    Lihat Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <p>Page 1 of 10 entries</p>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 border rounded">&lt;</button>
            <button className="px-3 py-1 border rounded bg-[#FFBA00]">1</button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">3</button>
            <span>...</span>
            <button className="px-3 py-1 border rounded">10</button>
            <button className="px-2 py-1 border rounded">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
