import React from "react";
import Close from "../../../../assets/Admin/x.svg";

function TambahAkun({isAddOpen, setIsAddOpen, setData, setHighlightedRow}) {
  const onSubmit = (formData) => {
    const index = `IDX${Math.floor(Math.random() * 100000)}`;
    setData((prevData) => [
      ...prevData,
      {
        id: index,
        nama: formData.get("nama"),
        email: formData.get("email"),
        password: formData.get("password"),
      },
    ]);
    setHighlightedRow(index);
    setTimeout(() => setHighlightedRow(null), 200);
    setIsAddOpen(false);
      };
  return (
    <div className={`${isAddOpen ? "translate-x-0" : "translate-x-[110%]"} transition fixed shadow-[0px_2px_6px_rgba(0,0,0,0.25)] top-[92px] right-0 bg-[#FEFEFE] h-[calc(100svh-92px)] w-[25.75rem]`}>
      <button className="p-[10px] absolute top-[11px] right-[12px] cursor-pointer" onClick={()=>setIsAddOpen(false)}>
        <img src={Close} alt="X" />
      </button>
      <div className="mx-[31px] mt-[84px] ">
        <h2 className="font-semibold text-[1.5rem] mb-[30px]">Tambah Akun</h2>
        <form action={onSubmit} className="space-y-[20px]">
          <div className="flex gap-[8px] flex-col">
            <label htmlFor="Nama" className="">
              Nama
            </label>
            <input
              type="text"
              name="nama"
              required
              className="w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div className="flex gap-[8px] flex-col">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div className="flex gap-[8px] flex-col">
            <label htmlFor="Password">Password</label>
            <input
              type="text"
              name="password"
              required
              className="w-full mt-[7px] pl-[13px] text-[15px] border border-[#7E7E7E] rounded-[4px] h-[50px] focus:outline-none"
            />
          </div>
          <div className="flex justify-end pt-[12px]">
            <button className="text-white bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501] text-[15px] px-[1.75rem] pt-[4px] pb-[5px] rounded-[5px] cursor-pointer">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TambahAkun;
