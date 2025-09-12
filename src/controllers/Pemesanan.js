// Pesanan.js
const API_URL = import.meta.env.VITE_API_URL;

const createPesanan = async (pesananData) => {
  try {
    const response = await fetch(`${API_URL}/pesanan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(pesananData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal membuat pesanan");
    }

    const result = await response.json();
    return result; // { pesanan_id, total_pesanan, message }
  } catch (error) {
    console.error("Error createPesanan:", error);
    throw error;
  }
};

export { createPesanan };