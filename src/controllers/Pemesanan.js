const API_URL = import.meta.env.VITE_API_URL;

const getPemesanan = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/pesanan`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Gagal fetch pesanan");
  const data = await res.json();
  return data;
};


export { getPemesanan };