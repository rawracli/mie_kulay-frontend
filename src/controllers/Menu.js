const API_URL = import.meta.env.VITE_API_URL;

const getMenu = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/menu`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data menu");
  }

  return await response.json();
};

const createMenu = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/menu`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: formData, // FormData karena ada file gambar
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Gagal menambahkan menu");
  }

  return await response.json();
};

export { getMenu, createMenu };
