import React, { useState } from "react";
import Navbar from "../components/Admin/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-svh flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className="flex flex-col flex-1 max-h-svh">
        <Navbar setIsOpen={setIsOpen}/>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
