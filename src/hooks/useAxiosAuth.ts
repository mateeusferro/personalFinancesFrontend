"use client";
import { backend } from "@/services/backend";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { useSession } from "next-auth/react";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = backend.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = backend.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 || error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${session?.user.token}`;
          return backend(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      backend.interceptors.request.eject(requestIntercept);
      backend.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return backend;
};

export default useAxiosAuth;