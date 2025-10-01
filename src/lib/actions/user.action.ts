"use server";

import { loginSchema } from "../validator";
import { signIn, signOut } from "next-auth/react";
//import { prisma } from "../../../db/prisma";

export async function loginWithCredentials(prevState: unknown, formData: FormData) {
  try {
    const user = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await signIn("credentials", user);

    return { success: true, message: "Login successful" };
  } catch (error) {
    // Check if the error is a redirect error
    if (error && typeof error === "object" && "cause" in error && error.cause === "NEXT_REDIRECT") {
      throw error; // Re-throw redirect errors to let Next.js handle them
    }
     
    return { success: false, message: "Invalid credentials" };
  }
};

export async function logout() {
  await signOut();
}
 