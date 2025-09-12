import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="h-[52px] sm:h-20 md:h-[104px]"></div>
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default MainLayout;
