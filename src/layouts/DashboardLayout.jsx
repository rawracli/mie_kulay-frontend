import React from "react";
import Navbar from "../components/Admin/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
function MainLayout() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex flex-col flex-1 max-h-screen">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
