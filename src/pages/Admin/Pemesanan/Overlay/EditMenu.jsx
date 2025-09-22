import React from "react";
import Close from "../../../../assets/Admin/x.svg";

function EditMenu({ setFormData, formData, setIsEditOpen, isAddOpen, setIsAddOpen, setData, editIndex, setEditIndex, setHighlightedRow }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'jumlah' ? parseInt(value) || 1 : name === 'harga' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData((prevData) => prevData.map((item, i) => i === editIndex ? formData : item));
    setHighlightedRow(editIndex);
    setTimeout(() => setHighlightedRow(null), 200);
    setIsEditOpen(false);
    setEditIndex(null);
  };

  if (!formData) return null; // Safety check, though not needed after fix
  
  return (
    <div className={`${isAddOpen ? "max-sm:-translate-y-1/6 sm:-translate-x-1/4" : "translate-x-0"} transition duration-300 max-sm:delay-75 fixed inset-0 flex items-center justify-center`}>
      <div className="bg-white relative py-[32px] px-[30px] mx-[10px] w-[415px] h-[468px] sm:h-[509px] rounded-[5px] shadow-[0px_2px_6px_rgba(156,156,156,0.25)]">
        <div
          onClick={() => {setIsEditOpen(false), setIsAddOpen(false), setEditIndex(null)}}
          className="absolute top-[18px] right-[22px] cursor-pointer"
        >
          <img src={Close} alt="Close icon" />
        </div>
        <h2 className="font-semibold text-[20px] sm:text-2xl">Edit Pesanan</h2>
        <form onSubmit={handleSubmit} className="mt-[20px] sm:mt-[41px] h-full space-y-[20px] flex flex-col">
          <div>
            <label htmlFor="Menu">Menu</label>
            <input
              type="text"
              value={formData.nama}
              onChange={handleChange}
              onClick={() => setIsAddOpen(true)}
              readOnly
              className="hover:bg-[#F3F3F3] active:bg-[#E8E8E8] caret-transparent cursor-pointer w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="Menu">Jumlah</label>
            <input
              type="text"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              className="appearance-none w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="Menu">Harga</label>
            <input
              type="text"
              name="harga"
              value={`Rp ${Number(formData.harga * formData.jumlah).toLocaleString("id-ID")}`}
              onChange={handleChange}
              readOnly
              className="cursor-default caret-transparent w-full mt-[7px] pl-[13px] text-[15px] text-[#575757] border bg-[#E8E8E8] border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="self-end w-[111px] h-[31px] bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501] text-white text-[15px] rounded-[5px] cursor-pointer" 
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditMenu;
