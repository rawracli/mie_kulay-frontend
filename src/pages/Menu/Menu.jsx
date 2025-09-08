import React, { useState } from "react";
import Eskopi from "../../assets/Menu/es.png";
import Line from "../../assets/Menu/line.png";

// Data menu
const menuData = [
  // Makanan
  { id: 1, name: "Mie Pedas Manis", price: 5000, category: "Makanan", image: Eskopi },
  { id: 2, name: "Mie Pedas Gurih", price: 5000, category: "Makanan", image: Eskopi },
  { id: 3, name: "Mie Chilli Oil", price: 5000, category: "Makanan", image: Eskopi },

  // Topping
  { id: 4, name: "Pangsit Goreng Isi Ayam", price: 5000, category: "Topping", image: Eskopi },
  { id: 5, name: "Sosis Sapi", price: 5000, category: "Topping", image: Eskopi },
  { id: 6, name: "Fish Roll", price: 5000, category: "Topping", image: Eskopi },
  { id: 7, name: "Pangsit Otak-Otak", price: 5000, category: "Topping", image: Eskopi },
  { id: 8, name: "Nugget Ikan", price: 5000, category: "Topping", image: Eskopi },
  { id: 9, name: "Baso Sapi", price: 5000, category: "Topping", image: Eskopi },

  // Minuman    
  { id: 10, name: "Mojito Lemon Vanilla", price: 5000, category: "Minuman", image: Eskopi },
  { id: 11, name: "Mojito Strawberry", price: 5000, category: "Minuman", image: Eskopi },
  { id: 12, name: "Mojito Lychee", price: 5000, category: "Minuman", image: Eskopi },
  { id: 13, name: "Es Kopi Gula Aren", price: 5000, category: "Minuman", image: Eskopi },
  { id: 14, name: "Es Kopi Caramel", price: 5000, category: "Minuman", image: Eskopi },
  { id: 15, name: "Es Kopi Vanilla", price: 5000, category: "Minuman", image: Eskopi },
  { id: 16, name: "Es Kopi Hazelnut", price: 5000, category: "Minuman", image: Eskopi },
  { id: 17, name: "Susu UHT", price: 5000, category: "Minuman", image: Eskopi },
  { id: 18, name: "Air Mineral", price: 5000, category: "Minuman", image: Eskopi },
];

function MenuPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const categories = ["Makanan", "Topping", "Minuman"];
  const shownCategories = selectedCategories.length ? selectedCategories : categories;

  return (
   <div className="w-full pt-25">
  {/* Heading Menu Kami */}
  <div className="relative bg-[#FFB300] py-8 flex items-center justify-center overflow-hidden h-[129px]">
    {/* Garis melengkung */}
    <img
      src= {Line} // ganti dengan path gambar garis melengkung kamu
      alt="garis melengkung"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[100%] h-auto"
    />
    <img
      src= {Line} // ganti dengan path gambar garis melengkung kamu
      alt="garis melengkung"
      className="absolute top-[45PX] left-1/2 -translate-x-1/2 -translate-y-1/3 w-[100%] h-auto"
    />

    {/* Tombol merah */}
    <div className="relative z-10 bg-red-600 text-white px-10 py-2 rounded-full text-[35px] font-bold shadow-md w-[381PX] h-[72px] text-center pt-2">
      Menu Kami
        </div>
    </div>

        <div className="flex p-15 pl-[20px]">
            {/* Filter */}
            <div className="w-[207px] bg-white shadow-md rounded-lg p-4 h-fit">
            <h2 className="font-bold text-lg mb-3">Filter</h2>
            <p className="font-semibold mb-2">Kategori</p>
            <div className="space-y-2">
                {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    />
                    <span>{cat}</span>
                </label>
                ))}
            </div>
            </div>

        {/* Menu per kategori */}
<div className="flex-1 space-y-10 px-30">
  {shownCategories.map((cat) => (
    <div key={cat}>
      <h2 className="text-xl font-bold mb-4">{cat}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {menuData
          .filter((item) => item.category === cat)
          .map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden w-[207px] h-[272px]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[155px] object-cover"
              />
              <div className="p-2">
                <h3 className="font-bold text-[21px]">{item.name}</h3>
                <p className="text-gray-600 text-[28px] text-end">Rp.{item.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}

export default MenuPage;