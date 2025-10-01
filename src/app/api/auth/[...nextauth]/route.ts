import NextAuth from "next-auth";
import { config as authOptions } from "../../../../../auth";
import { NextAuthConfig } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions as NextAuthConfig);

export const GET = handlers.GET;
export const POST = handlers.POST;