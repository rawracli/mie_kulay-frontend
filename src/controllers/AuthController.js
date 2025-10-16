const registerUser = async (data) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.errors?.email?.[0] || result.message || "Email telah terdaftar");
  }

  return result;
};

import Cookies from 'js-cookie';
const API_URL = `${import.meta.env.VITE_API_URL}`;

import { gctks } from './utils/get';

const loginUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Login gagal');

    // SIMPAN TOKEN DAN USER KE LOCALSTORAGE (kalau ada)
    if (result.token) {
      localStorage.setItem('token', result.token);
    }

    if (result.user) {
      localStorage.setItem('user', JSON.stringify(result.user));
    }

    return result;
  } catch (err) {
    console.error('Login error:', err.message);
    throw err;
  }
};


const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      headers: { "Accept": "application/json" },
      credentials: "include",
    });

    if (!response.ok) throw new Error('Gagal mengambil data user');

    return await response.json();
  } catch (err) {
    console.error('Get user error:', err.message);
    throw err;
  }
};



const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data user");
  }

  return await response.json();
};

const updateProfile = async (formData) => {
  const response = await fetch(`${API_URL}/updateProfile`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    body: formData,
    credentials: "include",
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Gagal update profile');
  return result;
};


const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/deleteUser/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "X-XSRF-TOKEN": await gctks(),
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal menghapus user");
  }

  return result;
};

export { loginUser, registerUser, getCurrentUser, getUsers, updateProfile, deleteUser };