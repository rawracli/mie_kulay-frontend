import React, { useState, useMemo, useEffect } from "react";
import { getAktivitas } from "../../../controllers/Aktivitas";
import { useMediaQuery } from "react-responsive";

function LogAktivitas() {

  //dummy data (field baru: category)
  const [logsData, setLogsData] = useState([
    {
      id: 1,
      user: "Rafli",
      action: "Membuat",
      category: "Akun",
      detail: "Menambahkan akun admin baru dengan nama 'Putri'.",
      date: "2025-09-20T10:15:00",
    },
    {
      id: 2,
      user: "Putri",
      action: "Mengubah",
      category: "Stok",
      detail: "Mengedit data stok barang 'Beras Premium'.",
      date: "2025-09-21T14:30:00",
    },
    {
      id: 3,
      user: "Admin",
      action: "Menghapus",
      category: "Pemesanan",
      detail: "Menghapus data transaksi pemesanan #INV-20250910.",
      date: "2025-09-22T09:45:00",
    },
    {
      id: 4,
      user: "Rafli",
      action: "Menambah",
      category: "Pengeluaran",
      detail: "Menambahkan pengeluaran baru kategori 'Listrik'.",
      date: "2025-09-23T08:20:00",
    },
    {
      id: 5,
      user: "Putri",
      action: "Membuat",
      category: "Pemesanan",
      detail: "Mendaftarkan pesanan pengguna staf gudang.",
      date: "2025-09-23T16:40:00",
    },
    {
      id: 6,
      user: "Admin",
      action: "Mengubah",
      category: "Role",
      detail: "Mengubah role pengguna 'Rafli' menjadi Super Admin.",
      date: "2025-09-24T11:10:00",
    },
  ]);
  const [filterType, setFilterType] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [search] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [month, setMonth] = useState();

  const [selectedLog, setSelectedLog] = useState(null);
  // State highlight row terakhir
  const [highlightedRow, setHighlightedRow] = useState(null);

  // data dropdown
  const dropdownAction = [...new Set(logsData.map(log => log.action))];
  const dropdownCategory = [...new Set(logsData.map(log => log.category))];

  // Filter + Search
  const filteredLogs = useMemo(() => {
    return logsData.filter((log) => {
      const matchType = filterType === "All" || log.action == filterType;
      const matchCategory = filterCategory === "All" || log.category == filterCategory;
      console.log(log.category, filterCategory, matchCategory);
      const matchDate =
        !filterDate || log.date.startsWith(filterDate.split("T")[0]);
      const matchSearch =
        !search ||
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.category.toLowerCase().includes(search.toLowerCase()) ||
        log.detail.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchType && matchDate && matchSearch;
    });
  }, [logsData, filterType, filterDate, search, filterCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(start, start + itemsPerPage);
  }, [filteredLogs, currentPage, itemsPerPage]);

  useEffect(() => {
    if (highlightedRow !== null) {
      const timer = setTimeout(() => {
        setHighlightedRow(null);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [highlightedRow]);

  // Reset highlight otomatis setelah beberapa detik
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAktivitas();

        const mapped = data.map((item) => ({
          id: item.id,
          user: item.user?.name || "Unknown",
          action: item.action || "-",
          detail: item.aktivitas ?? "Data ini tidak memerlukan aktivitas",
          date: item.created_at,
        }));

        setLogsData(mapped);
      } catch (error) {
        console.error("Gagal mengambil data aktivitas:", error);
      }
    };

    fetchLogs();
  }, []);

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

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const bulanMap = {
    Januari: "Janua",
    Februari: "Febru",
    Maret: "Maret",
    April: "April",
    Mei: "Mei",
    Juni: "Juni",
    Juli: "Juli",
    Agustus: "Agust",
    September: "Septe",
    Oktober: "Oktob",
    November: "Novem",
    Desember: "Desem",
  };

  useEffect(() => {
    let date;
    if (filterDate === "") {
      date = new Date();
    } else {
      date = new Date(filterDate);
    }
    const bulan = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
      date
    );
    const tahun = new Intl.DateTimeFormat("id-ID", { year: "numeric" }).format(
      date
    );

    let bulanFinal;
    if (isMobile) {
      bulanFinal = bulanMap[bulan] || bulan;
    } else {
      bulanFinal = bulan;
    }

    setMonth(`${bulanFinal} ${tahun}`);
  }, [filterDate, isMobile]);

  return (
    <div className="bg-gray-200 w-full min-h-full flex justify-center sm:py-[8px]">
      <div className="bg-white grid grid-rows-[auto_auto_1fr_auto] rounded-[10px] shadow-lg px-[18px] pt-[11px] pb-[38px] w-full sm:mx-[9px] max-sm:rounded-none sm:h-fit">
        <h2 className="text-[36px] font-semibold mb-4">{month}</h2>

        {/* Filter + Search */}
        <div className="flex justify-between items-center mb-[14px] gap-4">
          <label className="flex items-center gap-2">
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-gray-100 border border-gray-300 p-1 pl-[8px] rounded-[2px] w-[55px] h-[32px]" //w-[47px]
            >
              <option value={4} className="max-md:text-[14px]">
                4
              </option>
              <option value={8} className="max-md:text-[14px]">
                8
              </option>
              <option value={10} className="max-md:text-[14px]">
                10
              </option>
            </select>
            <span className="max-sm:hidden">Entries per page</span>
          </label>
          <div className="flex items-center">
            <div className="grid grid-cols-2 gap-1 w-full sm:w-[164px] xl:w-[220px]">
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-gray-100 border border-gray-300 p-1 rounded-l-[5px] rounded-r-none h-[35px] max-md:text-[14px] text-center"
              >
                <option value="All">All</option>
                {dropdownAction.map((val, idx)=>(
                <option key={idx} value={val}>{val}</option>))}
              </select>
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-gray-100 border border-gray-300 p-1 rounded-r-[5px] rounded-l-none h-[35px] max-md:text-[14px] text-center"
              >
                <option value="All">All</option>
                {dropdownCategory.map((val, idx)=>(
                <option key={idx} value={val}>{val}</option>))}
              </select>
            </div>

            <label className="max-lg:hidden text-[18px] ml-[21px] font-semibold">
              Filter Logs by :
            </label>

            <input
              type="date"
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gray-100 max-sm:text-[14px] border border-gray-400 pl-1 sm:pl-5 sm:pr-3 rounded-[2px] ml-[15px] w-[131px] sm:w-[220px] h-[35px]"
            />
          </div>
        </div>

        {/* Tabel - memakan sisa ruang pada mobile */}
        <div className="relative overflow-x-auto border border-gray-400 font-semibold max-sm:flex-1 max-sm:overflow-y-auto">
          <div
            className={`absolute inset-0 min-w-[640px] grid grid-cols-[16.7%_46.7%_14.1%] md:grid-cols-[17.36%_34.5%_24.67%] pointer-events-none ${
              paginatedLogs.length === 0 && "invisible"
            }`}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border-r border-[#959595]"></div>
            ))}
          </div>
          <table className="w-full table-fixed min-w-[640px]">
            <thead>
              <tr className="bg-[#FFB300] text-center h-[47px]">
                <th className="p-2 border border-gray-400 w-[17.77%]">User</th>
                <th className="p-2 border border-gray-400 w-[50%] md:w-[35.34%]">
                  Aktivitas
                </th>
                <th className="p-2 border border-gray-400 w-[15%] md:w-[25.30%]">
                  Aksi
                </th>
                <th className="p-2 border border-gray-400 w-[24.10%]">
                  Tanggal
                </th>
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
                    <td className="text-center truncate">{log.user}</td>
                    <td className="p-1 text-sm truncate pl-[24px]">
                      {log.action}
                    </td>
                    <td className="text-center">
                      <div className="flex justify-center items-center">
                        <button
                          className="bg-[#3578DC] text-white px-[13px] md:px-[6.5px] md:py-1 rounded hover:bg-blue-600 text-[12px] cursor-pointer h-[26px] md:h-[25px]"
                          onClick={() => setSelectedLog(log)}
                        >
                          <span className="max-md:hidden">
                            Lihat Keterangan
                          </span>
                          <svg
                            width="20"
                            height="15"
                            viewBox="0 0 22 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="md:hidden"
                          >
                            <path
                              d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
                              fill="#fff"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      {new Date(log.date).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      <span className="font-semibold text-blue-500">
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
                  <td colSpan="4" className="p-1 text-sm text-center">
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

            {/* Halaman */}
            <div className="flex gap-[12px]">
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

            {/* Next */}
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

        {/* Overlay Modal */}
        {selectedLog && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-[5px] w-[666px] h-[272px] max-sm:w-[90%] max-sm:mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#3578DC] relative text-2xl text-black flex justify-between items-center px-[31px] py-2 rounded-t-[5px] w-full h-[103px]">
                <h3 className="font-bold text-white">{selectedLog.user}</h3>
                <button
                  className="absolute top-[10px] right-[22px] hover:text-black cursor-pointer"
                  onClick={handleCloseModal}
                >
                  ✕
                </button>
              </div>
              <div className="p-[31px]">
                <p className="text-gray-800">{selectedLog.detail}</p>
                <p className="font-semibold text-right text-black mt-15 ">
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
