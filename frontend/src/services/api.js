import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const login = async (email, password) => {
  const res = await api.post("/login", { email, password });
  return res.data;
};
