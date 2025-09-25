const API_URL = import.meta.env.VITE_API_URL;

const getMenu = async () => {
  const response = await fetch(`${API_URL}/menu`, {
    headers: {
      "Accept": "application/json",
    },
    credentials: "include",
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


export { getMenu, createMenu };
