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

  function Pemesanan() {
    const [data, setData] = useState([
      {nama: "Makanan", jumlah: 3, harga: 35000},
      {nama: "Minum", jumlah: 2, harga: 35000},
      {nama: "Maam", jumlah: 3, harga: 35000},  
      {nama: "MakaDnan", jumlah: 4, harga: 35000},
    ]);
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [formData, setFormData] = useState(null);
    const [highlightedRow, setHighlightedRow] = useState(null)

    //format tanggal
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    //total
    const total = data.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);

    // +
    const handleIncrement = (index) => {
      setData((prevData) =>
        prevData.map((item, i) =>
          i === index ? {nama: item.nama, jumlah: item.jumlah + 1, harga: item.harga} : item
        )
      );
    };

    // -
    const handleDecrement = (index) => {
      setData((prevData) =>
        prevData.map((item, i) =>
          i === index && item.jumlah > 1 ? {nama: item.nama, jumlah: item.jumlah - 1, harga: item.harga} : item
        )
      );
    };

    // input jumlah manual
    const handleInputChange = (index, value) => {
      const newValue = parseInt(value) || 1; // Default ke 1 jika input tidak valid
      setData((prevData) =>
        prevData.map((item, i) =>
          i === index ? {nama: item.nama, jumlah: newValue, harga: item.harga} : item
        )
      );
    };

    //btn delete
    const onDelete = (index) => {
      setData((prevData) => prevData.filter((_, i) => i !== index));
    }

    //btn edit
    const onEdit = (index) => {
      setFormData({
        nama: data[index].nama,
        jumlah: data[index].jumlah,
        harga: data[index].harga,
      });
      setEditIndex(index)
      setIsEditOpen(true)
    }

    //pilih method pembayaran
    const choosePayment = (payment) => {
      setPaymentMethod(payment);
    }

    return (
      <div className="bg-[#EDF0F2] flex flex-col min-h-[calc(100vh-92px)] pt-[4px] pl-[13px] pr-[8px] pb-[8px] font-sans text-gray-800">
        <div className="grid grid-cols-[377px_1fr] gap-x-3 overflow-hidden mb-4 max-h-[141px]">
          <div className="bg-white flex flex-col shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
            <h3 className="text-[#FFB300] pt-[6px] pl-[30px] font-bold uppercase text-[20px]">
              Tanggal
            </h3>
            <div className="flex items-center justify-center h-full">
              <p className="text-[36px] font-semibold pb-[12px]">{formattedDate}</p>
            </div>
          </div>
          <div className="bg-white shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
            <h3 className="text-[#FFB300] pt-[6px] pl-[19px] font-bold uppercase text-[20px]">
              Total
            </h3>
            <p className="text-[60px] font-semibold text-end mb-[15px] mr-[15px]">
              Rp. {total === 0 ? "-" : total.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        <div className="bg-[#F5F5F5] flex-1 grid grid-cols-[1fr_198px] overflow-hidden">
          <div className="relative shadow-[0px_2px_6px_rgba(156,156,156,0.25)] border border-[#959595] h-full">
            <div className={`absolute inset-0 grid grid-cols-[44.92%_14.89%_21.93%_18.25%] pointer-events-none ${data.length === 0 && "invisible"}`}>
              <div className="border-r border-[#959595]"></div>
              <div className="border-r border-[#959595]"></div>
              <div className="border-r border-[#959595]"></div>
              <div></div>
            </div>
            <table className="table-auto w-full [&_th]:border-[1px] [&_th]:border-r">
              <thead className="h-[47px] bg-[#FFB300] text-base font-semibold">
                <tr className="border border-[#959595] [&_th]:border-[#959595]">
                  <th className="w-[44.92%]">Menu</th>
                  <th className="w-[14.89%]">Jumlah</th>
                  <th className="w-[21.93%]">Harga</th>
                  <th className="w-[18.25%]">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-[#F5F5F5]">
              {data.length !== 0 ? data.map((val, ind) => (
                  <tr
                    key={ind}
                    className={`${highlightedRow === ind ? 'bg-[#AFCFFF]' : 'even:bg-[#DCDCDC]'} transition-colors ease-initial duration-300 [&_td]:h-[33px] [&_td]:border-r [&_td]:border-[#959595] text-[14px] font-semibold`}
                  >
                    <td className="pl-[21px] ">{val.nama}</td>
                    <td>
                      <div className="text-center flex justify-around items-center h-full">
                        <button onClick={()=>{handleDecrement(ind)}} className="group cursor-pointer h-full flex-1 flex justify-center items-center">
                          <img src={MinRed} alt="" className="group-hover:scale-150 group-active:scale-125"/>
                        </button>
                        <input  
                          type="text"
                          className="w-10 text-center"
                          value={val.jumlah}
                          onChange={(e)=>handleInputChange(ind, e.target.value)}
                        />
                        <button onClick={()=>handleIncrement(ind)} className="group cursor-pointer h-full flex-1 flex justify-center items-center">
                          <img src={PlusGreen} alt="" className="group-hover:scale-150 group-active:scale-125"/>
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      Rp {Number(val.harga * val.jumlah).toLocaleString("id-ID")}
                    </td>
                    <td>
                      <div className="flex items-center justify-center text-white text-[12px] font-semibold h-full gap-[4px] px-[4px] py-[5.5px]">
                        <button onClick={() => onEdit(ind)} className="flex-1 flex items-center justify-center bg-[#3578DC] hover:bg-[#1C66D4] active:bg-[#1554B4] h-full rounded-[5px] gap-1 cursor-pointer">
                          <img src={Pencil} alt="" />
                          Edit
                        </button>
                        <button onClick={() => onDelete(ind)} className="flex-1 flex items-center justify-center bg-[#DC3538] hover:bg-[#D22B2D] active:bg-[#B81C1F] h-full rounded-[5px] gap-1 cursor-pointer">
                          <img src={Sampah} alt="" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                : 
                <div className="absolute right-1/2 translate-x-1/2 top-1/2 translate-y-1/2">
                  <h4 className="font-semibold text-sm">Data Kosong</h4>
              </div>
              }
              </tbody>
            </table>
          </div>
          <div className="flex flex-col justify-between mx-[14px]">
            <button onClick={(()=>setIsAddOpen(true))} className="bg-[#44962D] hover:bg-[#3E8C29] active:bg-[#3A7D27] h-[43px] rounded-[10px] flex gap-[7.94px] items-center justify-center cursor-pointer">
              <img src={Plus} alt="plus" />
              <p className="text-[14px] font-bold text-white">Tambah Pesanan</p>
            </button>
            <div className="space-y-[8px] font-semibold">
              <p>Metode Pembayaran</p>
              <button onClick={() => choosePayment("cash")} className={`${paymentMethod === "cash" ? "bg-[#E2E2E2] text-[#5D5D5D]" : "bg-white" } hover:bg-[#E9E9E9] active:bg-[#E2E2E2] transition-colors flex w-full items-center cursor-pointer px-[13px] gap-[20px] h-[50px] text-[20px]`}>
                  <img src={Cash} alt="" className="" />
                <p>Cash</p>
              </button>
              <button onClick={() => choosePayment("ewallet")} className={`${paymentMethod === "ewallet" ? "bg-[#E2E2E2] text-[#5D5D5D]" : "bg-white" } hover:bg-[#E9E9E9] active:bg-[#E2E2E2] transition-colors flex w-full items-center cursor-pointer px-[13px] gap-[20px] h-[50px] text-[20px]`}>
                  <img src={Credit} alt="" className="" />
                <p>E - wallet</p>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-[7px] h-[105px] bg-white shadow-[0px_2px_6px_rgba(156,156,156,0.25)] p-[10px] flex justify-end items-center">
          <div className="font-bold space-y-1 border-[1.4px] border-[#959595] h-full flex w-[309px] text-[14px] items-center justify-around">
              <p className="text-xl text-end text-[#FFB300]">TOTAL :</p>
              <p className="text-xl text-[#FFB300]">
                Rp. {total === 0 ? "-" : total.toLocaleString("id-ID")}
              </p>
          </div>
          <button className="bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501] text-white px-6 py-4 ml-[10px] h-[66px] gap-[14px] cursor-pointer flex items-center w-[174px] rounded-[10px] text-xl font-semibold">
            <img src={Troli} alt="" className="" />
            Selesai
          </button>
        </div>
        <div className={`${isEditOpen ? "" : "hidden"} bg-black/50 fixed inset-0 h-full w-full`}></div>
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
      </div>
    );
  }

  export default Pemesanan;
