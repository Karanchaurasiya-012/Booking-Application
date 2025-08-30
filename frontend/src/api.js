import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Fetch slots
export const fetchSlots = (onlyAvailable = false) =>
  API.get(`/slots?onlyAvailable=${onlyAvailable}`);

// Book slot
export const bookSlot = (slotId, name, phone) =>
  API.post("/book", { slotId, name, phone });

export default API;
