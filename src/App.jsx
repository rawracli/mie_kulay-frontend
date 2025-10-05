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
import ManajemenAkun from "./pages/Admin/ManajemenAkun/ManajemenAkun";
import Pengeluaran from "./pages/Admin/Pengeluaran/Pengeluaran";
import Menu from "./pages/Menu/Menu";
import Tentang from "./pages/Tentang/Tentang";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/kontak" element={<Kontak />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/tentang" element={<Tentang />}></Route>
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="admin">
            <Route index element={<Dashboard />} />
            <Route path="pemesanan" element={<Pemesanan />} />
            <Route path="manajemen-produk" element={<Stok />} />
            <Route path="log-aktivitas" element={<LogAktivitas />} />
            <Route path="manajemen-akun" element={<ManajemenAkun />} />
            <Route path="pengeluaran" element={<Pengeluaran />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
