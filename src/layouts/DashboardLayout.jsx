import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
       {/* Navbar Admin */}
       {/* Sidebar Admin */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
