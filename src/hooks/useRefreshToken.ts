"use client";
import { backend } from "@/services/backend";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await backend.post("auth/refreshToken", {
      refreshToken: session?.user.refreshToken,
    });

    if (session) session.user.token = res.data.token;
    else signIn();
  };
  return refreshToken;
};