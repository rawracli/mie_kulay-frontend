import React, { useState } from "react";
import Eskopi from "../../assets/Menu/es.png";
import Bg from "../../assets/Menu/bg.jpg";
import Hero from "../../components/Hero";

// Data menu
const menuData = [
  // Makanan
  {
    id: 1,
    name: "Mie Pedas Manis",
    price: 5000,
    category: "Makanan",
    image: Eskopi,
  },
  {
    id: 2,
    name: "Mie Pedas Gurih",
    price: 5000,
    category: "Makanan",
    image: Eskopi,
  },
  {
    id: 3,
    name: "Mie Chilli Oil",
    price: 5000,
    category: "Makanan",
    image: Eskopi,
  },

  // Topping
  {
    id: 4,
    name: "Pangsit Goreng Isi Ayam",
    price: 5000,
    category: "Topping",
    image: Eskopi,
  },
  {
    id: 5,
    name: "Sosis Sapi",
    price: 5000,
    category: "Topping",
    image: Eskopi,
  },
  { id: 6, name: "Fish Roll", price: 5000, category: "Topping", image: Eskopi },
  {
    id: 7,
    name: "Pangsit Otak-Otak",
    price: 5000,
    category: "Topping",
    image: Eskopi,
  },
  {
    id: 8,
    name: "Nugget Ikan",
    price: 5000,
    category: "Topping",
    image: Eskopi,
  },
  { id: 9, name: "Baso Sapi", price: 5000, category: "Topping", image: Eskopi },

  // Minuman
  {
    id: 10,
    name: "Mojito Lemon Vanilla",
    price: 5000,
    category: "Minuman",
    image: Eskopi,
  },
  {
    id: 11,
    name: "Mojito Strawberry",
    price: 5000,
    category: "Minuman",
    image: Eskopi,
  },
  {
    id: 12,
    name: "Mojito Lychee",
    price: 5000,
    category: "Minuman",
    image: Eskopi,
  },
  {
    id: 13,
    name: "Es Kopi Gula Aren",
    price: 5000,
    category: "Minuman",
    image: Eskopi,
  },
  {
    id: 14,
    name: "Es Kopi Caramel",
    price: 5000,
    category: "Minuman",
    image: Eskopi,
  },
  {
    id: 15,
    name: "Es Kopi Vanilla",
    price: 5000,
    category: "Minuman",
    image: Eskopi,
  },
  {
    id: 16,
    name: "Es Kopi Hazelnut",
    price: 5000,
    category: "Minuman",
    image: Eskopi,
  },
  { id: 17, name: "Susu UHT", price: 5000, category: "Minuman", image: Eskopi },
  {
    id: 18,
    name: "Air Mineral",
    price: 5000,
    category: "Minuman",
    image: Eskopi,
  },
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
  const shownCategories = selectedCategories.length
    ? selectedCategories
    : categories;

  return (
    <div className="w-full pt-25">
      <Hero text={"Menu Kami"}/>
      <div className="flex p-[13px] pl-[20px]">
        <div className="flex flex-col">
          <h2 className="font-bold text-[28px]  mt-[77px] ml-[60px]">Filter</h2>
          {/* Filter */}
          <div className="w-[241px] h-[263px] bg-white shadow-[0px_2px_19.3px_rgba(0,0,0,0.25)] rounded-lg p-4 text text-[28px] ml-[59px] mt-[13px] ">
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
        </div>

        {/* Menu per kategori */}
        <div className="flex-1 space-y-10 pr-[211px] pl-[81px] mt-21">
          <div
            className="absolute inset-0 bg-cover bg-left w-[505px] h-[505px] mt-[230px] ml-[748px] opacity-9 "
            style={{ backgroundImage: `url(${Bg})` }}
          ></div>
          <div
            className="absolute inset-0 bg-cover bg-center w-[505px] h-[505px] mt-[760px]  opacity-9 "
            style={{ backgroundImage: `url(${Bg})` }}
          ></div>
          <div
            className="absolute inset-0 bg-cover bg-left w-[505px] h-[505px] mt-[1250px] ml-[748px] opacity-9 "
            style={{ backgroundImage: `url(${Bg})` }}
          ></div>
          <div
            className="absolute inset-0 bg-cover bg-center w-[505px] h-[505px] mt-[1900px]  opacity-9 "
            style={{ backgroundImage: `url(${Bg})` }}
          ></div>
          {shownCategories.map((cat) => (
            <div key={cat}>
              <h2 className="text-[36px] font-bold mb-4">{cat}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {menuData
                  .filter((item) => item.category === cat)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="relative rounded-lg shadow-[0px_2px_19.3px_rgba(0,0,0,0.25)] overflow-hidden w-[207px] h-[272px] bg-white"
                    >
                      {/* Konten Card */}
                      <div className="relative z-10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-[155px] object-cover"
                        />
                        <div className="p-2 flex flex-col h-[117px] justify-between">
                          <h3 className="font-bold text-[20px]">{item.name}</h3>
                          <p className="text-black text-[28px] text-start">
                            Rp.{item.price}
                          </p>
                        </div>
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
