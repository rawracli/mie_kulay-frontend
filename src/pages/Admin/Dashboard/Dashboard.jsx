import { useState, useEffect } from "react";
import Icon from "../../../assets/Dashboard/icon.png";
import Close from "../../../assets/Dashboard/close.png";
import FavoriteMenuChart from "../../../utils/Dashboard/FavoriteMenu.jsx";
import MonthlyEarningsChart from "../../../utils/Dashboard/MonthlyEarningsChart.jsx";
import MonthlyExpensesChart from "../../../utils/Dashboard/MonthlyExpensesChart.jsx";
import MonthlyOrdersChart from "../../../utils/Dashboard/MonthlyOrdersChart.jsx";
import "./Dashboard.css";
import { getPemesanan } from "../../../controllers/Pemesanan.js";
import ProfitChart from "../../../utils/Dashboard/ProfitChart.jsx";
import { formatShort } from "../../../utils/priceFormat";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext.jsx";

function Dashboard() {
  const { user } = useAuth();

  // Helper: buat array halaman dengan titik-titik
  const getPages = (totalPages, currentPage) => {
    const delta = 2; // jumlah halaman sekitar current
    const range = [];
    const rangeWithDots = [];
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

  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPemesanan();
      const formattedData = data.map((p) => ({
        id: p.id,
        tanggal: new Date(p.created_at),
        total: p.total_pesanan || 0,
        metode: p.pembayaran,
        periode_tahunan: p.periode_tahunan, // <--- penting
        items:
          p.pesanan_detail?.map((d) => ({
            name: d.nama_hidangan || "-",
            qty: d.jumlah || 0,
            price: d.harga_satuan || 0,
          })) || [],
      }));

      console.log(data);
      setTransactionsData(formattedData);
    };

    fetchData();
  }, []);

  // State input (sementara)
  const [tanggalAwalInput, setTanggalAwalInput] = useState("");
  const [tanggalAkhirInput, setTanggalAkhirInput] = useState("");

  // State filter aktif
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [search, setSearch] = useState("");
  const [tahunInput, setTahunInput] = useState(""); // filter by tahun (untuk API nanti)
  const [tahunList, setTahunList] = useState([]);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/analisis-tahun-list`
        );
        // misal API mengembalikan: { years: [2022, 2023, 2024, 2025] }
        setTahunList(data.years);
      } catch (err) {
        console.error("Gagal fetch tahun:", err);
      }
    };
    fetchYears();
  }, []);

  const [cardSummary, setCardSummary] = useState([
    { title: "Total Orders", value: 0 },
    { title: "Profit", value: 0 },
    { title: "Pengeluaran", value: 0 },
  ]);

  useEffect(() => {
    const fetchAnalisis = async () => {
      if (!user.role === "Owner" || !user.role === "owner") return;
      try {
        const tahun = Number(tahunInput) || new Date().getFullYear();
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/analisis?tahun=${tahun}`
        );
        console.log("API data:", data); // <-- cek response API

        if (data.keuangan && data.keuangan.length > 0) {
          const latest = data.keuangan[0];
          console.log("Latest record:", latest); // <-- cek field yang dipakai
          setCardSummary([
            { title: "Total Orders", value: latest.order_average },
            { title: "Profit", value: latest.hasil_keuntungan },
            { title: "Pengeluaran", value: latest.total_pengeluaran },
          ]);
        } else {
          setCardSummary([
            { title: "Total Orders", value: 0 },
            { title: "Profit", value: 0 },
            { title: "Pengeluaran", value: 0 },
          ]);
        }
      } catch (err) {
        console.error("Gagal fetch analisis:", err);
      }
    };

    fetchAnalisis();
  }, [tahunInput, user]);

  // Pagination
  const [entriesPerPage, setEntriesPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  // Overlay detail
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Filter data (gabung tanggal, bulan, search)
  const filteredData = transactionsData.filter((item) => {
    const isDateInRange =
      (!tanggalAwal || item.tanggal >= new Date(tanggalAwal)) &&
      (!tanggalAkhir || item.tanggal <= new Date(tanggalAkhir));

    const isSearchMatch =
      !search ||
      item.id.toString().toLowerCase().includes(search.toLowerCase()) ||
      item.metode.toLowerCase().includes(search.toLowerCase()) ||
      item.total.toString().includes(search);

    const isTahunMatch =
      !tahunInput || item.periode_tahunan === Number(tahunInput); // <--- pakai periode_tahunan

    return isDateInRange && isSearchMatch && isTahunMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  return (
    <div className="bg-[#EDF0F2] w-full  min-h-[calc(100vh-92px)] flex flex-col items-center sm:pl-[11px] sm:pr-[20px]">
      
        {(user.role === "Owner" || user.role === "owner") && (

      <div className="w-full max-sm:px-[9px]">
        {/* Filter logs by tahun */}
        <div className="flex items-center justify-end my-[10px] self-end">
          <label className="mr-2 text-sm font-semibold">Filter tahun:</label>
          <div className="relative">
            {/* SVG di kiri */}
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 5.75C0.5 4.3355 0.5 3.629 0.9395 3.1895C1.379 2.75 2.0855 2.75 3.5 2.75H12.5C13.9145 2.75 14.621 2.75 15.0605 3.1895C15.5 3.629 15.5 4.3355 15.5 5.75C15.5 6.10325 15.5 6.28025 15.3905 6.3905C15.2802 6.5 15.1025 6.5 14.75 6.5H1.25C0.89675 6.5 0.71975 6.5 0.6095 6.3905C0.5 6.28025 0.5 6.1025 0.5 5.75ZM0.5 12.5C0.5 13.9145 0.5 14.621 0.9395 15.0605C1.379 15.5 2.0855 15.5 3.5 15.5H12.5C13.9145 15.5 14.621 15.5 15.0605 15.0605C15.5 14.621 15.5 13.9145 15.5 12.5V8.75C15.5 8.39675 15.5 8.21975 15.3905 8.1095C15.2802 8 15.1025 8 14.75 8H1.25C0.89675 8 0.71975 8 0.6095 8.1095C0.5 8.21975 0.5 8.3975 0.5 8.75V12.5Z"
                  fill="black"
                />
                <path
                  d="M4.25 1.25V3.5M11.75 1.25V3.5"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <select
              value={tahunInput}
              onChange={(e) => {
                setTahunInput(e.target.value);
              }}
              className="border border-[#959595] bg-[#F4F4F4] rounded-[2px] pl-8 pr-2 py-1 w-[100px] md:w-[170px] h-[31px]"
            >
              {tahunList.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Analytics Data */}
        <div className="flex rounded-[10px] h-full w-full  justify-center max-sm:flex-col max-sm:items-center max-sm:gap-2">
          {/* Information Priority */}
          <div className="flex flex-col w-full max-sm:justify-center">
            {/* Cards Summary */}
            <div className="grid grid-cols-3 gap-[12px] max-sm:flex max-sm:gap-[6px] w-full">
              <div className="bg-white col-span-1 h-[145px] rounded-[5px] flex flex-col shadow-lg max-sm:h-[138px] max-sm:w-full">
                <h1 className="text-[14px] font-semibold px-[13px] pb-[11px] pt-[6px] max-sm:text-[12px]">
                  Jumlah Pesanan Berdasarkan Tahun
                </h1>
                <hr className="text-gray-400 mx-auto w-[95%]" />
                <h5 className="my-auto text-center text-5xl font-semibold max-sm:text-[24px]">
                  {formatShort(cardSummary[0].value)}
                </h5>
              </div>
              <div className="bg-white col-span-1 h-[145px] rounded-[5px] flex flex-col shadow-lg max-sm:h-[138px] max-sm:w-full">
                <h1 className="text-[14px] font-semibold px-[13px] pb-[11px] pt-[6px] max-sm:text-[12px]">
                  Keuntungan Bedasarkan Tahun
                </h1>
                <hr className="text-gray-400 mx-auto w-[95%]" />
                <h5 className="my-auto text-center text-4xl font-semibold max-sm:text-[24px]">
                  {`Rp. ${formatShort(cardSummary[1].value)}`}
                </h5>
              </div>
              <div className="bg-white col-span-1 h-[145px] rounded-[5px] flex flex-col shadow-lg max-sm:h-[138px] max-sm:w-full">
                <h1 className="text-[14px] font-semibold px-[13px] pb-[11px] pt-[6px] max-sm:text-[12px]">
                  Pengeluaran Berdasarkan Tahun
                </h1>
                <hr className="text-gray-400 mx-auto w-[95%]" />
                <h5 className="my-auto text-center text-4xl font-semibold max-sm:text-[24px]">
                  {`Rp. ${formatShort(cardSummary[2].value)}`}
                </h5>
              </div>
            </div>

            {/* Favorite Menu & Monthly Orders saat mobile */}
            <div className="w-full lg:hidden mt-[9px] ">
              <div className="grid grid-cols-2 max-sm:gap-[6px] gap-[12px]">
                {/* Favorite Menu */}
                <div className="bg-white w-full h-[229px] rounded-[5px] flex items-center shadow-lg">
                  <div className="w-full mx-auto">
                    <FavoriteMenuChart />
                  </div>
                </div>

                {/* Monthly Orders */}
                <div className="bg-white w-full h-[229px] rounded-[5px] flex items-center shadow-lg">
                  <MonthlyOrdersChart />
                </div>
              </div>
            </div>

            {/* Monthly Earnings & Expenses */}
            <div className="flex flex-col w-full">
              <div className="bg-white mt-[9px] w-full h-[220px] rounded-[5px] shadow-lg max-sm:h-[329px]">
                <MonthlyEarningsChart />
              </div>
              <div className="bg-white mt-[9px] w-full h-[228px] rounded-[5px] shadow-lg max-sm:h-[329px]">
                <MonthlyExpensesChart />
              </div>
            </div>
          </div>

          {/* Chart kanan (desktop only) */}
          <div className="pl-[9px] w-[330px]  max-lg:hidden">
            <div className="bg-white w-full h-[258px] rounded-[5px] flex justify-center items-center shadow-lg">
              <div className="w-[400px] mx-auto">
                <FavoriteMenuChart />
              </div>
            </div>
            <div className="bg-white w-full h-[343px] mt-[9px] rounded-[5px] shadow-lg">
              <MonthlyOrdersChart />
            </div>
          </div>
        </div>
        <div className="bg-white mt-[9px] w-full h-[280px] lg:h-[373px] rounded-[7.57px] shadow-lg max-sm:h-[329px]">
          <ProfitChart />
        </div>
      </div>
        )}

      {/* Detail Pemesanan */}

      <div className="w-full flex justify-start">
        <h1 className=" text-3xl font-semibold text-right mt-5 px-1.5">
          Detail Pemesanan
        </h1>
      </div>
      <div className="flex flex-col bg-white rounded-[10px] max-sm:min-h-[calc(100vh-92px)] sm:h-fit shadow-lg pt-[54px] sm:pt-[37px] pb-[19px] px-6 w-full sm:mt-3 sm:mb-24">
        {/* Filter */}
        <div className="grid grid-cols-2 gap-[29px] mb-4">
          <div>
            <label className="block text-1xl font-medium mb-1 mt-[11px]">
              Tanggal Awal
            </label>
            <input
              type="date"
              value={tanggalAwalInput}
              onChange={(e) => setTanggalAwalInput(e.target.value)}
              className="w-full h-[35px] bg-gray-100 border border-gray-300 rounded-[2px] px-5 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-1xl font-medium mb-1 mt-[11px]">
              Tanggal Akhir
            </label>
            <input
              type="date"
              value={tanggalAkhirInput}
              onChange={(e) => setTanggalAkhirInput(e.target.value)}
              className="w-full h-[35px] bg-gray-100 border border-gray-300 rounded-[2px] px-5 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
        <button
          onClick={() => {
            setTanggalAwal(tanggalAwalInput);
            setTanggalAkhir(tanggalAkhirInput);
            setCurrentPage(1);
          }}
          className="w-full h-[42px] bg-[#FFB300] hover:bg-yellow-500 text-white font-semibold px-6 rounded-md mb-[20px] flex items-center justify-center gap-2 cursor-pointer"
        >
          <img src={Icon} alt="Filter" className="w-4 h-4" />
          <span>Filter</span>
        </button>

        {/* Search & entries per page */}
        <div className="flex items-center justify-between mb-[15px]">
          <div>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-gray-100 border border-gray-300 px-2 rounded-[2px] w-[46px] h-[32px] cursor-pointer"
            >
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={10}>10</option>
            </select>
            <span className="ml-2 text-sm max-sm:hidden">Entries per page</span>
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
        <div className="relative border grid border-[#959595] flex-1">
          {/* Container untuk scroll */}
          <div className="relative overflow-x-auto">
            <div className="w-full min-w-[650px]">
              {/* Tabel dengan min-width */}
              <table className="w-full border-collapse">
                <thead className="border border-[#959595] bg-[#FFB300] text-left h-[28px]">
                  <tr>
                    {[
                      "Tanggal",
                      "Id",
                      "Total Pembayaran",
                      "Metode Pembayaran",
                      "Aksi",
                    ].map((value, index) => (
                      <th
                        key={index}
                        className="text-center font-semibold py-[6px] text-nowrap border border-[#959595]"
                      >
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((t) => (
                      <tr key={t.id} className="even:bg-gray-200">
                        <td className="text-center h-[33px] border border-[#959595]">
                          {t.tanggal.toLocaleDateString("id-ID")}
                        </td>
                        <td className="text-center h-[33px] border border-[#959595]">
                          {t.id}
                        </td>
                        <td className="text-center h-[33px] border border-[#959595]">
                          Rp. {t.total.toLocaleString("id-ID")}
                        </td>
                        <td className="text-center h-[33px] border border-[#959595]">
                          {t.metode}
                        </td>
                        <td className="text-center h-[33px] border border-[#959595]">
                          <button
                            onClick={() => setSelectedTransaction(t)}
                            className="lg:bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-[12px] cursor-pointer h-[25px]"
                          >
                            <span className="max-lg:hidden">Lihat Detail</span>
                            <svg
                              className="lg:hidden"
                              width="22"
                              height="15"
                              viewBox="0 0 22 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
                                fill="#4386EA"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-3 text-gray-500 italic"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
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
                    className={`py-1 cursor-pointer ${
                      n === currentPage ? "underline" : ""
                    }`}
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

        {/* Overlay Detail */}
        {selectedTransaction && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={() => setSelectedTransaction(null)} // klik area luar = close
          >
            <div
              className="bg-white rounded-[5px] shadow-lg w-[347px] sm:w-[358px] h-[612px] cursor-default"
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
                  {selectedTransaction.tanggal.toLocaleDateString("id-ID")}
                </p>
                <p>
                  <span className="font-semibold">Id :</span>{" "}
                  {selectedTransaction.id}
                </p>

                <div className="my-[20px] border-t border-dashed w-[180px]" />

                {/* Daftar item */}
                {selectedTransaction.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-nowrap flex-wrap"
                  >
                    <span>
                      {item.name} x{item.qty}
                    </span>
                    <span>Rp {item.price.toLocaleString("id-ID")}</span>
                  </div>
                ))}

                <div className="my-[20px] border-t border-dashed w-[180px]" />

                <p className="flex justify-between text-nowrap flex-wrap font-semibold">
                  <span>Total Pembayaran :</span>
                  <span>
                    Rp {selectedTransaction.total.toLocaleString("id-ID")}
                  </span>
                </p>
                <p className="flex justify-between text-nowrap flex-wrap font-semibold">
                  <span className="font-semibold">Metode Pembayaran :</span>{" "}
                  <span>{selectedTransaction.metode}</span>
                </p>
                <div className="my-[50px] flex flex-col">
                  <div className="border-t border-dashed h-1" />
                  <div className="border-t border-dashed h-1" />
                </div>
                <p className="text-center text-[16px] text-gray-500 my-10">
                  @Mie Kulay
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
