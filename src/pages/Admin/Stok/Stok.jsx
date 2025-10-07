import React, { useEffect, useMemo, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Pencil from "../../../assets/Admin/pencil.svg";
import Sampah from "../../../assets/Admin/sampah.svg";
import PlusGreen from "../../../assets/Admin/plusGreen.svg";
import MinRed from "../../../assets/Admin/minRed.svg";
import Plus from "../../../assets/Admin/plus.svg";
//!Hapus exampleImage
import ExampleImage from "../../../assets/Login/login.png";
import EditProduk from "./Overlay/EditProduk";
import "./Stok.css";
import ConfirmDelete from "../../../components/Admin/ConfirmDelete";
import TambahKategori from "./Overlay/TambahKategori";
import { useMediaQuery } from "react-responsive";

import {
  getBahan,
  updateBahan,
  hapusBahan,
  tambahbahanMenu,
  tambahBahan,
  handlePivotDelete,
} from "../../../controllers/Bahan";
import { getMenu, updateMenu } from "../../../controllers/Menu";
import { getCategories } from "../../../controllers/Category";

function Stok() {
  // toggle bahan atau menu
  const [viewMode, setViewMode] = useState("bahan");
  const [stockTable, setStockTable] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [menuReloadTrigger, setMenuReloadTrigger] = useState(0);

  const [loading, setLoading] = useState(false);
  const stockData = useMemo(() => {
    const dataToUse = viewMode === "bahan" ? stockTable : menuData;

    // Hitung jumlah item per kategori/tipe
    const grouped = dataToUse.reduce((acc, item) => {
      const key =
        viewMode === "bahan" ? item.tipe || "-" : item.kategori || "-";

      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += 1; // jumlah item, bukan id
      return acc;
    }, {});

    return Object.entries(grouped).map(([nama, count]) => ({
      nama,
      count,
    }));
  }, [stockTable, menuData, viewMode]);

  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddKategori, setIsAddKategori] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [skipConfirm, setSkipConfirm] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isEditMenuBahanOpen, setIsEditMenuBahanOpen] = useState(false);
  // UKURAN TABLET
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  // State Edit Menu
  const [editMenuForm, setEditMenuForm] = useState({
    nama: "",
    kategori_id: "",
    harga: 0,
    bahan: [],
  });
  const [newBahan, setNewBahan] = useState({
    nama: "",
    harga: 0,
    opsi: "",
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data); // simpan semua kategori
      } catch (err) {
        console.error("Gagal mengambil kategori:", err.message);
      }
    };

    fetchCategories();
  }, []);

  // Init form saat menu yang dipilih berubah
  useEffect(() => {
    if (selectedMenu) {
      setEditMenuForm({
        nama: selectedMenu.nama || "",
        kategori_id: selectedMenu.kategori_id || "",
        harga: selectedMenu.harga || 0,
        bahan: selectedMenu.bahan || [],
      });
    }
  }, [selectedMenu]);

  const [filterValue, setFilterValue] = useState("all");
  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const dataToFilter = viewMode === "bahan" ? stockTable : menuData;

    return dataToFilter.filter((item) => {
      const matchesFilter =
        !filterValue || filterValue === "all"
          ? true
          : viewMode === "bahan"
          ? (item.tipe || "").toLowerCase() === filterValue.toLowerCase()
          : (item.kategori || "").toLowerCase() === filterValue.toLowerCase();

      const matchesSearch =
        !keyword ||
        (viewMode === "bahan"
          ? (item.produk || item.nama_bahan || "")
              .toLowerCase()
              .includes(keyword)
          : (item.nama || "").toLowerCase().includes(keyword));

      return matchesFilter && matchesSearch;
    });
  }, [stockTable, menuData, search, filterValue, viewMode]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  // Toggle function
  const handleToggleView = () => {
    setViewMode((prev) => (prev === "bahan" ? "menu" : "bahan"));
    setCurrentPage(1);
    setSearch("");
    setFilterValue("all"); // reset filter saat ganti view
  };

  // Handlers for bahan
  const handleUpdateStok = async (id, newHarga) => {
    // update state lokal langsung
    setStockTable((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, harga_beli: newHarga } : item
      )
    );

    try {
      const current = stockTable.find((item) => item.id === id);
      if (!current) return;

      // langsung kirim ke backend
      const updated = await updateBahan(id, {
        nama_bahan: current.nama_bahan,
        harga_beli: newHarga, // gunakan nilai baru langsung
        tipe: current.tipe,
      });

      console.log("Harga berhasil diupdate:", updated);
    } catch (err) {
      console.error("Gagal update harga:", err.message);
    }
  };

  const handleIncrement = (id) => {
    const current = stockTable.find((item) => item.id === id);
    if (!current) return;
    handleUpdateStok(id, current.harga_beli + 500);
  };

  const handleDecrement = (id) => {
    const current = stockTable.find((item) => item.id === id);
    const amount = 500;
    if (!current) return;
    if (current.harga_beli > 0) {
      if (current.harga_beli < amount) {
        handleUpdateStok(id, 0);
      } else {
        handleUpdateStok(id, current.harga_beli - 500);
      }
    }
  };

  const hapusBahanById = async (id) => {
    try {
      await hapusBahan(id); // hapus di server
      setStockTable((prev) => {
        const newData = prev.filter((item) => item.id !== id);
        localStorage.setItem("bahan", JSON.stringify(newData)); // update cache
        return newData;
      });
      console.log("Bahan berhasil dihapus");
    } catch (err) {
      console.error("Gagal hapus bahan:", err.message);
    }
  };

  // Fungsi yang dipanggil saat klik tombol delete di tabel
  const onDelete = async (idIndex) => {
    if (skipConfirm) {
      // jika sudah set skipConfirm, hapus langsung
      await hapusBahanById(idIndex);
    } else {
      // buka modal konfirmasi
      setDeleteId(idIndex);
    }
  };

  // Edit Menu
  const handleMenuFormChange = (field, value) => {
    setEditMenuForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBahanDelete = async (bahanId) => {
    if (!bahanId) return;

    try {
      await hapusBahan(bahanId);

      // Update state lokal agar UI langsung refleks
      setEditMenuForm((prev) => ({
        ...prev,
        bahan: prev.bahan.filter((b) => b.id !== bahanId),
      }));

      console.log("Bahan berhasil dihapus dari menu dan database");
    } catch (err) {
      console.error("Gagal hapus bahan:", err.message);
    }
  };

  const handleNewBahanChange = (field, value) => {
    setNewBahan((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddBahan = async () => {
    if (!newBahan.nama || !newBahan.harga) return;

    if (!selectedMenu) {
      console.error("Menu belum dipilih!");
      return;
    }

    const newItem = {
      nama_bahan: newBahan.nama,
      harga_beli: newBahan.harga,
      menu_id: selectedMenu.id,
      tipe: newBahan.opsi,
    };

    try {
      const addedBahan = await tambahBahan(newItem);

      // Sesuaikan dengan format UI
      const uiBahan = {
        id: addedBahan.id,
        nama: addedBahan.nama_bahan,
        harga: addedBahan.harga_beli,
      };

      setEditMenuForm((prev) => ({
        ...prev,
        bahan: [...prev.bahan, uiBahan],
      }));

      console.log("Bahan berhasil ditambahkan:", uiBahan);
      setNewBahan({ nama: "", harga: 0 });
    } catch (err) {
      console.error("Gagal menambahkan bahan:", err.message);
    }
  };

  const handleMenuSave = async () => {
    if (
      !selectedMenu ||
      !editMenuForm.nama ||
      !editMenuForm.kategori_id ||
      editMenuForm.harga <= 0
    ) {
      alert("Mohon lengkapi semua field");
      return;
    }

    try {
      const payload = {
        nama_hidangan: editMenuForm.nama,
        harga_jual: parseInt(editMenuForm.harga),
        kategori_id: parseInt(editMenuForm.kategori_id),
      };

      const updated = await updateMenu(selectedMenu.id, payload);
      setMenuReloadTrigger((prev) => prev + 1);

      setMenuData((prev) =>
        prev.map((menu) => (menu.id === selectedMenu.id ? updated : menu))
      );

      setSelectedMenu(null);
      setEditMenuForm({ nama: "", kategori_id: "", harga: 0, bahan: [] });
      alert("Menu berhasil diupdate!");
    } catch (err) {
      console.error("Gagal update menu:", err.message);
      alert("Terjadi kesalahan saat update menu");
    }
  };

  // Pagination pages calculation
  const pages = useMemo(() => {
    const pageList = [];
    const delta = 1;
    if (totalPages <= 1) {
      if (totalPages === 1) pageList.push(1);
      return pageList;
    }
    pageList.push(1);
    let start = Math.max(2, currentPage - delta);
    let end = Math.min(totalPages - 1, currentPage + delta);
    if (currentPage <= delta + 1) {
      start = 2;
      end = Math.min(totalPages - 1, delta * 2 + 1);
    }
    if (currentPage >= totalPages - delta) {
      end = totalPages - 1;
      start = Math.max(2, totalPages - (delta * 2 + 1) + 1);
    }
    if (start > 2) {
      pageList.push("...");
    }
    for (let i = start; i <= end; i++) {
      pageList.push(i);
    }
    if (end < totalPages - 1) {
      pageList.push("...");
    }
    pageList.push(totalPages);
    return pageList;
  }, [currentPage, totalPages]);

  useEffect(() => {
    const cached = localStorage.getItem("bahan");
    if (cached) {
      setStockTable(JSON.parse(cached));
      setLoading(false);
    }

    // Fetch bahan dari API
    const fetchBahan = async () => {
      try {
        const data = await getBahan();
        const mapped = data.map((item) => ({
          id: item.id,
          produk: item.nama_bahan,
          harga_beli: item.harga_beli,
          tipe: item.tipe,
        }));
        setStockTable(mapped);
        localStorage.setItem("bahan", JSON.stringify(mapped)); // update cache
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBahan();
  }, []);

  // Fetch menu dari API
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const data = await getMenu();

        const mapped = data.map((item) => ({
          id: item.id,
          nama: item.nama_hidangan,
          kategori_id: item.kategori?.id ?? null, // <=== tambahkan ini
          kategori: item.kategori?.jenis_hidangan ?? "-",
          harga: item.harga_jual,
          image: `${import.meta.env.VITE_API_URL_IMAGE}/storage/${item.gambar}`,
          bahan:
            item.bahan_mentahs?.map((b) => ({
              id: b.id,
              nama: b.nama_bahan,
              harga: b.harga_beli,
              jumlah: b.pivot?.jumlah,
            })) ?? "Maaf, menu ini belum memiliki bahan",
        }));

        setMenuData(mapped);
      } catch (err) {
        console.error("Error fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [menuReloadTrigger]);

  return (
    <div className="bg-[#EDF0F2] min-h-[calc(100vh-92px)] w-full px-[0.75rem] pb-[0.5rem] overflow-y-clip">
      <div className="flex items-center gap-[16px] justify-end py-[15px] sm:py-[13px]">
        <button
          onClick={handleToggleView}
          className="mr-auto pl-[11px] pr-[14px] bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] h-[30px] sm:h-[43px] rounded-[10px] flex gap-[7.94px] items-center justify-start cursor-pointer"
        >
          <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 20C2.45 20 1.97933 19.8043 1.588 19.413C1.19667 19.0217 1.00067 18.5507 1 18V16H0V14H1V11H0V9H1V6H0V4H1V2C1 1.45 1.196 0.979333 1.588 0.588C1.98 0.196667 2.45067 0.000666667 3 0H15C15.55 0 16.021 0.196 16.413 0.588C16.805 0.98 17.0007 1.45067 17 2V18C17 18.55 16.8043 19.021 16.413 19.413C16.0217 19.805 15.5507 20.0007 15 20H3ZM6.5 15H8V11C8.43333 10.8833 8.79167 10.646 9.075 10.288C9.35833 9.93 9.5 9.52567 9.5 9.075V5H8.5V8.775H7.75V5H6.75V8.775H6V5H5V9.075C5 9.525 5.14167 9.92933 5.425 10.288C5.70833 10.6467 6.06667 10.884 6.5 11V15ZM12 15H13.5V5C12.6667 5 11.9583 5.29167 11.375 5.875C10.7917 6.45833 10.5 7.16667 10.5 8V11H12V15Z"
              fill="white"
            />
          </svg>
          <p className="text-[12px] sm:text-[14px] font-bold text-white">
            {viewMode === "bahan" ? "Lihat Menu" : "Lihat Bahan"}
          </p>
        </button>

        <button
          onClick={() => setIsAddKategori(true)}
          className="pl-[11px] pr-[14px] bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] h-[30px] sm:h-[43px] rounded-[10px] flex gap-[7.94px] items-center justify-center cursor-pointer"
        >
          <img src={Plus} alt="plus" />
          <p className="text-[12px] sm:text-[14px] font-bold text-white">
            Tambah Baru
          </p>
        </button>
      </div>

      <div className="min-h-[32.0625rem] pt-[29px] w-full bg-white shadow-[0px_2px_6px_rgba(156,156,156,0.25)] rounded-[5px] pb-[1rem] px-[1rem]">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_35%] xl:grid-cols-[1fr_21.5rem] gap-[0.9375rem] w-full min-w-0">
          <div className="min-w-0 space-y-[0.9375rem] w-full">
            {/* Search & Filter */}
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
                    if (newStartIndex >= filteredData.length) {
                      setCurrentPage(newTotalPages || 1);
                    }
                    setEntriesPerPage(newEntriesPerPage);
                  }}
                  className="border border-gray-300 bg-[#F4F4F4] rounded-[2px] pl-2 h-[32px] cursor-pointer"
                >
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={8}>8</option>
                  <option value={10}>10</option>
                  <option value={12}>12</option>
                </select>
                <p className="ml-2 text-sm max-lg:hidden">Entries per page</p>
                <select
                  value={filterValue}
                  onChange={(e) => {
                    setFilterValue(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 bg-[#F4F4F4] rounded-[2px] pl-3 pr-5 ml-2 md::ml-[28px] h-[32px] cursor-pointer"
                >
                  <option value="all">All</option>
                  {stockData.map((item, idx) => (
                    <option key={idx} value={item.nama}>
                      {item.nama
                        ? item.nama.charAt(0).toUpperCase() + item.nama.slice(1)
                        : "-"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-nowrap ">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-[#959595] bg-[#F4F4F4] rounded-[2px] ml-2 px-2 py-1 w-full sm:w-[170px] h-[31px]"
                  placeholder={
                    viewMode === "bahan" ? "Cari bahan..." : "Cari menu..."
                  }
                />
              </div>
            </div>

            {/* Data Display */}
            <div className="w-full h-full">
              {viewMode === "bahan" ? (
                // Table View untuk Bahan — wrapper scroll internal
                <div className="max-w-full overflow-x-auto">
                  <table className="min-w-[450px] w-full table-auto border-collapse border border-[#959595] font-semibold">
                    <thead className="top-0">
                      <tr className="bg-[#FFB300] h-[49px]">
                        <th className="border border-[#959595] text-center w-[18.30%]">
                          Id
                        </th>
                        <th className="border border-[#959595] text-center w-[32.42%]">
                          Bahan
                        </th>
                        <th className="border border-[#959595] text-center w-[25.07%]">
                          Harga
                        </th>
                        <th className="border border-[#959595] text-center w-[24.15%]">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="py-3 italic text-center text-gray-500 animate-pulse"
                          >
                            Memuat data...
                          </td>
                        </tr>
                      ) : paginatedData.length > 0 ? (
                        paginatedData.map((t, ind) => (
                          <tr
                            key={ind}
                            className={`${
                              highlightedRow === t.id
                                ? "bg-[#AFCFFF]"
                                : "even:bg-gray-200"
                            } transition-colors ease-initial duration-300 text-[14px] [&>td]:h-[34px]`}
                          >
                            <td className="border-r border-[#959595] pl-[10.5px]">
                              {t.id}
                            </td>
                            <td className="border-r border-[#959595] pl-[10.5px]">
                              {t.produk}
                            </td>
                            <td className="border-r border-[#959595]">
                              <div className="flex items-center justify-around h-full text-center">
                                <button
                                  onClick={() => handleDecrement(t.id)}
                                  className="flex items-center justify-center flex-1 h-full cursor-pointer group"
                                >
                                  <img
                                    src={MinRed}
                                    alt=""
                                    className="group-hover:scale-150 group-active:scale-125"
                                  />
                                </button>
                                <span>
                                  {t.harga_beli?.toLocaleString("id-ID")}
                                </span>
                                <button
                                  onClick={() => handleIncrement(t.id)}
                                  className="flex items-center justify-center flex-1 h-full cursor-pointer group"
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
                                  <span className="max-lg:hidden">Edit</span>
                                </button>
                                <button
                                  onClick={() => onDelete(t.id)}
                                  className="flex-1 flex items-center justify-center bg-[#DC3538] hover:bg-[#D22B2D] active:bg-[#B81C1F] h-full rounded-[5px] gap-1 cursor-pointer"
                                >
                                  <img src={Sampah} alt="" />
                                  <span className="max-lg:hidden">Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="py-3 italic text-center text-gray-500"
                          >
                            Tidak ada data
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                // Card View untuk Menu (tetap flex wrap)
                <div className="flex items-center flex-wrap gap-[8px] sm:gap-[15px]">
                  {loading ? (
                    <div className="py-3 italic text-center text-gray-500 animate-pulse">
                      Memuat data...
                    </div>
                  ) : paginatedData.length > 0 ? (
                    paginatedData.map((item) => (
                      <div
                        key={item.id}
                        className="h-[130.33px] w-[111.4px] sm:w-[165px] sm:h-[164px] shadow-[0px_2px_10.2px_rgb(0,0,0,0.25)] cursor-pointer transition hover:-translate-y-2 hover:shadow-[0px_7px_8px_rgba(0,0,0,0.25)] relative group"
                        onClick={() => setSelectedMenu(item)}
                      >
                        <div className="w-full h-[70.3px] sm:h-[93px]">
                          <img
                            src={item.image}
                            className="w-full h-[70.3px] sm:h-[93px] object-cover"
                            alt={item.nama}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-between text-[15px] h-[calc(100%-69px)] sm:h-[calc(100%-93px)]">
                          <h4 className="text-sm font-semibold font-boogaloo sm:pt-[6px] px-2 text-center">
                            {item.nama}
                          </h4>
                          <h4 className="text-sm font-semibold font-baloo-2 self-start pl-[8px] pb-[4px]">
                            Rp. {item.harga}
                          </h4>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-4 py-3 italic text-center text-gray-500">
                      Tidak ada data
                    </div>
                  )}
                </div>
              )}

              {/* Pagination */}
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
                    {/* left svg */}
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
                    {/* right svg */}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="max-sm:max-w-[430px] w-full max-sm:m-auto max-sm:self-center pt-[28px] pb-[24px] min-h-[486px] font-semibold h-fit rounded-[5px] shadow-[0px_2px_6px_rgba(0,0,0,0.25)] bg-white">
            <h2 className="text-center font-bold text-[16px] mb-4 px-2">
              Total per Kategori ({viewMode === "bahan" ? "Bahan" : "Menu"})
            </h2>
            <div className="space-y-[27.45px] px-[0.875rem]">
              {loading ? (
                <div className="py-3 italic text-center text-gray-500 animate-pulse">
                  Memuat data...
                </div>
              ) : (
                stockData.map((items, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                      setFilterValue(items.nama); // pastikan setFilterValue sudah ada di state
                      setCurrentPage(1);
                    }}
                  >
                    <div className="bg-[#FFB300] border border-[#959595] w-full h-[2.75rem] flex items-center">
                      <h3 className="m-auto text-center">
                        {items.nama
                          ? items.nama.charAt(0).toUpperCase() +
                            items.nama.slice(1)
                          : "-"}
                      </h3>
                    </div>
                    <div className="bg-white border border-[#D9D9D9] w-full h-[2.8125rem] flex items-center justify-center">
                      <h4>{items.count}</h4>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
        {/* === END: GRID LAYOUT REPLACEMENT === */}
      </div>

      <div
        onClick={() => {
          setEditId(null);
          setDeleteId(null);
          setIsAddKategori(false);
          setSelectedMenu(null);
          setIsEditMenuBahanOpen(false);
        }}
        className={`${
          editId || deleteId || isAddKategori || selectedMenu ? "" : "hidden"
        } bg-black/50 fixed inset-0 h-full w-full`}
      ></div>

      {/* INI UNTUK EDIT MENU */}
      {selectedMenu && (
        <>
          <div className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <div className="bg-white gap-[15px] flex relative rounded-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)] pt-[35px] md:pt-[26px] pb-[33px] md:pb-[41px] px-[40px] md:px-[28.5px] w-[356px] sm:w-[500px] md:w-[702px] h-[646px] md:h-[539px]">
              <button
                onClick={() => setSelectedMenu(null)}
                className="cursor-pointer absolute right-[33px] top-[26px]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 1L7 7M7 7L1 13M7 7L13 13M7 7L1 1"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* KIRI */}
              <div className="flex flex-col w-full h-full">
                <h4 className="text-[24px] font-semibold pb-[10px]">Menu</h4>
                {/* UPLOAD IMAGE */}
                <div className="w-full h-[122px] bg-amber-800">
                  <img
                    src={ExampleImage}
                    alt=""
                    className="object-cover size-full"
                  />
                </div>
                <input
                  type="text"
                  name="nama"
                  value={editMenuForm.nama}
                  onChange={(e) => handleMenuFormChange("nama", e.target.value)}
                  className="block w-full h-[50px] mt-[7px] border-[#7E7E7E] border rounded-[4px] pl-[16px] text-[20px]"
                  placeholder="Nama menu..."
                />
                <div className="mt-[21px] flex flex-col">
                  <label htmlFor="kategori" className="mb-[7px]">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    id="kategori"
                    value={editMenuForm.kategori_id}
                    onChange={(e) =>
                      handleMenuFormChange(
                        "kategori_id",
                        parseInt(e.target.value) || ""
                      )
                    }
                    className="block cursor-pointer w-full h-[50px] border-[#7E7E7E] border rounded-[4px] px-[16px] text-[20px]"
                  >
                    {/* KATEGORI DARI DATABASE */}
                    <option value="">Pilih kategori...</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.jenis_hidangan}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-[21px] flex flex-col">
                  <label htmlFor="harga" className="mb-[7px]">
                    Harga
                  </label>
                  <input
                    type="number"
                    className="block w-full h-[50px] border-[#7E7E7E] border rounded-[4px] pl-[16px] text-[20px]"
                    name="harga"
                    id="harga"
                    value={editMenuForm.harga}
                    onChange={(e) =>
                      handleMenuFormChange(
                        "harga",
                        parseInt(e.target.value) || 0
                      )
                    }
                    placeholder="Harga menu..."
                  />
                </div>
                <div className="md:hidden mt-[21px] flex flex-col">
                  <label htmlFor="bahan" className="mb-[7px]">
                    Bahan
                  </label>
                  <button
                    type="number"
                    className="text-start w-full h-[50px] border-[#7E7E7E] hover:bg-gray-100 cursor-pointer border rounded-[4px] pl-[16px] text-[20px]"
                    onClick={() => setIsEditMenuBahanOpen(true)}
                  >
                    {selectedMenu.bahan[0]?.nama ||
                      "Menu ini belum memiliki bahan"}
                    ...
                  </button>
                </div>
                <button
                  onClick={handleMenuSave}
                  className="cursor-pointer bg-[#FFB300] hover:bg-[#F1A900] self-end mt-auto active:bg-[#D59501] text-[15px] font-semibold w-[78px] h-[31px] rounded-[5px]"
                >
                  Edit
                </button>
              </div>

              {/* KANAN */}
              {!isTablet && (
                <EditMenuBahan
                  editMenuForm={editMenuForm}
                  selectedMenu={selectedMenu}
                  setEditMenuForm={setEditMenuForm}
                  handleAddBahan={handleAddBahan}
                  handleBahanDelete={handleBahanDelete}
                  handleNewBahanChange={handleNewBahanChange}
                  newBahan={newBahan}
                />
              )}
            </div>
          </div>
          {isEditMenuBahanOpen && isTablet && (
            <div className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <div className="bg-[#FFF7DE] gap-[15px] flex relative rounded-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)] w-[356px] sm:w-[500px] md:w-[702px] h-[646px] md:h-[539px]">
                <button
                  onClick={() => setIsEditMenuBahanOpen(false)}
                  className="cursor-pointer absolute right-[17px] top-[18px]"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 1L7 7M7 7L1 13M7 7L13 13M7 7L1 1"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <EditMenuBahan
                  editMenuForm={editMenuForm}
                  selectedMenu={selectedMenu}
                  setEditMenuForm={setEditMenuForm}
                  handleAddBahan={handleAddBahan}
                  // handleBahanDelete={handleBahanDelete}
                  handleNewBahanChange={handleNewBahanChange}
                  newBahan={newBahan}
                />
              </div>
            </div>
          )}
        </>
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
          // setData={viewMode === "bahan" ? setStockTable : setMenuData}
          onDelete={hapusBahanById}
          setSkipConfirm={setSkipConfirm}
        />
      )}
      {isAddKategori && <TambahKategori setIsAddKategori={setIsAddKategori} />}
    </div>
  );
}

function EditMenuBahan({
  editMenuForm,
  selectedMenu,
  setEditMenuForm,
  // handleBahanDelete,
  // newBahan,
  // handleNewBahanChange,
  // handleAddBahan,
}) {
  const [bahanList, setBahanList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getBahan().then(setBahanList);
  }, []);

  // Fungsi untuk handle pemilihan bahan dari dropdown
  // Pilih bahan lama → attach
  const handleBahanSelect = async (bahan) => {
    try {
      await tambahbahanMenu({
        menu_id: selectedMenu.id,
        bahan_id: bahan.id,
        jumlah: bahan.jumlah, // ambil dari input
      });

      setEditMenuForm((prev) => ({
        ...prev,
        bahan: [
          ...prev.bahan,
          {
            id: bahan.id,
            nama: bahan.nama_bahan,
            harga: bahan.harga || bahan.harga_beli || 0,
            jumlah: bahan.jumlah,
          },
        ],
      }));

      setShowDropdown(false);
    } catch (err) {
      console.error("Gagal attach bahan:", err);
    }
  };

  // Fungsi untuk handle tambah bahan custom dari dropdown

  // Fungsi untuk handle tambah bahan custom dari dropdown
  // Tambah bahan baru → create + attach
  const handleCustomBahan = async (customBahan) => {
    try {
      const response = await tambahbahanMenu({
        menu_id: selectedMenu.id,
        nama_bahan: customBahan.nama_bahan,
        harga_beli: customBahan.harga,
        tipe: customBahan.tipe,
        jumlah: customBahan.jumlah,
      });

      setEditMenuForm((prev) => ({
        ...prev,
        bahan: [
          ...prev.bahan,
          {
            id: response.id,
            nama: response.nama_bahan,
            harga: response.harga_beli,
            jumlah: response.jumlah,
          },
        ],
      }));

      setShowDropdown(false);
      alert("Bahan baru berhasil ditambahkan!");
    } catch (error) {
      console.error("Gagal menambah bahan:", error);
      alert("Gagal menambah bahan: " + error.message);
    }
  };

  const handleDeletePivot = async (menuId, bahanId) => {
    try {
      await handlePivotDelete(menuId, bahanId);

      // Update state agar bahan langsung hilang dari list
      setEditMenuForm((prev) => ({
        ...prev,
        bahan: prev.bahan.filter((b) => b.id !== bahanId),
      }));

      console.log("Pivot berhasil dihapus");
      return true;
    } catch (err) {
      console.error("Gagal hapus pivot:", err);
      throw err;
    }
  };

  return (
    <div className="flex flex-col max-md:w-full">
      <h4 className="text-[24px] max-md:pt-[21px] max-md:pl-[16px] font-semibold pb-[10px] max-md:w-full">
        Bahan
      </h4>
      <div className="w-full md:w-[273px] h-full bg-[#FFF7DE] rounded-[5px] max-md:border-[#737373] max-md:border-t-1 md:shadow-[0px_2px_6px_rgba(0,0,0,0.25)] pl-[10px] pr-[4px] pt-[2px] pb-[2px] overflow-y-auto">
        {/* LOOP DARI DATA BAHAN YANG ADA DI MENU */}
        {editMenuForm.bahan.length > 0 ? (
          editMenuForm.bahan.map((bahan, idx) => (
            <div key={idx}>
              <div className="flex items-center h-[45px] px-[10px]">
                {/* Nama: fleksibel */}
                <h5 className="font-semibold flex-1 truncate">{bahan.nama}</h5>

                {/* Harga: lebar tetap */}
                <h6 className="w-24 text-right">
                  Rp. {bahan.harga.toLocaleString("id-ID")}
                </h6>

                {/* Jumlah: lebar tetap */}
                <p className="w-10 text-right text-xs text-gray-500">
                  {bahan.jumlah}
                </p>

                {/* Tombol hapus */}
                <svg
                  onClick={() => handleDeletePivot(selectedMenu.id, bahan.id)}
                  className="cursor-pointer ml-2"
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 14.5C1 14.8978 1.15804 15.2794 1.43934 15.5607C1.72064 15.842 2.10218 16 2.5 16H11.5C11.8978 16 12.2794 15.842 12.5607 15.5607C12.842 15.2794 13 14.8978 13 14.5V4.00001H1V14.5ZM9.5 6.50001C9.5 6.3674 9.55268 6.24022 9.64645 6.14645C9.74021 6.05268 9.86739 6.00001 10 6.00001C10.1326 6.00001 10.2598 6.05268 10.3536 6.14645C10.4473 6.24022 10.5 6.3674 10.5 6.50001V13.5C10.5 13.6326 10.4473 13.7598 10.3536 13.8536C10.2598 13.9473 10.1326 14 10 14C9.86739 14 9.74021 13.9473 9.64645 13.8536C9.55268 13.7598 9.5 13.6326 9.5 13.5V6.50001ZM6.5 6.50001C6.5 6.3674 6.55268 6.24022 6.64645 6.14645C6.74021 6.05268 6.86739 6.00001 7 6.00001C7.13261 6.00001 7.25979 6.05268 7.35355 6.14645C7.44732 6.24022 7.5 6.3674 7.5 6.50001V13.5C7.5 13.6326 7.44732 13.7598 7.35355 13.8536C7.25979 13.9473 7.13261 14 7 14C6.86739 14 6.74021 13.9473 6.64645 13.8536C6.55268 13.7598 6.5 13.6326 6.5 13.5V6.50001ZM3.5 6.50001C3.5 6.3674 3.55268 6.24022 3.64645 6.14645C3.74021 6.05268 3.86739 6.00001 4 6.00001C4.13261 6.00001 4.25979 6.05268 4.35355 6.14645C4.44732 6.24022 4.5 6.3674 4.5 6.50001V13.5C4.5 13.6326 4.44732 13.7598 4.35355 13.8536C4.25979 13.9473 4.13261 14 4 14C3.86739 14 3.74021 13.9473 3.64645 13.8536C3.55268 13.7598 3.5 13.6326 3.5 13.5V6.50001ZM13.5 1.00001H9.75L9.45625 0.41563C9.39402 0.290697 9.29817 0.185606 9.17947 0.11218C9.06078 0.0387537 8.92395 -9.46239e-05 8.78438 5.47897e-06H5.2125C5.07324 -0.00052985 4.93665 0.0381736 4.81838 0.111682C4.7001 0.18519 4.60492 0.290529 4.54375 0.41563L4.25 1.00001H0.5C0.367392 1.00001 0.240215 1.05268 0.146447 1.14645C0.0526784 1.24022 0 1.3674 0 1.50001L0 2.50001C0 2.63261 0.0526784 2.75979 0.146447 2.85356C0.240215 2.94733 0.367392 3.00001 0.5 3.00001H13.5C13.6326 3.00001 13.7598 2.94733 13.8536 2.85356C13.9473 2.75979 14 2.63261 14 2.50001V1.50001C14 1.3674 13.9473 1.24022 13.8536 1.14645C13.7598 1.05268 13.6326 1.00001 13.5 1.00001Z"
                    fill="#EC0000"
                  />
                </svg>
              </div>
              <hr className="w-full h-[0.5px] text-[#737373]" />
            </div>
          ))
        ) : (
          <p className="px-2 text-sm italic text-gray-500">Tidak ada bahan</p>
        )}

        {/* INPUT BARU DENGAN DROPDOWN */}
        <div>
          <div className="flex items-center justify-between">
            {/* Input nama dengan dropdown trigger */}
            {showDropdown && (
              <BahanDropdownEdit
                bahanList={bahanList}
                onBahanSelect={handleBahanSelect}
                onCustomBahan={handleCustomBahan}
                onClose={() => setShowDropdown(false)}
              />
            )}
          </div>
        </div>

        {/* TOMBOL TAMBAH BAHAN */}
        <div className="flex pl-[10px] pr-[13px] items-center justify-end h-[45px]">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] size-[22px] rounded-full flex items-center justify-center cursor-pointer"
          >
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 7.42857H6.85714V13H5.14286V7.42857H0V5.57143H5.14286V0H6.85714V5.57143H12V7.42857Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function BahanDropdownEdit({
  bahanList,
  onBahanSelect,
  onCustomBahan,
  onClose,
}) {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [newNama, setNewNama] = useState("");
  const [newJumlah, setNewJumlah] = useState("");
  const [newHarga, setNewHarga] = useState("");
  const [newOpsi, setNewOpsi] = useState("");
  const dropdownRef = useRef(null);
  const [jumlahBahan, setJumlahBahan] = useState();
  const [hoveredPrice, setHoveredPrice] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const opsiList = [
    { id: 1, nama: "bahan_mentah", label: "Bahan Mentah" },
    { id: 2, nama: "bahan_baku", label: "Bahan Baku" },
    { id: 3, nama: "bahan_lengkap", label: "Bahan Lengkap" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        onClose && onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const filtered = bahanList.filter((b) =>
    b.nama_bahan.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCustom = () => {
    if (!newNama.trim() || !newHarga) return;

    const customBahan = {
      id: Date.now(),
      nama_bahan: newNama,
      jumlah: Number(newJumlah),
      harga: Number(newHarga),
      tipe: newOpsi,
    };

    onCustomBahan(customBahan);
    setNewNama("");
    setNewJumlah("");
    setNewHarga("");
    setNewOpsi("");
    setSearch("");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {open && (
        <div className="absolute left-0 z-50 w-full mt-1 overflow-y-auto bg-[#FEF1C5] border border-gray-300 rounded-md shadow-lg top-full max-h-48">
          {/* Input tambah bahan baru */}
          <div className="w-full p-2 space-y-2 border-b bg-[#FEF1C5]">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nama bahan baru"
                value={newNama}
                onChange={(e) => {
                  setNewNama(e.target.value);
                  setSearch(e.target.value);
                }}
                className="flex-1 w-full px-2 py-1 text-xs bg-white border rounded focus:outline-none"
              />
              <input
                type="number"
                value={newJumlah}
                onChange={(e) => setNewJumlah(e.target.value)}
                placeholder="Jumlah"
                className="flex-1 w-full px-2 py-1 text-xs bg-white border rounded focus:outline-none"
              />
            </div>
            <input
              type="number"
              placeholder="Harga"
              value={newHarga}
              onChange={(e) => setNewHarga(e.target.value)}
              className="flex-1 w-full px-2 py-1 text-xs bg-white border rounded focus:outline-none"
            />
            <select
              value={newOpsi}
              onChange={(e) => setNewOpsi(e.target.value)}
              className="px-2 bg-white cursor-pointer max-md:h-[22.5px] h-[29px] sm:text-sm text-xs border rounded flex-1 w-full focus:outline-none"
            >
              <option value="">Pilih Opsi</option>
              {opsiList.map((opsi) => (
                <option key={opsi.id} value={opsi.nama}>
                  {opsi.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddCustom}
              className="w-full bg-[#FFB300] hover:bg-[#F1A900] text-white text-xs py-1 rounded cursor-pointer"
            >
              Tambah Bahan Baru
            </button>
          </div>

          {/* List bahan */}
          <div className="relative overflow-y-auto divide-y divide-gray-200 max-h-32">
            {filtered.length > 0 ? (
              filtered.map((b) => {
                return (
                  <div
                    key={b.id}
                    className="flex justify-between items-center px-3 py-2 hover:bg-[#F4DC8C]"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredPrice(b.harga_beli);
                      setTooltipPos({
                        x: rect.left + rect.width / 2,
                        y: rect.top, // bisa + window.scrollY kalau butuh
                      });
                    }}
                    onMouseLeave={() => setHoveredPrice(null)}
                  >
                    <span className="font-medium text-[14px]">
                      {b.nama_bahan}
                    </span>
                    <div className="ml-auto">
                      <span className="text-[14px] pr-3 md:hidden">
                        Rp{b.harga_beli.toLocaleString("id-ID")}
                      </span>

                      <input
                        type="number"
                        min={1}
                        value={jumlahBahan}
                        onChange={(e) => setJumlahBahan(Number(e.target.value))}
                        className="w-14 text-xs text-right border rounded px-1"
                      />
                    </div>

                    <button
                      onClick={() =>
                        onBahanSelect({ ...b, jumlah: jumlahBahan })
                      }
                      className="ml-2 px-2 py-0.5 text-xs bg-[#44962D] text-white rounded"
                    >
                      Tambah
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 text-sm text-center text-gray-500">
                Tidak ada bahan ditemukan
              </div>
            )}

            {hoveredPrice &&
              window.innerWidth >= 768 &&
              ReactDOM.createPortal(
                <span
                  className="fixed bg-black text-white text-[12px] px-2 py-1 rounded shadow-lg z-[9999] pointer-events-none"
                  style={{
                    top: tooltipPos.y,
                    left: tooltipPos.x,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  Rp{hoveredPrice.toLocaleString("id-ID")}
                </span>,
                document.body
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Stok;
