import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.2:3000",
});

const MOBILE_API_KEY = "Mansel_Family";

api.interceptors.request.use((config) => {
  console.log("Request Config:", {
    url: config.url,
    method: config.method,
    headers: config.headers,
    data: config.data,
    baseURL: config.baseURL,
  });
  config.headers["x-api-key"] = MOBILE_API_KEY;
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("Response:", {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error) => {
    console.error("API Error Details:", {
      message: error.message,
      status: error?.response?.status,
      data: error?.response?.data,
      config: error?.config,
      headers: error?.response?.headers,
    });
    return Promise.reject(error);
  }
);
