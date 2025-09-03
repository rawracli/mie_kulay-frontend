import React, { useEffect, useMemo, useState } from "react";
import Pencil from "../../../assets/Admin/pencil.svg";
import Sampah from "../../../assets/Admin/sampah.svg";
import PlusGreen from "../../../assets/Admin/plusGreen.svg";
import MinRed from "../../../assets/Admin/minRed.svg";
import Plus from "../../../assets/Admin/plus.svg";
import ConfirmDelete from "../../../components/Admin/ConfirmDelete";
function ManajemenAkun() {
  const [userData, setUserData] = useState([
    { id: "IDX00001", nama: "Bang Deer", email: "Deerking@gmail.com", password: "Deer10230", role: "Staf" },
    { id: "IDX00002", nama: "Bang Deer", email: "Deerking@gmail.com", password: "Deer10230", role: "Staf" },
    { id: "IDX00003", nama: "Bang Deer", email: "Deerking@gmail.com", password: "Deer10230", role: "Staf" },
    { id: "IDX00004", nama: "Bang Deer", email: "Deerking@gmail.com", password: "Deer10230", role: "Staf" },
    { id: "IDX00005", nama: "Bang Deer", email: "Deerking@gmail.com", password: "Deer10230", role: "Staf" },
    { id: "IDX00006", nama: "Bang Deer", email: "Deerking@gmail.com", password: "Deer10230", role: "Staf" },
  ]);
  const stockData = useMemo(() => {
    const grouped = userData.reduce((acc, item) => {
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
  }, [userData]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [skipConfirm, setSkipConfirm] = useState(false);
  const filteredData = useMemo(() => {
    return userData.filter((t) => {
      const keyword = search?.toLowerCase();

      // Filter search
      const matchSearch =
        !keyword ||
        t.id.toLowerCase().includes(keyword) ||
        t.nama.toLowerCase().includes(keyword) ||
        t.email.toString().includes(keyword) ||
        t.password.toString().includes(keyword) ||
        t.role.toString().includes(keyword);

      // Hasil akhir: dua-duanya harus true
      return matchSearch;
    });
  }, [search, userData]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  //btn delete
  const onDelete = (idIndex) => {
    if (skipConfirm) {
      setUserData((prevData) =>
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

  return (
    <div className="bg-[#EDF0F2] min-h-[calc(100vh-92px)] w-full px-[0.75rem] pb-[0.5rem]">
        <div className="flex items-center justify-end    py-[13px]">
          <button
            onClick={() => setIsAddOpen(true)}
            className="pl-[11px] pr-[14px] bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] h-[43px] rounded-[10px] flex gap-[7.94px] items-center justify-center cursor-pointer"
          >
            <img src={Plus} alt="plus" />
            <p className="text-[14px] font-bold text-white">Tambah Akun</p>
          </button>
        </div>
      <div className="pt-[38px] w-full bg-white shadow-[0px_2px_6px_rgba(156,156,156,0.25)] rounded-[5px] pb-[1rem] px-[1rem]">
        <div className="flex gap-[0.9375rem] w-full">
          <div className="flex-1 pb-[1.375rem] space-y-[0.9375rem]">
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
                    <th className="border border-[#959595] text-center w-[10.23%]">
                      Id
                    </th>
                    <th className="border border-[#959595] text-center w-[18.44%]">
                      Nama
                    </th>
                    <th className="border border-[#959595] text-center w-[21.48%]">
                      Email
                    </th>
                    <th className="border border-[#959595] text-center w-[22.29%]">
                      Password
                    </th>
                    <th className="border border-[#959595] text-center w-[11.55%]">
                      Role
                    </th>
                    <th className="border border-[#959595] text-center w-[16.01%]">
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
                          {t.nama}
                        </td>
                        <td className="border-r border-[#959595] pl-[10.5px]">
                          {t.email}
                        </td>
                        <td className="border-r border-[#959595] pl-[10.5px]">
                          {t.password}
                        </td>
                        <td className="border-r border-[#959595] flex items-center justify-center">
                          {t.role}
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
        </div>
      </div>
      <div
        onClick={() => {
          setIsAddOpen(false);
          setEditId(null);
          setDeleteId(null);
        }}
        className={`${
          editId || isAddOpen || deleteId ? "" : "hidden"
        } bg-black/50 fixed inset-0 h-full w-full`}
      ></div>
      {isAddOpen && (
        <TambahProduk
          isAddOpen={isAddOpen}
          setHighlightedRow={setHighlightedRow}
          setIsAddOpen={setIsAddOpen}
          setUserData={setUserData}
          stockData={stockData}
        />
      )}
      {editId !== null && (
        <EditProduk
          userData={userData}
          editId={editId}
          setHighlightedRow={setHighlightedRow}
          setEditId={setEditId}
          setUserData={setUserData}
        />
      )}
      {deleteId !== null && (
        <ConfirmDelete
          deleteId={deleteId}
          setDeleteId={setDeleteId}
          setData={setUserData}
          setSkipConfirm={setSkipConfirm}
        />
      )}
    </div>
  );
}
export default ManajemenAkun;
