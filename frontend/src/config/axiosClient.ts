import axios from "axios";

export const client = () => {
  const token = window.localStorage.getItem("mental-jwt-token");

  const client = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_EXPRESS_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return client;
};
