import { prisma } from './db/prisma';
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { compareSync } from "bcrypt-ts-edge";
import { JWT } from "next-auth/jwt";


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
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      if (token.trigger === 'update') {
        session.user.name = token.name;
      }

      return session;
    },
    // async jwt({ token, user }: any): Promise<JWT> {
    //   if (user) {
    //     token.role = user.role;
    //   }
  
    //   if (user.name = 'NO_NAME') {
    //     //token.name = user.email!.split('@')[0];

    //     // await prisma.user.update({
    //     //   where: { id: user.id },
    //     //   data: { name: token.name }
    //     // });
    //   }

    //   return token;
    // },
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
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config as NextAuthConfig);

// export const GET = handlers.GET;
// export const POST = handlers.POST;
// export const PUT = handlers.PUT;
// export const DELETE = handlers.DELETE;