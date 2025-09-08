import axios from "axios";
import { toAppError } from "./errors";

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  validateStatus: () => true,
});

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  validateStatus: () => true,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (res) => {
    if (typeof res.data === "object" && res.data?.success === false) {
      throw toAppError({ response: res });
    }
    if (res.status >= 400) {
      throw toAppError({ response: res });
    }
    return res;
  },
  (err) => {
    throw toAppError(err);
  }
);

export default client;
