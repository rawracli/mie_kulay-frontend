import React, { useState, useEffect } from "react";
import Close from "../../../../assets/Admin/x.svg";
import useOverflow from "../../../../hooks/useOverflow";
import Login from "../../../../assets/Login/login.png";
import TambahMenu from "./TambahMenu";
import ConfirmDelete from "../../../../components/Admin/ConfirmDelete";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../../../controllers/Category";
import { getMenu } from "../../../../controllers/Menu";

function TambahKategori({ setIsAddKategori }) {
  //dummy data
  const [kategoriData, setKategoriData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const { refOverflow, isOverflowing } = useOverflow({ direction: "vertical" });

  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [formNamaKategori, setFormNamaKategori] = useState("");
  const [isTambahMenuOpen, setIsTambahMenuOpen] = useState(false);
  const [skipConfirm, setSkipConfirm] = useState(false);

  // close dropdown ketika klik di luar panel kanan
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resKategori, resMenu] = await Promise.all([
          getCategories(),
          getMenu(),
        ]);

        // Gabungkan menu ke dalam kategori sesuai kategori_id
        const kategoriWithMenu = resKategori.map((cat) => {
          const menus = resMenu.filter((m) => m.kategori_id === cat.id);
          return {
            id: cat.id,
            kategori: cat.jenis_hidangan,
            menu: menus.map((m) => ({
              nama: m.nama_hidangan,
              foto: `${import.meta.env.VITE_API_URL_IMAGE}/storage/${m.gambar}`,
            })),
          };
        });

        setKategoriData(kategoriWithMenu);
      } catch (err) {
        console.error("Gagal ambil kategori/menu:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onDelete = async (idx) => {
    const kategoriToDelete = kategoriData[idx];

    if (skipConfirm) {
      try {
        await deleteCategory(kategoriToDelete.id);

        // update state lokal
        setKategoriData((prev) => prev.filter((_, i) => i !== idx));

        if (editIndex === idx) {
          setEditIndex(null);
          setFormNamaKategori("");
        } else if (editIndex !== null && idx < editIndex) {
          setEditIndex((prev) => prev - 1);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setDeleteIndex(idx);
    }
  };

  const handleClickEditBtn = (idx, e) => {
    e.stopPropagation();
    setEditIndex(idx);
    setFormNamaKategori(kategoriData[idx].kategori);
  };

  const handleSave = async () => {
    if (formNamaKategori.trim() === "") return;

    if (editIndex !== null) {
      // Update kategori di server
      try {
        const kategoriToUpdate = kategoriData[editIndex];
        const res = await updateCategory(
          kategoriToUpdate.id,
          formNamaKategori.trim()
        );

        setKategoriData((prev) => {
          const copy = [...prev];
          copy[editIndex] = {
            ...copy[editIndex],
            kategori: res.data.jenis_hidangan,
          };
          return copy;
        });

        setEditIndex(null);
        setFormNamaKategori("");
      } catch (err) {
        console.error(err);
      }
    } else {
      // Tambah kategori baru
      try {
        const res = await addCategory(formNamaKategori.trim());
        setKategoriData((prev) => [
          ...prev,
          { id: res.data.id, kategori: res.data.jenis_hidangan, menu: [] },
        ]);
        setFormNamaKategori("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddMenuToCategory = async () => {
    try {
      // ambil data menu terbaru dari server
      const resMenu = await getMenu();

      setKategoriData((prev) =>
        prev.map((cat) => {
          const menus = resMenu.filter((m) => m.kategori_id === cat.id);
          return {
            ...cat,
            menu: menus.map((m) => ({
              nama: m.nama_hidangan,
              foto: `${import.meta.env.VITE_API_URL_IMAGE}/storage/${m.gambar}`,
            })),
          };
        })
      );
    } catch (err) {
      console.error("Gagal refresh menu:", err);
    }
  };

  const currentMenu =
    editIndex !== null && kategoriData[editIndex]
      ? kategoriData[editIndex].menu
      : [];

  return (
    <>
      <div
        className={`max-md:absolute md:fixed top-1/2 -translate-y-[calc(50%-1rem)] -translate-x-1/2 flex max-md:flex-col md:h-[482px] ${
          isTambahMenuOpen
            ? "max-md:left-1/2 md:left-[calc(50%-5rem)]"
            : "left-1/2"
        }`}
      >
        {/* Kiri */}
        <div className="bg-white relative pb-[24px] pt-[28px] flex flex-col w-[340px] sm:w-[416px] max-sm:rounded-t-[5px] sm:rounded-l-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
          <button
            onClick={() => {
              setEditIndex(null);
              setFormNamaKategori("");
            }}
            className={`cursor-pointer absolute py-[15px] px-[11px] left-0 -top-1 ${
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
            <div className="mx-[14px] mt-[22px] flex flex-col font-semibold">
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
              <hr className="-mx-[14px] mt-[21px] text-[#737373]" />
              <button
                onClick={() => {
                  // jika belum ada kategori yang dipilih, kita tetap buka TambahMenu
                  setIsTambahMenuOpen(true);
                }}
                className="flex text-[13px] text-[#44962D] items-center gap-[13px] mt-[16px] cursor-pointer"
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
          </div>

          {/* Grid menu */}
          <div
            ref={refOverflow}
            className={`py-[9px] flex-1 gap-[10px] px-1 mb-5 w-fit ml-[11px] grid grid-cols-3 mt-[20px] min-h-40 sm:min-h-30 max-h-40 sm:max-h-30 md:max-h-none overflow-y-auto overflow-x-hidden ${
              isOverflowing && "bg-[#EBEBEB]"
            }`}
          >
            {currentMenu.length === 0 ? (
              <div className="max-sm:mt-[104px]"></div>
            ) : (
              currentMenu.map((m, i) => (
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
                  <h4 className="pl-[4px] font-semibold text-[14px] leading-[17px] m-auto self-center">
                    {m.nama}
                  </h4>
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleSave}
            className="w-fit self-end bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501] mr-[19px] px-[28px] pt-[4px] pb-[7px] text-white rounded-[5px] cursor-pointer"
          >
            Simpan
          </button>
        </div>

        {/* Kanan */}
        <div className="relative bg-yellow-500 font-semibold pb-[24px] pt-[28px] pl-[17px] pr-[19px] md:w-[213px] max-sm:rounded-b-[5px] md:rounded-r-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
          <button
            className="absolute right-[22px] top-[19px] cursor-pointer"
            onClick={() => setIsAddKategori(false)}
          >
            <img src={Close} alt="X" />
          </button>
          <h2>Kategori</h2>
          <div className="space-y-[20px] ml-[3px] mt-[26px] md:my-[26px] text-[13px] max-md:max-h-50 overflow-auto h-[calc(100%-28px)]">
            {isLoading ? (
              <div className="text-center">Memuat data...</div>
            ) : (
              kategoriData.map((item, idx) => (
                <div key={idx}>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={(e) => handleClickEditBtn(idx, e)}
                  >
                    <h3 className="pl-[1px]">{item.kategori}</h3>
                    <button
                      className="group cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(idx);
                      }}
                    >
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-black group-hover:fill-[#EC0000]"
                      >
                        <path d="M1 14.5C1 14.8978 1.15804 15.2794 1.43934 15.5607C1.72064 15.842 2.10218 16 2.5 16H11.5C11.8978 16 12.2794 15.842 12.5607 15.5607C12.842 15.2794 13 14.8978 13 14.5V4.00001H1V14.5ZM9.5 6.50001C9.5 6.3674 9.55268 6.24022 9.64645 6.14645C9.74021 6.05268 9.86739 6.00001 10 6.00001C10.1326 6.00001 10.2598 6.05268 10.3536 6.14645C10.4473 6.24022 10.5 6.3674 10.5 6.50001V13.5C10.5 13.6326 10.4473 13.7598 10.3536 13.8536C10.2598 13.9473 10.1326 14 10 14C9.86739 14 9.74021 13.9473 9.64645 13.8536C9.55268 13.7598 9.5 13.6326 9.5 13.5V6.50001ZM6.5 6.50001C6.5 6.3674 6.55268 6.24022 6.64645 6.14645C6.74021 6.05268 6.86739 6.00001 7 6.00001C7.13261 6.00001 7.25979 6.05268 7.35355 6.14645C7.44732 6.24022 7.5 6.3674 7.5 6.50001V13.5C7.5 13.6326 7.44732 13.7598 7.35355 13.8536C7.25979 13.9473 7.13261 14 7 14C6.86739 14 6.74021 13.9473 6.64645 13.8536C6.55268 13.7598 6.5 13.6326 6.5 13.5V6.50001ZM3.5 6.50001C3.5 6.3674 3.55268 6.24022 3.64645 6.14645C3.74021 6.05268 3.86739 6.00001 4 6.00001C4.13261 6.00001 4.25979 6.05268 4.35355 6.14645C4.44732 6.24022 4.5 6.3674 4.5 6.50001V13.5C4.5 13.6326 4.44732 13.7598 4.35355 13.8536C4.25979 13.9473 4.13261 14 4 14C3.86739 14 3.74021 13.9473 3.64645 13.8536C3.55268 13.7598 3.5 13.6326 3.5 13.5V6.50001ZM13.5 1.00001H9.75L9.45625 0.41563C9.39402 0.290697 9.29817 0.185606 9.17947 0.11218C9.06078 0.0387537 8.92395 -9.46239e-05 8.78438 5.47897e-06H5.2125C5.07324 -0.00052985 4.93665 0.0381736 4.81838 0.111682C4.7001 0.18519 4.60492 0.290529 4.54375 0.41563L4.25 1.00001H0.5C0.367392 1.00001 0.240215 1.05268 0.146447 1.14645C0.0526784 1.24022 0 1.3674 0 1.50001L0 2.50001C0 2.63261 0.0526784 2.75979 0.146447 2.85356C0.240215 2.94733 0.367392 3.00001 0.5 3.00001H13.5C13.6326 3.00001 13.7598 2.94733 13.8536 2.85356C13.9473 2.75979 14 2.63261 14 2.50001V1.50001C14 1.3674 13.9473 1.24022 13.8536 1.14645C13.7598 1.05268 13.6326 1.00001 13.5 1.00001Z" />
                      </svg>
                    </button>
                  </div>
                  <hr className="mt-[5px]" />
                </div>
              ))
            )}
          </div>
        </div>
        <div
          onClick={() => {
            setDeleteIndex(null);
            setIsTambahMenuOpen(false);
          }}
          className={`${
            deleteIndex !== null || isTambahMenuOpen
              ? deleteIndex !== null && "bg-black/50"
              : "hidden"
          }  fixed inset-0 h-full w-full rounded-[5px]`}
        ></div>
        {deleteIndex !== null && (
          <ConfirmDelete
            deleteId={kategoriData[deleteIndex].id} // id kategori
            setDeleteId={setDeleteIndex}
            setSkipConfirm={setSkipConfirm}
            onDelete={async (id) => {
              await deleteCategory(id); // hapus kategori di server
              setKategoriData((prev) => prev.filter((item) => item.id !== id));

              if (editIndex === deleteIndex) {
                setEditIndex(null);
                setFormNamaKategori("");
              } else if (editIndex !== null && deleteIndex < editIndex) {
                setEditIndex((prev) => prev - 1);
              }
            }}
          />
        )}
      </div>
      {/* TambahMenu overlay */}
      {isTambahMenuOpen && (
        <TambahMenu
          onClose={() => setIsTambahMenuOpen(false)}
          onAdd={(menuObj) => handleAddMenuToCategory(menuObj)}
        />
      )}
    </>
  );
}

export default TambahKategori;
