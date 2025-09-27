import { useState, useEffect } from "react";
import Icon from "../../../assets/Dashboard/icon.png";
import Close from "../../../assets/Dashboard/close.png";
import FavoriteMenuChart from "../../../utils/Dashboard/FavoriteMenu.jsx";
import MonthlyEarningsChart from "../../../utils/Dashboard/MonthlyEarningsChart.jsx";
import MonthlyExpensesChart from "../../../utils/Dashboard/MonthlyExpensesChart.jsx";
import MonthlyOrdersChart from "../../../utils/Dashboard/MonthlyOrdersChart.jsx";
import "./Dashboard.css";
import { getPemesanan } from "../../../controllers/Pemesanan.js";

function Dashboard() {
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
    // Dummy data transaksi
    const dummyData = [
      {
        id: "TRX-001",
        tanggal: new Date("2025-09-01"),
        total: 75000,
        metode: "Cash",
        items: [
          { name: "Nasi Goreng Spesial", qty: 1, price: 25000 },
          { name: "Es Teh Manis", qty: 2, price: 10000 },
          { name: "Ayam Bakar", qty: 1, price: 30000 },
        ],
      },
      {
        id: "TRX-002",
        tanggal: new Date("2025-09-02"),
        total: 50000,
        metode: "QRIS",
        items: [
          { name: "Mie Ayam Bakso", qty: 2, price: 20000 },
          { name: "Teh Botol", qty: 1, price: 10000 },
        ],
      },
      {
        id: "TRX-003",
        tanggal: new Date("2025-09-05"),
        total: 120000,
        metode: "Debit",
        items: [
          { name: "Sate Ayam", qty: 2, price: 50000 },
          { name: "Air Mineral", qty: 2, price: 10000 },
        ],
      },
      {
        id: "TRX-004",
        tanggal: new Date("2025-09-08"),
        total: 95000,
        metode: "Cash",
        items: [
          { name: "Ayam Geprek", qty: 2, price: 40000 },
          { name: "Es Jeruk", qty: 1, price: 15000 },
        ],
      },
      {
        id: "TRX-005",
        tanggal: new Date("2025-09-12"),
        total: 135000,
        metode: "QRIS",
        items: [
          { name: "Ikan Bakar", qty: 1, price: 70000 },
          { name: "Sop Buntut", qty: 1, price: 65000 },
        ],
      },
    ];

    setTransactionsData(dummyData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPemesanan();
      const formattedData = data.map((p) => ({
        id: p.id,
        tanggal: new Date(p.created_at),
        total: p.total_pesanan || 0,
        metode: p.pembayaran,
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
  const [bulanInput, setBulanInput] = useState(""); // <<< filter bulan

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

    const isMonthMatch =
      !bulanInput ||
      `${item.tanggal.getFullYear()}-${String(
        item.tanggal.getMonth() + 1
      ).padStart(2, "0")}` === bulanInput;

    const isSearchMatch =
      !search ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.metode.toLowerCase().includes(search.toLowerCase()) ||
      item.total.toString().includes(search);

    return isDateInRange && isMonthMatch && isSearchMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  return (
    <div className="bg-[#EDF0F2] w-full  min-h-[calc(100vh-92px)]  flex flex-col items-center sm:pl-[11px] sm:pr-[20px]">
      {/* Analytics Data */}
      <div className="flex rounded-[10px] h-full w-full mt-8 justify-center max-sm:flex-col max-sm:items-center max-sm:gap-2">
        {/* Information Priority */}
        <div className="flex flex-col w-full max-sm:justify-center">
          {/* Cards Summary */}
          <div className="grid grid-cols-3 gap-[9px] max-sm:flex max-sm:gap-[6px] max-sm:ml-[12px]">
            <div className="bg-white col-span-1 h-[145px] rounded-[5px] flex flex-col shadow-lg max-sm:h-[138px] max-sm:w-[155px]">
              <h1 className="text-[14px] font-semibold px-[13px] pb-[11px] pt-[6px] max-sm:text-[12px]">
                Total Orders
              </h1>
              <hr className="text-gray-400 mx-auto w-[95%]" />
              <h5 className="my-auto text-center text-5xl font-semibold max-sm:text-[24px]">
                500
              </h5>
            </div>
            <div className="bg-white col-span-1 h-[145px] rounded-[5px] flex flex-col shadow-lg max-sm:h-[138px] max-sm:w-[155px]">
              <h1 className="text-[14px] font-semibold px-[13px] pb-[11px] pt-[6px] max-sm:text-[12px]">
                Profit
              </h1>
              <hr className="text-gray-400 mx-auto w-[95%]" />
              <h5 className="my-auto text-center text-4xl font-semibold max-sm:text-[24px]">
                Rp. 10,5JT
              </h5>
            </div>
            <div className="bg-white col-span-1 h-[145px] rounded-[5px] flex flex-col shadow-lg max-sm:h-[138px] max-sm:w-[155px]">
              <h1 className="text-[14px] font-semibold px-[13px] pb-[11px] pt-[6px] max-sm:text-[12px]">
                Pengeluaran
              </h1>
              <hr className="text-gray-400 mx-auto w-[95%]" />
              <h5 className="my-auto text-center text-4xl font-semibold max-sm:text-[24px]">
                Rp. 100K
              </h5>
            </div>
          </div>

          {/* Favorite Menu & Monthly Orders saat mobile */}
          <div className="w-full lg:hidden mt-[9px] ">
            <div className="grid grid-cols-2 gap-[26px] max-sm:ml-[12px]">
              {/* Favorite Menu */}
              <div className="bg-white w-[250px] md:w-[380px] h-[229px] rounded-[5px] flex items-center shadow-lg">
                <div className="w-[400px] mx-auto">
                  <FavoriteMenuChart />
                </div>
              </div>

              {/* Monthly Orders */}
              <div className="bg-white w-[220px] md:w-[310px] h-[229px] rounded-[5px] flex items-center shadow-lg md:ml-[25px]">
                <MonthlyOrdersChart />
              </div>
            </div>
          </div>

          {/* Monthly Earnings & Expenses */}
          <div className="flex flex-col w-full max-sm:w-[440px] max-sm:mb-[31px] max-sm:ml-[12px]">
            <div className="bg-white mt-[9px] w-full h-[220px] rounded-[5px] shadow-lg max-sm:w-[475px] max-sm:h-[329px]">
              <MonthlyEarningsChart />
            </div>
            <div className="bg-white mt-[9px] w-full h-[228px] rounded-[5px] shadow-lg max-sm:w-[475px] max-sm:h-[329px]">
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

        {/* Filter Bulan */}
        <div className="flex items-center justify-start mb-[20px]">
          <label className="mr-2 text-sm font-semibold">Filter by Month:</label>
          <input
            type="month"
            value={bulanInput}
            onChange={(e) => {
              setBulanInput(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-[#959595] bg-[#F4F4F4] rounded-[2px] px-2 py-1 w-[170px] h-[31px]"
          />
        </div>

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
            <div className="w-full min-w-[550px]">
              {/* Grid lines - perlu disesuaikan dengan lebar tabel */}
              <div
                className={`absolute inset-0 w-full grid lg:grid-cols-[13%_11.9%_27.1%_31.1%] grid-cols-[14.30%_12.8%_29.4%_33.7%] pointer-events-none ${
                  transactionsData.length === 0 && "invisible"
                }`}
                style={{ minWidth: "550px" }} // Sesuaikan dengan min-width tabel
              >
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="border-r border-[#959595]"></div>
                ))}
              </div>
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
                        className="text-center font-semibold py-[6px] text-nowrap"
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
                        <td className="text-center h-[33px]">
                          {t.tanggal.toLocaleDateString("id-ID")}
                        </td>
                        <td className="text-center h-[33px]">{t.id}</td>
                        <td className="text-center h-[33px]">
                          Rp. {t.total.toLocaleString("id-ID")}
                        </td>
                        <td className="text-center h-[33px]">{t.metode}</td>
                        <td className="text-center h-[33px]">
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
