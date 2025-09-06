import React, { useState, useEffect, useRef } from "react";
import Close from "../../../../assets/Admin/x.svg";
import useOverflow from "../../../../hooks/useOverflow";
import Login from "../../../../assets/Login/login.png";
import TambahMenu from "./TambahMenu";
import ConfirmDelete from "../../../../components/Admin/ConfirmDelete";

function TambahKategori({ setIsAddKategori }) {
  const [kategoriData, setKategoriData] = useState([
    {
      kategori: "makanan",
      menu: [
        { foto: Login, nama: "Eskrim", harga: 5005 },
        { foto: Login, nama: "Eskriem", harga: 5600 },
        { foto: Login, nama: "Eskerim", harga: 2000 },
        { foto: Login, nama: "iskrim", harga: 300 },
      ],
    },
    {
      kategori: "topping",
      menu: [
        { foto: Login, nama: "Esrim", harga: 5005 },
        { foto: Login, nama: "Eskriem", harga: 560 },
        { foto: Login, nama: "ikrim", harga: 3000 },
      ],
    },
    {
      kategori: "minuman",
      menu: [
        { foto: Login, nama: "Esrim", harga: 505 },
        { foto: Login, nama: "Eskriem", harga: 5600 },
        { foto: Login, nama: "Eskem", harga: 200 },
        { foto: Login, nama: "Eskrim", harga: 2000 },
        { foto: Login, nama: "isrim", harga: 300 },
      ],
    },
  ]);

  const { refOverflow, isOverflowing } = useOverflow({ direction: "vertical" });

  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [formNamaKategori, setFormNamaKategori] = useState("");
  const [isTambahMenuOpen, setIsTambahMenuOpen] = useState(false);
  const [skipConfirm, setSkipConfirm] = useState(false);

  const rightPanelRef = useRef(null);

  // close dropdown ketika klik di luar panel kanan
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (rightPanelRef.current && !rightPanelRef.current.contains(e.target)) {
        setActiveMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleMenu = (idx) => {
    setActiveMenuIndex((prev) => (prev === idx ? null : idx));
  };

  const onDelete = (idx) => {
    setActiveMenuIndex(null);
    if (skipConfirm) {
      setKategoriData((prev) => prev.filter((_, i) => i !== idx));
      if (editIndex === idx) {
        setEditIndex(null);
        setFormNamaKategori("");
      } else if (editIndex !== null && idx < editIndex) {
        setEditIndex((prev) => prev - 1);
      }
    } else {
      setDeleteIndex(idx);
    }
  };

  const handleClickEditBtn = (idx, e) => {
    e.stopPropagation();
    setEditIndex(idx);
    setFormNamaKategori(kategoriData[idx].kategori);
    setActiveMenuIndex(null);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      setKategoriData((prev) => {
        const copy = [...prev];
        copy[editIndex] = {
          ...copy[editIndex],
          kategori: formNamaKategori || copy[editIndex].kategori,
        };
        return copy;
      });
      setEditIndex(null);
      setFormNamaKategori("");
    } else {
      // jika tidak sedang edit → tambah kategori baru (opsional)
      if (formNamaKategori.trim() !== "") {
        setKategoriData((prev) => [
          ...prev,
          { kategori: formNamaKategori.trim(), menu: [] },
        ]);
        setFormNamaKategori("");
      }
    }
  };

  // ketika menambah menu dari TambahMenu
  const handleAddMenuToCategory = (menuObj) => {
    // jika sedang edit, tambahkan ke kategori yang sedang diedit
    if (editIndex !== null && kategoriData[editIndex]) {
      setKategoriData((prev) => {
        const copy = [...prev];
        const cat = {
          ...copy[editIndex],
          menu: [...copy[editIndex].menu, menuObj],
        };
        copy[editIndex] = cat;
        return copy;
      });
    } else {
      // kalau belum ada edit aktif → buat kategori baru (ambil nama dari formNamaKategori kalau ada)
      const newCatName = formNamaKategori.trim() || "Kategori Baru";
      setKategoriData((prev) => {
        const copy = [...prev, { kategori: newCatName, menu: [menuObj] }];
        return copy;
      });
      // set edit ke kategori baru agar user bisa lanjut edit jika perlu
      setEditIndex((prev) => (prev === null ? kategoriData.length : prev));
      setFormNamaKategori("");
    }
  };

  const currentMenu =
    editIndex !== null && kategoriData[editIndex]
      ? kategoriData[editIndex].menu
      : [];

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex h-[482px]">
      {/* Kiri */}
      <div className="bg-white relative pb-[24px] pt-[28px] flex flex-col w-[416px] rounded-l-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
        <button
          onClick={() => {
            setEditIndex(null);
            setFormNamaKategori("");
          }}
          className={`cursor-pointer absolute py-[15px] px-[11px] left-0 top-0 ${
            editIndex === null && "hidden"
          }`}
        >
          <svg
            width="25"
            height="12"
            viewBox="0 0 25 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.438576 5.42921C0.123306 5.73875 0.118665 6.24527 0.428209 6.56053L5.47251 11.6981C5.78206 12.0134 6.28857 12.0181 6.60384 11.7085C6.91911 11.399 6.92375 10.8925 6.6142 10.5772L2.13038 6.01042L6.69714 1.5266C7.01241 1.21705 7.01705 0.710543 6.70751 0.395273C6.39796 0.0800044 5.89145 0.075363 5.57618 0.384907L0.438576 5.42921ZM24.998 6.21997L25.0054 5.42L1.00638 5.20009L0.999054 6.00006L0.991723 6.80002L24.9907 7.01994L24.998 6.21997Z"
              fill="black"
            />
          </svg>
        </button>
        <div className="px-[20px]">
          <h2 className="font-semibold text-[20px]">
            {editIndex !== null ? "Edit Kategori" : "Tambah Kategori"}
          </h2>
          <div className="ml-[14px] mt-[22px] flex flex-col font-semibold">
            <label htmlFor="Nama Kategori" className="text-[14px] pb-[8px]">
              Nama Kategori
            </label>
            <input
              type="text"
              value={formNamaKategori}
              onChange={(e) => setFormNamaKategori(e.target.value)}
              className="w-full h-[38px] border-1 rounded-[4px] pl-[16px]"
            />
            {/* tombol Tambah Menu buka overlay */}
            <button
              onClick={() => {
                // jika belum ada kategori yang dipilih, kita tetap buka TambahMenu
                setIsTambahMenuOpen(true);
              }}
              className="flex text-[13px] text-[#44962D] items-center gap-[13px] mt-[21px] cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0059 7.99805H8.00586V13.998H6.00586V7.99805H0.00585938V5.99805H6.00586V-0.00195312H8.00586V5.99805H14.0059V7.99805Z"
                  fill="#44962D"
                />
              </svg>
              Tambah Menu
            </button>
          </div>
          <hr className="mt-[17.5px] text-[#737373]" />
        </div>

        {/* Grid menu */}
        <div
          ref={refOverflow}
          className={`py-[9px] flex-1 gap-[10px] mb-5 w-fit ml-[11px] grid grid-cols-3 mt-[20px] overflow-y-auto overflow-x-hidden ${
            isOverflowing && "bg-[#EBEBEB]"
          }`}
        >
          {currentMenu.map((m, i) => (
            <div
              key={i}
              className="w-[122px] h-[132px] bg-white flex flex-col shadow-[0px_2px_10.2px_rgba(0,0,0,0.25)]"
            >
              <div className="w-full h-[92px] bg-yellow-400">
                <img
                  src={m.foto}
                  alt={m.nama}
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="text-center px-[7px] font-semibold text-[14px] leading-[17px] m-auto self-center">
                {m.nama}
              </h4>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-fit self-end bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501] mr-[19px] px-[28px] pt-[4px] pb-[7px] text-white rounded-[5px] cursor-pointer"
        >
          Simpan
        </button>
      </div>

      {/* Kanan */}
      <div className="relative bg-yellow-500 font-semibold pb-[24px] pt-[28px] pl-[17px] pr-[19px] w-[213px] rounded-r-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
        <button
          className="absolute right-[22px] top-[19px] cursor-pointer"
          onClick={() => setIsAddKategori(false)}
        >
          <img src={Close} alt="X" />
        </button>
        <h2>Kategori</h2>
        <div className="space-y-[20px] ml-[3px] my-[26px] text-[13px] overflow-auto h-[calc(100%-28px)]">
          {kategoriData.map((item, idx) => (
            <div key={idx} className="relative">
              {activeMenuIndex === idx && (
                <div
                  ref={rightPanelRef}
                  className="absolute z-10 flex flex-col divide-[#959595] divide-y-[0.5px] divide-solid border-[#959595] border-[0.5px] bg-white h-[46px] w-[95px] right-0 top-4 text-[14px]"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(idx);
                    }}
                    className="text-[#A01515] pl-[7.8px] cursor-pointer text-start hover:bg-[#C0C0C0] flex-1"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={(e) => handleClickEditBtn(idx, e)}
                    className="text-[#3578DC] pl-[7.8px] cursor-pointer text-start hover:bg-[#C0C0C0] flex-1"
                  >
                    Edit
                  </button>
                </div>
              )}

              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleToggleMenu(idx)}
              >
                <h3 className="pl-[1px]">{item.kategori}</h3>
                <svg
                  width="8"
                  height="6"
                  viewBox="0 0 8 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-[7px]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.00048 5.207L7.85448 1.354L7.14748 0.645996L4.00048 3.793L0.854485 0.645996L0.146484 1.354L4.00048 5.207Z"
                    fill="black"
                  />
                </svg>
              </div>
              <hr className="mt-[5px]" />
            </div>
          ))}
        </div>
      </div>
      <div
        onClick={() => setDeleteIndex(null)}
        className={`${
          deleteIndex !== null ? "" : "hidden"
        } bg-black/50 fixed inset-0 h-full w-full rounded-[5px]`}
      ></div>
      {/* TambahMenu overlay */}
      {isTambahMenuOpen && (
        <TambahMenu
          onClose={() => setIsTambahMenuOpen(false)}
          onAdd={(menuObj) => handleAddMenuToCategory(menuObj)}
        />
      )}
      {deleteIndex !== null && (
        <ConfirmDelete
          deleteIndex={deleteIndex}
          setDeleteIndex={setDeleteIndex}
          setData={setKategoriData}
          setSkipConfirm={setSkipConfirm}
          onAfterDelete={(deletedIdx) => {
            if (editIndex === deletedIdx) {
              setEditIndex(null);
              setFormNamaKategori("");
            } else if (editIndex !== null && deletedIdx < editIndex) {
              // adjust editIndex kalau index yang dihapus lebih kecil
              setEditIndex((prev) => prev - 1);
            }
            setActiveMenuIndex(null);
          }}
        />
      )}
    </div>
  );
}

export default TambahKategori;
