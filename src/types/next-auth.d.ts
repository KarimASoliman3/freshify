// src/types/next-auth.d.ts

// What error? The code below extends the NextAuth types to add custom fields for user and token.

import type { UserResponse } from "@/interfaces";
import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

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
  interface JWT extends DefaultJWT {
    user: UserResponse;
    token: string;
  }
}
