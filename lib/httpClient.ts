import axios from "axios";
import { getAuthToken } from "@/util/auth";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000/",
});

httpClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});
