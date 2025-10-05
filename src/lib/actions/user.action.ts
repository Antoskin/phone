"use server";

import { loginSchema, registerSchema } from "../validator";
import { signIn, signOut } from "../../../auth";
import { redirect } from "next/navigation";
import { PAGE } from "@/config/page.config";
import { hash } from "bcrypt-ts-edge";
import { prisma } from "../../../db/prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";
//import { prisma } from "../../../db/prisma";
import { formatError } from "@/shared/utils";

export async function loginWithCredentials(prevState: unknown, formData: FormData) {
  try {
    const user = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    
    const result = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, message: result.error };
    }

    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Login error:", error);
    
    // Check if the error is a redirect error
    if (error && typeof error === "object" && "cause" in error && error.cause === "NEXT_REDIRECT") {
      throw error; // Re-throw redirect errors to let Next.js handle them
    }
     
    return { success: false, message: "Invalid credentials" };
  }
};

export async function registerWithCredentials(prevState: unknown, formData: FormData) {
  try {
    const user = registerSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    if (user.password !== user.confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    const plainPassword = user.password;

    user.password = await hash(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
      redirect: false,
    });

    return { success: true, message: "Register successful" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatError(error) };
  }
}

export async function logout() {
  await signOut({ redirectTo: PAGE.LOGIN, redirect: true });
}