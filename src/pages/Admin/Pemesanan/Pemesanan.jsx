import React, { useState } from "react";
import Plus from "../../../assets/Admin/plus.svg";
import PlusGreen from "../../../assets/Admin/plusGreen.svg";
import MinRed from "../../../assets/Admin/minRed.svg";
import Cash from "../../../assets/Admin/cash.svg";
import Pencil from "../../../assets/Admin/pencil.svg";
import Sampah from "../../../assets/Admin/sampah.svg";
import Troli from "../../../assets/Admin/troli.svg";
import Credit from "../../../assets/Admin/credit.svg";
import TambahPesanan from "./Overlay/TambahPesanan";
import EditMenu from "./Overlay/EditMenu";
import ConfirmDelete from "../../../components/Admin/ConfirmDelete";
import { addPesananDetail } from "../../../controllers/PesananDetail";

function Pemesanan() {
  const [data, setData] = useState([]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [formData, setFormData] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [skipConfirm, setSkipConfirm] = useState(false);
  const [paymentDropdown, setPaymentDropdown] = useState(false);

  //format tanggal
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  //total
  const total = data.reduce((sum, item) => sum + item.harga * item.jumlah, 0);

  // +
  const handleIncrement = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? { ...item, jumlah: item.jumlah + 1 } // tetap simpan id & harga
          : item
      )
    );
  };

  // -
  const handleDecrement = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index && item.jumlah > 1
          ? { ...item, jumlah: item.jumlah - 1 } // tetap simpan id & harga
          : item
      )
    );
  };

  // input jumlah manual
  const handleInputChange = (index, value) => {
    const newValue = parseInt(value) || 1;
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? { ...item, jumlah: newValue } // tetap simpan id & harga
          : item
      )
    );
  };

  //btn delete
  const onDelete = (index) => {
    if (skipConfirm) {
      // Langsung hapus tanpa modal (hanya berlaku selama session ini)
      setData((prevData) => prevData.filter((_, i) => i !== index));
    } else {
      // Tampilkan modal
      setDeleteIndex(index);
    }
  };

  //btn edit
  const onEdit = (index) => {
    setFormData({
      nama: data[index].nama,
      jumlah: data[index].jumlah,
      harga: data[index].harga,
    });
    setEditIndex(index);
    setIsEditOpen(true);
  };

  //pilih method pembayaran
  const choosePayment = (payment) => {
    setPaymentMethod(payment);
  };

  const handleSelesai = async () => {
    if (data.length === 0) return alert("Belum ada pesanan!");

    // Pastikan paymentMethod sudah diisi, default ke "Cash" kalau belum
    const pesananData = {
      pesanan: data.map((item) => ({
        menu_id: item.id, // id pasti ada
        jumlah: item.jumlah,
      })),
      pembayaran: paymentMethod || "Cash",
    };

    try {
      await addPesananDetail(pesananData); // panggil API
      alert("Pesanan berhasil ditambahkan!");
      setData([]);
      setPaymentMethod(null);
    } catch (error) {
      alert("Gagal menambahkan pesanan: " + error.message);
    }
  };

  return (
    <div className="bg-gradient-to-b max-sm:from-[#EDF0F2] max-sm:from-[1px] max-sm:to-white max-sm:to-[1px] sm:bg-[#EDF0F2] flex flex-col min-h-[calc(100vh-92px)] pt-[1px] sm:pt-[4px] sm:pl-[13px] sm:pr-[8px] sm:pb-[8px] font-sans text-gray-800">
      <div className="grid grid-cols-[1fr_0.8px_1fr] max-sm:bg-white sm:grid-cols-[1fr_300px] max-sm:shadow-[0px_1.75849px_5.27547px_rgba(156,156,156,0.25)] md:grid-cols-[381px_1fr] sm:gap-x-3 mb-[13px] max-sm:h-[92px] max-h-[141px]">
        <div className="bg-white flex flex-col sm:shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
          <h3 className="sm:text-[#FFB300] pt-[6px] pl-[30px] sm:font-bold font-semibold sm:uppercase sm:text-[20px]">
            Tanggal
          </h3>
          <div className="flex items-center justify-center h-full">
            <p className="text-[20px] sm:text-[36px] font-semibold pb-[12px]">
              {formattedDate}
            </p>
          </div>
        </div>
        <div className="bg-[#FFB300] h-[67px] mt-[5px] sm:hidden"></div>
        <div className="bg-white sm:shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
          <h3 className="sm:text-[#FFB300] pt-[6px] pl-[19px] sm:font-bold font-semibold sm:uppercase sm:text-[20px]">
            <span className="max-sm:hidden">Total</span>
            <span className="sm:hidden">Metode Pembayaran</span>
          </h3>
          <p className="max-sm:hidden text-[47px] lg:text-[60px] font-semibold text-end mb-[15px] mr-[15px]">
            Rp. {total === 0 ? "-" : total.toLocaleString("id-ID")}
          </p>
          <div
            onClick={() => setPaymentDropdown(!paymentDropdown)}
            className="relative sm:hidden mt-[6px] m-auto pl-[20px] flex items-center justify-center w-[170px] h-[32px]"
          >
            {/* Tombol utama */}
            {paymentMethod === "cash" ? (
              <div
                className={`border border-[#CBCBCB] hover:bg-[#E9E9E9] flex w-full items-center font-semibold cursor-pointer px-[13px] gap-[13px] h-full text-[20px]`}
              >
                <img src={Cash} alt="" className="h-[18px]" />
                <p>Cash</p>
              </div>
            ) : (
              <div
                className={`border border-[#CBCBCB] hover:bg-[#E9E9E9] flex w-full items-center font-semibold cursor-pointer px-[13px] gap-[13px] h-full text-[20px]`}
              >
                <img src={Credit} alt="" className="h-[18px]" />
                <p>E - wallet</p>
              </div>
            )}

            {/* Dropdown */}
            {paymentDropdown && (
              <div className="absolute top-full left-0 mt-0.5 ml-[20px] w-[150px] border border-[#CBCBCB] bg-white z-10 rounded shadow">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setPaymentMethod("cash");
                    setPaymentDropdown(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-100  cursor-pointer"
                >
                  <img src={Cash} alt="" className="h-[18px]" />
                  <p className="text-[16px] font-medium">Cash</p>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setPaymentMethod("ewallet");
                    setPaymentDropdown(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img src={Credit} alt="" className="h-[18px]" />
                  <p className="text-[16px] font-medium">E - wallet</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-sm:mx-[9px] flex-1 grid max-sm:grid-rows-[45px_1fr] sm:grid-cols-[1fr_160px] md:grid-cols-[1fr_198px]">
        <div className="max-sm:order-2 relative shadow-[0px_2px_6px_rgba(156,156,156,0.25)] bg-[#F5F5F5] border border-[#959595] h-full min-h-[500px] overflow-x-auto">
          {/* Hapus garis kolom absolut karena sudah tidak diperlukan */}
         <div className="min-w-[450px] relative size-full">

          <div
            className={`absolute inset-0 grid grid-cols-[44.92%_14.89%_21.93%_18.25%] pointer-events-none ${
              data.length === 0 && "invisible"
            }`}
          >
            <div className="border-r border-[#959595]"></div>
            <div className="border-r border-[#959595]"></div>
            <div className="border-r border-[#959595]"></div>
            <div></div>
          </div>
          <table className="table-auto w-full [&_th]:border-[1px] [&_th]:border-r">
            <thead className="h-[47px] bg-[#FFB300] text-base font-semibold z-10">
              <tr className="border border-[#959595] [&_th]:border-[#959595]">
                <th className="w-[44.92%]">Menu</th>
                <th className="w-[14.89%]">Jumlah</th>
                <th className="w-[21.93%]">Harga</th>
                <th className="w-[18.25%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-[#F5F5F5]">
              {data.length !== 0 ? (
                data.map((val, ind) => (
                  <tr
                    key={ind}
                    className={`${
                      highlightedRow === ind
                        ? "bg-[#AFCFFF]"
                        : "even:bg-gray-200"
                    } transition-colors ease-initial duration-300 [&_td]:h-[33px] [&_td]:border-r [&_td]:border-[#959595] text-[14px] font-semibold`}
                  >
                    <td className="pl-[21px] ">{val.nama}</td>
                    <td>
                      <div className="text-center flex justify-around items-center h-full">
                        <button
                          onClick={() => {
                            handleDecrement(ind);
                          }}
                          className="group cursor-pointer h-full flex-1 flex justify-center items-center"
                        >
                          <img
                            src={MinRed}
                            alt=""
                            className="group-hover:scale-150 group-active:scale-125"
                          />
                        </button>
                        <input
                          type="text"
                          className="w-7 lg:w-10 text-center"
                          value={val.jumlah}
                          onChange={(e) =>
                            handleInputChange(ind, e.target.value)
                          }
                        />
                        <button
                          onClick={() => handleIncrement(ind)}
                          className="group cursor-pointer h-full flex-1 flex justify-center items-center"
                        >
                          <img
                            src={PlusGreen}
                            alt=""
                            className="group-hover:scale-150 group-active:scale-125"
                          />
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      Rp{" "}
                      {Number(val.harga * val.jumlah).toLocaleString("id-ID")}
                    </td>
                    <td>
                      <div className="flex items-center justify-center text-white text-[12px] font-semibold h-full gap-[4px] px-[4px] py-[5.5px]">
                        <button
                          onClick={() => onEdit(ind)}
                          className="flex-1 flex items-center justify-center bg-[#3578DC] hover:bg-[#1C66D4] active:bg-[#1554B4] h-full rounded-[5px] gap-1 cursor-pointer"
                        >
                          <img src={Pencil} alt="" />
                          <span className="max-lg:hidden">Edit</span>
                        </button>
                        <button
                          onClick={() => onDelete(ind)}
                          className="flex-1 flex items-center justify-center bg-[#DC3538] hover:bg-[#D22B2D] active:bg-[#B81C1F] h-full rounded-[5px] gap-1 cursor-pointer"
                        >
                          <img src={Sampah} alt="" />
                          <span className="max-lg:hidden">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="h-[400px] text-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h4 className="font-semibold text-sm">Data Kosong</h4>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
         </div>

        </div>
        <div className="max-sm:order-1 max-sm:justify-self-end flex flex-col justify-between mx-[10px] md:mx-[14px]">
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] max-sm:w-[135px] h-[30px] sm:h-[43px] rounded-[10px] flex gap-[7.94px] items-center justify-center cursor-pointer"
          >
            <img src={Plus} alt="plus" />
            <p className="text-[12px] md:text-[14px] font-bold text-white">
              Tambah Pesanan
            </p>
          </button>
          <div className="[&>button]:max-md:text-[14px] max-sm:hidden space-y-[8px] font-semibold">
            <p className="max-md:text-[14px]">Metode Pembayaran</p>
            <button
              onClick={() => choosePayment("cash")}
              className={`${
                paymentMethod === "cash"
                  ? "bg-[#E2E2E2] text-[#5D5D5D]"
                  : "bg-white"
              } hover:bg-[#E9E9E9] active:bg-[#E2E2E2] transition-colors flex w-full items-center cursor-pointer px-[13px] gap-[20px] h-[50px] text-[20px]`}
            >
              <img src={Cash} alt="" className="" />
              <p>Cash</p>
            </button>
            <button
              onClick={() => choosePayment("ewallet")}
              className={`${
                paymentMethod === "ewallet"
                  ? "bg-[#E2E2E2] text-[#5D5D5D]"
                  : "bg-white"
              } hover:bg-[#E9E9E9] active:bg-[#E2E2E2] transition-colors flex w-full items-center cursor-pointer px-[13px] gap-[20px] h-[50px] text-[20px]`}
            >
              <img src={Credit} alt="" className="" />
              <p>E - wallet</p>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[7px] h-[97px] sm:h-[105px] bg-white shadow-[0px_2px_35px_rgba(156,156,156,0.25)] sm:shadow-[0px_2px_6px_rgba(156,156,156,0.25)] p-[10px] flex justify-between sm:justify-end items-center">
        <div className="font-bold space-y-1 pb-2 ml-[26px] sm:border-[1.4px] sm:border-[#959595] h-full max-sm:flex-col flex sm:w-[309px] text-[14px] sm:items-center justify-center sm:justify-around">
          <p className="text-xl sm:text-end sm:text-[#FFB300]">TOTAL :</p>
          <p className="text-xl max-sm:font-semibold sm:text-[#FFB300]">
            Rp. {total === 0 ? "-" : total.toLocaleString("id-ID")}
          </p>
        </div>
        <button
          onClick={handleSelesai}
          className="bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501] text-white px-6 py-4 ml-[10px] h-[50px] sm:h-[66px] gap-[14px] cursor-pointer flex items-center w-[138px] sm:w-[174px] rounded-[10px] text-[18.93px] sm:text-xl font-semibold"
        >
          <img src={Troli} alt="" className="size-[18.93px]" />
          Selesai
        </button>
      </div>
      <div
        onClick={() => {
          setIsEditOpen(false);
          setDeleteIndex(null);
        }}
        className={`${
          isEditOpen || deleteIndex !== null ? "" : "hidden"
        } bg-black/50 fixed inset-0 h-full w-full`}
      ></div>
      <TambahPesanan
        isAddOpen={isAddOpen}
        setIsAddOpen={setIsAddOpen}
        setData={setData}
        data={data}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        setFormData={setFormData}
        setHighlightedRow={setHighlightedRow}
      />
      {isEditOpen && (
        <EditMenu
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          isAddOpen={isAddOpen}
          setIsAddOpen={setIsAddOpen}
          setData={setData}
          data={data}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          formData={formData}
          setFormData={setFormData}
          setHighlightedRow={setHighlightedRow}
        />
      )}
      {deleteIndex !== null && (
        <ConfirmDelete
          deleteId={deleteIndex}
          setDeleteId={setDeleteIndex}
          setSkipConfirm={setSkipConfirm}
          onDelete={(id) => setData((prev) => prev.filter((_, i) => i !== id))}
        />
      )}
    </div>
  );
}

export default Pemesanan;
