const API_URL = import.meta.env.VITE_API_URL;

const getMenu = async () => {
  const response = await fetch(`${API_URL}/menu`, {
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data menu");
  }

  return await response.json();
};

import Cookies from "js-cookie";
import { gctks } from "./utils/get";

const createMenu = async (formData) => {
  const response = await fetch(`${API_URL}/menu`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Gagal menambahkan menu");
  }

  return await response.json();
};

const updateMenu = async (id, data) => {
  const res = await fetch(`${API_URL}/menu/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Gagal update menu");
  return await res.json();
};


export { getMenu, createMenu, updateMenu };
