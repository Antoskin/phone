import { prisma } from './db/prisma';
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { compareSync } from "bcrypt-ts-edge";


export const config = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });
        
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = compareSync(credentials.password as string, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    }),
  ]
}

export const { handlers, signIn, signOut, auth } = NextAuth(config as NextAuthConfig);

// export const GET = handlers.GET;
// export const POST = handlers.POST;
// export const PUT = handlers.PUT;
// export const DELETE = handlers.DELETE;