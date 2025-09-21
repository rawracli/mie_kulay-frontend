const API_URL = import.meta.env.VITE_API_URL;

const getAktivitas = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/aktivitas`, {
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

export { getAktivitas };