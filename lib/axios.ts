import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api", // Your Next.js API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
