const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User belum login");
  return token;
};

const getPemesanan = async () => {
  const token = getToken();
  const res = await fetch(`${API_URL}/pesanan`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Gagal fetch pesanan");
  return await res.json();
};



export { getPemesanan };