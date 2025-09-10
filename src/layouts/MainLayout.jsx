import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="h-[104px]"></div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
