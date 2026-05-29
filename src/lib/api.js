// src/lib/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("siga_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});