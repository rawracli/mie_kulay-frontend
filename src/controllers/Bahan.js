const API_URL = import.meta.env.VITE_API_URL;
import { gctks } from "./utils/get";

const getBahan = async () => {
  const response = await fetch(`${API_URL}/bahan`, {
    headers: { "Accept": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data bahan");
  }

  return await response.json();
};

const tambahbahanMenu = async (data) => {
  const res = await fetch(`${API_URL}/tambah/bahan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    credentials: "include",
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return await res.json();
};

// const attachBahanMenu = async ( bahan_id, menu_id, jumlah ) => {
//   const res = await fetch(`${API_URL}/attach/bahan`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
//       "X-XSRF-TOKEN": await gctks(),
//     },
//     credentials: "include",
//     body: JSON.stringify({ bahan_id, menu_id, jumlah }),
//   });

//   if (!res.ok) {
//     const err = await res.json();
//     throw new Error(err.message);
//   }
//   return await res.json();
// }

const tambahBahan = async (data) => {
  const res = await fetch(`${API_URL}/tambah/bahan/langsung`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    credentials: "include",
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return await res.json();
};

const updateBahan = async (id, payload) => {
  const response = await fetch(`${API_URL}/edit/bahan/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Gagal update bahan: ${response.status}`);
  }

  return response.json();
};

const hapusBahan = async (id) => {
  const response = await fetch(`${API_URL}/hapus/bahan/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Gagal hapus bahan: ${response.status}`);
  }

  return response.json();
};

// pivot bahan menu
const handlePivotDelete = async (menuId, bahanId) => {
  try {
    const token = await gctks();

    const res = await fetch(`${API_URL}/delete-pivot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-XSRF-TOKEN": token,
      },
      credentials: "include",
      body: JSON.stringify({
        menu_id: menuId,
        bahan_id: bahanId,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Gagal hapus pivot");
    }

    return await res.json();
  } catch (err) {
    console.error("Gagal hapus pivot:", err);
    throw err;
  }
};

// memproses hasil pendapatan jika bertipe bahan_lengkap
const processBahanRevenue = async () => {
  try {
    const token = await gctks();

    const res = await fetch(`${API_URL}/pendapatan/bahan/lengkap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-XSRF-TOKEN": token,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Gagal memproses pendapatan");
    }

    return await res.json();
  } catch (err) {
    console.error("Gagal memproses pendapatan:", err);
    throw err;
  }
};


export { getBahan, tambahbahanMenu, tambahBahan, updateBahan, hapusBahan, handlePivotDelete, processBahanRevenue };

