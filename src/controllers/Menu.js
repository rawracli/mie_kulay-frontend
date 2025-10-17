const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User belum login");
  return token;
};

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

const createMenu = async (formData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/menu`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Gagal menambahkan menu");
  }

  return await response.json();
};

const updateMenu = async (id, data) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/menu/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal update menu");
  return await res.json();
};


export { getMenu, createMenu, updateMenu };
