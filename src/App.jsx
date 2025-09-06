import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Pemesanan from "./pages/Admin/Pemesanan/Pemesanan";
import Stok from "./pages/Admin/Stok/Stok";
import LogAktivitas from "./pages/Admin/LogAktivitas/LogAktivitas";
import Kontak from "./pages/Kontak/kontak";
import Tentang from "./pages/Tentang/tentang";
import Menu from "./pages/Menu/menu";


function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/kontak" element={<Kontak />}></Route>
          <Route path="/tentang" element={<Tentang />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/pemesanan" element={<Pemesanan />}></Route>
          <Route path="/stok" element={<Stok />}></Route>
          <Route path="/log-aktivitas" element={<LogAktivitas />}></Route>
        </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Home />}></Route>

      </Routes>
    </>
  );
}

export default App;
