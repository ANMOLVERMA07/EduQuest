import axios from "axios";

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL:import.meta.env.MODE==="development" ? "http://localhost:3000":"/api",
  withCredentials: true,
});