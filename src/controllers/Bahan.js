const API_URL = import.meta.env.VITE_API_URL;
// const getWB = import.meta.env.VITE_API_URL_IMAGE;

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

import Cookies from "js-cookie";

const tambahBahan = async (data) => {
  try {
    console.log('1. Getting CSRF token...');
    
    // Get CSRF token
    const csrfResponse = await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
      credentials: 'include'
    });
    console.log('CSRF Response status:', csrfResponse.status);
    
    // Get XSRF token
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    console.log('XSRF Token:', xsrfToken ? 'Exists' : 'Missing');
    
    console.log('2. Sending POST request...');
    
    // POST request
    const res = await fetch(`${API_URL}/tambah/bahan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-XSRF-TOKEN": xsrfToken,
      },
      credentials: "include",
      body: JSON.stringify(data)
    });

    console.log('POST Response status:', res.status);
    
    if (!res.ok) {
      const err = await res.json();
      console.error('Error response:', err);
      throw new Error(err.message);
    }
    
    const result = await res.json();
    console.log('Success:', result);
    return result;
    
  } catch (error) {
    console.error('Error in tambahBahan:', error);
    throw error;
  }
};

const updateBahan = async (id, payload) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/edit/bahan/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Gagal update bahan: ${response.status}`);
  }

  return response.json();
};

const hapusBahan = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/hapus/bahan/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Gagal hapus bahan: ${response.status}`);
  }

  return response.json();
};

export { getBahan, tambahBahan, updateBahan, hapusBahan };

