const API_URL = import.meta.env.VITE_API_URL;

const createMenu = async (formData) => {
  const response = await fetch(`${API_URL}/menus`, {
    method: "POST",
    body: formData, // FormData karena ada file gambar
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Gagal menambahkan menu");
  }

  return await response.json();
};

export { createMenu };
