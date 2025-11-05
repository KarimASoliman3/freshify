// src/types/next-auth.d.ts

import type { UserResponse } from "@/interfaces";
import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: UserResponse;
    token?: string;
  }

  interface User extends DefaultUser {
    user: UserResponse;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserResponse;
    token: string;
  }
}
