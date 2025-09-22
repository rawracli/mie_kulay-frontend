import React, { useState, useEffect } from "react";
import ProfilePicture from "../../assets/Admin/profile.svg";
import Arrow from "../../assets/Admin/arrow.svg";
import { Link, useLocation } from "react-router-dom";
import Profile from "./Overlay/Profile";
import { getCurrentUser } from "../../controllers/AuthController";

function Navbar({ setIsOpen }) {
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
      <div className="pl-[24px] md:pb-[6px] md:pl-[42px] font-semibold text-base md:text-2xl flex max-md:items-center">
        <svg
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden cursor-pointer"
          width="26"
          height="18"
          viewBox="0 0 26 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 2.09375C0 1.77052 0.128404 1.46052 0.356964 1.23196C0.585524 1.0034 0.895517 0.875 1.21875 0.875H24.7812C25.1045 0.875 25.4145 1.0034 25.643 1.23196C25.8716 1.46052 26 1.77052 26 2.09375C26 2.41698 25.8716 2.72698 25.643 2.95554C25.4145 3.1841 25.1045 3.3125 24.7812 3.3125H1.21875C0.895517 3.3125 0.585524 3.1841 0.356964 2.95554C0.128404 2.72698 0 2.41698 0 2.09375ZM0 9C0 8.67677 0.128404 8.36677 0.356964 8.13821C0.585524 7.90965 0.895517 7.78125 1.21875 7.78125H24.7812C25.1045 7.78125 25.4145 7.90965 25.643 8.13821C25.8716 8.36677 26 8.67677 26 9C26 9.32323 25.8716 9.63323 25.643 9.86179C25.4145 10.0903 25.1045 10.2188 24.7812 10.2188H1.21875C0.895517 10.2188 0.585524 10.0903 0.356964 9.86179C0.128404 9.63323 0 9.32323 0 9ZM1.21875 14.6875C0.895517 14.6875 0.585524 14.8159 0.356964 15.0445C0.128404 15.273 0 15.583 0 15.9062C0 16.2295 0.128404 16.5395 0.356964 16.768C0.585524 16.9966 0.895517 17.125 1.21875 17.125H24.7812C25.1045 17.125 25.4145 16.9966 25.643 16.768C25.8716 16.5395 26 16.2295 26 15.9062C26 15.583 25.8716 15.273 25.643 15.0445C25.4145 14.8159 25.1045 14.6875 24.7812 14.6875H1.21875Z"
            fill="black"
          />
        </svg>
        <div className="max-md:pl-[30px]">
          {pathname === "/dashboard" ? (
            <h2>
              Selamat Datang,{" "}
              <span className="text-nowrap">{userData?.name || ""} 👋</span>
            </h2>
          ) : (
            <h2 className="max-sm:text-center max-sm:hidden">
              <Link to="/dashboard" className="max-sm:hidden">
                Dashboard
              </Link>{" "}
              &gt;{" "}
              <span className="sm:text-[#FFB300] text-nowrap">
                {pathResult}
              </span>
            </h2>
          )}
        </div>
      </div>
      {!(pathname === "/dashboard") && (
        <h2 className="max-sm:text-center sm:hidden text-[20px] font-semibold">
          {pathResult}
        </h2>
      )}
      <div className="flex gap-[18px] pr-[31.92px] items-center">
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
