const API_URL = import.meta.env.VITE_API_URL;
import { gctks } from "./utils/get";

const getPesananDetail = async () => {
    const response = await fetch(`${API_URL}/pesanan_detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": await gctks(),
      },
      credentials: "include",
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Gagal mengambil data");
    return result;
};

const addPesananDetail = async (pesananData) => {
    const response = await fetch(`${API_URL}/pesanan_detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-XSRF-TOKEN": await gctks(),
      },
      body: JSON.stringify(pesananData),
      credentials: "include",
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Gagal membuat pesanan");
    return result;
};

export { getPesananDetail, addPesananDetail };