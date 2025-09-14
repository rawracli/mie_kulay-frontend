import React, { useState, useEffect } from "react";
import Search from "../../../../assets/Admin/search.svg";
import Arrow from "../../../../assets/Admin/arrow.svg";
import Close from "../../../../assets/Admin/x.svg";
import Login from "../../../../assets/Login/login.png";
import { getMenu } from "../../../../controllers/Menu";
import { getCategories } from "../../../../controllers/Category";

function TambahPesanan({
  isAddOpen,
  setIsAddOpen,
  setData,
  editIndex,
  setEditIndex,
  setFormData,
  setHighlightedRow,
  data,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All menu");

  // Data menu dinamis
  const [categories, setCategories] = useState([]);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catData = await getCategories();
        // Tambahkan "All menu" di awal
        setCategories(["All menu", ...catData.map((c) => c.jenis_hidangan)]);
      } catch (err) {
        console.error("Gagal mengambil kategori:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu();
        // Map backend field ke front-end
        const mapped = data.map((item) => ({
          id: item.id,
          ...item,
          category: item.kategori?.jenis_hidangan || "Unknown",
          image: item.gambar
            ? `${import.meta.env.VITE_API_URL_IMAGE}/storage/${item.gambar}`
            : Login,
          name: item.nama_hidangan,
        }));
        setMenuData(mapped);
      } catch (error) {
        console.error("Gagal mengambil menu:", error);
      }
    };
    fetchMenu();
  }, []);

  // Filter data berdasarkan search dan category
  const filteredData = menuData.filter(
    (item) =>
      (selectedCategory === "All menu" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const chooseData = (selectedData) => {
    if (editIndex !== null) {
      setFormData((prev) => ({
        ...prev,
        nama: selectedData.name,
        harga: selectedData.harga_jual,
      }));
    } else {
      setData((prevData) => [
        ...prevData,
        {
          id: selectedData.id,
          nama: selectedData.name,
          jumlah: 1,
          harga: selectedData.harga_jual,
        },
      ]);
      setHighlightedRow(data.length);
      setTimeout(() => setHighlightedRow(null), 200);
    }
    setIsAddOpen(false);
  };

  return (
    <div
      className={`${
        isAddOpen ? "translate-x-0" : "translate-x-[110%]"
      } z-10 transition-all duration-300 fixed top-0 right-0 w-[429px] shadow-[-4px_4px_14.6px_rgba(0,0,0,0.25)] bg-[#FEFEFE] h-screen overflow-y-auto pl-[22px] pb-[24px] pt-[46px]`}
    >
      <div
        onClick={() => {
          setIsAddOpen(false);
          setEditIndex(null);
        }}
        className="absolute top-[15px] right-[24px] cursor-pointer"
      >
        <img src={Close} alt="Close icon" />
      </div>
      <div className="pr-[20px] flex flex-col">
        <div className="relative">
          <input
            type="text"
            placeholder="Ketik menu"
            className="border-[1.5px] h-[47px] pl-[54px] w-full rounded-[5px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img
            src={Search}
            alt="Search icon"
            className="absolute left-4 top-1/2 -translate-y-1/2"
          />
        </div>
        <div className="flex justify-end">
          <div className="relative">
            <select
              name="menu"
              className="cursor-pointer bg-right appearance-none border-[1.5px] rounded-[5px] mt-[12px] pr-[45px] pl-[14px] py-[6px] text-sm font-semibold"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <img
              src={Arrow}
              alt="Dropdown icon"
              className="absolute right-3 size-4 top-1/2 cursor-pointer"
            />
          </div>
        </div>
      </div>
      {/* Render categories */}
      {Object.keys(groupedData).map((category) => (
        <div key={category}>
          <h3 className="font-bold text-[20px] mb-[10px] mt-[23px]">
            {category}
          </h3>
          <div className="flex gap-[10px] flex-wrap">
            {groupedData[category].map((item, index) => (
              <div
                key={index}
                className="w-[122px] h-[132px] shadow-[0px_2px_10.2px_rgb(0,0,0,0.25)] cursor-pointer transition hover:-translate-y-2 hover:shadow-[0px_7px_8px_rgba(0,0,0,0.25)]"
                onClick={() => chooseData(item)}
              >
                <div className="w-full h-[91px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[90px] object-cover"
                  />
                </div>
                <div className="flex items-center justify-center h-[calc(100%-91px)]">
                  <h4 className="text-sm font-semibold">{item.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {Object.keys(groupedData).length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          Tidak ada item ditemukan
        </p>
      )}
    </div>
  );
}

export default TambahPesanan;
