const API_URL = import.meta.env.VITE_API_URL;

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

export { tambahBahan };
