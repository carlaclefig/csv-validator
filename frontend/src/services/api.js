import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const login = async (email, password) => {
  const res = await api.post("/login", { email, password });
  return res.data;
};

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post("/upload", formData);
  return res.data;
};

export const retryRecords = async (records) => {
  const res = await api.post("/upload/retry", { records });
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/logout");
  return res.data;
};
