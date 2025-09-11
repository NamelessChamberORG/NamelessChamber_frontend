import axios, { AxiosHeaders } from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default client;

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    const h = config.headers as AxiosHeaders;

    if (typeof h.set === "function") {
      h.set("Authorization", `Bearer ${token}`);
    } else {
      (config.headers as any)["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("me");

      window.dispatchEvent(
        new CustomEvent("auth:expired", {
          detail: { reason: "invalid_or_expired", status: 401 },
        })
      );
    }
    return Promise.reject(error);
  }
);
