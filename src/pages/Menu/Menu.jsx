import React, { useState, useRef, useEffect } from "react";
import Eskopi from "../../assets/Menu/es.png";
import Bg from "../../assets/Menu/bg.jpg";
import Hero from "../../components/Hero";
import FilterMenu from "../../assets/Menu/FilterMenu.jpg";
import useScrollBehaviour from "../../hooks/useScrollBehaviour";
import { getMenu } from "../../controllers/Menu";

// Data menu

function MenuPage() {
  // menampilkan dari action
  const [showSecond, setShowSecond] = useState(false);
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
    setSelectedCategory((prev) => {
      if (prev.includes(category)) {
        // jika sudah ada, hapus
        return prev.filter((c) => c !== category);
      } else {
        // jika belum ada, tambahkan
        return [...prev, category];
      }
    });
  };

  const tileHeight = 505;
  const tileWidth = 505;

  const categories = [...new Set(menuData.map((item) => item.category))];
  const shownCategories =
    selectedCategory.length > 0 ? selectedCategory : categories;

  // zigzag background
  const createZigzagElements = () => {
    const elements = [];
    const totalHeight = containerHeight || 3000;
    const numberOfElements = Math.ceil(totalHeight / tileHeight);

    const viewportWidth = window.innerWidth;
    const width = Math.min(tileWidth, viewportWidth);

    //TODO: bg terakhir overflow, overflow-hidden di div jafinya filter gak sticky, perbaikan sementara pake -1 di numberOfElements
    // Diperbaiki dengan tidak menggunakan n - 1 maupun overfow-hidden
    for (let i = 0; i < numberOfElements; i++) {
      const isLeft = i % 2 === 0;

      elements.push(
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute z-0"
          style={{
            backgroundImage: `url(${Bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${width}px ${tileHeight}px`,
            width: `${width}px`,
            maxWidth: "100%",
            height: `${tileHeight}px`,
            left: isLeft ? "0px" : "auto",
            right: isLeft ? "auto" : "0px",
            transform: isLeft ? "none" : `translateX(calc(100% - ${width}px))`,
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
      <div
        className="flex max-lg:flex-col p-[13px] pl-[20px] relative"
        ref={containerRef}
      >
        {/* Zigzag Background */}
        {createZigzagElements()}

        {!showSecond && (
          <div className="hidden max-lg:block pr-7 pl-7">
            <div className="w-full flex flex-row gap-6 items-center">
              <img
                onClick={() => setShowSecond(true)}
                src={FilterMenu}
                alt="FilterMenu"
                className="w-5 h-5"
              />
              <h1 className="font-bold text-[36px] font-boogaloo">Filter</h1>
            </div>
          </div>
        )}

        {showSecond && (
          <div className="w-full hidden max-lg:block pr-7 pl-7 z-10">
            <div className="w-full h-auto bg-white flex flex-col pr-3 pl-3 pb-3 pt-1 items-start rounded shadow">
              <h1
                className="w-full font-bold text-[19px] font-boogaloo text-right"
                onClick={() => setShowSecond(false)}
              >
                X
              </h1>
              <div className="flex flex-wrap gap-3 items-center">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedCategory.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                      className="w-5 h-5 accent-gray-700 rounded-full"
                    />
                    <h1 className="font-bold text-[27px] font-boogaloo">
                      {cat}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col z-10">
          <div
            className={`sticky transition-all duration-300 ${
              isVisible ? "top-25" : "-top-[1px]"
            }`}
          >
            <h2 className="max-lg:hidden font-bold text-[36px] mt-[30px] ml-[60px] font-boogaloo">
              Filter
            </h2>
            {/* Filter */}
            <div className="w-[241px] max-xl:w-[200px] h-auto max-lg:hidden shadow-[0px_2px_19.3px_rgba(0,0,0,0.25)] rounded-lg p-4 text text-[28px] ml-[48px] mt-[13px]">
              <p className="font-semibold mb-2 font-baloo-2 text-[28px]">
                Kategori
              </p>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategory.includes(cat)}
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
        <div className="flex-1 space-y-10 pr-[211px] max-2xl:pr-[180px] max-xl:pr-[100px] max-lg:pr-[10px] pl-[81px] max-lg:pl-[10px] mt-[30px]">
          {shownCategories.map((cat, index) => (
            <div key={cat} className={index !== 0 ? "pt-[3px]" : ""}>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold mb-4 font-boogaloo">
                {cat}
              </h2>
              <div className="grid grid-cols-2 max-[350px]:grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                {menuData
                  .filter((item) => item.category === cat)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="relative rounded-lg shadow-[0px_2px_19.3px_rgba(0,0,0,0.25)] overflow-hidden w-full max-w-[220px] bg-white"
                    >
                      {/* Konten Card */}
                      <div className="relative z-10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="pointer-events-none select-none w-full h-[155px] object-cover"
                        />
                        <div className="p-2 flex flex-col h-auto justify-between">
                          <h3 className="font-bold text-[27px] font-boogaloo">
                            {item.name}
                          </h3>
                          <p className="mt-4 text-black text-[25px] text-start font-baloo-2">
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
