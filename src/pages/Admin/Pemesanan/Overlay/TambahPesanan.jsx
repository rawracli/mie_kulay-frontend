import React, { useState, useEffect } from "react";
import Search from "../../../../assets/Admin/search.svg";
import Arrow from "../../../../assets/Admin/arrow.svg";
import Close from "../../../../assets/Admin/x.svg";
import Login from "../../../../assets/Login/login.png";
import { getMenu } from "../../../../controllers/Menu";
import { Sheet } from "react-modal-sheet";
import { useMediaQuery } from "react-responsive";
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
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

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

  // Konten yang akan digunakan di desktop dan mobile
  const modalContent = (
    <>
      <div className="flex justify-between items-center mb-4 px-4">
        <div
          onClick={() => {
            setIsAddOpen(false);
            setEditIndex(null);
          }}
          className="absolute -top-[10px] sm:top-[30px] right-[24px] cursor-pointer"
        >
          <img src={Close} alt="Close icon" />
        </div>
      </div>

      <div className="px-4 flex flex-col">
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
        <div className="flex justify-end mt-3">
          <div className="relative">
            <select
              name="menu"
              className="cursor-pointer bg-right appearance-none border-[1.5px] rounded-[5px] pr-[45px] pl-[14px] py-[6px] text-sm font-semibold"
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
              className="absolute right-3 size-4 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div
        className="mt-4 px-4 pb-6 overflow-y-auto"
        style={{ maxHeight: isMobile ? "70vh" : "none" }}
      >
        {Object.keys(groupedData).map((category) => (
          <div key={category} className="mb-6">
            <h3 className="font-bold text-[20px] mb-3">{category}</h3>
            <div className="flex gap-3 flex-wrap">
              {groupedData[category].map((item, index) => (
                <div
                  key={index}
                  className="w-[calc(50%-6px)] sm:w-[122px] h-[132px] shadow-[0px_2px_10.2px_rgb(0,0,0,0.25)] cursor-pointer transition hover:-translate-y-1 hover:shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
                  onClick={() => chooseData(item)}
                >
                  <div className="w-full h-[91px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center h-[41px] p-1">
                    <h4 className="text-sm font-semibold text-center">
                      {item.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {Object.keys(groupedData).length === 0 && (
          <p className="text-center text-gray-500 py-6">
            Tidak ada item ditemukan
          </p>
        )}
      </div>
    </>
  );

  return !isMobile ? (
    <div
      className={`${
        isAddOpen ? "translate-x-0" : "translate-x-[110%]"
      } z-10 transition-all duration-300 fixed top-0 right-0 w-[429px] shadow-[-4px_4px_14.6px_rgba(0,0,0,0.25)] bg-[#FEFEFE] h-screen overflow-y-auto pt-[46px]`}
    >
      {modalContent}
    </div>
  ) : (
    <Sheet
      isOpen={isAddOpen} // Diperbaiki: menggunakan nilai boolean, bukan fungsi setter
      onClose={() => {
        setIsAddOpen(false);
        setEditIndex(null);
      }}
      snapPoints={[0.7, 0.5, 0.1]} // Snap points: 50% dan 10% (hampir tertutup)
      initialSnap={0.7} // Mulai pada 50%
      className="mx-auto max-w-lg" // Batasi lebar maksimum
    >
      <Sheet.Container
        style={{
          height: "70vh", // Set tinggi menjadi 50% viewport
          maxHeight: "70vh", // Pastikan tidak melebihi 50%
        }}
      >
        <Sheet.Header />
        <Sheet.Content style={{ padding: 0 }}>{modalContent}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        onTap={() => {
          setIsAddOpen(false);
          setEditIndex(null);
        }}
      />
    </Sheet>
  );
}

export default TambahPesanan;
