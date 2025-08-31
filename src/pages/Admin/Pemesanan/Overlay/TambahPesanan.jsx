import React, { useState } from "react";
import Search from "../../../../assets/Admin/search.svg";
import Arrow from "../../../../assets/Admin/arrow.svg";
import Close from "../../../../assets/Admin/x.svg";
import Login from "../../../../assets/Login/login.png";

function TambahPesanan({ isOpen, setIsOpen, setData, editIndex, setEditIndex }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All menu");

  // Data menu dinamis
  const menuData = [
    { category: "Mie", name: "Mie pedas", image: Login, harga: 28000 },
    { category: "Mie", name: "Mie goreng", image: Login, harga: 25000 },
    { category: "Mie", name: "Mie ayam", image: Login, harga: 27030 },
    { category: "Topping", name: "Telur", image: Login, harga: 27000 },
    { category: "Topping", name: "Keju", image: Login, harga: 27000 },
    { category: "Topping", name: "Keju", image: Login, harga: 27000 },
    { category: "Topping", name: "Sosis", image: Login, harga: 27000 },
    { category: "Minuman", name: "Air mineral", image: Login, harga: 27000 },
    { category: "Minuman", name: "Teh manis", image: Login, harga: 27000 },
    { category: "Minuman", name: "Kopi", image: Login, harga: 27000 },
  ];

  // Filter data berdasarkan search dan category
  const filteredData = menuData.filter(
    (item) =>
      (selectedCategory === "All menu" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const chooseData = (selectedData) => {
    if (editIndex || editIndex === 0) {
      setData((prevData) => prevData.map((item, i) => editIndex == i ? {nama: selectedData.name, jumlah: item.jumlah, harga: selectedData.harga} : item))
      setEditIndex(null)
    } else { 
    setData((prevData) => [
      ...prevData,
      {nama:  selectedData.name, jumlah: 1, harga: 34000},
    ]); 
  }
    setIsOpen(false);
  }
  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "translate-x-[110%]"
      } transition-all duration-300 fixed top-0 right-0 w-[429px] shadow-[-4px_4px_14.6px_rgba(0,0,0,0.25)] bg-[#FEFEFE] h-screen overflow-y-auto pl-[22px] pb-[24px] pt-[46px]`}
    >
      <div
        onClick={() => {setIsOpen(false), setEditIndex(null)}}
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
        <div className="flex">
          <div className="relative">
            <select
              name="menu"
              className="cursor-pointer bg-right appearance-none group-hover:border-blue-500 border-[1.5px] rounded-[5px] mt-[12px] pr-[45px] pl-[14px] py-[6px] text-sm font-semibold"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All menu">All menu</option>
              <option value="Mie">Mie</option>
              <option value="Topping">Topping</option>
              <option value="Minuman">Minuman</option>
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
                onClick={()=>chooseData(item)}
              >
                <div className="w-full h-[91px]">
                  <img src={item.image} alt={item.name} className="object-cover" />
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
        <p className="text-center text-gray-500 mt-4">Tidak ada item ditemukan</p>
      )}
    </div>
  );
}

export default TambahPesanan;