const API_URL = import.meta.env.VITE_API_URL;

// Ambil semua kategori
const getCategories = async () => {
  const response = await fetch(`${API_URL}/category`, {
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Gagal mengambil kategori");
  }

  return await response.json();
};

export { getCategories };
