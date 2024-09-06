import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/db";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    signOut: '/auth/signout'

  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
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
          if (user.password === null) {
            throw new Error("please sign in with google");
          }
          if (user.isVerified === false) {
            console.log("user not verified");
            throw new Error("User not verified");
          }


          const checkPassword = await bcrypt.compare(credentials?.password || '', user.password as string);
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
    async signIn({ account, profile, user }) {
      console.log("user from signin", user);
      if (account?.provider === "google") {
        if (!profile?.email?.endsWith("@nu.edu.pk")) {
          return "/register?error=invalid-email";
        }
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: profile?.email,
            },

          })
          if (user) {
            console.log("user already exists");
            return true;
          }
          const createUser = await prisma.user.create({
            data: {
              email: profile?.email as string,
            }
          })
          if (!createUser) {
            return false;
          }
          console.log(`User created`);
          return true
        } catch (e) {
          console.log("error");
        }

      }
      return true;

    },
    async jwt({ token, user, account }) {
      console.log("user from jwt=", user);
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


