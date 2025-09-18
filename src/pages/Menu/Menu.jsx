import React, { useState, useRef, useEffect } from "react";
import Eskopi from "../../assets/Menu/es.png";
import Bg from "../../assets/Menu/bg.jpg";
import Hero from "../../components/Hero";
import useScrollBehaviour from "../../hooks/useScrollBehaviour";

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
  // ubah dari array → string (satu kategori saja)
  const [selectedCategory, setSelectedCategory] = useState("");
  const [containerHeight, setContainerHeight] = useState(0);
  const { isVisible } = useScrollBehaviour();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, [selectedCategory, menuData]); // Re-calculate when category changes or data changes
  const handleCategoryChange = (category) => {
    if (selectedCategory === category) {
      // kalau klik lagi kategori yang sama → kosong (deselect)
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  const tileHeight = 505;
  const tileWidth = 505;

  const categories = ["Makanan", "Topping", "Minuman"];
  const shownCategories = selectedCategory ? [selectedCategory] : categories;

  // zigzag background
  const createZigzagElements = () => {
    const elements = [];
    const totalHeight = containerHeight || 3000;
    const numberOfElements = Math.ceil(totalHeight / tileHeight);

    //TODO: bg terakhir overflow, overflow-hidden di div jafinya filter gak sticky, perbaikan sementara pake -1 di numberOfElements
    for (let i = 0; i < numberOfElements - 1; i++) {
      const isLeft = i % 2 === 0;
      
      elements.push(
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute z-0"
          style={{
            backgroundImage: `url(${Bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${tileWidth}px ${tileHeight}px`,
            width: `${tileWidth}px`,
            height: `${tileHeight}px`,
            left: isLeft ? '0px' : 'auto',
            right: isLeft ? 'auto' : '0px',
            top: `${i * tileHeight}px`,
            opacity: 0.09,
          }}
        />
      );
    }
    
    return elements;
  };

  return (
    <div className="w-full relative">
      <Hero text={"Menu Kami"} />
      <div className="flex p-[13px] pl-[20px] relative" ref={containerRef}>
        {/* Zigzag Background */}
        {createZigzagElements()}
        
        <div className="flex flex-col z-10">
          <div
            className={`sticky transition-all duration-300 ${
              isVisible ? "top-25" : "-top-[1px]"
            }`}
          >
            <h2 className="font-bold text-[36px] mt-[30px] ml-[60px] font-boogaloo">
              Filter
            </h2>
            {/* Filter */}
             <div className="w-[241px] h-[263px] shadow-[0px_2px_19.3px_rgba(0,0,0,0.25)] rounded-lg p-4 text text-[28px] ml-[48px] mt-[13px]">
              <p className="font-semibold mb-2 font-baloo-2 text-[28px]">Kategori</p>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategory === cat}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <span className="ml-[20px] font-baloo-2 text-[28px]">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Menu per kategori */}
        <div className="flex-1 space-y-10 pr-[211px] pl-[81px] mt-[30px]">
          {shownCategories.map((cat, index) => (
            <div key={cat} className={index !== 0 ? "pt-[3px]" : ""}>
              <h2 className="text-[36px] font-bold mb-4 font-boogaloo">{cat}</h2>
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
                          <h3 className="font-bold text-[20px] font-boogaloo">{item.name}</h3>
                          <p className="text-black text-[24px] text-start font-baloo-2">
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