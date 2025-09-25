const API_URL = import.meta.env.VITE_API_URL;

const getPemesanan = async () => {
  const res = await fetch(`${API_URL}/pesanan`, {
    headers: {
      "Accept": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Gagal fetch pesanan");
  return await res.json();
};



export { getPemesanan };