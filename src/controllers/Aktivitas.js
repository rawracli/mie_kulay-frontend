const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User belum login");
  return token;
};

const getAktivitas = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/aktivitas`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data bahan");
  }

  return await response.json();
};

export { getAktivitas };