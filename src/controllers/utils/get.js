import Cookies from 'js-cookie';
const getWEB = `${import.meta.env.VITE_API_URL_IMAGE}`;

export const gctks = async () => {
  await fetch(`${getWEB}/sanctum/csrf-cookie`, {
    credentials: "include",
  });

  const csrfToken = Cookies.get("XSRF-TOKEN");
  return csrfToken;
};