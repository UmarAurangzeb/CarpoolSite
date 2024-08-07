import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    signOut: '/auth/signout'

  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user) {
          const checkPassword = await bcrypt.compare(credentials?.password || '', user.password);
          if (checkPassword) {
            return { id: user.id, email: user.email, isVerified: user.isVerified };
          }
          throw new Error("Incorrect password");
        }
        throw new Error("Incorrect details");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isVerified = user.isVerified;

      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          isVerified: token.isVerified as boolean,
        };
      }
      return session;
    },
  },
};


