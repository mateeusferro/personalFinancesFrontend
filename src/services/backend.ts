import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (session?.user.token) {
    request.headers["Authorization"] = `Bearer ${session?.user.token}`;
  }

  return request;
});

export const backend = axiosInstance;