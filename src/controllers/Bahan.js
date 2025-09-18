const API_URL = import.meta.env.VITE_API_URL;

const getBahan = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/bahan`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data bahan");
  }

  return await response.json();
};

const tambahBahan = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/tambah/bahan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Gagal menambahkan bahan mentah");
  }

  return await response.json();
};

const updateBahan = async (id, payload) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/edit/bahan/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Gagal update bahan: ${response.status}`);
  }

  return response.json();
};

const hapusBahan = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/hapus/bahan/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Gagal hapus bahan: ${response.status}`);
  }

  return response.json();
};

export { getBahan, tambahBahan, updateBahan, hapusBahan };

