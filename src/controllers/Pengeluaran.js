const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User belum login");
  return token;
};

const getPengeluaran = async () => {
  const token = getToken();
  const res = await fetch(`${API_URL}/pengeluaran`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Gagal fetch pengeluaran");

  const data = await res.json();
  return data;
};

const tambahPengeluaran = async (payload) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/pengeluaran`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal menambahkan pengeluaran");
  }

  const data = await res.json();
  return data;
};

const updatePengeluaran = async (id, pengeluaran, catatan) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/pengeluaran/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ pengeluaran, catatan }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal mengupdate pengeluaran");
  }

  return await res.json();
};

const hapusPengeluaran = async (id) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/pengeluaran/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  return await res.json();
};

export { getPengeluaran, tambahPengeluaran, updatePengeluaran, hapusPengeluaran };
