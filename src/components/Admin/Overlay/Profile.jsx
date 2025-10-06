import React, { useState, useRef } from "react";
import { updateProfile } from "../../../controllers/AuthController";
import ProfilePicture from "../../../assets/Admin/profile.svg";

function Show({ userData, setIsEdit, editResponse }) {
  return (
    <div className="pt-[10px] pl-[19px] pr-[12px] flex-1 flex flex-col pb-[33px] border-[#959595] border-[0.5px]">
      <div className="">
        <div className="flex justify-between pt-[16px] pb-[13px] border-b-1 border-[#D9D9D9]">
          <h5 className="text-[20px]">Id</h5>
          <p className="text-[#959595]">{userData.id}</p>
        </div>
        <div className="flex justify-between pt-[16px] pb-[13px] border-b-1 border-[#D9D9D9]">
          <h5 className="text-[20px]">Role</h5>
          <p className="text-[#959595]">{userData.role}</p>
        </div>
        <div className="flex justify-between pt-[16px] pb-[13px] border-b-1 border-[#D9D9D9]">
          <h5 className="text-[20px]">Email</h5>
          <p className="text-[#959595]">{userData.email}</p>
        </div>
      </div>
      {editResponse && (
        <p className="text-green-600 self-center">{editResponse}</p>
      )}
      <button
        onClick={() => setIsEdit(true)}
        className="text-white cursor-pointer w-[115px] h-[37px] rounded-[10px] mt-[45px] self-end bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501]"
      >
        Edit
      </button>
    </div>
  );
}

function Edit({ userData, setUserData, setIsEdit, setEditResponse }) {
  const [alertMessage, setAlertMessage] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("_method", "PUT");

    try {
      const res = await updateProfile(formData); // panggil API
      if (res.user) {
        setUserData(res.user); // update state kalau ada user
      }
      setEditResponse("Berhasil update profile");
      setIsEdit(false);
    } catch (err) {
      setAlertMessage(err.message);
    }
  };
  return (
    <div className="border-[#959595] border-[0.5px] flex-1  overflow-y-auto max-h-[450px]">
      {alertMessage && <p className="text-red-700 ml-2 mt-2">{alertMessage}</p>}
      <form
        onSubmit={onSubmit}
        className="pt-[13px] pl-[29px] pr-[26px] flex flex-col pb-[33px] "
      >
        <div className="space-y-[15px]">
          {["name", "email"].map((val, idx) => (
            <div key={idx} className="flex flex-col gap-[5px]">
              <label htmlFor={val} className="">
                {val.slice(0, 1).toUpperCase() + val.slice(1, val.length)}
              </label>
              <input
                id={val}
                name={val}
                type="text"
                className="pl-[9px] border border-[#959595] text-[14px] h-[29px] rounded-[5px]"
                defaultValue={userData[val]}
                required
              />
            </div>
          ))}
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="current_password" className="">
              Password Lama
            </label>
            <input
              id="current_password"
              name="current_password"
              type="password"
              className="pl-[9px] border border-[#959595] text-[14px] h-[29px] rounded-[5px]"
              required
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="password" className="">
              Password Baru
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="pl-[9px] border border-[#959595] text-[14px] h-[29px] rounded-[5px]"
              required
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="password_confirmation" className="">
              Konfirmasi Password Baru
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              className="pl-[9px] border border-[#959595] text-[14px] h-[29px] rounded-[5px]"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white cursor-pointer w-[115px] h-[37px] rounded-[10px] mt-[22px] self-end bg-[#FFB300] hover:bg-[#F1A900] active:bg-[#D59501]"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

function Profile({ userData, setUserData }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editResponse, setEditResponse] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("_method", "PUT"); // supaya cocok dengan updateProfile di backend

    try {
      const res = await updateProfile(formData);
      if (res.user) {
        setUserData(res.user); // update state dari data server (path avatar baru)
        setEditResponse("Avatar berhasil diganti");
      }
    } catch (err) {
      setEditResponse(err.message || "Gagal upload avatar");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fixed font-semibold right-0 top-[92px] flex flex-col z-10 h-[calc(100%-92px)] w-100 bg-white">
      <div className="h-[261px] w-full">
        <div
          className="size-full flex items-end bg-[#D9D9D9] relative"
          style={{
            backgroundImage: userData.avatar
              ? `url(${import.meta.env.VITE_API_URL_IMAGE}/storage/${
                  userData.avatar
                })`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!userData.avatar && (
            <svg
              className="mx-auto"
              width="171"
              height="191"
              viewBox="0 0 171 191"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M85.4997 105.958C114.38 105.958 137.791 82.5466 137.791 53.6667C137.791 24.7868 114.38 1.375 85.4997 1.375C56.6198 1.375 33.208 24.7868 33.208 53.6667C33.208 82.5466 56.6198 105.958 85.4997 105.958Z"
                stroke="#737373"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M169.166 189.625C169.166 167.435 160.351 146.154 144.661 130.464C128.97 114.773 107.689 105.958 85.4997 105.958C63.3099 105.958 42.029 114.773 26.3384 130.464C10.6479 146.154 1.83301 167.435 1.83301 189.625"
                stroke="#737373"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
          <div className="absolute bg-[linear-gradient(359.42deg,rgba(0,0,0,0.44)_0.72%,rgba(255,255,255,0)_71.46%,rgba(255,255,255,0)_99.72%)] flex justify-between items-end size-full ">
            <h4
              className={`text-white text-[32px] pl-[16px] pb-[12px] ${
                isEdit && "invisible"
              }`}
            >
              {userData?.name}
            </h4>
            <button
              type="button"
              onClick={triggerFileInput}
              className="bg-white hover:bg-gray-100 active:bg-gray-200 cursor-pointer shadow-[1.5px_1.5px_0_0_#FFB300] size-[54px] rounded-full mb-[6.5px] mr-[10.5px]"
            >
              <svg
                className="m-auto"
                width="26"
                height="27"
                viewBox="0 0 26 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6683 9.1897L17 10.5214L4.13667 23.3564H2.83333V22.053L15.6683 9.1897ZM20.7683 0.689697C20.4142 0.689697 20.0458 0.831364 19.7767 1.10053L17.1842 3.69303L22.4967 9.00553L25.0892 6.41303C25.6417 5.86053 25.6417 4.9397 25.0892 4.41553L21.7742 1.10053C21.4908 0.817197 21.1367 0.689697 20.7683 0.689697ZM15.6683 5.20886L0 20.8772V26.1897H5.3125L20.9808 10.5214L15.6683 5.20886Z"
                  fill="black"
                />
              </svg>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </div>
      {isEdit ? (
        <Edit
          userData={userData}
          setUserData={setUserData}
          setIsEdit={setIsEdit}
          setEditResponse={setEditResponse}
        />
      ) : (
        <Show
          userData={userData}
          setIsEdit={setIsEdit}
          editResponse={editResponse}
        />
      )}
    </div>
  );
}

export default Profile;
