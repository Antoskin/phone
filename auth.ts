import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db/prisma";

export const config = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin', // Error code passed in query string as ?error=
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Add your authentication logic here
        return null;
      }
    }),
  ] 
}

export const { handlers, signIn, signOut, auth } = NextAuth(config);

// export const GET = handlers.GET;
// export const POST = handlers.POST;
// export const PUT = handlers.PUT;
// export const DELETE = handlers.DELETE;