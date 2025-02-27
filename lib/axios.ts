import axios from "axios";

export const api = axios.create({
  baseURL: "https://budget-tracker-swart-sigma.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.9",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
