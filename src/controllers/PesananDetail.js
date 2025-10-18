const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User belum login");
  return token;
};

const getPesananDetail = async () => {
  const token = getToken();
    const response = await fetch(`${API_URL}/pesanan_detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Gagal mengambil data");
    return result;
};

const addPesananDetail = async (pesananData) => {
  const token = getToken();
    const response = await fetch(`${API_URL}/pesanan_detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(pesananData),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Gagal membuat pesanan");
    return result;
};

export { getPesananDetail, addPesananDetail };