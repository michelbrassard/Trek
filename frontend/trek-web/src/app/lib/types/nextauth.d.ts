import { DefaultSession, DefaultUser } from "next-auth";

// ✅ Extend NextAuth User
declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      email: string;
      name?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name?: string;
    role?: string;
    token: string;
  }
}

// ✅ Extend JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string;
    role?: string;
    accessToken: string;
  }
}