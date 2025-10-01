"use server";

import { loginSchema } from "../validator";
import { signIn } from "next-auth/react";
import { isRequestError } from "next/dist/server/api-utils";

export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};