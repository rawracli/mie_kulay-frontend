const API_URL = import.meta.env.VITE_API_URL;
import { gctks } from "./utils/get";

// Ambil semua kategori
const getCategories = async () => {
  const response = await fetch(`${API_URL}/category`, {
    headers: {
      "Accept": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Gagal mengambil kategori");
  }

  return await response.json();
};

const addCategory = async (jenis_hidangan) => {
  const response = await fetch(`${API_URL}/category`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    body: JSON.stringify({ jenis_hidangan }),
    credentials: "include",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Gagal menambahkan kategori");
  }

  return await response.json();
};

const deleteCategory = async (id) => {
  const response = await fetch(`${API_URL}/category/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    credentials: "include",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Gagal menghapus kategori");
  }

  return await response.json();
};


const updateCategory = async (id, jenis_hidangan) => {
  const response = await fetch(`${API_URL}/category/${id}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    body: JSON.stringify({ jenis_hidangan }),
    credentials: "include",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Gagal memperbarui kategori");
  }

  return await response.json();
};

export { getCategories, addCategory, updateCategory, deleteCategory };

