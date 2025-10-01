"use server";

import { loginSchema } from "../validator";
import { signIn, signOut } from "../../../auth";
//import { prisma } from "../../../db/prisma";

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

export async function logout() {
  await signOut();
}
 