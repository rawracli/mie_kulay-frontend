import React, { useEffect, useMemo, useState, useRef } from "react";
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
import TambahProduk from "./Overlay/TambahProduk";
import { getBahan, updateBahan, hapusBahan } from "../../../controllers/Bahan";
import Bahan from "./section/bahan";

function Stok() {
  // toggle bahan atau menu
  const [viewMode, setViewMode] = useState("bahan");

  // Data Bahan (dummy)
  const [stockTable, setStockTable] = useState([
    {
      id: 1,
      produk: "Mie Kuning",
      harga_beli: 15000,
      stok: 20,
      kategori_id: 1,
      kategori: "Makanan",
    },
    {
      id: 2,
      produk: "Ayam Suwir",
      harga_beli: 30000,
      stok: 10,
      kategori_id: 1,
      kategori: "Makanan",
    },
    {
      id: 3,
      produk: "Cabe Merah",
      harga_beli: 8000,
      stok: 50,
      kategori_id: 2,
      kategori: "Bumbu",
    },
    {
      id: 4,
      produk: "Es Batu",
      harga_beli: 2000,
      stok: 200,
      kategori_id: 3,
      kategori: "Minuman",
    },
    {
      id: 5,
      produk: "Plastik Cup",
      harga_beli: 1000,
      stok: 500,
      kategori_id: 4,
      kategori: "-",
    },
  ]);

  // Data Menu (dummy)
  const [menuData, setMenuData] = useState([
    {
      id: 1,
      nama: "Mie Ayam Special",
      image: "https://via.placeholder.com/165x93",
      kategori: "Makanan",
      harga: 25000,
      stok: 15,
      bahan: [
        { nama: "Mie Kuning", harga: 5000 },
        { nama: "Ayam Suwir", harga: 10000 },
        { nama: "Sayuran", harga: 3000 },
      ],
    },
    {
      id: 2,
      nama: "Mie Pedas Gurih",
      image: "https://via.placeholder.com/165x93",
      kategori: "Makanan",
      harga: 22000,
      stok: 20,
      bahan: [
        { nama: "Mie Kuning", harga: 5000 },
        { nama: "Cabe Merah", harga: 2000 },
        { nama: "Bumbu Pedas", harga: 4000 },
      ],
    },
    {
      id: 3,
      nama: "Es Teh Manis",
      image: "https://via.placeholder.com/165x93",
      kategori: "Minuman",
      harga: 8000,
      stok: 50,
      bahan: [
        { nama: "Teh", harga: 2000 },
        { nama: "Gula", harga: 1000 },
        { nama: "Es Batu", harga: 500 },
      ],
    },
    {
      id: 4,
      nama: "Es Jeruk",
      image: "https://via.placeholder.com/165x93",
      kategori: "Minuman",
      harga: 10000,
      stok: 30,
      bahan: [
        { nama: "Jeruk", harga: 5000 },
        { nama: "Gula", harga: 1000 },
        { nama: "Es Batu", harga: 500 },
      ],
    },
    {
      id: 5,
      nama: "Nasi Goreng Special",
      image: "https://via.placeholder.com/165x93",
      kategori: "Makanan",
      harga: 28000,
      stok: 25,
      bahan: [
        { nama: "Nasi", harga: 5000 },
        { nama: "Telur", harga: 3000 },
        { nama: "Bumbu", harga: 4000 },
      ],
    },
    {
      id: 6,
      nama: "Bakso Kuah",
      image: "https://via.placeholder.com/165x93",
      kategori: "Makanan",
      harga: 20000,
      stok: 18,
      bahan: [
        { nama: "Bakso", harga: 8000 },
        { nama: "Mie", harga: 3000 },
        { nama: "Sayuran", harga: 2000 },
      ],
    },
    {
      id: 7,
      nama: "Es Kopi Susu",
      image: "https://via.placeholder.com/165x93",
      kategori: "Minuman",
      harga: 15000,
      stok: 40,
      bahan: [
        { nama: "Kopi", harga: 5000 },
        { nama: "Susu", harga: 4000 },
        { nama: "Es Batu", harga: 500 },
      ],
    },
    {
      id: 8,
      nama: "Soto Ayam",
      image: "https://via.placeholder.com/165x93",
      kategori: "Makanan",
      harga: 25000,
      stok: 22,
      bahan: [
        { nama: "Ayam", harga: 10000 },
        { nama: "Bumbu Soto", harga: 3000 },
        { nama: "Sayuran", harga: 2000 },
      ],
    },
    {
      id: 9,
      nama: "Jus Alpukat",
      image: "https://via.placeholder.com/165x93",
      kategori: "Minuman",
      harga: 18000,
      stok: 15,
      bahan: [
        { nama: "Alpukat", harga: 8000 },
        { nama: "Susu", harga: 3000 },
        { nama: "Gula", harga: 1000 },
      ],
    },
    {
      id: 10,
      nama: "Ayam Bakar",
      image: "https://via.placeholder.com/165x93",
      kategori: "Makanan",
      harga: 35000,
      stok: 12,
      bahan: [
        { nama: "Ayam", harga: 15000 },
        { nama: "Bumbu Bakar", harga: 5000 },
        { nama: "Sambal", harga: 2000 },
      ],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const updateTimeout = useRef({});
  const stockData = useMemo(() => {
    const dataToUse = viewMode === "bahan" ? stockTable : menuData;
    const grouped = dataToUse.reduce((acc, item) => {
      const kategoriName = item.kategori || "-";
      if (!acc[kategoriName]) {
        acc[kategoriName] = 0;
      }
      acc[kategoriName] += item.stok;
      return acc;
    }, {});

    return Object.entries(grouped).map(([nama, stok]) => ({
      nama,
      stok,
    }));
  }, [stockTable, menuData, viewMode]);

  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAddKategori, setIsAddKategori] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [skipConfirm, setSkipConfirm] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  // State Edit Menu
  const [editMenuForm, setEditMenuForm] = useState({
    nama: "",
    kategori: "",
    harga: 0,
    bahan: []
  });
  const [newBahan, setNewBahan] = useState({
    nama: "",
    harga: 0
  });

  // Init form saat menu yang dipilih berubah
  useEffect(() => {
    if (selectedMenu) {
      setEditMenuForm({
        nama: selectedMenu.nama || "",
        kategori: selectedMenu.kategori || "",
        harga: selectedMenu.harga || 0,
        bahan: selectedMenu.bahan || []
      });
    }
  }, [selectedMenu]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const selectedCategory = category?.toLowerCase();
    const dataToFilter = viewMode === "bahan" ? stockTable : menuData;

    return dataToFilter.filter((t) => {
      const matchCategory =
        !category || category === "all"
          ? true
          : t.kategori.toLowerCase().includes(selectedCategory);

      const matchSearch =
        !keyword ||
        t.id.toString().toLowerCase().includes(keyword) ||
        (viewMode === "bahan"
          ? t.produk.toLowerCase().includes(keyword)
          : t.nama.toLowerCase().includes(keyword));

      return matchCategory && matchSearch;
    });
  }, [search, stockTable, menuData, category, viewMode]);

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
    setCategory("all");
  };

  // Handlers for bahan
  const handleUpdateStok = (id, newStok) => {
    // update state lokal langsung
    setStockTable((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stok: newStok } : item))
    );
    if (updateTimeout.current[id]) {
      clearTimeout(updateTimeout.current[id]);
    }

    // timer biar tidak spam update ke server, sehingga tidak delay saat menambah/mengurangi stok
    updateTimeout.current[id] = setTimeout(async () => {
      try {
        const current = stockTable.find((item) => item.id === id);
        if (!current) return;

        const updated = await updateBahan(id, {
          nama_bahan: current.produk,
          harga_beli: current.harga_beli,
          stok: newStok,
          kategori_id: current.kategori_id,
        });

        console.log("Stok berhasil diupdate:", updated);
      } catch (err) {
        console.error("Gagal update stok:", err.message);
      }
    }, 300);
  };

  const handleIncrement = (id) => {
    const current = stockTable.find((item) => item.id === id);
    if (!current) return;
    handleUpdateStok(id, current.stok + 500);
  };

  const handleDecrement = (id) => {
    const current = stockTable.find((item) => item.id === id);
    const amount = 500;
    if (!current) return;
    if (current.stok > 0) {
      if (current.stok < amount) {
        handleUpdateStok(id, 0);
      } else {
        handleUpdateStok(id, current.stok - 500);
      }
    }
  };

  const handleInputChange = (id, value) => {
    const newValue = parseInt(value) || 1;
    handleUpdateStok(id, newValue);
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
    setEditMenuForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBahanDelete = (indexToRemove) => {
    setEditMenuForm(prev => ({
      ...prev,
      bahan: prev.bahan.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleNewBahanChange = (field, value) => {
    setNewBahan(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddBahan = () => {
    if (newBahan.nama && newBahan.harga > 0) {
      setEditMenuForm(prev => ({
        ...prev,
        bahan: [...prev.bahan, { ...newBahan }]
      }));
      setNewBahan({ nama: "", harga: 0 });
    }
  };

  const handleMenuSave = () => {
    if (selectedMenu && editMenuForm.nama && editMenuForm.kategori && editMenuForm.harga > 0) {
      // Update menuData
      setMenuData(prev => 
        prev.map(menu => 
          menu.id === selectedMenu.id 
            ? { ...menu, ...editMenuForm }
            : menu
        )
      );
      
      // Close modal
      setSelectedMenu(null);
      
      console.log("Menu berhasil diupdate:", editMenuForm);
    } else {
      alert("Mohon lengkapi semua field yang diperlukan");
    }
  };
  //End edit Menu

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

    const fetchBahan = async () => {
      try {
        const data = await getBahan();
        const mapped = data.map((item) => ({
          id: item.id,
          produk: item.nama_bahan,
          harga_beli: item.harga_beli,
          stok: item.stok,
          kategori_id: item.kategori_id,
          kategori: item.kategori?.jenis_hidangan ?? "-",
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

  return (
    <div className="bg-[#EDF0F2] min-h-[calc(100vh-92px)] w-full px-[0.75rem] pt-[13px] pb-[0.5rem] overflow-y-clip">
      <div className="flex items-center gap-[16px] justify-end pb-[13px]">
        <button
          onClick={handleToggleView}
          className="mr-auto pl-[11px] pr-[14px] bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] h-[43px] rounded-[10px] flex gap-[7.94px] items-center justify-start cursor-pointer"
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
          <p className="text-[14px] font-bold text-white">
            {viewMode === "bahan" ? "Lihat Menu" : "Lihat Bahan"}
          </p>
        </button>

        <button
          onClick={() => setIsAddOpen(true)}
          className="pl-[11px] pr-[14px] bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] h-[43px] rounded-[10px] flex gap-[7.94px] items-center justify-start cursor-pointer"
        >
          <img src={Plus} alt="plus" />
          <p className="text-[14px] font-bold text-white">
            {viewMode === "bahan" ? "Tambah Bahan Mentah" : "Tambah Menu"}
          </p>
        </button>

        <button
          onClick={() => setIsAddKategori(true)}
          className="pl-[11px] pr-[14px] bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] h-[43px] rounded-[10px] flex gap-[7.94px] items-center justify-center cursor-pointer"
        >
          <img src={Plus} alt="plus" />
          <p className="text-[14px] font-bold text-white">Tambah Kategori</p>
        </button>
      </div>

      <div className="min-h-[32.0625rem] pt-[29px] w-full bg-white shadow-[0px_2px_6px_rgba(156,156,156,0.25)] rounded-[5px] pb-[1rem] px-[1rem]">
        <div className="flex gap-[0.9375rem] w-full">
          <div className="flex-1 space-y-[0.9375rem]">
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
                <p className="ml-2 text-sm">Entries per page</p>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCurrentPage(1);
                  }}
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
                  placeholder={
                    viewMode === "bahan" ? "Cari bahan..." : "Cari menu..."
                  }
                />
              </div>
            </div>

            {/* Data Display */}
            <div className="w-full h-full">
              {viewMode === "bahan" ? (
                // Table View untuk Bahan
                <table className="w-full font-semibold border-collapse border border-[#959595]">
                  <thead className="top-0">
                    <tr className="bg-[#FFB300] h-[49px]">
                      <th className="border border-[#959595] text-center w-[18.30%]">
                        Id
                      </th>
                      <th className="border border-[#959595] text-center w-[32.42%]">
                        Bahan
                      </th>
                      {/* STOK JADI HARGA */}
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
                          colSpan="4"
                          className="py-3 italic text-center text-gray-500"
                        >
                          Tidak ada data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                // Card View untuk Menu
                <div className="flex items-center flex-wrap gap-[15px]">
                  {loading ? (
                    <div className="py-3 italic text-center text-gray-500 animate-pulse">
                      Memuat data...
                    </div>
                  ) : paginatedData.length > 0 ? (
                    paginatedData.map((item) => (
                      <div
                        key={item.id}
                        className="w-[165px] h-[164px] shadow-[0px_2px_10.2px_rgb(0,0,0,0.25)] cursor-pointer transition hover:-translate-y-2 hover:shadow-[0px_7px_8px_rgba(0,0,0,0.25)] relative group"
                        onClick={() => setSelectedMenu(item)}
                      >
                        <div className="w-full h-[93px]">
                          <img
                            src={ExampleImage}
                            className="w-full h-[93px] object-cover"
                            alt={item.nama}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-between text-[15px] h-[calc(100%-93px)]">
                          <h4 className="text-sm font-semibold font-boogaloo pt-[6px] px-2 text-center">
                            {item.nama}
                          </h4>
                          <h4 className="text-sm font-semibold font-baloo-2 self-start pl-[8px] pb-[4px]">
                            Rp. {item.harga.toLocaleString("id-ID")}
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

          {/* Right Sidebar - Category Totals */}
          <div className="w-[21.5rem] pt-[28px] pb-[24px] font-semibold h-fit rounded-[5px] shadow-[0px_2px_6px_rgba(0,0,0,0.25)]">
            <h2 className="text-center font-bold text-[16px] mb-4">
              Total per Kategori ({viewMode === "bahan" ? "Bahan" : "Menu"})
            </h2>
            <div className="space-y-[27.45px] px-[0.875rem]">
              {loading ? (
                <div className="py-3 italic text-center text-gray-500 animate-pulse">
                  Memuat data...
                </div>
              ) : (
                stockData.map((items, index) => (
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
                ))
              )}
            </div>
            <div className="px-[2.0938rem] w-full h-[2.5rem] mt-[0.875rem]">
              <div className="flex pl-[1.3125rem] pr-[2.0625rem] items-center text-[#FFB300] justify-between border-[0.5px] border-[#959595] h-[40px] bg-white">
                <h3 className="uppercase font-bold text-[0.875rem]">
                  Total Stok :
                </h3>
                <h4>
                  {loading ? (
                    <span className="italic text-gray-500 animate-pulse">
                      ...
                    </span>
                  ) : (
                    stockData.reduce((total, item) => total + item.stok, 0)
                  )}
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
          setSelectedMenu(null);
        }}
        className={`${
          editId || isAddOpen || deleteId || isAddKategori || selectedMenu
            ? ""
            : "hidden"
        } bg-black/50 fixed inset-0 h-full w-full`}
      ></div>

        {/* INI UNTUK EDIT MENU */}
      {selectedMenu && (
        <div className="fixed top-[55%] -translate-y-1/2 left-[47%] -translate-x-1/2">
          <div className="bg-white gap-[15px] flex relative rounded-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)] pt-[26px] pb-[41px] pl-[30px] pr-[27px] w-[702px] h-[539px]">
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
            <div className="w-full h-full flex flex-col">
              <h4 className="text-[24px] font-semibold pb-[10px]">Menu</h4>
              {/* UPLOAD IMAGE */}
              <div className="w-full h-[122px]">
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
                onChange={(e) => handleMenuFormChange('nama', e.target.value)}
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
                  value={editMenuForm.kategori}
                  onChange={(e) => handleMenuFormChange('kategori', e.target.value)}
                  className="block cursor-pointer w-full h-[50px] border-[#7E7E7E] border rounded-[4px] px-[16px] text-[20px]"
                >
                  {/* KATEGORI DARI DATABASE */}
                  <option value="">Pilih kategori...</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Topping">Topping</option>
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
                  onChange={(e) => handleMenuFormChange('harga', parseInt(e.target.value) || 0)}
                  placeholder="Harga menu..."
                />
              </div>
              <button 
                onClick={handleMenuSave}
                className="cursor-pointer bg-[#FFB300] hover:bg-[#F1A900] self-end mt-auto active:bg-[#D59501] text-[15px] font-semibold w-[78px] h-[31px] rounded-[5px]"
              >
                Edit
              </button>
            </div>
            <div className="flex flex-col">
              <h4 className="text-[24px] font-semibold pb-[10px]">Bahan</h4>
              <div className="w-[273px] h-full bg-[#FFF7DE] rounded-[5px] shadow-[0px_2px_6px_rgba(0,0,0,0.25)] pl-[10px] pr-[4px] pt-[2px] pb-[2px] overflow-y-auto">
                {/* LOOP DARI DATA BAHAN YANG ADA DI MENU */}
                {editMenuForm.bahan.map((bahan, idx) => (
                  <div key={idx}>
                    <div className="flex pl-[10px] pr-[17px] items-center justify-between h-[45px]">
                      <h5 className="font-semibold">{bahan.nama}</h5>
                      <div className="flex items-center gap-[41px]">
                        <h6 className="text-start">Rp. {bahan.harga.toLocaleString("id-ID")}</h6>
                        {/* BTN HAPUS BAHAN */}
                        <svg
                          onClick={() => handleBahanDelete(idx)}
                          className="cursor-pointer"
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
                    </div>
                    <hr className="w-full h-[0.5px] text-[#737373]" />
                  </div>
                ))}
                {/* INI INPUT BARU */}
                <div>
                  <div className="flex pl-[10px] pr-[24px] items-center justify-between h-[45px]">
                    <input 
                      className="bg-[#D9D9D9] w-[91px] font-semibold px-2 py-1 rounded text-sm"
                      placeholder="Nama bahan"
                      value={newBahan.nama}
                      onChange={(e) => handleNewBahanChange('nama', e.target.value)}
                    />
                    <div className="flex items-center gap-[41px]">
                      <input 
                        className="bg-[#D9D9D9] -translate-x-[30px] w-[91px] px-2 py-1 rounded text-sm"
                        placeholder="Harga"
                        type="number"
                        value={newBahan.harga || ''}
                        onChange={(e) => handleNewBahanChange('harga', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <hr className="w-full h-[0.5px] text-[#737373]" />
                </div>
                {/* MENAMPILKAN INPUT BARU (DIATAS) */}
                <div className="flex pl-[10px] pr-[20px] items-center justify-end h-[45px]">
                  <div 
                    onClick={handleAddBahan}
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
          </div>
        </div>
      )}

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
          // setData={viewMode === "bahan" ? setStockTable : setMenuData}
          onDelete={hapusBahanById}
          setSkipConfirm={setSkipConfirm}
        />
      )}
      {isAddKategori && <TambahKategori setIsAddKategori={setIsAddKategori} />}
    </div>
  );
}

export default Stok;