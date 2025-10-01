import React from "react";
import Close from "../../../../assets/Admin/x.svg";
import { getUsers, registerUser } from '../../../../controllers/AuthController.js'

function TambahAkun({isAddOpen, setIsAddOpen, setData, setHighlightedRow}) {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

  try {
    const newUser = await registerUser({ name, email, password });
    const users = await getUsers();
    setData(users);
    setHighlightedRow(newUser.id);
    setTimeout(() => setHighlightedRow(null), 200);

    setIsAddOpen(false);
    } catch (err) {
        console.error(err.message);
        alert(err.message);
    }
  };
  return (
    <div className={`${isAddOpen ? "translate-x-0" : "translate-x-[110%]"} duration-300 transition fixed shadow-[0px_2px_6px_rgba(0,0,0,0.25)] top-[92px] max-sm:top-0  right-0 bg-[#FEFEFE] h-[calc(100svh-92px)] max-sm:h-[468px] w-[25.75rem] max-sm:w-[356px] max-sm:mt-[188px] max-sm:mr-[17px]`}>
      <button className="p-[10px] absolute top-[11px] right-[12px] cursor-pointer" onClick={()=>setIsAddOpen(false)}>
        <img src={Close} alt="X" />
      </button>
      <div className="mx-[31px] mt-[84px] max-sm:mt-[35px] ">
        <h2 className="font-semibold text-[1.5rem] mb-[30px]">Tambah Akun</h2>
        <form onSubmit={onSubmit} className="space-y-[20px] max-sm:space-y-[7px]">
          <div className="flex gap-[8px] flex-col">
            <label htmlFor="Nama" className="">
              Nama
            </label>
            <input
              type="text"
              name="name"
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
