import React, { useEffect, useMemo, useState } from "react";
import Sampah from "../../../assets/Admin/sampah.svg";
import Plus from "../../../assets/Admin/plus.svg";
import ConfirmDelete from "../../../components/Admin/ConfirmDelete";
import TambahAkun from "./Overlay/TambahAkun";
import { getUsers, deleteUser } from "../../../controllers/AuthController.js";

function ManajemenAkun() {
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [skipConfirm, setSkipConfirm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUserData(users || []);
        setUserData(users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const filteredData = useMemo(() => {
    if (userData === null) return [];
    const keyword = search?.toLowerCase().trim();

    return userData.filter((t) => {
      const matchSearch =
        !keyword ||
        t.id.toString().toLowerCase().includes(keyword) ||
        t.name.toLowerCase().includes(keyword) ||
        t.email.toLowerCase().includes(keyword);

      return matchSearch;
    });
  }, [search, userData]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  // di ManajemenAkun.jsx
  const handleConfirmDelete = (id) => {
    deleteUser(id)
      .then(() => {
        setUserData((prev) => prev.filter((item) => item.id !== id));
        console.log("User berhasil dihapus");
      })
      .catch((err) => {
        console.error("Gagal hapus user:", err.message);
        alert("Gagal hapus user: " + err.message);
      });
  };

  //btn delete
  const onDelete = (id) => {
    if (skipConfirm) {
      handleConfirmDelete(id); // hapus langsung
    } else {
      setDeleteId(id); // tampilkan modal
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
    <div className="bg-[#EDF0F2] min-h-[calc(100vh-92px)] w-full px-[0.75rem] max-sm:px-0 pb-[0.5rem] max-sm:pb-0 max-sm:w-full">
      <div className="flex items-center justify-end py-[13px]">
        <button
          onClick={() => setIsAddOpen(true)}
          className="pl-[11px] pr-[14px] bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] h-[43px] max-sm:h-[30px] max-sm:w-[135px] max-sm:mr-[11px] rounded-[10px] flex gap-[7.94px] items-center justify-center cursor-pointer"
        >
          <img src={Plus} alt="plus" />
          <p className="text-[14px] max-sm:text-[12px] font-bold text-white">
            Tambah Akun
          </p>
        </button>
      </div>
      <div className="pt-[38px] w-full bg-white shadow-[0px_2px_6px_rgba(156,156,156,0.25)] rounded-[5px] max-sm:rounded-[0px] pb-[1rem] px-[1rem] max-sm:w-[394px] max-sm:h-[696px]">
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
                  className="border border-gray-300 bg-[#F4F4F4] rounded-[2px] pl-2 h-[32px] cursor-pointer max-sm:w-[38px] max-sm:h-[28px] max-sm:text-[14px]"
                >
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={10}>10</option>
                </select>
                <p className="ml-2 text-sm max-sm:hidden">Entries per page</p>
              </div>
              <div>
                <label className="mr-2 text-sm ">Search:</label>
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
            <div className="h-full overflow-x-auto">
              <div className="overflow-x-auto max-sm:w-[360px] ">
                <table className="w-full font-semibold border-collapse border border-[#959595] max-sm:min-w-[661px]">
                  <thead className="top-0">
                    <tr className="bg-[#FFB300] h-[49px]">
                      <th className="border border-[#959595] text-center w-[15.50%]">
                        Id
                      </th>
                      <th className="border border-[#959595] text-center w-[19.46%]">
                        Nama
                      </th>
                      <th className="border border-[#959595] text-center w-[26.65%]">
                        Email
                      </th>
                      <th className="border border-[#959595] text-center w-[13.58%] max-sm:w-[7%]">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData === null ? null : paginatedData.length > 0 ? (
                      paginatedData.map((t, ind) => (
                        <tr
                          key={ind}
                          className={`${
                            highlightedRow === t.id
                              ? "bg-[#AFCFFF]"
                              : "even:bg-gray-200"
                          } transition-colors duration-300 text-[14px] [&>td]:h-[34px]`}
                        >
                          <td className="border-r border-[#959595] pl-[10.5px]">
                            {t.id}
                          </td>
                          <td className="border-r border-[#959595] pl-[10.5px]">
                            {t.name}
                          </td>
                          <td className="border-r border-[#959595] pl-[10.5px]">
                            {t.email}
                          </td>
                          <td>
                            <div className="flex items-center justify-center text-white text-[12px] font-semibold h-full gap-[4px] px-[6px] py-[6px]">
                              <button
                                onClick={() => onDelete(t.id)}
                                className="flex-1 flex items-center justify-center bg-[#DC3538] hover:bg-[#D22B2D] active:bg-[#B81C1F] h-full rounded-[5px] gap-1 cursor-pointer"
                              >
                                <img src={Sampah} alt="" />
                                <p className="max-sm:hidden">Delete</p>
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
              </div>
              <div className="flex items-center justify-between mt-5 text-sm ">
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
          setDeleteId(null);
        }}
        className={`${isAddOpen || deleteId ? "" : "hidden"} ${
          deleteId && "bg-black/50"
        } fixed inset-0 h-full w-full`}
      ></div>
      <TambahAkun
        data={userData}
        setData={setUserData}
        isAddOpen={isAddOpen}
        setIsAddOpen={setIsAddOpen}
        setHighlightedRow={setHighlightedRow}
      />
      {deleteId !== null && (
        <ConfirmDelete
          deleteId={deleteId}
          setDeleteId={setDeleteId}
          setSkipConfirm={setSkipConfirm}
          onDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}
export default ManajemenAkun;
