import React, { useState } from "react";
import Icon from "../../../assets/Dashboard/icon.png";
import Close from "../../../assets/Dashboard/close.png";

function Dashboard() {
  // Helper: buat array halaman dengan titik-titik
const getPages = (totalPages, currentPage) => {
  const delta = 2; // jumlah halaman sekitar current
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

  // Dummy data transaksi
  const transactionsData = [
    {
      id: "#0001", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0002", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0003", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0004", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0005", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0006", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0007", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0008", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0009", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0010", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0011", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0012", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0013", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0014", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },{
      id: "#0015", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0001", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0002", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0003", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0004", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0005", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0006", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0007", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0008", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0009", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0010", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0011", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0012", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0013", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0014", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },{
      id: "#0015", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0001", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0002", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0003", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0004", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0005", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0006", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0007", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0008", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0009", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0010", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0011", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0012", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0013", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    {
      id: "#0014", tanggal: "26/08/2025", total: 105000, metode: "e-Walet", status: "Belum selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },{
      id: "#0015", tanggal: "26/08/2025", total: 105000, metode: "Tunai", status: "selesai",
      items: [
        { name: "Mie Kulay Pedas Gurih", qty: 5, price: 35000 },
        { name: "Sosis Sapi", qty: 5, price: 35000 },
        { name: "Ice Kopi", qty: 1, price: 35000 },
      ],
    },
    
  ];

  // State input (sementara)
  const [tanggalAwalInput, setTanggalAwalInput] = useState("");
  const [tanggalAkhirInput, setTanggalAkhirInput] = useState("");

  // State filter aktif
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [search, setSearch] = useState("");

  // Pagination
  const [entriesPerPage, setEntriesPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  // Overlay detail
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Fungsi parsing tanggal dd-MM-yyyy → Date
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
            </select>
            <span className="ml-2 text-sm">Entries per page</span>
          </div>
          <div>
            <label className="mr-2 text-sm">Search:</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-[2px] px-2 py-1 w-[159px] h-[31px]"
            />
          </div>
        </div>

        {/* Table */}
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
                            ? "bg-[#44962D] text-white text-[14px]"
                            : "bg-red-500 text-white text-[14px]"
                        } text-[14px] px-3 py-[2px] rounded-2xl w-fit h-[26px]`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="border border-gray-600 text-center h-[33px]">
                      <button
                        onClick={() => setSelectedTransaction(t)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-[12px] cursor-pointer h-[25px]"
                      >
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
    Page {currentPage} of {totalPages || 1} entries
  </p>
  <div className="flex items-center space-x-[18px]">
    {/* Tombol prev */}
    <button
      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
      disabled={currentPage === 1}
      className={`${
        currentPage === 1 ? "cursor-default" : "cursor-pointer"
      } text-yellow-300 py-1 rounded disabled:opacity-50`}
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

    {/* Nomor halaman */}
    <div className="flex gap-[18px]">
      {getPages(totalPages, currentPage).map((n, index) =>
        n === "..." ? (
          <span key={index} className="py-1">
            ...
          </span>
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

    {/* Tombol next */}
    <button
      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
      disabled={currentPage === totalPages}
      className={`${
        currentPage === totalPages ? "cursor-default" : "cursor-pointer"
      } py-1 rounded disabled:opacity-50`}
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

        
      </div>

      {/* Overlay Detail */}
        {selectedTransaction && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={() => setSelectedTransaction(null)} // klik area luar = close
          >
            <div
              className="bg-white rounded-[5px] shadow-lg w-[358px] h-[612px] cursor-default"
              onClick={(e) => e.stopPropagation()} // cegah close kalau klik di dalam card
            >
              {/* Header */}
              <div className="relative bg-[#FFB300] text-center py-3 rounded-t-[5px]">
                <h2 className="text-lg font-bold text-black">
                  DETAIL PEMESANAN <br />
                  {selectedTransaction.id}
                </h2>

                {/* Tombol Tutup (icon X) */}
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="absolute top-2 right-3 hover:text-black cursor-pointer"
                >
                  <img
                    src={Close} // path icon X kamu
                    alt="Close"
                    className="w-5 h-5"
                  />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 text-1xl space-y-[10px]">
                <p>
                  <span className="font-semibold">Tanggal :</span>{" "}
                  {selectedTransaction.tanggal}
                </p>
                <p>
                  <span className="font-semibold">Id :</span> {selectedTransaction.id}
                </p>
                <p className="mb-5">
                  <span className="font-semibold">Status :</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-4xl text-white text-sm ${
                      selectedTransaction.status.toLowerCase() === "selesai"
                        ? "bg-[#44962D]"
                        : "bg-red-500"
                    }`}
                  >
                    {selectedTransaction.status}
                  </span>
                </p>

                <div className="my-[20px] border-t border-dashed w-[180px] "></div>

                {/* Daftar item */}
                {selectedTransaction.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {item.name} x{item.qty}
                    </span>
                    <span>Rp {item.price.toLocaleString("id-ID")}</span>
                  </div>
                ))}

                <div className="my-[20px] border-t border-dashed w-[180px] "></div>

                <p className="flex justify-between font-semibold">
                  <span>Total Pembayaran :</span>
                  <span>
                    Rp {selectedTransaction.total.toLocaleString("id-ID")}
                  </span>
                </p>
                <p className="flex justify-between font-semibold">
                  <span className="font-semibold">Metode Pembayaran :</span>{" "}
                  {selectedTransaction.metode}
                </p>
                <div className="my-[50px]">
                  <div className="border-t border-dashed"></div>
                  <div className="border-t border-dashed my-[2px]"></div>
                </div>
                <p className="text-center text-[16px] text-gray-500 my-10">
                  @Mie Kulay
                </p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Dashboard;
