import React, { useState, useRef, useEffect } from "react";
import Eskopi from "../../assets/Menu/es.png";
import Bg from "../../assets/Menu/bg.jpg";
import Hero from "../../components/Hero";
import useScrollBehaviour from "../../hooks/useScrollBehaviour";
import { getMenu } from "../../controllers/Menu";

// Data menu

function MenuPage() {
  // ubah dari array → string (satu kategori saja)
  const [menuData, setMenuData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [containerHeight, setContainerHeight] = useState(0);
  const { isVisible } = useScrollBehaviour();
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenu();
        // mapping field agar sesuai dengan struktur di frontend
        const mapped = data.map((item) => ({
          id: item.id,
          name: item.nama_hidangan,
          price: item.harga_jual,
          category: item.kategori?.jenis_hidangan || "Lainnya",
          image: `${import.meta.env.VITE_API_URL_IMAGE}/storage/${item.gambar}`,
        }));
        setMenuData(mapped);
      } catch (error) {
        console.error("Gagal load menu:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, [selectedCategory, menuData]); // Re-calculate when category changes or data changes
  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
  };

  const tileHeight = 505;
  const tileWidth = 505;

  const categories = [...new Set(menuData.map((item) => item.category))];
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
            left: isLeft ? "0px" : "auto",
            right: isLeft ? "auto" : "0px",
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
<<<<<<< HEAD
             <div className="w-[241px] h-[263px] shadow-[0px_2px_19.3px_rgba(0,0,0,0.25)] rounded-lg p-4 text text-[208px] ml-[48px] mt-[13px]">
              <p className="font-semibold mb-2 font-baloo-2 text-[28px]">Kategori</p>
=======
            <div className="w-[241px] h-[263px] shadow-[0px_2px_19.3px_rgba(0,0,0,0.25)] rounded-lg p-4 text text-[28px] ml-[48px] mt-[13px]">
              <p className="font-semibold mb-2 font-baloo-2 text-[28px]">
                Kategori
              </p>
>>>>>>> 7048126 (Menampilkan menu agar dapat diakses oleh segala pengguna)
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategory === cat}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <span className="ml-[20px] font-baloo-2 text-[28px]">
                      {cat}
                    </span>
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
              <h2 className="text-[36px] font-bold mb-4 font-boogaloo">
                {cat}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {menuData
                  .filter((item) => item.category === cat)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="relative shadow-[0px_2px_19.3px_rgba(0,0,0,0.25)] overflow-hidden w-[207px] h-[272px] bg-white"
                    >
                      {/* Konten Card */}
                      <div className="relative z-10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-[155px] object-cover"
                        />
                        <div className="p-2 flex flex-col h-[117px] justify-between">
<<<<<<< HEAD
                          <h3 className="font-bold text-[28px] font-boogaloo">{item.name}</h3>
=======
                          <h3 className="font-bold text-[20px] font-boogaloo">
                            {item.name}
                          </h3>
>>>>>>> 7048126 (Menampilkan menu agar dapat diakses oleh segala pengguna)
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
