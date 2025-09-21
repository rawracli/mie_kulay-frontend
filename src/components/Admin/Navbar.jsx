import React, { useState, useEffect } from "react";
import ProfilePicture from "../../assets/Admin/profile.svg";
import Arrow from "../../assets/Admin/arrow.svg";
import { Link, useLocation } from "react-router-dom";
import Profile from "./Overlay/Profile";
import { getCurrentUser } from "../../controllers/AuthController";

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUserData(user);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUser();
  }, []);

  const pathResult = pathname
    .slice(1)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="h-[92px] flex justify-between items-center shadow-[0px_5px_10.8px_rgba(168,168,168,0.25)]">
      <div className="pb-[6px] px-[42px] font-semibold text-2xl flex">
        {pathname === "/dashboard" ? (
          `Selamat Datang, ${userData?.name || ""} 👋`
        ) : (
          <h2>
            <Link to="/dashboard">Dashboard</Link> &gt;{" "}
            <span className="text-[#FFB300]">{pathResult}</span>
          </h2>
        )}
      </div>
      <div className="flex gap-[18px] px-[31.92px] items-center">
        <p>{userData?.name}</p>
        <button
          onClick={() => setIsProfileOpen((prev) => !prev)}
          className="flex gap-[18px]"
        >
          <img
            src={
              userData?.avatar
                ? `${import.meta.env.VITE_API_URL_IMAGE}/storage/${
                    userData.avatar
                  }`
                : ProfilePicture
            }
            alt="profile"
            className="mb-[5px] w-[40px] h-[40px] rounded-full object-cover"
          />
          <img
            src={Arrow}
            alt="arrow"
            className={`cursor-pointer transition ${
              isProfileOpen && "rotate-180"
            }`}
          />
        </button>
      </div>
      <div
        onClick={() => {
          setIsProfileOpen(false);
        }}
        className={`${
          isProfileOpen ? "" : "hidden"
        } fixed inset-0 h-full w-full`}
      ></div>
      {isProfileOpen && (
        <Profile userData={userData} setUserData={setUserData} />
      )}
    </div>
  );
}

export default Navbar;
