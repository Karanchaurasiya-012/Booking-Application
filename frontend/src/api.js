import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Add token automatically if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const signup = (name, email, password) =>
  API.post("/auth/signup", { name, email, password });

export const login = (email, password) =>
  API.post("/auth/login", { email, password });

// Slots
export const fetchSlots = () => API.get("/slots");
export const bookSlot = (slotId) => API.post("/book", { slotId });

export default API;
