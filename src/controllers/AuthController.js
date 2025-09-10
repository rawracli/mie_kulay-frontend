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

const getUsers = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data user");
  }

  return await response.json();
};

export { registerUser, getUsers };
