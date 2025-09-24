const API_URL = import.meta.env.VITE_API_URL;
const getWEB = import.meta.env.VITE_API_URL_IMAGE;

const getBahan = async () => {
  const response = await fetch(`${API_URL}/bahan`, {
    headers: { "Accept": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data bahan");
  }

  return await response.json();
};

import Cookies from "js-cookie";
const gctks = async () => {
  await fetch(`${getWEB}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
  const csrfToken = Cookies.get('XSRF-TOKEN');
  return csrfToken;
};

const tambahBahan = async (data) => {
  // 2. Baru POST bahan - PERBAIKI URL INI
  const res = await fetch(`${API_URL}/tambah/bahan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    credentials: "include",
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return await res.json();
};

const updateBahan = async (id, payload) => {
  const response = await fetch(`${API_URL}/edit/bahan/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Gagal update bahan: ${response.status}`);
  }

  return response.json();
};

const hapusBahan = async (id) => {
  const response = await fetch(`${API_URL}/hapus/bahan/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Gagal hapus bahan: ${response.status}`);
  }

  return response.json();
};

export { getBahan, tambahBahan, updateBahan, hapusBahan };

