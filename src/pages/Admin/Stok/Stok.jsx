import React, { useEffect, useMemo, useState } from "react";
import Pencil from "../../../assets/Admin/pencil.svg";
import Sampah from "../../../assets/Admin/sampah.svg";
import PlusGreen from "../../../assets/Admin/plusGreen.svg";
import MinRed from "../../../assets/Admin/minRed.svg";
import Plus from "../../../assets/Admin/plus.svg";
import TambahProduk from "./Overlay/TambahProduk";
import EditProduk from "./Overlay/EditProduk";
import "./Stok.css";
import ConfirmDelete from "../../../components/Admin/ConfirmDelete";
import TambahKategori from "./Overlay/TambahKategori";
import TambahPengeluaran from "./Overlay/TambahPengeluaran";

function Stok() {
  const [stockTable, setStockTable] = useState([
    { id: "IDX26521", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26522", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26523", produk: "Drink", stok: 50, kategori: "minuman" },
    { id: "IDX26524", produk: "Dronk", stok: 50, kategori: "minuman" },
    { id: "IDX26525", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26526", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26527", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26528", produk: "Keju", stok: 0, kategori: "topping" },
    { id: "IDX26529", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26534", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26544", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26554", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26564", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26575", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26584", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26534", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26544", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26554", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26564", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26575", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26584", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26534", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26544", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26554", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26564", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26575", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26584", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26594", produk: "Mie", stok: 50, kategori: "makanan" },
    { id: "IDX26504", produk: "Mie", stok: 50, kategori: "makanan" },
  ]);
  const stockData = useMemo(() => {
    const grouped = stockTable.reduce((acc, item) => {
      if (!acc[item.kategori]) {
        acc[item.kategori] = 0;
      }
      acc[item.kategori] += item.stok;
      return acc;
    }, {});

    // ubah jadi array biar gampang di-map
    return Object.entries(grouped).map(([nama, stok]) => ({
      nama,
      stok,
    }));
  }, [stockTable]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAddKategori, setIsAddKategori] = useState(false);
  const [isAddPengeluaran, setIsAddPengeluaran] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [skipConfirm, setSkipConfirm] = useState(false);
  const filteredData = useMemo(() => {
    return stockTable.filter((t) => {
      const selectedCategory = category?.toLowerCase();
      const keyword = search?.toLowerCase();

      // Filter kategori
      const matchCategory =
        !category || category === "all"
          ? true
          : t.kategori.toLowerCase().includes(selectedCategory);

      // Filter search
      const matchSearch =
        !keyword ||
        t.id.toLowerCase().includes(keyword) ||
        t.produk.toLowerCase().includes(keyword) ||
        t.stok.toString().includes(keyword);

      // Hasil akhir: dua-duanya harus true
      return matchCategory && matchSearch;
    });
  }, [search, stockTable, category]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );
  // input pake id (id dari stokTable)
  // +
  const handleIncrement = (idIndex) => {
    setStockTable((prevData) =>
      prevData.map((item) =>
        item.id === idIndex
          ? {
              id: item.id,
              produk: item.produk,
              stok: item.stok + 1,
              kategori: item.kategori,
            }
          : item
      )
    );
  };
  // -
  const handleDecrement = (idIndex) => {
    setStockTable((prevData) =>
      prevData.map((item) =>
        item.id === idIndex && item.stok > 1
          ? {
              id: item.id,
              produk: item.produk,
              stok: item.stok - 1,
              kategori: item.kategori,
            }
          : item
      )
    );
  };
  // input jumlah manual
  const handleInputChange = (idIndex, value) => {
    const newValue = parseInt(value) || 1; // Default ke 1 jika input tidak valid
    setStockTable((prevData) =>
      prevData.map((item) =>
        item.id === idIndex
          ? {
              id: item.id,
              produk: item.produk,
              stok: newValue,
              kategori: item.kategori,
            }
          : item
      )
    );
  };

  //btn delete
  const onDelete = (idIndex) => {
    if (skipConfirm) {
      setStockTable((prevData) =>
        prevData.filter((item) => item.id !== idIndex)
      );
    } else {
      setDeleteId(idIndex);
    }
  };

  //pagination
  const pages = useMemo(() => {
    const pageList = [];
    const delta = 1; // Ubah nilai ini untuk menyesuaikan jumlah halaman yang ditampilkan di sekitar currentPage (2 kiri + 2 kanan + current = 5 angka)
    if (totalPages <= 1) {
      if (totalPages === 1) pageList.push(1);
      return pageList;
    }
    // Selalu tambahkan halaman pertama
    pageList.push(1);
    // Hitung rentang halaman di sekitar currentPage
    let start = Math.max(2, currentPage - delta);
    let end = Math.min(totalPages - 1, currentPage + delta);
    // Jika di awal, tampilkan lebih banyak ke kanan jika memungkinkan
    if (currentPage <= delta + 1) {
      start = 2;
      end = Math.min(totalPages - 1, delta * 2 + 1);
    }
    // Jika di akhir, tampilkan lebih banyak ke kiri
    if (currentPage >= totalPages - delta) {
      end = totalPages - 1;
      start = Math.max(2, totalPages - (delta * 2 + 1) + 1);
    }
    // Tambahkan ellipsis jika start > 2
    if (start > 2) {
      pageList.push("...");
    }
    // Tambahkan halaman dari start ke end
    for (let i = start; i <= end; i++) {
      pageList.push(i);
    }
    // Tambahkan ellipsis jika end < totalPages - 1
    if (end < totalPages - 1) {
      pageList.push("...");
    }
    // Selalu tambahkan halaman terakhir
    pageList.push(totalPages);

    return pageList;
  }, [currentPage, totalPages]);

  useEffect(() => {
    currentPage >= totalPages && setCurrentPage(totalPages);
    currentPage == 0 && totalPages > 0 && setCurrentPage(totalPages);
  }, [currentPage, totalPages]);
  console.log(currentPage);
  console.log(totalPages);
  return (
    <div className="bg-[#EDF0F2] min-h-[calc(100vh-92px)] w-full px-[0.75rem] pt-[13px] pb-[0.5rem] overflow-y-clip">
      <div className="flex items-center gap-[16px] justify-end pb-[13px]">
        <button
          onClick={() => setIsAddOpen(true)}
          className="pl-[11px] pr-[14px] bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] h-[43px] rounded-[10px] flex gap-[7.94px] items-center justify-center cursor-pointer"
        >
          <img src={Plus} alt="plus" />
          <p className="text-[14px] font-bold text-white">Tambah Produk</p>
        </button>
        <button
          onClick={() => setIsAddKategori(true)}
          className="pl-[11px] pr-[14px] bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] h-[43px] rounded-[10px] flex gap-[7.94px] items-center justify-center cursor-pointer"
        >
          <img src={Plus} alt="plus" />
          <p className="text-[14px] font-bold text-white">Tambah Kategori</p>
        </button>
        <button
          onClick={() => setIsAddPengeluaran(true)}
          className="pl-[11px] pr-[14px] bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] h-[43px] rounded-[10px] flex gap-[7.94px] items-center justify-center cursor-pointer"
        >
          <svg
            width="11"
            height="19"
            viewBox="0 0 11 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.63555 18.25V16.1C3.75221 15.9 2.98988 15.5167 2.34855 14.95C1.70721 14.3833 1.23621 13.5833 0.935547 12.55L2.78555 11.8C3.03555 12.6 3.40655 13.2083 3.89855 13.625C4.39055 14.0417 5.03621 14.25 5.83555 14.25C6.51888 14.25 7.09821 14.096 7.57355 13.788C8.04888 13.48 8.28621 13.0007 8.28555 12.35C8.28555 11.7667 8.10221 11.3043 7.73555 10.963C7.36888 10.6217 6.51888 10.234 5.18555 9.8C3.75221 9.35 2.76888 8.81267 2.23555 8.188C1.70221 7.56333 1.43555 6.80067 1.43555 5.9C1.43555 4.81667 1.78555 3.975 2.48555 3.375C3.18555 2.775 3.90221 2.43333 4.63555 2.35V0.25H6.63555V2.35C7.46888 2.48333 8.15655 2.78767 8.69855 3.263C9.24055 3.73833 9.63621 4.31733 9.88555 5L8.03555 5.8C7.83555 5.26667 7.55221 4.86667 7.18555 4.6C6.81888 4.33333 6.31888 4.2 5.68555 4.2C4.95221 4.2 4.39388 4.36267 4.01055 4.688C3.62721 5.01333 3.43555 5.41733 3.43555 5.9C3.43555 6.45 3.68555 6.88333 4.18555 7.2C4.68555 7.51667 5.55221 7.85 6.78555 8.2C7.93555 8.53333 8.80655 9.06267 9.39855 9.788C9.99055 10.5133 10.2862 11.3507 10.2855 12.3C10.2855 13.4833 9.93555 14.3833 9.23555 15C8.53555 15.6167 7.66888 16 6.63555 16.15V18.25H4.63555Z"
              fill="white"
            />
          </svg>
          <p className="text-[14px] font-bold text-white">Tambah Pengeluaran</p>
        </button>
      </div>
      <div className="min-h-[32.0625rem] pt-[29px] w-full bg-white shadow-[0px_2px_6px_rgba(156,156,156,0.25)] rounded-[5px] pb-[1rem] px-[1rem]">
        <div className="flex gap-[0.9375rem] w-full">
          <div className="flex-1 space-y-[0.9375rem]">
            {/* search & filter */}
            <div className="flex items-center justify-between h-[1.9375rem]">
              <div className="flex items-center">
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    const newEntriesPerPage = Number(e.target.value);
                    const newTotalPages = Math.ceil(
                      filteredData.length / newEntriesPerPage
                    );
                    const newStartIndex = (currentPage - 1) * newEntriesPerPage;
                    // If the current startIndex exceeds the total data length, reset to the last valid page
                    if (newStartIndex >= filteredData.length) {
                      setCurrentPage(newTotalPages || 1); // Ensure at least page 1 if no data
                    }
                    setEntriesPerPage(newEntriesPerPage);
                  }}
                  className="border border-gray-300 bg-[#F4F4F4] rounded-[2px] pl-2 h-[32px] cursor-pointer"
                >
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={10}>10</option>
                </select>
                <p className="ml-2 text-sm">Entries per page</p>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-gray-300 bg-[#F4F4F4] rounded-[2px] pl-3 pr-5 ml-[28px] h-[32px] cursor-pointer"
                >
                  <option value="all">All</option>
                  {stockData.map((item, idx) => (
                    <option key={idx} value={item.nama}>
                      {item.nama.slice(0, 1).toUpperCase() + item.nama.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mr-2 text-sm">Search:</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-[#959595] bg-[#F4F4F4] rounded-[2px] px-2 py-1 w-[170px] h-[31px]"
                />
              </div>
            </div>
            {/* data table */}
            <div className="w-full h-full">
              <table className="w-full font-semibold border-collapse border border-[#959595]">
                <thead className="top-0">
                  <tr className="bg-[#FFB300] h-[49px]">
                    <th className="border border-[#959595] text-center w-[18.30%]">
                      Id
                    </th>
                    <th className="border border-[#959595] text-center w-[32.42%]">
                      Produk
                    </th>
                    <th className="border border-[#959595] text-center w-[25.07%]">
                      Stok
                    </th>
                    <th className="border border-[#959595] text-center w-[24.15%]">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((t, ind) => (
                      <tr
                        key={ind}
                        className={`${
                          highlightedRow === t.id
                            ? "bg-[#AFCFFF]"
                            : "even:bg-[#DCDCDC]"
                        } transition-colors ease-initial duration-300 text-[14px] [&>td]:h-[34px]`}
                      >
                        <td className="border-r border-[#959595] pl-[10.5px]">
                          {t.id}
                        </td>
                        <td className="border-r border-[#959595] pl-[10.5px]">
                          {t.produk}
                        </td>
                        <td className="border-r border-[#959595]">
                          <div className="text-center flex justify-around items-center h-full">
                            <button
                              onClick={() => {
                                handleDecrement(t.id);
                              }}
                              className="group cursor-pointer h-full flex-1 flex justify-center items-center"
                            >
                              <img
                                src={MinRed}
                                alt=""
                                className="group-hover:scale-150 group-active:scale-125"
                              />
                            </button>
                            <input
                              type="text"
                              className="w-10 text-center"
                              value={t.stok}
                              onChange={(e) =>
                                handleInputChange(t.id, e.target.value)
                              }
                            />
                            <button
                              onClick={() => handleIncrement(t.id)}
                              className="group cursor-pointer h-full flex-1 flex justify-center items-center"
                            >
                              <img
                                src={PlusGreen}
                                alt=""
                                className="group-hover:scale-150 group-active:scale-125"
                              />
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center justify-center text-white text-[12px] font-semibold h-full gap-[4px] px-[6px] py-[6px]">
                            <button
                              onClick={() => setEditId(t.id)}
                              className="flex-1 flex items-center justify-center bg-[#3578DC] hover:bg-[#1C66D4] active:bg-[#1554B4] h-full rounded-[5px] gap-1 cursor-pointer"
                            >
                              <img src={Pencil} alt="" />
                              Edit
                            </button>
                            <button
                              onClick={() => onDelete(t.id)}
                              className="flex-1 flex items-center justify-center bg-[#DC3538] hover:bg-[#D22B2D] active:bg-[#B81C1F] h-full rounded-[5px] gap-1 cursor-pointer"
                            >
                              <img src={Sampah} alt="" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-3 text-gray-500 italic"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex items-center justify-between mt-5 text-sm">
                <p>
                  Page {currentPage} of {totalPages || 1} entries
                </p>
                <div className="flex items-center space-x-[18px]">
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
                  <div className="flex gap-[18px]">
                    {pages.map((n, index) =>
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
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`${
                      currentPage === totalPages
                        ? "cursor-default"
                        : "cursor-pointer"
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
          </div>
          <div className="w-[21.5rem] pt-[28px] pb-[24px] font-semibold h-fit rounded-[5px] shadow-[0px_2px_6px_rgba(0,0,0,0.25)]">
            <div className="space-y-[27.45px] px-[0.875rem]">
              {stockData.map((items, index) => (
                <div key={index}>
                  <div className="bg-[#FFB300] border border-[#959595] pl-[0.9375rem] pr-[1.25rem] w-full h-[2.75rem] flex items-center">
                    <h3>
                      {items.nama.slice(0, 1).toUpperCase() +
                        items.nama.slice(1)}
                    </h3>
                  </div>
                  <div className="bg-white border border-[#D9D9D9] w-full h-[2.8125rem] flex items-center justify-center">
                    <h4>{items.stok}</h4>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-[2.0938rem] w-full h-[2.5rem] mt-[0.875rem]">
              <div className="flex pl-[1.3125rem] pr-[2.0625rem] items-center text-[#FFB300] justify-between border-[0.5px] border-[#959595] h-[40px] bg-white">
                <h3 className="uppercase font-bold text-[0.875rem]">
                  Total Stok :
                </h3>
                <h4>
                  {stockData.reduce((total, item) => total + item.stok, 0)}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setIsAddOpen(false);
          setEditId(null);
          setDeleteId(null);
          setIsAddKategori(false);
        }}
        className={`${
          editId || isAddOpen || deleteId || isAddKategori || isAddPengeluaran ? "" : "hidden"
        } bg-black/50 fixed inset-0 h-full w-full`}
      ></div>
      {isAddOpen && (
        <TambahProduk
          isAddOpen={isAddOpen}
          setHighlightedRow={setHighlightedRow}
          setIsAddOpen={setIsAddOpen}
          setStockTable={setStockTable}
          stockData={stockData}
        />
      )}
      {editId !== null && (
        <EditProduk
          stockTable={stockTable}
          editId={editId}
          setHighlightedRow={setHighlightedRow}
          setEditId={setEditId}
          setStockTable={setStockTable}
        />
      )}
      {deleteId !== null && (
        <ConfirmDelete
          deleteId={deleteId}
          setDeleteId={setDeleteId}
          setData={setStockTable}
          setSkipConfirm={setSkipConfirm}
        />
      )}
      {isAddKategori && <TambahKategori setIsAddKategori={setIsAddKategori} />}
      {isAddPengeluaran && <TambahPengeluaran setIsAddPengeluaran={setIsAddPengeluaran}/>}
    </div>
  );
}
export default Stok;
