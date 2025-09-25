const API_URL = import.meta.env.VITE_API_URL;
import { gctks } from "./utils/get";

const getPengeluaran = async () => {
  const res = await fetch(`${API_URL}/pengeluaran`, {
    headers: {
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Gagal fetch pengeluaran");

  const data = await res.json();
  return data;
};

const tambahPengeluaran = async (payload) => {
  const res = await fetch(`${API_URL}/pengeluaran`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal menambahkan pengeluaran");
  }

  const data = await res.json();
  return data;
};

const updatePengeluaran = async (id, pengeluaran, catatan) => {
  const res = await fetch(`${API_URL}/pengeluaran/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    body: JSON.stringify({ pengeluaran, catatan }),
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal mengupdate pengeluaran");
  }

  return await res.json();
};

const hapusPengeluaran = async (id) => {
  const res = await fetch(`${API_URL}/pengeluaran/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    credentials: "include",
  });

  return await res.json();
};

export { getPengeluaran, tambahPengeluaran, updatePengeluaran, hapusPengeluaran };
