import NextAuth from "next-auth"
import { db } from "@/lib/db"
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import { z } from "zod";
import { getUserByEmail } from "./lib/utils";
import bcrypt from 'bcryptjs';

const loginSchema = z.object({
  email: z.string().email('Required'),
  password: z.string().min(1, 'Required')
})
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  //@ts-ignore
  adapter: PrismaAdapter(db),
  session: {strategy: 'jwt'},
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials)
        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email);
          if (!user || !user.email || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.email = user.email
        token.firstName = user.firstName
        token.lastName = user.lastName
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
      }
      return session;
    }
  }
})