import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      refreshToken: string;
      id: number;
    };
  }
}