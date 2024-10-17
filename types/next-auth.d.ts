import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    firstName: string
    lastName: string;
  }

  interface Session {
    user: {
      id: string
      firstName: string
      lastName: string;
      email: string;
    }
  }
}