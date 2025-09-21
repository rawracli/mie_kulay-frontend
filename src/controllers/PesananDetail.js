const API_URL = import.meta.env.VITE_API_URL;

const getPesananDetail = async () => {
  try {
    const token = localStorage.getItem("token");
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
  } catch (error) {
    console.error("Error getPesananDetail:", error);
    return [];
  }
};

const addPesananDetail = async (pesananData) => {
  try {
    const token = localStorage.getItem("token");
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
  } catch (error) {
    console.error("Error addPesananDetail:", error);
    throw error;
  }
};

export { getPesananDetail, addPesananDetail };